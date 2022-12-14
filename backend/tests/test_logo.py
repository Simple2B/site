from fastapi.testclient import TestClient


def test_logo(client: TestClient):
    response = client.get("/logo")
    assert response
    assert response.status_code == 200
    assert response.headers["content-type"] == "image/png"
    assert response.text
