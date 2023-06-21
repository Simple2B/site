from fastapi import Depends, APIRouter, status
from sqlalchemy.sql.expression import func
from sqlalchemy.orm import Session

from app import model as m, schema as s
from app.config import Settings, get_settings
from app.database import get_db
from app.dependency.candidate import get_current_candidate
from app.logger import log

settings: Settings = get_settings()

COUNT_OF_QUESTION = settings.COUNT_OF_QUESTION

question_router = APIRouter(prefix="/api/question", tags=["Question"])


@question_router.get(
    "/{candidate_uuid}",
    status_code=status.HTTP_200_OK,
    response_model=s.QuestionOut,
    operation_id="get_random_question",
)
def get_random_question(
    candidate_uuid: str,
    candidate: m.Candidate =Depends(get_current_candidate),
    db: Session = Depends(get_db),
):
    log(log.INFO, "get_random_question")

    questions_ids_was_asked = candidate.question_ids
    count_of_answers = candidate.count_of_answers

    random_question = (
        db.query(m.Question)
        .filter(m.Question.id.not_in(questions_ids_was_asked))
        .order_by(func.random())
        .limit(1)
        .first()
    )

    if count_of_answers == COUNT_OF_QUESTION or not random_question:
        log(log.INFO, "Quiz is finished by user [%s]", candidate.email)
        return s.QuestionOut(question=None)

    return s.QuestionOut(question=s.Question(text=random_question.text, variants=random_question.variants, current_progress=count_of_answers))
