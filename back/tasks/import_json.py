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
        candidate_answers = db.query(model.CandidateAnswer)
        candidate_answers.delete()

        variant_answers_data = db.query(model.VariantAnswer)
        variant_answers_data.delete()

        db.commit()
        log(log.INFO, "TASK: import_json: variant answers data cleared")

        questions_data.delete()

        db.commit()
        log(log.INFO, "TASK: import_json: questions data cleared")

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    load_dotenv(os.path.join(os.path.dirname(BASE_DIR), ".env"))

    questions_list = []
    with open("data/questions.json") as json_file:
        file_contents = json_file.read()
        questions_list = json.loads(file_contents)

        log(log.INFO, f"TASK: import_json: new questions {questions_list}")

        # write questions and variant_answer to db
        for question in questions_list:
            new_question: model.Question = model.Question(
                text=question["text"],
                correct_answer_mark=question["correct_answer_mark"],
            )
            db.add(new_question)
            db.commit()
            db.refresh(new_question)

            log(log.INFO, f"TASK: import_json: question created {new_question.id}")

            for answer in question["answers"]:
                variant_answer: model.VariantAnswer = model.VariantAnswer(
                    question_id=new_question.id,
                    text=answer["text"],
                    answer_mark=answer["answer_mark"],
                )
                db.add(variant_answer)
                db.commit()
                db.refresh(variant_answer)

            log(log.INFO, "TASK: import_json: question variant of answers created")

    print("Finished")
