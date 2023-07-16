import uuid

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base


def create_uid():
    return str(uuid.uuid4())


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True)
    text = Column(String(512), nullable=False)
    correct_answer_mark = Column(Integer, nullable=False)

    # ?
    uid = Column(String(128), nullable=False, default=create_uid)

    variants = relationship("VariantAnswer", viewonly=True)

    # ?
    @property
    def vacancies_ids(self):
        return [vacancy.id for vacancy in self.variants]

    @property
    def correct_answer(self):
        for answer in self.variants:
            if answer.answer_mark == self.correct_answer_mark:
                return answer

    def __repr__(self) -> str:
        return f"<{self.id}: {self.text}>"