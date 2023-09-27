from io import BytesIO
from datetime import datetime
import math
from sqlalchemy import or_
import os
from typing import Annotated
from pydantic import EmailStr
from fastapi import APIRouter, Depends, HTTPException, UploadFile, status, Form
from sqlalchemy.orm import Session
from starlette.responses import RedirectResponse
from app.config import Settings, get_settings
from app.controller.mail_client import MailClient
from app.controller.telegram_bot import TelegramBot
from app.database import get_db

# from app.database import get_db
from app.dependency.controller.mail_client import get_mail_client
from app.dependency.controller.telegram_bot import get_telegram_bot
import app.common.models as m
import app.schema as s
from app.logger import log
from app.utils import string_converter, format_file_with_content

candidate_router = APIRouter(prefix="/api/candidate", tags=["Candidate"])


@candidate_router.post(
    "/is_authenticated",
    status_code=status.HTTP_200_OK,
    response_model=s.IsAuthenticatedOut,
    operation_id="is_authenticated",
)
def is_authenticated(user_data: s.IsAuthenticated, db: Session = Depends(get_db)):
    log(log.INFO, f"is_authenticated: user {user_data.email}")
    user: m.Candidate = m.Candidate.authenticate(db, git_hub_id=user_data.git_hub_id)

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
    user.current_question_id = None
    db.commit()

    return {"status": "success"}


@candidate_router.post(
    "/application_form",
    status_code=status.HTTP_200_OK,
    response_model=s.CandidateAnswerOut,
    operation_id="application_form",
)
async def application_form(
    name: Annotated[str, Form()],
    email: Annotated[EmailStr, Form()],
    phone: Annotated[str, Form()],
    message: Annotated[str, Form()] = "",
    file: UploadFile = None,
    candidate_uuid: str = None,
    mail_client: MailClient = Depends(get_mail_client),
    settings: Settings = Depends(get_settings),
    db: Session = Depends(get_db),
    telegram_bot: TelegramBot = Depends(get_telegram_bot),
):
    file_content = None

    if file:
        # To send to telegram, because after the email file became closed and invalid
        file_content = await file.read()
        # After reading, the cursor remains at the end of the file.
        # The file is read only based on the position of the cursor,
        # and if it is at the end of the content, then an invalid file (without content) will be sent.
        # With seek we indicate the position of the cursor.
        await file.seek(0)

    file_name = "empty.txt"

    user: m.Candidate | None = db.scalars(
        m.Candidate.select().where(
            or_(m.Candidate.uuid == candidate_uuid, m.Candidate.email == email)
        )
    ).first()

    is_quiz_done = bool(
        user and user.count_of_answers == settings.TOTAL_QUESTIONS_NUMBER
    )

    if not is_quiz_done:
        response = RedirectResponse(url="/api/client/contact_form")
        return response

    file_name = f"quiz_from_{user.username.replace(' ', '_')}.txt"
    format_file_with_content(user.answers, file_name)

    attached_files = [file]

    if None in attached_files:
        attached_files.remove(None)

    attached_files.append(
        {
            "file": file_name,
            "mime_type": "file",
            "mime_subtype": "txt",
        }
    )

    score = (
        f"{user.quiz_score} / {settings.TOTAL_QUESTIONS_NUMBER}" if is_quiz_done else 0
    )

    message_text = message if message else "No message."

    candidate_type = (
        "(without CV, sent from contact form)" if not file and is_quiz_done else ""
    )

    message_for_user = (
        "We received your application and will get in touch soon. Hold tight!"
    )

    client_title = "New Candidate"

    try:
        await mail_client.send_email(
            email_to=string_converter(settings.INITIAL_EMAIL_TO),
            cc_mail_to=string_converter(settings.CC_EMAIL_TO),
            bcc_mail_to=string_converter(settings.BCC_EMAIL_TO),
            subject=f"{client_title} - {name}!",
            template="new_candidate.html",
            template_body={
                "title": f"{client_title}!",
                "name": name,
                "message": message_text,
                "phone": phone,
                "user_email": email,
                "user_github_email": user.email,
                "year": datetime.now().year,
                "candidate_type": candidate_type,
                "candidate_score": score,
                "text_color_by_score": user.quiz_score
                if user
                else settings.INITIAL_QUIZ_SCORE,
                "bad_score": round(
                    settings.TOTAL_QUESTIONS_NUMBER * settings.FIFTY_PERCENT_TOTAL_SCORE
                ),
                "normal_score": math.floor(
                    settings.TOTAL_QUESTIONS_NUMBER
                    * settings.NINETY_PERCENT_TOTAL_SCORE
                ),
            },
            file=[] if file is None and not is_quiz_done else attached_files,
        )

        with BytesIO(file_content) as file_obj:
            telegram_bot.send_to_group_candidates(
                f"{client_title} - {name}", file_obj, file.filename if file else None
            )

        try:
            no_cv = (
                "It would be better if you also provide your CV." if not file else ""
            )

            await mail_client.send_email(
                email_to=[email],
                cc_mail_to=[],
                bcc_mail_to=[],
                subject=f"Dear {name}!",
                template="response_to_user.html",
                template_body={
                    "name": name,
                    "message": message_for_user,
                    "no_cv": no_cv,
                    "year": datetime.now().year,
                },
                file=[],
            )
        except Exception as e:
            log(
                log.ERROR,
                "Error while sending Response message to the Candidate - [%s]",
                e,
            )

            telegram_bot.send_to_group_candidates(
                f"Mail with a response to the Candidate ({name}) was not sent! - {e}",
                None,
            )

        os.remove(file_name)

    except Exception as e:
        log(log.ERROR, "Error while sending message from Candidate - [%s]", e)

        telegram_bot.send_to_group_candidates(
            f"There was an error sending mail from Candidate - {e}", None
        )

        if is_quiz_done:
            os.remove(file_name)

        return {"status": "fail"}

    return {"status": "success"}
