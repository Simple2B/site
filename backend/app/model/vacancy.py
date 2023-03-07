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
    type = Column(Enum(VacancyType))

    offers = relationship("Offer", secondary="vacancy_offers", viewonly=True)

    def __repr__(self):
        return f"<Vacancy: {self.title}>"
