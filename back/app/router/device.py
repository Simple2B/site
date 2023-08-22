from fastapi import Depends, APIRouter, status

from sqlalchemy.orm import Session
import sqlalchemy as sa

from app.database import get_db
import app.common.models as m
import app.schema as s
from app.logger import log

device_router = APIRouter(prefix="/api/device", tags=["Device"])


@device_router.post("", status_code=status.HTTP_200_OK, response_model=s.Device)
def create_device(data: s.DeviceToken, db: Session = Depends(get_db)):
    device: m.Device | None = (
        db.scalars(sa.select(m.Device).where(m.Device.token == data.token)).first()
    )
    if not device:
        device = m.Device(
            token=data.token,
        )
        db.add(device)
        db.commit()
        log(log.INFO, "Device is created")
    log(log.INFO, "Device is already in the database")
    return device
