from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from starlette.responses import Response
from app.database import get_db

import app.common.models as m
from app.logger import log

blacklist_ip = APIRouter(prefix="/api/blcaklist_ips", tags=["BlacklistIP"])


@blacklist_ip.get(
    "/{ip}/check",
    status_code=status.HTTP_200_OK,
    operation_id="check_blacklist_ip",
)
def check_blacklist_ip(ip: str, db: Session = Depends(get_db)):
    log(log.INFO, "Checking IP: %s", ip)
    is_forbidden = db.scalar(m.BlacklistIP.select().where(m.BlacklistIP.address == ip))

    if is_forbidden:
        return Response(status_code=status.HTTP_403_FORBIDDEN)

    return Response(status_code=status.HTTP_200_OK)
