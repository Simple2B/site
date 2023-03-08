# flake8: noqa E501
from app.database import SessionLocal
from typing import Union
from app import model as m


class TestClientData:
    NAME = "michael"
    EMAIL = "test@test.ku"
    PASSWORD = "secret"
    IMAGE = "test.jpg"


class TestVacancy:
    TITTLE = "Junior Full-stack Developer"
    OVERVIEW = "Hi candidate! We are an outsourcing startup company concentrated on web/mobile application development. We are looking for a React or React Native Junior developer (Full-Stack) to reinforce our team. Our main stack is Python (Django/Flask) on the back-end and TypeScript (React.js) on the front-end."
    ABOUT = "Simple2B is an IT company. Team of enthusiasts of Web/Mobile Application Development. Not only we are professionals in many ways. We love our work and deliver high-quality solutions. We aim to grow and achieve mutual success with our customers."

    OFFERS = [
        "Competitive salary",
        "Startup atmosphere (in a good sense) with the plain organization structure",
        "Knowledge sharing with experienced engineers, easily accessible CTO with vast experience ready to help",
        "Work remotely or in the office in Kyiv with flexible working hours",
    ]

    SKILLS = [
        "Knowledge of JavaScript, React or React Native, CSS & HTML frameworks. TypeScript is a plus",
        "Understanding of Redux",
        "Fundamentals in data structures and complex algorithms",
        "Understanding of React Hooks",
    ]

    PROPERTIES = [
        (
            "location",
            "Kyiv",
        ),
        (
            "schedule",
            "Full-time",
        ),
        (
            "office",
            "Office/remote",
        ),
    ]

    @classmethod
    def create_vacancy(cls, db: SessionLocal) -> m.Vacancy:
        new_vacancy = m.Vacancy(
            title=cls.TITTLE,
            overview=cls.OVERVIEW,
            about=cls.ABOUT,
            type=m.VacancyType.developer,
        )
        db.add(new_vacancy)
        db.commit()
        db.refresh(new_vacancy)

        for offer in cls.OFFERS:
            offer_id = cls.create_offer_or_skill(model=m.Offer, name=offer, db=db)
            cls.create_many_to_many(
                model=m.VacancyOffer,
                vacancy_id=new_vacancy.id,
                db=db,
                offer_id=offer_id,
            )

        for skills in cls.SKILLS:
            skill_id = cls.create_offer_or_skill(model=m.Skill, name=skills, db=db)
            cls.create_many_to_many(
                model=m.VacancySkill,
                vacancy_id=new_vacancy.id,
                db=db,
                skill_id=skill_id,
            )

        for property in cls.PROPERTIES:
            property_id = cls.create_property(
                title=property[0], value=property[1], db=db
            )
            cls.create_many_to_many(
                model=m.VacancyProperty,
                vacancy_id=new_vacancy.id,
                db=db,
                property_id=property_id,
            )

        return new_vacancy

    @staticmethod
    def create_offer_or_skill(
        model: Union[m.Offer, m.Skill], name: str, db: SessionLocal
    ) -> int:
        new_offer = model(name=name)
        db.add(new_offer)
        db.commit()
        db.refresh(new_offer)

        return new_offer.id

    @staticmethod
    def create_property(title: str, value: str, db: SessionLocal) -> int:
        new_property = m.Property(title=title, value=value)
        db.add(new_property)
        db.commit()
        db.refresh(new_property)

        return new_property.id

    @staticmethod
    def create_many_to_many(
        model: Union[m.VacancyOffer, m.VacancySkill, m.VacancyProperty],
        vacancy_id: int,
        db: SessionLocal,
        **kwargs
    ) -> None:
        new_vacancy_offer = model(vacancy_id=vacancy_id, **kwargs)
        db.add(new_vacancy_offer)
        db.commit()
        db.refresh(new_vacancy_offer)
