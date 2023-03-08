from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship


from app.database import Base


class VacancyProperty(Base):
    __tablename__ = "vacancy_properties"
    id = Column(Integer, primary_key=True)
    vacancy_id = Column(Integer, ForeignKey("vacancies.id"))
    property_id = Column(Integer, ForeignKey("properties.id"))

    property = relationship("Property", viewonly=True)

    def __repr__(self):
        return f"<VacancyProperties: {self.id}>"
