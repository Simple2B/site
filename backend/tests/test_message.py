from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import model as m
from .database import TestMessageData


def test_create_message(client: TestClient, db: Session):
    message = TestMessageData.get_message_obj()

    res = client.post("api/message/create", json=message.dict())
    assert res.status_code == 201
    assert res.json()["status"] == "success"

    mes = db.query(m.Message).get(1)
    assert mes
    assert mes.name == TestMessageData.NAME
    assert mes.email == TestMessageData.EMAIL

    # test create message  without phone
    message_data = message.dict()
    del message_data["phone"]
    res = client.post("api/message/create", json=message_data)
    assert res.status_code == 201
    assert res.json()["status"] == "success"

    mes = db.query(m.Message).get(2)
    assert not mes.phone
