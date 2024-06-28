from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
import sqlalchemy as sa
from app.database import get_db

import app.common.models as m
import app.schema as s
from app.logger import log

feedback_router = APIRouter(prefix="/api/feedbacks", tags=["Feedback"])


@feedback_router.get(
    "/", status_code=status.HTTP_200_OK, response_model=list[s.FeedBack]
)
def get_feedbacks(
    db: Session = Depends(get_db),
):
    log(log.INFO, "get_feedbacks")
    return s.FeedBackAdapter.validate_python(db.scalars(sa.select(m.FeedBack)).all())
