from typing import List
from pydantic import EmailStr
from pathlib import Path

from starlette.responses import JSONResponse
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from fastapi import UploadFile

from app.config import Settings
from app.logger import log


class MailClient:
    mail: FastMail

    def __init__(self, settings: Settings):
        mail_config: ConnectionConfig = ConnectionConfig(
            MAIL_USERNAME=settings.MAIL_USERNAME,
            MAIL_PASSWORD=settings.MAIL_PASSWORD,
            MAIL_FROM=settings.MAIL_FROM,
            MAIL_PORT=settings.MAIL_PORT,
            MAIL_SERVER=settings.MAIL_SERVER,
            MAIL_FROM_NAME=settings.MAIL_FROM_NAME,
            MAIL_STARTTLS=False,
            MAIL_SSL_TLS=True,
            USE_CREDENTIALS=True,
            VALIDATE_CERTS=False,
            TEMPLATE_FOLDER=Path("app/templates"),
        )

        self.mail = FastMail(mail_config)

    async def send_email(
        self,
        email_to: List[EmailStr],
        cc_mail_to: List[EmailStr],
        bcc_mail_to: List[EmailStr],
        subject: str,
        template: str,
        template_body: dict,
        file: UploadFile | list[UploadFile],
    ) -> JSONResponse:
        """
        Function for generating email
        Args:
            email (str): email string
            subject (str): subject of email
            template (str): path to template
            template_body (str): variables that are passed to template
        Returns:
            JSONResponse: Email has been spent
        """
        message = MessageSchema(
            subject=subject,
            recipients=email_to,
            cc=cc_mail_to,
            bcc=bcc_mail_to,
            template_body=template_body,
            subtype=MessageType.html,
            attachments=file,  # type: ignore
        )

        await self.mail.send_message(
            message,
            template_name=template,
        )

        log(log.INFO, "Sending message to %s", email_to)

        return JSONResponse(
            status_code=200,
            content={
                "message": "Email has been sent",
            },
        )
