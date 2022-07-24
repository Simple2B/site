import os
import json
from dotenv import load_dotenv
from invoke import task
from app.logger import log
from app import model


@task
def import_json(_):
    """Clear the old questions date and fill the database with new data"""
    from app.database import SessionLocal

    db = SessionLocal()
    questions_data = db.query(model.Question)
    log(log.INFO, f"TASK: import_json: old data {questions_data}")

    if len(questions_data.all()) > 0:
        variant_answers_data = db.query(model.VariantAnswer)
        variant_answers_data.delete()
        db.commit()
        log(log.INFO, "TASK: import_json: variant answers data cleared")

        questions_data.delete()
        db.commit()
        log(log.INFO, "TASK: import_json: questions data cleared")

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    load_dotenv(os.path.join(os.path.dirname(BASE_DIR), ".env"))

    with open(f"{BASE_DIR}/import_questions.json") as file:
        questions_data = json.load(file)
        questions = questions_data["questions"]

        log(log.INFO, f"TASK: import_json: new questions {questions}")

        # write questions and variant_answer to db
        for data in questions:
            question: model.Question = model.Question(
                text=data["question"],
                correct_answer=data["correct_answer"],
            )
            db.add(question)
            db.commit()
            db.refresh(question)

            log(log.INFO, f"TASK: import_json: question created {question.id}")

            variant_answers = data["answers"]
            for answer in variant_answers:
                variant_answer: model.VariantAnswer = model.VariantAnswer(
                    question_id=question.id,
                    text=answer
                    # TODO: put level of answer, that is, give a point for the answer
                    # point=
                )
                db.add(variant_answer)
                db.commit()
                db.refresh(variant_answer)
            log(log.INFO, "TASK: import_json: question variant of answers created")
