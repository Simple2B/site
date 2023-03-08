from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship


from app.database import Base


class VacancySkill(Base):
    __tablename__ = "vacancy_skills"
    id = Column(Integer, primary_key=True)
    vacancy_id = Column(Integer, ForeignKey("vacancies.id"))
    skill_id = Column(Integer, ForeignKey("skills.id"))

    skill = relationship("Skill", viewonly=True)

    def __repr__(self):
        return f"<VacancySkills: {self.id}>"
