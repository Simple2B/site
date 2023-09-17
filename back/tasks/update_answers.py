import json
from invoke import task
from app import model as m


class QuestionData:
    @classmethod
    def create_questions(cls, db, q):
        quiz_questions = []

        with open("data/questions.json") as json_file:
            file_contents = json_file.read()
            quiz_questions = json.loads(file_contents)

        file_question_answers = [x for x in quiz_questions if x["text"] == q][0][
            "answers"
        ]

        question_id = db.query(m.Question).filter(m.Question.text == q).first().id
        db_question_answers = (
            db.query(m.VariantAnswer)
            .filter(m.VariantAnswer.question_id == question_id)
            .order_by(m.VariantAnswer.answer_mark)
            .all()
        )

        for ans in db_question_answers:
            print(ans.text, ans.answer_mark)

        has_changes = False

        for file, data_base in zip(file_question_answers, db_question_answers):
            if file["text"] != data_base.text:
                has_changes = True

                print("Different found:")
                print("In file:", file["text"])
                print("In db:", data_base.text)

                data_base.text = file["text"]
                db.commit()

        if not has_changes:
            print("There are no changes")


@task
def update_answers(_, question: str):
    """update answer with arg: --question=str"""
    from app.database import SessionLocal

    db = SessionLocal()

    QuestionData.create_questions(db, question)
    print("Finished")
