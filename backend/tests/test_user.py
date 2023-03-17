from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import model as m, schema as s
from .database import CandidateData


def test_is_authenticated_user(client: TestClient, db: Session):
    candidate_schema = CandidateData.create_model_schema(s.IsAuthenticated)
    res = client.post(
        "/api/user/is_authenticated",
        json=candidate_schema.dict(),
    )
    assert res.status_code == 201
    token = s.Token.parse_obj(res.json())
    assert token.access_token
    # test user was created in db
    user = db.query(m.User).get(1)
    assert user
    assert user.username == CandidateData.USERNAME
    assert user.role == m.UserRole.candidate


def test_set_user_attempt(authorized_client: TestClient, db: Session):
    variant_one: m.VariantAnswer = db.query(m.VariantAnswer).get(1)
    variant_two: m.VariantAnswer = db.query(m.VariantAnswer).get(2)

    user_answers = s.SetCandidateResume(
        cv_path="fake/path",
        answers=[
            s.UserAnswer(
                answer_id=variant_one.id,
            ),
            s.UserAnswer(
                answer_id=variant_two.id,
            ),
        ],
    )
    res = authorized_client.post("/api/user/set_attempt", json=user_answers.dict())
    assert res.status_code == 201
    assert res.json()["status"] == "success"

    # test attempt was created in db
    attempt = db.query(m.CandidateResume).get(1)
    assert attempt
    assert attempt.cv_path == "fake/path"
    assert len(attempt.answers) == 2
