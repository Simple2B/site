from fastapi import Depends, APIRouter
from app import model as m, schema as s
from app.database import get_db
from sqlalchemy.orm import Session
from app.logger import log

router = APIRouter(prefix="/api/message", tags=["Message"])


@router.post("/create", status_code=201)
def create_message(message: s.CreateMessage, db: Session = Depends(get_db)):
    log(log.INFO, f"create_message: user_name: {message.name}")

    new_message = m.Message(**message.dict())
    db.add(new_message)
    db.commit()

    log(log.INFO, "create_message: success")

    return {"status": "success"}
