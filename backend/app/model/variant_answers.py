from sqlalchemy import Column, Integer, String, ForeignKey

from app.database import Base


class VariantAnswer(Base):
    __tablename__ = "variant_answers"

    id = Column(Integer, primary_key=True)
    question_id = Column(Integer, ForeignKey("questions.id"))
    text = Column(String(512), nullable=False)
    point = Column(Integer, nullable=True)

    def __repr__(self) -> str:
        return f"<{self.id}: {self.text}>"
