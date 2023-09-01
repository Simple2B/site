from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

import app.schema as s
from tests.fixture import TestData


def test_get(client: TestClient, db: Session, test_data: TestData):
    res = client.get("/api/cases/")
    assert res.status_code == 200
    res_data = s.CasesOut.model_validate(res.json())
    assert res_data.cases[0].title == test_data.case.title

    res = client.get(f"/api/cases/{res_data.cases[0].slug_name}")
    assert res.status_code == 200
