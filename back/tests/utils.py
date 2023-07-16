import random

from sqlalchemy.orm import Session

from tests.fixture import TestData

import app.model as m


def create_test_superuser_and_candidate(
    db, test_data
) -> tuple[m.SuperUser, m.Candidate]:
    superuser = m.SuperUser(
        email=test_data.test_superuser.email,
        username=test_data.test_superuser.email,
        password=test_data.test_superuser.password,
    )

    candidate = m.Candidate(
        git_hub_id=test_data.test_candidate.git_hub_id,
        email=test_data.test_candidate.email,
        username=test_data.test_candidate.username,
    )
    db.add(superuser)
    db.add(candidate)
    db.commit()
    db.refresh(superuser)
    db.refresh(candidate)
    return superuser, candidate


def create_questions(db, test_data) -> dict[int, list[int]]:
    questions = dict()
    for question in test_data.questions:
        new_question = m.Question(
            text=question.text,
            correct_answer_mark=question.correct_answer_mark,
        )
        db.add(new_question)
        db.commit()
        db.refresh(new_question)

        variants_ids = []
        for variant in question.answers:
            mew_variant = m.VariantAnswer(
                question_id=new_question.id,
                text=variant.text,
                answer_mark=variant.answer_mark,
            )
            db.add(mew_variant)
            db.commit()
            db.refresh(mew_variant)
            variants_ids.append(mew_variant.id)
        db.commit()
        db.refresh(new_question)
        questions.update({new_question.id: variants_ids})

    return questions


def set_candidate_answers(db, candidate, question: dict[int, list[int]]):
    for index in range(3):
        random_variant = random.choice(question[index + 1])
        db.add(m.CandidateAnswer(user_id=candidate.id, answer_id=random_variant))
    candidate.quiz_score = 3
    db.commit()
    db.refresh(candidate)


def fill_db_by_test_data(db: Session, test_data: TestData):
    print("Filling up db with fake data")
    _, candidate = create_test_superuser_and_candidate(db, test_data)
    question_ids = create_questions(db, test_data)
    set_candidate_answers(db, candidate, question_ids)