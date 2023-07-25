from copy import deepcopy
from datetime import datetime
from sqlalchemy import or_
from typing import Annotated
from pydantic import EmailStr
from fastapi import APIRouter, Depends, UploadFile, status, Form
from sqlalchemy.orm import Session
from starlette.responses import RedirectResponse
from app.config import Settings, get_settings
from app.controller.mail_client import MailClient
from app.controller.telegram_bot import TelegramBot
from app.database import get_db

from app.dependency.controller.mail_client import get_mail_client
from app.dependency.controller.telegram_bot import get_telegram_bot
import app.common.models as m
import app.schema as s
from app.logger import log
from app.utils import string_converter

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

    client_title = "New Client"

    try:
        await mail_client.send_email(
            email_to=string_converter(settings.INITIAL_EMAIL_TO),
            cc_mail_to=string_converter(settings.CC_EMAIL_TO),
            bcc_mail_to=string_converter(settings.BCC_EMAIL_TO),
            subject=f"{client_title} - {name}!",
            template="new_client.html",
            template_body={
                "title": f"{client_title}!",
                "name": name,
                "message": message,
                "phone": phone,
                "user_email": email,
                "year": datetime.now().year,
            },
            file=[] if file is None and not is_quiz_done else attached_files,
        )

        telegram_bot.send_to_group_clients(f"{client_title} - {name}", deep_copy_file)

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

    return {"status": "success"}
