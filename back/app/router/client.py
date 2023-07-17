from copy import deepcopy
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
from app.dependency.controller.mail_client import get_mail_client
from app.dependency.controller.telegram_bot import get_telegram_bot
import app.model as m
import app.schema as s
from app.logger import log
from app.utils import string_converter, format_file_with_content

client_router = APIRouter(prefix="/api/client", tags=["Client"])


@client_router.post(
    "/contact_form",
    status_code=status.HTTP_200_OK,
    response_model=s.CandidateAnswerOut,
    operation_id="contact_form",
)
async def contact_form(
    name: Annotated[str, Form()],
    email: Annotated[EmailStr, Form()],
    phone: Annotated[str, Form()],
    message: Annotated[str, Form()],
    file: UploadFile = None,
    candidate_uuid: str = None,
    user_type: Annotated[str, Form()] = "",
    mail_client: MailClient = Depends(get_mail_client),
    settings: Settings = Depends(get_settings),
    db: Session = Depends(get_db),
    telegram_bot: TelegramBot = Depends(get_telegram_bot),
):
    deep_copy_file = deepcopy(file)
    user = (
        db.query(m.Candidate)
        .filter(or_(m.Candidate.uuid == candidate_uuid, m.Candidate.email == email))
        .first()
    )

    is_quiz_done = bool(
        user and user._answer.count() == settings.TOTAL_QUESTIONS_NUMBER
    )

    if is_quiz_done:
        response = RedirectResponse(url="/api/candidate/application_form")
        return response

    attached_files = [file]

    try:
        await mail_client.send_email(
            email_to=string_converter(settings.INITIAL_EMAIL_TO),
            cc_mail_to=string_converter(settings.CC_EMAIL_TO),
            bcc_mail_to=string_converter(settings.BCC_EMAIL_TO),
            subject=f"New Client - {name}!",
            template="new_client.html",
            template_body={
                "title": "New Client!",
                "name": name,
                "message": message,
                "phone": phone,
                "user_email": email,
                "year": datetime.now().year,
            },
            file=[] if file is None and not is_quiz_done else attached_files,
        )

        telegram_bot.send_to_group_clients(f"New Client - {name}", deep_copy_file)

        await mail_client.send_email(
            email_to=[email],
            cc_mail_to=[],
            bcc_mail_to=[],
            subject=f"Dear {name}!",
            template="response_to_user.html",
            template_body={
                "name": name,
                "message": "We received your contacts and will get in touch soon. Hold tight!",
                "no_cv": "",
                "year": datetime.now().year,
            },
            file=[],
        )

    except Exception as e:
        log(log.ERROR, "Error while sending message - [%s]", e)

        telegram_bot.send_to_group_clients(
            f"There was an error sending mail - {e}", None
        )

        return {"status": "fail"}

    print("is_quiz_done ======= ", is_quiz_done)
    return {"status": "success"}
