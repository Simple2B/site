# flake8: noqa E501
from app.database import SessionLocal
from typing import Union
from app import model as m, schema as s


class TestData:
    @staticmethod
    def create_one_to_many(
        model: Union[m.Vacancy, m.Offer, m.Skill, m.VariantAnswer],
        db: SessionLocal,
        **kwargs
    ) -> None:
        new_model = model(**kwargs)
        db.add(new_model)
        db.commit()
        db.refresh(new_model)

    @classmethod
    def create_model_schema(cls, schema: Union[s.CreateContactUs, s.IsAuthenticated]):
        cls_attrs = list(cls.__dict__.items())
        cls_attrs = {
            attr[0].lower(): attr[1] for attr in list(cls_attrs) if attr[0][0] != "_"
        }
        model_schema = schema(**cls_attrs)

        return model_schema


class CandidateData(TestData):
    USERNAME = "michael"
    EMAIL = "test@test.ku"
    GIT_HUB_ID = 12345
    IMAGE = "test.jpg"

    # @classmethod
    # def get_candidate_data(cls) -> m.User:
    #     return { "name": cls.NAME, "email": cls.EMAIL. 'git_'  }


class VacancyData(TestData):
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
    @property
    def SLUG(cls):
        return cls.TITTLE.lower().replace(" ", "-")

    @classmethod
    def create_vacancy(cls, db: SessionLocal) -> m.Vacancy:
        new_vacancy = m.Vacancy(
            title=cls.TITTLE,
            overview=cls.OVERVIEW,
            about=cls.ABOUT,
            type=m.VacancyType.developer,
            slug=cls.SLUG,
        )
        db.add(new_vacancy)
        db.commit()
        db.refresh(new_vacancy)

        vacancy_id = new_vacancy.id

        for offer in cls.OFFERS:
            cls.create_one_to_many(
                model=m.Offer, db=db, vacancy_id=vacancy_id, name=offer
            )

        for skills in cls.SKILLS:
            cls.create_one_to_many(
                model=m.Skill, db=db, vacancy_id=vacancy_id, name=skills
            )

        for property in cls.PROPERTIES:
            cls.create_one_to_many(
                model=m.Property,
                db=db,
                vacancy_id=vacancy_id,
                title=property[0],
                value=property[1],
            )

        # cls.create_questions(vacancy_id=new_vacancy.id, db=db)

        return new_vacancy


class QuestionData(TestData):
    QUESTIONS = [
        {
            "text": "Python Language. What is result of operation: ```5 & 3``` ?",
            "correct_answer_mark": 3,
            "answers": [
                {"text": "True", "answer_mark": 1},
                {"text": "8", "answer_mark": 2},
                {"text": "1", "answer_mark": 3},
                {"text": "53", "answer_mark": 4},
            ],
        },
        {
            "text": "Python Language. What is not built-in python type ?",
            "correct_answer_mark": 3,
            "answers": [
                {"text": "bool", "answer_mark": 1},
                {"text": "int", "answer_mark": 2},
                {"text": "char", "answer_mark": 3},
                {"text": "tuple", "answer_mark": 4},
            ],
        },
        {
            "text": "Please choice non-script programming language",
            "correct_answer_mark": 1,
            "answers": [
                {"text": "C++", "answer_mark": 1},
                {"text": "JavaScript", "answer_mark": 2},
                {"text": "Python", "answer_mark": 3},
                {"text": "Lua", "answer_mark": 4},
            ],
        },
        {
            "text": "What is answer_mark definition for 32 bit platform ?",
            "correct_answer_mark": 4,
            "answers": [
                {"text": "Maximum file size is 2 GB", "answer_mark": 1},
                {"text": "Maximum file size is 4 GB", "answer_mark": 2},
                {"text": "Maximum memory address is 2 GB", "answer_mark": 3},
                {"text": "Maximum memory address if 4 GB", "answer_mark": 4},
            ],
        },
        {
            "text": "Which of programming language has not the garbage collector?",
            "correct_answer_mark": 1,
            "answers": [
                {"text": "C++", "answer_mark": 1},
                {"text": "Python", "answer_mark": 2},
                {"text": "Java", "answer_mark": 3},
                {"text": "JavaScript", "answer_mark": 4},
            ],
        },
    ]

    @classmethod
    def create_questions(cls, db: SessionLocal):
        for question in cls.QUESTIONS:
            new_question = m.Question(
                text=question["text"],
                correct_answer_mark=question["correct_answer_mark"],
                candidate_type=m.VacancyType.developer,
            )
            db.add(new_question)
            db.commit()
            db.refresh(new_question)

            for answer in question["answers"]:
                cls.create_one_to_many(
                    model=m.VariantAnswer,
                    db=db,
                    question_id=new_question.id,
                    text=answer["text"],
                    answer_mark=answer["answer_mark"],
                )


class ContactUsData(TestData):
    NAME = "Test User"
    EMAIL = "test@test.com"
    MESSAGE = "Message from test user"
    PHONE = "380671111121"
