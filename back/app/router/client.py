from io import BytesIO
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
    file: UploadFile | None = None,
    candidate_uuid: str | None = None,
    language: m.Languages = m.Languages.ENGLISH,
    mail_client: MailClient = Depends(get_mail_client),
    settings: Settings = Depends(get_settings),
    db: Session = Depends(get_db),
    telegram_bot: TelegramBot = Depends(get_telegram_bot),
):
    file_content = None

    if file:
        file_content = await file.read()
        await file.seek(0)

    user = db.scalar(
        m.Candidate.select().where(
            or_(m.Candidate.uuid == candidate_uuid, m.Candidate.email == email)
        )
    )

    is_quiz_done = bool(
        user and user.count_of_answers == settings.TOTAL_QUESTIONS_NUMBER
    )

    if is_quiz_done:
        log(log.INFO, "redirect to application_form")
        response = RedirectResponse(url="/api/candidate/application_form")
        return response

    client_title = "New Client"
    attached_files = [] if file is None else [file]

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
            file=attached_files,
        )

        with BytesIO(file_content) as file_obj:  # type: ignore
            telegram_bot.send_to_group_clients(
                f"{client_title} - {name}", file_obj, file.filename if file else None
            )

        subject = f"Hallo {name}" if language.value == "de" else f"Dear {name}!"
        try:
            await mail_client.send_email(
                email_to=[email],
                cc_mail_to=[],
                bcc_mail_to=[],
                subject=subject,
                template="response_to_client.html",
                template_body={
                    "name": name,
                    "language": language.value,
                    "year": datetime.now().year,
                },
                file=[],
            )
        except Exception as e:
            log(
                log.ERROR,
                "Error while sending Response message to the Client - [%s]",
                e,
            )

            telegram_bot.send_to_group_clients(
                message=f"Mail with a response to the client ({name}) was not sent - {e}"
            )

    except Exception as e:
        log(log.ERROR, "Error while sending message from Client - [%s]", e)

        telegram_bot.send_to_group_clients(
            message=f"There was an error sending mail from Client - {e}"
        )

        return {"status": "fail"}

    return {"status": "success"}
