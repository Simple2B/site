from fastapi import Depends, APIRouter, status
from sqlalchemy.sql.expression import func
from sqlalchemy.orm import Session

from app import schema as s
from app.common import models as m
from app.config import Settings, get_settings
from app.database import get_db
from app.dependency.candidate import get_current_candidate
from app.logger import log

settings: Settings = get_settings()

TOTAL_QUESTIONS_NUMBER = settings.TOTAL_QUESTIONS_NUMBER

question_router = APIRouter(prefix="/api/question", tags=["Question"])


@question_router.get(
    "/{candidate_uuid}",
    status_code=status.HTTP_200_OK,
    response_model=s.QuestionOut,
    operation_id="get_random_question",
)
def get_random_question(
    candidate: m.Candidate = Depends(get_current_candidate),
    db: Session = Depends(get_db),
):
    log(log.INFO, "get_random_question")

    count_of_answers = candidate.count_of_answers

    if count_of_answers == TOTAL_QUESTIONS_NUMBER:
        log(log.INFO, "Quiz is finished by user [%s]", candidate.email)
        return s.QuestionOut(question=None)

    questions_ids_was_asked = candidate.question_ids
    current_question_id = candidate.current_question_id

    if current_question_id:
        log(log.INFO, "Has current question [%s]", current_question_id)
        question = db.query(m.Question).filter_by(id=current_question_id).first()
    else:
        question = (
            db.query(m.Question)
            .filter(m.Question.id.not_in(questions_ids_was_asked))
            .order_by(func.random())
            .limit(1)
            .first()
        )

    if not question:
        log(log.WARNING, "Not found question")
        return s.QuestionOut(question=None)
    candidate.current_question_id = question.id
    db.commit()

    return s.QuestionOut(
        question=s.Question(
            text=question.text,
            variants=question.variants,
            current_progress=count_of_answers,
        )
    )
