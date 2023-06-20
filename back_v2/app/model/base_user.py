from datetime import datetime
from typing import Self

from sqlalchemy import Column, Integer, String, DateTime, Boolean, func, or_

from app.hash_utils import make_hash, hash_verify
from app.database import SessionLocal
from app.utils import generate_uuid


class BaseUser:
    id = Column(Integer, primary_key=True)

    uuid = Column(String(36), default=generate_uuid)

    email = Column(String(128), nullable=False, unique=True)
    username = Column(String(64), nullable=False, unique=True)
    created_at = Column(DateTime, default=datetime.now)
    is_verified = Column(Boolean, default=False)

