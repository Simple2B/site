from sqlalchemy.orm import Session
import app.schema as s

from tests.fixture.test_data import TestClient


def test_get_feedbacks(
    client: TestClient,
    db: Session,
):
    res = client.get("/api/feedbacks")
    assert res.status_code == 200
    assert s.FeedBackAdapter.validate_python(res.json())
