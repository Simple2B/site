import pytest
from typing import Generator

from fastapi import status
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from app.main import app
from app.database import Base, get_db
from app import model as m, schema as s
from .database import VacancyData, QuestionData, CandidateData


@pytest.fixture
def client() -> Generator:
    with TestClient(app) as c:
        yield c


@pytest.fixture
def db() -> Generator:
    # SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
    SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with TestingSessionLocal() as db:

        def override_get_db() -> Generator:
            yield db

        app.dependency_overrides[get_db] = override_get_db

        VacancyData.create_vacancy(db)
        QuestionData.create_questions(db)

        yield db
        Base.metadata.drop_all(bind=engine)


@pytest.fixture
def authorized_client(client: TestClient, db: Session) -> m.User:
    candidate_schema = CandidateData.create_model_schema(s.IsAuthenticated)
    res = client.post(
        "/api/user/is_authenticated",
        json=candidate_schema.dict(),
    )
    assert res.status_code == status.HTTP_201_CREATED
    token = s.Token.parse_obj(res.json())
    assert token.access_token
    client.headers.update(
        {
            "Authorization": f"Bearer {token.access_token}",
        }
    )
    return client
