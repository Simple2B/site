from sqlalchemy import Column, Integer, String, Enum, Boolean
from sqlalchemy.orm import relationship


from app.database import Base
from .enum import VacancyType


class Vacancy(Base):
    __tablename__ = "vacancies"

    id = Column(Integer, primary_key=True)
    title = Column(String(64), nullable=False)
    overview = Column(String(512), nullable=False)
    about = Column(String(512), nullable=False)
    is_active = Column(Boolean, default=True)
    type = Column(Enum(VacancyType), default=VacancyType.developer)
    slug = Column(String(32), nullable=False, unique=True)

    _offers = relationship("Offer", viewonly=True)
    _skills = relationship("Skill", viewonly=True)
    properties = relationship("Property", viewonly=True)

    @property
    def questions_ids(self):
        return [questions.id for questions in self.questions]

    @property
    def offers(self):
        return [offer.name for offer in self._offers]

    @property
    def skills(self):
        return [offer.name for offer in self._skills]

    def __repr__(self):
        return f"<Vacancy: {self.title}>"
