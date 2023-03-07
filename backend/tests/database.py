from app.database import SessionLocal
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
            offer_id = cls.create_offer(name=offer, db=db)
            cls.create_vacancy_offer(
                vacancy_id=new_vacancy.id, offer_id=offer_id, db=db
            )

        return new_vacancy

    @staticmethod
    def create_offer(name: str, db: SessionLocal) -> int:
        new_offer = m.Offer(name=name)
        db.add(new_offer)
        db.commit()
        db.refresh(new_offer)

        return new_offer.id

    @staticmethod
    def create_vacancy_offer(vacancy_id: int, offer_id: int, db: SessionLocal) -> None:
        new_vacancy_offer = m.VacancyOffer(vacancy_id=vacancy_id, offer_id=offer_id)
        db.add(new_vacancy_offer)
        db.commit()
        db.refresh(new_vacancy_offer)
