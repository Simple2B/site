from fastapi import Depends, APIRouter, status
from sqlalchemy.orm import Session

from app import model as m, schema as s
from app.database import get_db
from app.logger import log
from app.oauth2 import get_current_user, get_vacancy

router = APIRouter(prefix="/vacancies", tags=["Vacancy"])


@router.get("/", status_code=status.HTTP_200_OK, response_model=list[s.VacancyOut])
def get_vacancies(
    db: Session = Depends(get_db),
):
    log(log.INFO, "get_vacancies")
    vacancies = db.query(m.Vacancy).filter_by(is_active=True).all()
    return vacancies


@router.get("/{slug}", status_code=status.HTTP_200_OK, response_model=s.VacancyOut)
def get_vacancy_by_slug(
    slug: str,
    vacancy: m.Vacancy = Depends(get_vacancy),
):
    log(log.INFO, "get_vacancy_by_id, [%s]", slug)
    return vacancy


@router.get(
    "/{slug}/questions",
    status_code=status.HTTP_200_OK,
    response_model=list[s.QuestionOut],
)
def get_vacancy_questions(
    slug: str,
    vacancy: m.Vacancy = Depends(get_vacancy),
    get_current_user: m.User = Depends(get_current_user),
):
    log(log.INFO, "get_vacancy_questions, [%s]", slug)

    return vacancy.questions
