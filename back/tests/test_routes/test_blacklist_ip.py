from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.common import models as m


def test_is_authenticated_user(client: TestClient, db: Session):
    ip = m.BlacklistIP(address="1")
    db.add(ip)
    db.commit()
    res = client.get(
        f"/api/blcaklist_ips/{ip.address}/check",
    )
    assert res.status_code == 403

    res = client.get(
        "/api/blcaklist_ips/23.323.1313/check",
    )
    assert res.status_code == 200
