from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session

from app.database import get_db
import app.model as m
from app.logger import log

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def get_current_candidate(
    candidate_uuid: str, db: Session = Depends(get_db)
) -> m.Candidate:
    candidate = db.query(m.Candidate).filter_by(uuid=candidate_uuid).first()

    if not candidate:
        log(
            log.ERROR,
            "get_current_candidate: Candidate was not found",
        )
        raise HTTPException(status_code=422, detail="Candidate  was not found")

    return candidate
