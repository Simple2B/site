import random

from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy.sql.expression import func
from sqlalchemy.orm import Session

from app import model as m, schema as s
from app.database import get_db
from app.dependency.candidate import get_current_candidate
from app.logger import log


question_router = APIRouter(prefix="/api/question", tags=["Question"])


@question_router.get(
    "/{candidate_uuid}",
    status_code=status.HTTP_200_OK,
    response_model=s.QuestionOut,
)
def get_random_question(
    candidate_uuid: str,
    candidate = Depends(get_current_candidate),
    db: Session = Depends(get_db),
):
    log(log.INFO, "get_random_question")

    questions_ids_was_asked = candidate.question_ids

    random_question = (
        db.query(m.Question)
        .filter(m.Question.id.not_in(questions_ids_was_asked))
        .order_by(func.random())
        .limit(1)
        .first()
    )

    return random_question
