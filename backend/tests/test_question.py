from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import schema as s


def test_get_random_question_and_set_answer(authorized_client: TestClient, db: Session):
    res = authorized_client.get(f"/api/question")
    assert res.status_code == 200
    res_data = s.QuestionOut.parse_obj(res.json())
    assert res_data
    old_answer = res_data.text

    res = authorized_client.post(
        "/api/user/set_answer",
        json=s.UserAnswer(answer_id=res_data.variants[0].id).dict(),
    )
    assert res.status_code == 201

    res = authorized_client.get(f"/api/question")
    assert res.status_code == 200
    res_data = s.QuestionOut.parse_obj(res.json())
    assert res_data.text != old_answer
