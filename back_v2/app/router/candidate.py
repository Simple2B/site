# from shutil import unregister_archive_format
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.database import get_db
from app.dependency.candidate import get_current_candidate
import app.model as m
import app.schema as s
from app.oauth2 import create_access_token
from app.logger import log

candidate_router = APIRouter(prefix="/api/candidate", tags=["Candidate"])

@candidate_router.post(
    "/is_authenticated", status_code=status.HTTP_200_OK, response_model=s.Token
)
def is_authenticated(user_data: s.IsAuthenticated, db: Session = Depends(get_db)):
    log(log.INFO, f"is_authenticated: user {user_data.email}")
    user: m.Candidate = m.Candidate.authenticate(db, git_hub_id=user_data.git_hub_id)

    if not user:
        log(log.INFO, f"is_authenticated: not exist {user_data.email}")
        user = m.Candidate(**user_data.dict())
        db.add(user)
        db.commit()
        db.refresh(user)

        log(log.INFO, f"is_authenticated: created {user}")

    access_token = create_access_token(data={"user_id": user.id})

    return {"access_token": access_token, "token_type": "bearer"}


@candidate_router.post("/set_answer", status_code=status.HTTP_201_CREATED)
def set_answer(
    data: s.CandidateAnswer,
    db: Session = Depends(get_db),
    current_user: m.Candidate = Depends(get_current_candidate),
):
    log(log.INFO, "set_answer: user [%s]", current_user.email)

    answer_id = data.answer_id
    answer: m.VariantAnswer = db.query(m.VariantAnswer).get(answer_id)

    if not answer:
        log(
            log.ERROR,
            "set_user_answer:  This answer was not found: [%d]",
            answer_id,
        )
        raise HTTPException(status_code=422, detail="This answer was not found")

    answer = m.CandidateAnswer(answer_id=answer_id, user_id=current_user.id)
    db.add(answer)
    db.commit()

    return {"status": "success"}

