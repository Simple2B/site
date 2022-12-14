from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class VariantAnswer(Base):
    __tablename__ = "variant_answers"

    id = Column(Integer, primary_key=True)
    question_id = Column(Integer, ForeignKey("questions.id"))
    text = Column(String(512), nullable=False)
    points = Column(Integer, nullable=True)

    question = relationship("Question")

    def __repr__(self) -> str:
        return f"<{self.id}: {self.text} for question {self.question}>"
