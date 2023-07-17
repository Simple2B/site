from unittest.mock import patch
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import model as m
from app.config import Settings
from app.controller.mail_client import MailClient
from app.controller.telegram_bot import TelegramBot
from tests.fixture import TestData

FAKE_CV = "tests/files/fake_cv.pdf"
NAME = "test name"
EMAIL = " test@test.com"
PHONE = "380502221085"
MESSAGE = "Hello I am test candidate"
USER_TYPE = "candidate"


def test_is_authenticated_user(client: TestClient, db: Session, test_data: TestData):
    test_candidate = test_data.test_candidate

    res = client.post(
        "/api/candidate/is_authenticated",
        json=test_candidate.dict(),
    )
    assert res.status_code == 200
    uuid = res.json()["user_uuid"]
    assert uuid
    # test user was created in db
    user = db.query(m.Candidate).get(1)
    assert user
    assert user.uuid == uuid


def test_application_form(
    authorized_candidate: TestClient,
    db: Session,
    settings: Settings,
):
    candidate_uuid = authorized_candidate.uuid

    with open(FAKE_CV, "br") as f, patch.object(
        MailClient, "send_email", return_value=True
    ), patch.object(settings, "TOTAL_QUESTIONS_NUMBER", new=3), patch.object(
        TelegramBot, "_send", return_value=True
    ):
        res = authorized_candidate.post(
            f"/api/candidate/application_form?candidate_uuid={candidate_uuid}",
            data={
                "name": NAME,
                "email": EMAIL,
                "phone": PHONE,
                "message": MESSAGE,
                "user_type": USER_TYPE,
            },
            files={"file": (FAKE_CV, f, "pdf")},
        )
    assert res
