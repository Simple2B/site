from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import schema as s, model as m
from .database import TestVacancy


def test_get_vacancies(client: TestClient, db: Session):

    res = client.get("/vacancies/")
    assert res.status_code == 200
    assert len(res.json()) == 1
    res_data = s.VacancyOut.parse_obj(res.json()[0])
    assert res_data.title == TestVacancy.TITTLE
    assert res_data.offers == TestVacancy.OFFERS
    assert len(res_data.properties) == len(TestVacancy.PROPERTIES)


def test_get_vacancy_by_slug(client: TestClient, db: Session):

    res = client.get(f"/vacancies/{TestVacancy.SLUG}")
    assert res.status_code == 200
    res_data = s.VacancyOut.parse_obj(res.json())
    assert res_data.title == TestVacancy.TITTLE
    assert res_data.offers == TestVacancy.OFFERS
    assert len(res_data.properties) == len(TestVacancy.PROPERTIES)


def test_get_vacancy_questions(authorized_client: TestClient, db: Session):
    question = db.query(m.Question).get(1)
    res = authorized_client.get(f"/vacancies/{TestVacancy.SLUG}/questions")
    assert res.status_code == 200
    res_data = [s.QuestionOut.parse_obj(obj) for obj in res.json()]
    first_question = res_data[0]

    assert first_question.text == question.text
    assert len(first_question.variants) == len(question.variants)
