from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Boolean

from app.utils import generate_uuid


class BaseUser:
    id = Column(Integer, primary_key=True)

    uuid = Column(String(36), default=generate_uuid)

    email = Column(String(128), nullable=False, unique=True)
    username = Column(String(64), nullable=False, unique=True)
    created_at = Column(DateTime, default=datetime.now)
    is_verified = Column(Boolean, default=False)
