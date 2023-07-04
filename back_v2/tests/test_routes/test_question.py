from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from tests.conftest import get_test_settings

from tests.fixture import TestData
from app import schema as s


def test_get_random_question_and_set_answer(authorized_candidate: TestClient, db: Session, test_data: TestData):
    candidate_uuid = authorized_candidate.uuid

    res = authorized_candidate.get(f"/api/question/{candidate_uuid}")
    assert res.status_code == 200
    res_data = s.QuestionOut.parse_obj(res.json())
    assert res_data.question
    old_question = res_data.question.text

    res = authorized_candidate.post(
        "/api/candidate/set_answer",
        json=s.CandidateAnswer(user_uuid=candidate_uuid, answer_id=res_data.question.variants[0].id).dict(),
    )
    assert res.status_code == 201

    res = authorized_candidate.get(f"/api/question/{candidate_uuid}")
    assert res.status_code == 200
    res_data = s.QuestionOut.parse_obj(res.json())
    assert res_data.question.current_progress == 4
    assert res_data.question.text != old_question
