from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import schema as s
from .database import TestVacancy


def test_get_vacancies(client: TestClient, db: Session):

    res = client.get("/vacancies/")
    assert res.status_code == 200
    res_data = s.VacancyOut.parse_obj(res.json()[0])
    assert res_data.title == TestVacancy.TITTLE
    assert res_data.offers == TestVacancy.OFFERS
    assert len(res_data.properties) == len(TestVacancy.PROPERTIES)
