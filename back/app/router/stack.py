from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db

import app.common.models as m
import app.schema as s
from app.logger import log

stacks_router = APIRouter(prefix="/api/stacks", tags=["Stacks"])


@stacks_router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=list[s.StackOut],
    operation_id="get_all_stacks",
)
def get(db: Session = Depends(get_db)):
    log(log.INFO, "Get all stacks")
    stacks = db.scalars(m.Stack.select()).all()
    return stacks
