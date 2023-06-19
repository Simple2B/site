from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Enum

from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from app.database import Base, SessionLocal

from .enum import UserRole


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(64), nullable=True)
    email = Column(String(128), nullable=False, unique=True)
    image_url = Column(String(128), nullable=True)
    git_hub_id = Column(String(32), nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.now)
    role = Column(Enum(UserRole), default=UserRole.candidate)

    _answer = relationship("UserAnswer", viewonly=True, lazy="dynamic")

    @classmethod
    def authenticate(cls, db: SessionLocal, git_hub_id: int):
        user = db.query(cls).filter_by(git_hub_id=git_hub_id).first()
        if user is not None:
            return user

    @hybrid_property
    def question_ids(self):
        return [answer.question.id for answer in self._answer.all()]

    def __repr__(self):
        return f"<{self.id}: {self.username}>"
