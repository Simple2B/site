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


@router.post("/set_attempt", status_code=201)
def set_user_attempt(
    data: s.SetUserAnswers,
    db: Session = Depends(get_db),
    current_user: m.User = Depends(oauth2.get_current_user),
):

    log(log.INFO, "set_user_attempt: user [%s]", current_user.email)

    user_answers = []


    for user_answer in data.answers:
        question_id = user_answer.question_id
        answer_id = user_answer.answer_id
        point = user_answer.point

        question: m.Question = db.query(m.Question).get(question_id)

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

        answer = user_answer.dict()
        answer.update({"correct": True if question.correct_point == point else False})
        user_answers.append(answer)

    user_attempt = m.UserAttempt(user_id=current_user.id)
    db.add(user_attempt)
    db.commit()
    db.refresh(user_attempt)


    for user_answer in user_answers:
        answer = m.UserAnswer(
            attempt_id=user_attempt.id,
            **user_answer
        )
        db.add(answer)
    db.commit()

    return {"status": "success"}
