from typing import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

import app.schema as s
from .test_data import TestData


@pytest.fixture
def client() -> Generator:
    from app.main import app

    with TestClient(app) as c:
        yield c


@pytest.fixture
def authorized_candidate(
    client: TestClient,
    db: Session,
    test_data: TestData,
) -> TestClient:
    test_candidate = test_data.test_candidate

    res = client.post(
        "/api/candidate/is_authenticated",
        json=test_candidate.dict(),
    )
    assert res.status_code == 200
    token = s.Token.parse_obj(res.json())
    assert token.access_token
    client.headers.update(
        {
            "Authorization": f"Bearer {token.access_token}",
        }
    )
    yield client
