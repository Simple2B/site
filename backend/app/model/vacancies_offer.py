from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship


from app.database import Base


class VacancyOffer(Base):
    __tablename__ = "vacancy_offers"
    id = Column(Integer, primary_key=True)
    vacancy_id = Column(Integer, ForeignKey("vacancies.id"))
    offer_id = Column(Integer, ForeignKey("offers.id"))

    offer = relationship("Offer", viewonly=True)

    def __repr__(self):
        return f"<VacancyOffer: {self.id}>"
