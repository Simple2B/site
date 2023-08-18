# flake8: noqa E712
from sqlalchemy import and_
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
import sqlalchemy as sa

import app.common.models as m
import app.schema as s
from app.logger import log

case_router = APIRouter(prefix="/api/cases", tags=["Case"])


@case_router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=s.CasesOut,
    operation_id="get_all_cases",
)
def get(is_main: bool = False, db: Session = Depends(get_db)):
    log(log.INFO, "Get all cases")

    query = sa.select(m.Case).where(m.Case.is_active, m.Case.is_deleted == False)

    if is_main:
        query = query.where(m.Case.is_main == True)

    return s.CasesOut(cases=db.scalars(query).all())


@case_router.get(
    "/{slug_name}",
    status_code=status.HTTP_200_OK,
    response_model=s.CaseOut,
    operation_id="get_case_by_slug",
)
def get_by_slug(slug_name: str, db: Session = Depends(get_db)):
    log(log.INFO, f"Get case by slug: {slug_name}")
    # case = db.query(m.Case).filter(m.Case.slug_name == slug_name).first()
    cases = db.scalars(sa.select(m.Case).where(m.Case.is_deleted == False)).all()

    cases = [case for case in cases if case.slug_name == slug_name]
    if not cases:
        log(log.INFO, "Case not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Case not found"
        )
    return cases[0]
