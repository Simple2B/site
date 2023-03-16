from datetime import datetime
from sqlalchemy import Column, Integer, ForeignKey, DateTime, String
from sqlalchemy.orm import relationship

from app.database import Base


class UserAttempt(Base):
    __tablename__ = "user_attempts"

    id = Column(Integer, primary_key=True)
    name = Column(String(128), nullable=True)
    email = Column(String(64), nullable=True)
    telegram = Column(String(64), nullable=True)
    phone = Column(String(12), nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.now)

    user_id = Column(Integer, ForeignKey("users.id"))

    answers = relationship("UserAnswer", viewonly=True)

    def __repr__(self) -> str:
        return f"<{self.id}: at {self.created_at}>"
