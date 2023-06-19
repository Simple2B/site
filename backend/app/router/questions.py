from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy.orm import Session

from app import model as m, schema as s
from app.database import get_db
from app.logger import log
from app.oauth2 import get_current_user

router = APIRouter(prefix="/api/questions", tags=["Questions"])


@router.get(
    "/{type_vacancy}",
    status_code=status.HTTP_200_OK,
    response_model=list[int],
)
def get_questions(
    type_vacancy: m.VacancyType,
    get_current_user: m.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    log(log.INFO, "get_questions, [%s]", type_vacancy)

    questions = db.query(m.Question).filter_by(candidate_type=type_vacancy).all()

    return [question.id for question in questions]


@router.get(
    "/question/{id}",
    status_code=status.HTTP_200_OK,
    response_model=s.QuestionOut,
)
def get_question_by_id(
    id: int,
    get_current_user: m.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    log(log.INFO, "get_question_by_id, id: [%d]", id)

    question = db.query(m.Question).get(id)

    if not question:
        log(log.ERROR, "Error get question, id: [%d]", id)
        raise HTTPException(status_code=404, detail="This question was not found")

    return question
