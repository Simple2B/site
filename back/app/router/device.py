from fastapi import Depends, APIRouter, HTTPException, status

from sqlalchemy.orm import Session

# from starlette.responses import RedirectResponse
# from app.config import Settings, get_settings

from app.database import get_db
import app.common.models as m
import app.schema as s
from app.logger import log

device_router = APIRouter(prefix="/api/device", tags=["Device"])


@device_router.post("", status_code=status.HTTP_200_OK, response_model=s.Device)
def create_device(data: s.DeviceToken, db: Session = Depends(get_db)):
    device = db.query(m.Device).filter(m.Device.token == data.token).first()
    if not device:
        log(log.ERROR, "No token for device")
        raise HTTPException(status_code=409, detail="No token for device")
    device = m.Device(
        token=data.token,
    )
    db.add(device)
    db.commit()

    log(log.INFO, "Create device")
    return device
