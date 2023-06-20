from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from tests.fixture import TestData
from app import schema as s


def test_get_random_question_and_set_answer(authorized_candidate: TestClient, db: Session, test_data: TestData):
    res = authorized_candidate.get(f"/api/question")
    assert res.status_code == 200
    res_data = s.QuestionOut.parse_obj(res.json())
    assert res_data
    old_answer = res_data.text

    res = authorized_candidate.post(
        "/api/candidate/set_answer",
        json=s.CandidateAnswer(answer_id=res_data.variants[0].id).dict(),
    )
    assert res.status_code == 201

    res = authorized_candidate.get(f"/api/question")
    assert res.status_code == 200
    res_data = s.QuestionOut.parse_obj(res.json())
    assert res_data.text != old_answer
