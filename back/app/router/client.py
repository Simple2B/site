import io
from datetime import datetime
from typing import Annotated

from pydantic import EmailStr
from fastapi import APIRouter, Depends, UploadFile, status, Form, File
from sqlalchemy.orm import Session
from starlette.responses import RedirectResponse
from app.config import Settings, get_settings
from app.controller.mail_client import MailClient
from app.controller.telegram_bot import TelegramBot
from app.database import get_db

from app.dependency.candidate import get_candidate
from app.dependency.controller.mail_client import get_mail_client
from app.dependency.controller.telegram_bot import get_telegram_bot
import app.common.models as m
import app.schema as s
from app.logger import log
from app.utils import string_converter

client_router = APIRouter(prefix="/api/client", tags=["Client"])


@client_router.post(
    "/contact_form",
    response_model=s.ResponseModal,
    status_code=status.HTTP_200_OK,
    operation_id="contact_form",
)
async def contact_form(
    name: Annotated[str, Form()],
    email: Annotated[EmailStr, Form()],
    phone: Annotated[str, Form()],
    message: Annotated[str, Form()],
    file: UploadFile = File(None),
    bot_ip: Annotated[str, Form()] = "",
    candidate_uuid: Annotated[str, Form()] = "",
    language: Annotated[m.Languages, Form()] = m.Languages.ENGLISH,
    candidate: m.Candidate | None = Depends(get_candidate),
    mail_client: MailClient = Depends(get_mail_client),
    telegram_bot: TelegramBot = Depends(get_telegram_bot),
    settings: Settings = Depends(get_settings),
    db: Session = Depends(get_db),
) -> None:
    log(log.INFO, "Contact us: New client is trying to send a message")
    status = s.ResponseStatus.success
    if bot_ip:
        log(log.INFO, "Bot IP: %s", bot_ip)
        blacklist_ip = m.BlacklistIP(address=bot_ip)
        db.add(blacklist_ip)
        db.commit()
        return {"status": status}  # type: ignore

    if candidate:
        log(log.INFO, "Redirect to application_form [%s]", candidate.email)
        response = RedirectResponse(url="/api/candidate/application_form")
        return response  # type: ignore

    attached_files = []
    file_content = b""
    if file:
        file_content = await file.read()
        attached_files.append(file)
        await file.seek(0)

    with io.BytesIO(file_content) as file_obj:
        telegram_bot.send_to_group_clients(
            f"New client - {name}",
            file_obj,
            file.filename if file else "Unknown file",
        )

    notif_admin_res = await mail_client.send_email(
        email_to=string_converter(settings.INITIAL_EMAIL_TO),
        cc_mail_to=string_converter(settings.CC_EMAIL_TO),
        bcc_mail_to=string_converter(settings.BCC_EMAIL_TO),
        subject=f"New client - {name}!",
        template="new_client.html",
        template_body={
            "title": "New client!",
            "name": name,
            "message": message,
            "phone": phone,
            "user_email": email,
            "year": datetime.now().year,
        },
        file=attached_files,
    )
    if notif_admin_res.status_code == 500:
        status = s.ResponseStatus.failed
        log(
            log.ERROR,
            "Mail with a notification about a new Client (%s) was not sent!",
            name,
        )
        telegram_bot.send_to_group_clients(
            message=f"Mail with a notification about a new Client ({name}) was not sent!"
        )
    subject = f"Hallo {name}" if language.value == "de" else f"Dear {name}!"
    notif_client_res = await mail_client.send_email(
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
    if notif_client_res.status_code == 500:
        status = s.ResponseStatus.failed
        log(
            log.ERROR,
            "Mail with a response to the Client (%s) was not sent!",
            name,
        )
        telegram_bot.send_to_group_clients(
            message=f"Mail with a response to the Client ({name}) was not sent!"
        )

    for file in attached_files:
        file.file.close()

    return {"status": status}  # type: ignore
