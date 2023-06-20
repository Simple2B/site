from sqlalchemy.orm import Session

from tests.fixture import TestData

import app.model as m


def create_test_superuser(db, test_data):
    db.add(
        m.SuperUser(
            email=test_data.test_superuser.email,
            username=test_data.test_superuser.email,
            password=test_data.test_superuser.password,
        )
    )
    db.commit()


def create_questions(db, test_data):

    for question in test_data.questions:

        new_question = m.Question(
            text=question.text,
            correct_answer_mark=question.correct_answer_mark,
        )
        db.add(new_question)
        db.commit()
        db.refresh(new_question)

        for variant in question.answers:
            db.add(m.VariantAnswer(
                question_id=new_question.id,
                text=variant.text,
                answer_mark=variant.answer_mark
            ))
        db.commit()

def fill_db_by_test_data(db: Session, test_data: TestData):
    print("Filling up db with fake data")
    create_test_superuser(db, test_data)
    create_questions(db, test_data)

