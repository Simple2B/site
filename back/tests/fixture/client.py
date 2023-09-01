from typing import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import schema as s
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
        json=test_candidate.model_dump(),
    )
    assert res.status_code == 200

    out: s.IsAuthenticatedOut = s.IsAuthenticatedOut.model_validate(res.json())
    client.uuid = out.user_uuid
    yield client
