import ast
import uuid
import app.common.models as m


def generate_uuid() -> str:
    return str(uuid.uuid4())


def create_quiz_file_content(user_answers: list[m.CandidateAnswer]) -> str:
    """Creates quiz file content"""

    new_line = "\n"
    tab = "\t"
    carriage_return = "\r"

    file_content = ""

    for i, question in enumerate(user_answers):
        q: m.Question = question.question
        file_content += f"{i + 1}. {q.text}{new_line}"

        for index, answer in enumerate(q.variants):
            file_content += f"{tab}{index + 1}) {answer.text}{new_line}"

        file_content += f"{tab}Correct answer: {q.correct_answer_mark}) {q.correct_answer.text}{new_line}"
        file_content += f"{tab}Candidate's answer: {question.answer.answer_mark}) {question.answer.text}{new_line}"
        file_content += (
            f"{tab}Result: {'Passed' if question.is_right else 'Failed'}{new_line}"
        )
        file_content += carriage_return

    return file_content


def string_converter(string: str):
    """Converts string to valid type"""

    string_to_list = ast.literal_eval(string) if string else []

    return string_to_list
