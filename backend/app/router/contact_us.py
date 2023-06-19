from fastapi import Depends, APIRouter
from app import model as m, schema as s
from app.database import get_db
from sqlalchemy.orm import Session
from app.logger import log

router = APIRouter(prefix="/api/contact_us", tags=["Contact Us"])


@router.post("/create", status_code=201)
def create_contact_us(data: s.CreateContactUs, db: Session = Depends(get_db)):
    log(log.INFO, f"create_contact_us: user_name: {data.name}")

    contact_us = m.ContactUsData(**data.dict())
    db.add(contact_us)
    db.commit()

    log(log.INFO, "create_contact_us: success")

    return {"status": "success"}
