# flake8: noqa E712
import io
import math
from typing import Annotated
from datetime import datetime


from pydantic import EmailStr
from fastapi import APIRouter, Depends, File, Form, HTTPException, status
from fastapi import UploadFile
from sqlalchemy.orm import Session


from app.config import Settings, get_settings

from app.controller import MailClient, TelegramBot
import app.common.models as m
from app.database import get_db
from app.dependency.controller.telegram_bot import get_telegram_bot
from app.dependency.controller.mail_client import get_mail_client
import app.schema as s
from app.dependency.candidate import get_candidate
from app.logger import log
from app.utils import (
    create_quiz_file_content,
    string_converter,
)

candidate_router = APIRouter(prefix="/api/candidate", tags=["Candidate"])


@candidate_router.post(
    "/is_authenticated",
    status_code=status.HTTP_200_OK,
    response_model=s.IsAuthenticatedOut,
    operation_id="is_authenticated",
)
def is_authenticated(user_data: s.IsAuthenticated, db: Session = Depends(get_db)):
    log(log.INFO, f"is_authenticated: user {user_data.email}")
    user: m.Candidate | None = m.Candidate.authenticate(
        db, git_hub_id=user_data.git_hub_id
    )

    if not user:
        log(log.INFO, f"is_authenticated: not exist {user_data.email}")
        user = m.Candidate(**user_data.model_dump())
        db.add(user)
        db.commit()
        db.refresh(user)

        log(log.INFO, f"is_authenticated: created {user}")

    return {"user_uuid": user.uuid}


@candidate_router.post(
    "/set_answer",
    status_code=status.HTTP_201_CREATED,
    response_model=s.CandidateAnswerOut,
    operation_id="set_answer",
)
def set_answer(
    data: s.CandidateAnswer,
    db: Session = Depends(get_db),
):
    log(log.INFO, "set_answer")

    answer_id = data.answer_id
    candidate_uuid = data.user_uuid
    user: m.Candidate | None = db.scalar(
        m.Candidate.select().where(m.Candidate.uuid == candidate_uuid)
    )
    answer: m.VariantAnswer | None = db.get(m.VariantAnswer, answer_id)

    if not user or not answer:
        log(
            log.ERROR,
            "set_answer:  This answer or user was not found: answer_id [%d], user_uid: [%s]",
            answer_id,
            candidate_uuid,
        )
        raise HTTPException(status_code=422, detail="This answer or user was not found")

    if answer.answer_mark == answer.question.correct_answer_mark:
        user.quiz_score += 1

    answer = m.CandidateAnswer(answer_id=answer_id, user_id=user.id)
    user.answers.append(answer)
    user.current_question_id = None  # type: ignore
    db.commit()

    return {"status": "success"}


@candidate_router.post(
    "/application_form",
    response_model=s.ResponseModal,
    status_code=status.HTTP_200_OK,
    operation_id="application_form",
)
async def application_form(
    name: Annotated[str, Form()],
    email: Annotated[EmailStr, Form()],
    phone: Annotated[str, Form()],
    message: Annotated[str, Form()],
    file: UploadFile = File(None),
    candidate_uuid: Annotated[str, Form()] = "",
    candidate: m.Candidate | None = Depends(get_candidate),
    mail_client: MailClient = Depends(get_mail_client),
    telegram_bot: TelegramBot = Depends(get_telegram_bot),
    settings: Settings = Depends(get_settings),
) -> None:
    log(log.INFO, "Candidate form")
    status = s.ResponseStatus.success
    if not candidate:
        log(
            log.ERROR,
            "Contact us: Candidate with email %s not found",
            email,
        )
        return {"status": s.ResponseStatus.failed}  # type: ignore

    attached_files = []
    file_content = b""
    if file:
        file_content = await file.read()
        attached_files.append(file)
        await file.seek(0)

    log(
        log.INFO,
        "Contact us: Candidate %s is trying to send a message",
        candidate.email,
    )

    with io.BytesIO(file_content) as file_obj:  # type: ignore
        telegram_bot.send_to_group_candidates(
            f"New candidate - {name}",
            file_obj,
            file.filename if file else "Unknown file",
        )

    no_cv = "It would be better if you also provide your CV." if not file else ""
    candidate_mail_res = await mail_client.send_email(
        email_to=[email],
        cc_mail_to=[],
        bcc_mail_to=[],
        subject=f"Dear {name}!",
        template="response_to_candidate.html",
        template_body={
            "name": name,
            "message": "We received your application and will get in touch soon. Hold tight!",
            "no_cv": no_cv,
            "year": datetime.now().year,
        },
        file=[],
    )
    if candidate_mail_res.status_code == 500:
        status = s.ResponseStatus.failed
        log(
            log.ERROR,
            "Mail with a response to the Candidate (%s) was not sent!",
            name,
        )
        telegram_bot.send_to_group_candidates(
            message=f"Mail with a response to the Candidate ({name}) was not sent!"
        )

    if candidate.answers:
        quiz_file_content = create_quiz_file_content(candidate.answers)
        score = f"{candidate.quiz_score} / {settings.TOTAL_QUESTIONS_NUMBER}"
        test_file = io.BytesIO()
        test_file.write(quiz_file_content.encode("utf-8"))
        test_file.seek(0)

        attached_files.append(
            UploadFile(test_file, filename=f"quiz_{candidate.email}.txt")
        )

    candidate_type = "(without CV, sent from contact form)" if not file else ""

    notif_mail_res = await mail_client.send_email(
        email_to=string_converter(settings.INITIAL_EMAIL_TO),
        cc_mail_to=string_converter(settings.CC_EMAIL_TO),
        bcc_mail_to=string_converter(settings.BCC_EMAIL_TO),
        subject=f"New candidate - {name}!",
        template="new_candidate.html",
        template_body={
            "title": "New candidate",
            "name": name,
            "message": message,
            "phone": phone,
            "user_email": email,
            "user_github_email": candidate.email,
            "year": datetime.now().year,
            "candidate_type": candidate_type,
            "candidate_score": score,
            "text_color_by_score": candidate.quiz_score,
            "bad_score": round(
                settings.TOTAL_QUESTIONS_NUMBER * settings.FIFTY_PERCENT_TOTAL_SCORE
            ),
            "normal_score": math.floor(
                settings.TOTAL_QUESTIONS_NUMBER * settings.NINETY_PERCENT_TOTAL_SCORE
            ),
        },
        file=attached_files,
    )

    if notif_mail_res.status_code == 500:
        status = s.ResponseStatus.failed
        log(
            log.ERROR,
            "Mail with a notification about a new Candidate (%s) was not sent!",
            name,
        )
        telegram_bot.send_to_group_candidates(
            message=f"Mail with a notification about a new Candidate ({name}) was not sent!"
        )

    for file in attached_files:
        file.file.close()

    return {"status": status}  # type: ignore
