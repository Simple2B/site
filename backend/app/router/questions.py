import random

from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy.sql.expression import func
from sqlalchemy.orm import Session

from app import model as m, schema as s
from app.database import get_db
from app.logger import log
from app.oauth2 import get_current_user


router = APIRouter(prefix="/api/question", tags=["Question"])


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=s.QuestionOut,
)
def get_random_question(
    user: m.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    log(log.INFO, "get_random_question")

    questions_ids_was_asked = user.question_ids

    random_question = (
        db.query(m.Question)
        .filter(m.Question.id.not_in(questions_ids_was_asked))
        .order_by(func.random())
        .limit(1)
        .first()
    )

    return random_question
