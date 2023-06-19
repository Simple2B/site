from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import schema as s, model as m


def test_get_questions(authorized_client: TestClient, db: Session):
    res = authorized_client.get(f"/api/questions/{m.VacancyType.developer.value}")
    assert res.status_code == 200
    res_data = res.json()

    questions = db.query(m.Question).all()
    assert len(res_data) == len(questions)


def test_get_vacancy_question_by_id(authorized_client: TestClient, db: Session):
    question = db.query(m.Question).get(1)
    res = authorized_client.get(f"/api/questions/question/{question.id}")
    assert res.status_code == 200
    res_data = s.QuestionOut.parse_obj(res.json())
    assert res_data.text == question.text
    assert len(res_data.variants) == len(question.variants)
