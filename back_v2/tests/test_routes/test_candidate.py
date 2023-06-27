from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import model as m, schema as s
from app.controller.mail_client import MailClient
from tests.fixture import TestData

FAKE_CV = 'tests/files/fake_cv.pdf'

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


def test_attach_cv(authorized_candidate: TestClient, db: Session, mail_client: MailClient):
    uuid = authorized_candidate.uuid

    with open(FAKE_CV, "br") as f, mail_client.mail.record_messages() as outbox:
        res = authorized_candidate.post(
            "/api/candidate/attach_cv",
            data={"candidate_uuid": uuid},
            files={"file": (FAKE_CV, f, "pdf")},
        )
    assert res