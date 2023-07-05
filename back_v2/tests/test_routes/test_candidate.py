from unittest.mock import patch
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import model as m
from app.config import Settings
from app.controller.mail_client import MailClient
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


def test_attach_cv(
    authorized_candidate: TestClient,
    db: Session,
    mail_client: MailClient,
    settings: Settings,
):
    candidate_uuid = authorized_candidate.uuid

    with open(FAKE_CV, "br") as f, mail_client.mail.record_messages(), patch.object(
        settings, "COUNT_OF_QUESTION", new=3
    ):
        res = authorized_candidate.post(
            f"/api/candidate/attach_cv?candidate_uuid={candidate_uuid}",
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
