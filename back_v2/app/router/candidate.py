from sqlalchemy import or_
import os
from typing import Annotated
from pydantic import EmailStr
from IPython.utils import io
from fastapi import APIRouter, Depends, HTTPException, UploadFile, status, Form
from starlette.formparsers import UploadFile as upl
from fastapi_mail.errors import ConnectionErrors
from sqlalchemy.orm import Session
from app.config import Settings, get_settings
from app.controller.mail_client import MailClient

from app.database import get_db
from app.dependency.candidate import get_current_candidate
from app.dependency.controller.mail_client import get_mail_client
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
):
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

    user_type2 = (
        f"Candidate{'' if file else ' (sent from contact form)'}"
        if is_quiz_done
        else "Client"
    )
    score = f"{user.quiz_score} / {settings.COUNT_OF_QUESTION}" if is_quiz_done else "0"

    message_text = (
        message if message else "No message (The email was sent by the Сandidate)."
    )

    try:
        await mail_client.send_email(
            email="yablunovsky.a@gmail.com",
            subject="Test work?",
            template="contact_question.html",
            template_body={
                "user_email": email,
                "name": name,
                "message": message_text,
                "year": "2023",
                "phone": phone,
                "user_type": user_type2,
                "candidate_score": score,
                "provided_attachment": "checked" if file else "",
                "quiz_complete": "checked" if is_quiz_done else "",
            },
            file=[] if file is None and not is_quiz_done else attached_files,
        )

        if is_quiz_done:
            os.remove(file_name)
    except:
        log(log.ERROR, "Error while sending message - [%s]")
        # raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
        print("----------- fail -----------")

        if is_quiz_done:
            os.remove(file_name)

        return {"status": "fail"}

    return {"status": "success"}
