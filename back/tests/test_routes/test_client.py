from unittest.mock import patch
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from app.config import Settings
from app.controller.mail_client import MailClient
from app.controller.telegram_bot import TelegramBot
from tests.fixture.test_data import CustomTestClient

FAKE_CV = "tests/files/fake_cv.pdf"
NAME = "test name"
EMAIL = " test@test.com"
PHONE = "380502221085"
MESSAGE = "Hello I am test candidate"


def test_application_form(
    authorized_candidate: CustomTestClient,
    db: Session,
    settings: Settings,
):
    candidate_uuid = authorized_candidate.uuid

    with open(FAKE_CV, "br") as f, patch.object(
        MailClient,
        "send_email",
        return_value=JSONResponse(
            status_code=200,
            content={
                "message": "Email has been sent",
            },
        ),
    ), patch.object(settings, "TOTAL_QUESTIONS_NUMBER", new=3), patch.object(
        TelegramBot, "_send", return_value=True
    ):
        res = authorized_candidate.post(
            "/api/client/",
            data={
                "name": NAME,
                "email": EMAIL,
                "phone": PHONE,
                "message": MESSAGE,
            },
            files={"file": (FAKE_CV, f, "pdf")},
        )
        assert res.status_code == 200

        res = authorized_candidate.post(
            "/api/client/",
            data={
                "name": NAME,
                "email": EMAIL,
                "phone": PHONE,
                "message": MESSAGE,
                "candidate_uuid": candidate_uuid,
            },
            files={"file": (FAKE_CV, f, "pdf")},
            follow_redirects=True,
        )
        assert res.status_code == 200

        res = authorized_candidate.post(
            "/api/client/",
            data={
                "name": NAME,
                "email": EMAIL,
                "phone": PHONE,
                "message": MESSAGE,
            },
        )
        assert res.status_code == 200

        res = authorized_candidate.post(
            "/api/client/",
            data={
                "name": NAME,
                "email": EMAIL,
                "phone": PHONE,
                "message": MESSAGE,
                "candidate_uuid": candidate_uuid,
            },
            follow_redirects=True,
        )
        assert res.status_code == 200
