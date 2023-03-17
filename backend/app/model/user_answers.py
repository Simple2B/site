from datetime import datetime
from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship

from app.database import Base


class UserAnswer(Base):
    __tablename__ = "user_answers"

    id = Column(Integer, primary_key=True)
    resume_id = Column(Integer, ForeignKey("candidates_resumes.id"))
    answer_id = Column(Integer, ForeignKey("variant_answers.id"))
    created_at = Column(DateTime(timezone=True), default=datetime.now)

    answer = relationship("VariantAnswer", viewonly=True)

    def __repr__(self) -> str:
        is_right = self.answer_id == self.answer.question.correct_answer_mark

        return f"<{self.id}: at {self.created_at}, is right {is_right}>"
