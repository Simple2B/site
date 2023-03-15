from datetime import datetime
from sqlalchemy import Column, Integer, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship

from app.database import Base


class UserAnswer(Base):
    __tablename__ = "user_answers"

    id = Column(Integer, primary_key=True)
    attempt_id = Column(Integer, ForeignKey("user_attempts.id"))
    question_id = Column(Integer, ForeignKey("questions.id"))
    answer_id = Column(Integer, ForeignKey("variant_answers.id"))
    created_at = Column(DateTime(timezone=True), default=datetime.now)
    point = Column(Integer)
    correct = Column(Boolean)

    question = relationship("Question", viewonly=True)
    answer = relationship("VariantAnswer", viewonly=True)

    def __repr__(self) -> str:
        return f"<{self.id}: at {self.created_at}>"
