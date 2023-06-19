import os
import json
from dotenv import load_dotenv
from invoke import task
from app.logger import log
from app import model


@task
def export_json(_):
    """Get questions date from db"""
    from app.database import SessionLocal

    db = SessionLocal()
    questions_data = db.query(model.Question).all()
    log(log.INFO, f"TASK: import_json: old data {questions_data}")

    data = {"questions": []}

    if len(questions_data) > 0:
        for q_data in questions_data:
            variant_answer_data = (
                db.query(model.VariantAnswer)
                .filter(model.VariantAnswer.question_id == q_data.id)
                .all()
            )
            data["questions"].append(
                {
                    "question": q_data.text,
                    "answers": [answer.text for answer in variant_answer_data],
                    "correct_answer": q_data.correct_answer,
                }
            )

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    load_dotenv(os.path.join(os.path.dirname(BASE_DIR), ".env"))

    export_json_file = f"{BASE_DIR}/export_questions.json"

    # If file exists, it delete
    if os.path.isfile(export_json_file):
        os.remove(export_json_file)
        log(log.INFO, "TASK: export_json: file export_json exists, this file deleted")

    if len(data["questions"]) > 0:
        with open(f"{BASE_DIR}/export_questions.json", "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
            log(log.INFO, f"TASK: export_json: data exported {data}")
            return

    log(log.INFO, "TASK: export_json: date of questions is empty")
