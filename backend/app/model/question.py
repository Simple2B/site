from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True)
    text = Column(String(512), nullable=False)
    vacancy_id = Column(Integer, ForeignKey("vacancies.id"))
    correct_point = Column(Integer, nullable=False)

    variants = relationship("VariantAnswer", viewonly=True)

    def __repr__(self) -> str:
        return f"<{self.id}: {self.text}>"
