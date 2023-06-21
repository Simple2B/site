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


# @candidate_router.post("/", status_code=status.HTTP_200_OK, response_model=s.Token)
# def create_user(user_data: s.IsAuthenticated, db: Session = Depends(get_db)):
#     log(log.INFO, f"create_user: user {user_data.email}")
#     user: m.Candidate = m.Candidate.authenticate(db, git_hub_id=user_data.git_hub_id)

#     if not user:
#         log(log.INFO, f"create_user: not exist {user_data.email}")
#         user = m.Candidate(**user_data.dict())
#         db.add(user)
#         db.commit()
#         db.refresh(user)

#         log(log.INFO, f"create_user: created {user}")

#     # access_token = create_access_token(data={"user_id": user.id})

#     return {"user_uid": user.uid}


@candidate_router.post(
    "/is_authenticated", status_code=status.HTTP_200_OK, response_model=s.IsAuthenticatedOut, operation_id="is_authenticated"
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

    return {"user_uuid": user.uuid}


@candidate_router.post(
    "/set_answer", status_code=status.HTTP_201_CREATED, response_model=s.CandidateAnswerOut, operation_id="set_answer"
)
def set_answer(
    data: s.CandidateAnswer,
    db: Session = Depends(get_db),
):
    log(log.INFO, "set_answer")

    answer_id = data.answer_id
    candidate_uuid = data.user_uuid
    user = db.query(m.Candidate).filter_by(uuid=candidate_uuid).first()
    answer: m.VariantAnswer = db.query(m.VariantAnswer).get(answer_id)

    if not user or not answer:
        log(
            log.ERROR,
            "set_answer:  This answer or user was not found: answer_id [%d], user_uid: [%s]",
            answer_id,
            candidate_uuid
        )
        raise HTTPException(status_code=422, detail="This answer or user was not found")

    answer = m.CandidateAnswer(answer_id=answer_id, user_id=user.id)
    db.add(answer)
    db.commit()

    return {"status": "success"}
