from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True)
    text = Column(String(512), nullable=False)
    correct_point = Column(Integer, nullable=False)

    variants = relationship("VariantAnswer", viewonly=True)

    @property
    def vacancies_ids(self):
        return [vacancy.id for vacancy in self.variants]

    def __repr__(self) -> str:
        return f"<{self.id}: {self.text}>"
