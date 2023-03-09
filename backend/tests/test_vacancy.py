from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import schema as s
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
