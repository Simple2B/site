from sqlalchemy.orm import Session
from invoke import task
from app.config import Settings, get_settings
from app import model as m

NUM_TEST_USERS = 10


settings: Settings = get_settings()


class QuestionData:
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
    def create_questions(cls, db):
        for question in cls.QUESTIONS:
            new_question = m.Question(
                text=question["text"],
                correct_answer_mark=question["correct_answer_mark"],
            )
            db.add(new_question)
            db.commit()
            db.refresh(new_question)

            for answer in question["answers"]:
                db.add(
                    m.VariantAnswer(
                        question_id=new_question.id,
                        text=answer["text"],
                        answer_mark=answer["answer_mark"],
                    ),
                )
            db.commit()


@task
def init_db(_):
    """Initialization database

    Args:
        --test-data (bool, optional): wether fill database by test data. Defaults to False.
    """
    from app.database import SessionLocal

    db = SessionLocal()
    # add admin user
    admin: m.SuperUser = m.SuperUser(
        username=settings.ADMIN_USER,
        password=settings.ADMIN_PASS,
        email=settings.ADMIN_EMAIL,
    )
    db.add(admin)
    db.commit()


@task
def add_question(_):
    """Add fake questions"""
    from app.database import SessionLocal

    db = SessionLocal()

    QuestionData.create_questions(db)
    print("Finished")
