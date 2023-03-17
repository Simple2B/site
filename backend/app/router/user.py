from fastapi import HTTPException, Depends, APIRouter
from app import model as m, schema as s, oauth2
from app.database import get_db
from sqlalchemy.orm import Session
from app.logger import log
from app.oauth2 import create_access_token

router = APIRouter(prefix="/api/user", tags=["Users"])


@router.post("/is_authenticated", status_code=201, response_model=s.Token)
def is_authenticated(user_data: s.IsAuthenticated, db: Session = Depends(get_db)):
    log(log.INFO, f"is_authenticated: user {user_data.email}")
    user: m.User = m.User.authenticate(db, git_hub_id=user_data.git_hub_id)

    if not user:
        log(log.INFO, f"is_authenticated: not exist {user_data.email}")
        user = m.User(**user_data.dict())
        db.add(user)
        db.commit()
        db.refresh(user)

        log(log.INFO, f"is_authenticated: created {user}")

    access_token = create_access_token(data={"user_id": user.id})

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/set_attempt", status_code=201)
def set_user_attempt(
    data: s.SetCandidateResume,
    db: Session = Depends(get_db),
    current_user: m.User = Depends(oauth2.get_current_user),
):
    log(log.INFO, "set_user_attempt: user [%s]", current_user.email)

    # TODO save CV

    for user_answer in data.answers:
        answer_id = user_answer.answer_id
        answer: m.VariantAnswer = db.query(m.VariantAnswer).get(answer_id)

        if not answer:
            log(
                log.ERROR,
                "set_user_answer:  This answer was not found: [%d]",
                answer_id,
            )
            raise HTTPException(status_code=422, detail="This answer was not found")

    user_resume = m.CandidateResume(user_id=current_user.id, cv_path=data.cv_path)
    db.add(user_resume)
    db.commit()
    db.refresh(user_resume)

    for user_answer in data.answers:
        answer = m.UserAnswer(resume_id=user_resume.id, answer_id=user_answer.answer_id)
        db.add(answer)
    db.commit()

    return {"status": "success"}
