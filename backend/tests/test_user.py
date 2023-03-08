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
    res = client.post("user/create_user", json=userData.dict())
    assert res.status_code == 201
    users = db.query(m.User).all()

    assert len(users) == 1
