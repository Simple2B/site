from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship


from app.database import Base


class VacancyQuestion(Base):
    __tablename__ = "vacancy_question"
    id = Column(Integer, primary_key=True)
    vacancy_id = Column(Integer, ForeignKey("vacancies.id"))
    question_id = Column(Integer, ForeignKey("questions.id"))

    def __repr__(self):
        return f"<VacancyQuestion: {self.id}>"
