from copy import deepcopy
from datetime import datetime
import math
from sqlalchemy import or_
import os
from typing import Annotated
from pydantic import EmailStr
from fastapi import APIRouter, Depends, HTTPException, UploadFile, status, Form
from sqlalchemy.orm import Session
from app.config import Settings, get_settings
from app.controller.mail_client import MailClient
from app.controller.telegram_bot import TelegramBot

from app.database import get_db
from app.dependency.controller.mail_client import get_mail_client
from app.dependency.controller.telegram_bot import get_telegram_bot
import app.model as m
import app.schema as s
from app.logger import log
from app.utils import format_file_with_content

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
        user = m.Candidate(**user_data.dict())
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
    user = db.query(m.Candidate).filter_by(uuid=candidate_uuid).first()
    answer: m.VariantAnswer = db.query(m.VariantAnswer).get(answer_id)

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
    db.add(answer)
    user.current_question_id = None
    db.commit()

    return {"status": "success"}


@candidate_router.post(
    "/attach_cv",
    status_code=status.HTTP_200_OK,
    response_model=s.CandidateAnswerOut,
    operation_id="attach_cv",
)
async def attach_cv(
    name: Annotated[str, Form()],
    email: Annotated[EmailStr, Form()],
    phone: Annotated[str, Form()],
    message: Annotated[str, Form()] = "",
    file: UploadFile = None,
    candidate_uuid: str = None,
    user_type: Annotated[str, Form()] = "",
    mail_client: MailClient = Depends(get_mail_client),
    settings: Settings = Depends(get_settings),
    db: Session = Depends(get_db),
    telegram_bot: TelegramBot = Depends(get_telegram_bot),
):
    # Copy is necessary for sending file to telegram, because fastapi closes the file
    # after sending it to the email and it becomes invalid
    # (the same if you put telegram sending before mail)
    deep_copy_file = deepcopy(file)

    file_name = "empty.txt"

    user = (
        db.query(m.Candidate)
        .filter(or_(m.Candidate.uuid == candidate_uuid, m.Candidate.email == email))
        .first()
    )

    is_quiz_done = bool(user and user._answer.count() == settings.COUNT_OF_QUESTION)

    if is_quiz_done:
        file_name = f"quiz_from_{user.username.replace(' ', '_')}.txt"
        format_file_with_content(user._answer.all(), file_name)

    attached_files = [file]

    if is_quiz_done:
        if None in attached_files:
            attached_files.remove(None)

        attached_files.append(
            {
                "file": file_name,
                "mime_type": "file",
                "mime_subtype": "txt",
            }
        )

    user_type2 = "Candidate" if is_quiz_done else "Client"
    score = f"{user.quiz_score} / {settings.COUNT_OF_QUESTION}" if is_quiz_done else 0

    message_text = message if message else "No message."

    candidate_type = (
        "(without CV, sent from contact form)" if not file and is_quiz_done else ""
    )

    try:
        # simple2b.info@gmail.com
        await mail_client.send_email(
            email="yablunovsky.a@gmail.com",
            subject=f"New {user_type2}!",
            template="new_candidate.html" if is_quiz_done else "new_client.html",
            template_body={
                "title": f"New {user_type2}!",
                "name": name,
                "message": message_text,
                "phone": phone,
                "user_email": email,
                "user_github_email": user.email if user else "",
                "year": "2023",
                "candidate_type": candidate_type,
                "candidate_score": score,
                "text_color_by_score": user.quiz_score if user else 0,
                "bad_score": round(settings.COUNT_OF_QUESTION * 0.5),
                "normal_score": math.floor(settings.COUNT_OF_QUESTION * 0.9),
            },
            file=[] if file is None and not is_quiz_done else attached_files,
        )

        if is_quiz_done:
            telegram_bot.send_to_group_candidates(
                f"New Candidate - {name}", deep_copy_file
            )
        else:
            telegram_bot.send_to_group_clients(f"New Client - {name}", deep_copy_file)

        if is_quiz_done:
            os.remove(file_name)

            no_cv = (
                "It would be better if you also provide your CV." if not file else ""
            )

            await mail_client.send_email(
                email=user.email,
                subject=f"Dear {user.username}!",
                template="response_to_user.html",
                template_body={
                    "name": name,
                    "no_cv": no_cv,
                    "year": datetime.now().year,
                },
                file=[],
            )

    except Exception as e:
        log(log.ERROR, "Error while sending message - [%s]", e)
        # raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

        if is_quiz_done:
            os.remove(file_name)

        return {"status": "fail"}

    return {"status": "success"}
