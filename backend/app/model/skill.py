from sqlalchemy import Column, Integer, String, ForeignKey

from app.database import Base


class Skill(Base):
    __tablename__ = "skills"
    id = Column(Integer, primary_key=True)
    vacancy_id = Column(Integer, ForeignKey("vacancies.id"))
    name = Column(String(512), nullable=False)

    def __repr__(self):
        return f"<{self.id}: {self.name}>"
