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

    def __repr__(self) -> str:
        is_right = self.answer_id == self.question.correct_answer_mark

        return f"<{self.id}: at {self.created_at}, is right {is_right}>"
