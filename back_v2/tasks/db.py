from sqlalchemy.orm import Session
from invoke import task
from app.config import Settings, get_settings
from app import model as m

NUM_TEST_USERS = 10


settings: Settings = get_settings()


# https://www.interviewbit.com/react-mcq/
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
            "text": "What is definition for 32 bit platform ?",
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
        {
            "text": "In react, the key should be?",
            "correct_answer_mark": 1,
            "answers": [
                {"text": "Unique among his siblings only", "answer_mark": 1},
                {"text": "unique in the DOM", "answer_mark": 2},
                {"text": "Does not requires to be unique", "answer_mark": 3},
                {"text": "All of the above", "answer_mark": 4},
            ],
        },
        {
            "text": "How many elements can a valid react component return?",
            "correct_answer_mark": 1,
            "answers": [
                {"text": "1", "answer_mark": 1},
                {"text": "2", "answer_mark": 2},
                {"text": "3", "answer_mark": 3},
                {"text": "4", "answer_mark": 4},
            ],
        },
        {
            "text": "Which of the following are two ways to handle data in react?",
            "correct_answer_mark": 2,
            "answers": [
                {"text": "Services and components", "answer_mark": 1},
                {"text": "State and props", "answer_mark": 2},
                {"text": "State and services", "answer_mark": 3},
                {"text": "State and component", "answer_mark": 4},
            ],
        },
        {
            "text": "Choose the method which is not a part of ReactDOM?",
            "correct_answer_mark": 3,
            "answers": [
                {"text": "ReactDOM.createPortal()", "answer_mark": 1},
                {"text": "ReactDOM.hydrate()", "answer_mark": 2},
                {"text": "ReactDOM.destroy()", "answer_mark": 3},
                {"text": "ReactDOM.findDOMNode()", "answer_mark": 4},
            ],
        },
        {
            "text": "Which of the following terms commonly described react applications?",
            "correct_answer_mark": 3,
            "answers": [
                {"text": "Imperative", "answer_mark": 1},
                {"text": "Integrated", "answer_mark": 2},
                {"text": "Declarative", "answer_mark": 3},
                {"text": "None of the above", "answer_mark": 4},
            ],
        },
        {
            "text": "Which type of Programming does Python support?",
            "correct_answer_mark": 4,
            "answers": [
                {"text": "Object-oriented programming", "answer_mark": 1},
                {"text": "Structured programming", "answer_mark": 2},
                {"text": "Functional programming", "answer_mark": 3},
                {"text": "All of the mentioned", "answer_mark": 4},
            ],
        },
        {
            "text": "What will be the value of the expression: ```4 + 3 % 5``` ? ",
            "correct_answer_mark": 4,
            "answers": [
                {"text": "7", "answer_mark": 1},
                {"text": "2", "answer_mark": 2},
                {"text": "4", "answer_mark": 3},
                {"text": "1", "answer_mark": 4},
            ],
        },
        {
            "text": "Which of the following is used to define a block of code in Python language?",
            "correct_answer_mark": 1,
            "answers": [
                {"text": "Indentation", "answer_mark": 1},
                {"text": "Key", "answer_mark": 2},
                {"text": "Brackets", "answer_mark": 3},
                {"text": "All of the above", "answer_mark": 4},
            ],
        },
        {
            "text": "Which of the following is not a core data type in Python programming?",
            "correct_answer_mark": 3,
            "answers": [
                {"text": "Tuples", "answer_mark": 1},
                {"text": "Lists", "answer_mark": 2},
                {"text": "Class", "answer_mark": 3},
                {"text": "Dictionary", "answer_mark": 4},
            ],
        },
        {
            "text": "Which of the following concepts is not a part of Python?",
            "correct_answer_mark": 1,
            "answers": [
                {"text": "Pointers", "answer_mark": 1},
                {"text": "Loops", "answer_mark": 2},
                {"text": "Dynamic Typing", "answer_mark": 3},
                {"text": "All of the above", "answer_mark": 4},
            ],
        },
        {
            "text": "Question: What does HTML stand for?",
            "correct_answer_mark": 1,
            "answers": [
                {"text": "Hyper Text Markup Language", "answer_mark": 1},
                {"text": "Hyperlinks and Text Markup Language", "answer_mark": 2},
                {"text": "Home Tool Markup Language", "answer_mark": 3},
                {"text": "Hyper Technology Markup Language", "answer_mark": 4},
            ],
        },
        {
            "text": "Which programming language is commonly used for developing Android applications?",
            "correct_answer_mark": 1,
            "answers": [
                {"text": "Java", "answer_mark": 1},
                {"text": "Python", "answer_mark": 2},
                {"text": "C#", "answer_mark": 3},
                {"text": "JavaScript", "answer_mark": 4},
            ],
        },
        {
            "text": "What is the purpose of CSS in web development?",
            "correct_answer_mark": 4,
            "answers": [
                {"text": "It is used for server-side programming", "answer_mark": 1},
                {"text": "It is used to create dynamic web content", "answer_mark": 2},
                {"text": "It is used for database management", "answer_mark": 3},
                {
                    "text": "It is used to style and format the appearance of web pages",
                    "answer_mark": 4,
                },
            ],
        },
        {
            "text": "Which framework is widely used for building responsive and mobile-first websites?",
            "correct_answer_mark": 2,
            "answers": [
                {"text": "Django", "answer_mark": 1},
                {"text": "Bootstrap", "answer_mark": 2},
                {"text": "Laravel", "answer_mark": 3},
                {"text": "Angular", "answer_mark": 4},
            ],
        },
        {
            "text": "What does API stand for in the context of web development?",
            "correct_answer_mark": 1,
            "answers": [
                {"text": "Application Program Interface", "answer_mark": 1},
                {"text": "Advanced Programming Interface", "answer_mark": 2},
                {"text": "Automatic Programming Interface", "answer_mark": 3},
                {"text": "All-Purpose Interface", "answer_mark": 4},
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
