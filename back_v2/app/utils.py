import uuid

from app import model as m
from app.model.candidate_answers import CandidateAnswer


def generate_uuid() -> str:
    return str(uuid.uuid4())


def format_file_with_content(user_answers):
    """Creates a file and adds content to it"""

    new_line = "\n"
    tab = "\t"
    carriage_return = "\r"

    with open("candidate_quiz.txt", "w") as candidate_quiz:
        for i, question in enumerate(user_answers):
            q = question.question
            candidate_quiz.write(f"{i + 1}. {q.text}{new_line}")

            for index, answer in enumerate(q.variants):
                candidate_quiz.write(f"{tab}{index + 1}) {answer.text}{new_line}")

            candidate_quiz.write(
                f"{tab}Correct answer: {q.correct_answer_mark}) {q.correct_answer.text}{new_line}"
            )
            candidate_quiz.write(
                f"{tab}Candidate's answer: {question.answer.answer_mark}) {question.answer.text}{new_line}"
            )
            candidate_quiz.write(
                f"{tab}Result: {'Passed' if question.is_right else 'Failed'}{new_line}"
            )
            candidate_quiz.write(carriage_return)
