from sqlalchemy import Column, Integer, String, ForeignKey

from app.database import Base


class Property(Base):
    __tablename__ = "properties"
    id = Column(Integer, primary_key=True)
    vacancy_id = Column(Integer, ForeignKey("vacancies.id"))
    title = Column(String(64), nullable=False)
    value = Column(String(128), nullable=False)

    def __repr__(self):
        return f"<{self.id}: {self.title}>"
