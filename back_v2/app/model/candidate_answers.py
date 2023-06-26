from datetime import datetime
from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property

from app.database import Base


class CandidateAnswer(Base):
    __tablename__ = "candidate_answers"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("candidates.id"))
    answer_id = Column(Integer, ForeignKey("variant_answers.id"))
    created_at = Column(DateTime(timezone=True), default=datetime.now)

    answer = relationship("VariantAnswer", viewonly=True)

    @hybrid_property
    def question(self):
        return self.answer.question

    @hybrid_property
    def is_right(self):
        return self.answer.answer_mark == self.question.correct_answer_mark

    def __repr__(self) -> str:
        return f"<{self.id}: at {self.created_at}, is right {self.is_right}>"
