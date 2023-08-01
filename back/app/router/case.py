# flake8: noqa E712
from sqlalchemy import and_
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db

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
    cases = db.query(m.Case).filter(and_(m.Case.is_active == True, m.Case.is_deleted == False))
    if is_main:
        cases = cases.filter(m.Case.is_main == True)
    return s.CasesOut(cases=cases.all())


@case_router.get(
    "/{slug_name}",
    status_code=status.HTTP_200_OK,
    response_model=s.CaseOut,
    operation_id="get_case_by_slug",
)
def get_by_slug(slug_name: str, db: Session = Depends(get_db)):
    log(log.INFO, f"Get case by slug: {slug_name}")
    # case = db.query(m.Case).filter(m.Case.slug_name == slug_name).first()
    case = db.query(m.Case).filter(and_(m.Case.is_active == True, m.Case.is_deleted == False)).all()
    # can't filter by hybrid_property got error then use python
    case = [c for c in case if c.slug_name == slug_name]
    if not case:
        log(log.INFO, "Case not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return case[0]
