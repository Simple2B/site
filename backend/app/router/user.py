from fastapi import HTTPException, Depends, APIRouter
from app import model as m, schema as s, oauth2
from app.database import get_db
from sqlalchemy.orm import Session
from app.logger import log

router = APIRouter(prefix="/user", tags=["Users"])


@router.post("/create_user", status_code=201, response_model=s.UserOut)
def create_user(new_user: s.UserCreate, db: Session = Depends(get_db)):
    user = db.query(m.User).filter(m.User.email == new_user.email).first()
    log(log.INFO, f"create_user: user {new_user.email} exists: {bool(user)}")

    if not user:
        user = m.User(**new_user.dict())
        db.add(user)
        db.commit()
        db.refresh(user)

        log(log.INFO, f"create_user: user {user} created")

    log(log.INFO, f"create_user: user {user} already in db")

    return user


@router.post("/set_answer", status_code=201)
def set_user_answer(
    user_answer: s.SetUserAnswer,
    db: Session = Depends(get_db),
    current_user: int = Depends(oauth2.get_current_user),
):

    log(log.INFO, "set_user_answer: user [%s]", current_user.email)

    question_id = user_answer.question_id
    answer_id = user_answer.answer_id
    point = user_answer.point

    question = db.query(m.Question).get(question_id)

    if not question:
        log(
            log.ERROR,
            "set_user_answer:  This question was not found: [%d]",
            question_id,
        )
        raise HTTPException(status_code=422, detail="This question was not found")

    if answer_id not in question.vacancies_ids:
        log(log.ERROR, "set_user_answer:  This answer was not found: [%d]", answer_id)
        raise HTTPException(status_code=422, detail="This answer was not found")

    user_answer = (
        db.query(m.UserAnswer)
        .filter_by(question_id=question_id, answer_id=answer_id)
        .first()
    )

    if user_answer:
        log(
            log.ERROR,
            "set_user_answer:  This answer already exist [%d]",
            user_answer.id,
        )
        raise HTTPException(status_code=422, detail="This answer already exist")

    user_answer = m.UserAnswer(
        user_id=current_user.id,
        question_id=question_id,
        answer_id=answer_id,
        point=point,
        correct=True if question.correct_point == point else False,
    )
    db.add(user_answer)
    db.commit()

    return {"status": "success"}
