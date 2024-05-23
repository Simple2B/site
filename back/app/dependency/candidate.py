from typing import Annotated

import sqlalchemy as sa
from fastapi import Depends, Form, HTTPException
from fastapi.security import OAuth2PasswordBearer

from pydantic import EmailStr
from sqlalchemy.orm import Session

import app.common.models as m
from app.database import get_db
from app.logger import log

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def get_candidate(
    email: Annotated[EmailStr, Form()],
    candidate_uuid: Annotated[str, Form()] = "",
    db: Session = Depends(get_db),
) -> m.Candidate | None:
    log(log.INFO, "get_candidate: %s, %s", email, candidate_uuid)
    candidate = db.scalar(
        sa.select(m.Candidate).where(
            sa.or_(m.Candidate.email == email, m.Candidate.uuid == candidate_uuid)
        )
    )
    return candidate


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
