import json
from invoke import task
from app import model as m


class QuestionData:
    quiz_questions = []

    with open("data/questions.json") as json_file:
        file_contents = json_file.read()
        quiz_questions = json.loads(file_contents)

    @classmethod
    def create_questions(cls, db):
        for question in cls.quiz_questions:
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
def add_question(_):
    """Add questions to db"""
    from app.database import SessionLocal

    db = SessionLocal()

    QuestionData.create_questions(db)
    print("Finished")
