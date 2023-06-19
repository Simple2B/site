from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import model as m, schema as s
from .database import ContactUsData


def test_create_contact_us(client: TestClient, db: Session):
    contact_us_data = ContactUsData.create_model_schema(s.CreateContactUs)

    res = client.post("api/contact_us/create", json=contact_us_data.dict())
    assert res.status_code == 201
    assert res.json()["status"] == "success"

    mes = db.query(m.ContactUsData).get(1)
    assert mes
    assert mes.name == ContactUsData.NAME
    assert mes.email == ContactUsData.EMAIL

    # test create message  without phone
    message_data = contact_us_data.dict()
    del message_data["phone"]
    res = client.post("api/contact_us/create", json=message_data)
    assert res.status_code == 201
    assert res.json()["status"] == "success"

    mes = db.query(m.ContactUsData).get(2)
    assert not mes.phone
