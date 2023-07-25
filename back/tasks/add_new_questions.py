import json
from invoke import task
from app.common import models as m


class QuestionData:
    quiz_questions = []

    with open("data/questions.json") as json_file:
        file_contents = json_file.read()
        quiz_questions = json.loads(file_contents)

    @classmethod
    def create_questions(cls, db):
        count = 0

        data = db.query(m.Question).all()
        old = []

        for q in data:
            old.append(q.text)

        for question in cls.quiz_questions:
            if question["text"] not in old:
                count += 1

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

        print(f"{count} questions have been added")


@task
def add_new_question(_):
    """Add new questions to db without deleting old ones"""
    from app.database import SessionLocal

    db = SessionLocal()

    QuestionData.create_questions(db)
    print("Finished")
