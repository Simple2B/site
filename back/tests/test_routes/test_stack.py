from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from tests.fixture import TestData


def test_get(client: TestClient, test_data: TestData, db: Session):
    res = client.get("/api/stacks/")
    assert res.status_code == 200
    assert [stack.get("name") for stack in res.json()] == test_data.stacks
