from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import model as m, schema as s
from .database import TestClientData


def test_create_user(client: TestClient, db: Session):
    userData = s.UserCreate(
        username=TestClientData.NAME,
        email=TestClientData.EMAIL,
        password=TestClientData.PASSWORD,
        image_url=TestClientData.IMAGE,
    )

    res = client.post("user/create_user", json=userData.dict())
    assert res.status_code == 201
    assert res.json()["username"] == TestClientData.NAME

    # test user was created in db
    user = db.query(m.User).get(1)
    assert user
    assert user.username == TestClientData.NAME
    assert user.role == m.UserRole.candidate

    # test create same user
    # res = client.post("user/create_user", json=userData.dict())
    # assert res.status_code == 201
    # users = db.query(m.User).all()

    # assert len(users) == 1


def test_set_user_attempt(authorized_client: TestClient, db: Session):
    correct_question: m.Question = db.query(m.Question).get(1)
    uncorrect_question: m.Question = db.query(m.Question).get(2)
    variant_one: m.VariantAnswer = correct_question.variants[2]
    variant_two: m.VariantAnswer = uncorrect_question.variants[0]

    user_answers = s.SetUserAnswers(
        answers=[
        s.UserAnswer(
        question_id=correct_question.id, answer_id=variant_one.id, point=variant_one.point
    ),
        s.UserAnswer(
        question_id=uncorrect_question.id, answer_id=variant_two.id, point=variant_two.point
        )
    ])
    res = authorized_client.post("user/set_attempt", json=user_answers.dict())
    assert res.status_code == 201
    assert res.json()["status"] == "success"

    # test attempt was created in db
    attempt = db.query(m.UserAttempt).get(1)
    assert attempt
    assert len(attempt.answers) == 2
