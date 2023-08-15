from fastapi.testclient import TestClient

# from sqlalchemy.orm import Session
import app.schema as s

# from tests.fixture import TestData


def test_create_device(client: TestClient):
    token = "test_token_123"
    req = s.DeviceToken(
        token=token,
    )
    res = client.post("/api/device/create", data=req.json())
    assert res.status_code == 200
    assert res.json()["token"] == token
    # when no token
    token = ""
    req = s.DeviceToken(
        token=token,
    )
    res = client.post("/api/device/create", data=req.json())
    assert res.status_code == 409
    assert res.json()["detail"] == "No token for device"
