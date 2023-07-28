from sqlalchemy import and_
from fastapi import APIRouter, Depends, HTTPException, UploadFile, status, Form
from sqlalchemy.orm import Session
from app.database import get_db
from sqlalchemy import select

# from app.database import get_db
from app.dependency.controller.mail_client import get_mail_client
from app.dependency.controller.telegram_bot import get_telegram_bot
import app.common.models as m
import app.schema as s

case_router = APIRouter(prefix="/api/cases", tags=["Case"])



@case_router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=s.CasesOut,
    operation_id="get_all_cases",
)
def get(db: Session = Depends(get_db)):
    cases = db.query(m.Case).filter(and_(m.Case.is_active == True, m.Case.is_deleted==False)).all()
    return s.CasesOut(cases=cases)


@case_router.get(
    "/{slug_name}",
    status_code=status.HTTP_200_OK,
    response_model=s.CaseOut,
    operation_id="get_all_cases",
)
def get_by_slug(slug_name: str, db: Session = Depends(get_db)):
    # case = db.query(m.Case).filter(m.Case.slug_name == slug_name).first()
    case = db.query(m.Case).filter(and_(m.Case.is_active == True, m.Case.is_deleted==False)).all()
    # can't filter by hybrid_property got error then use python
    case = [c for c in case if c.slug_name == slug_name]
    if not case:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return case[0]