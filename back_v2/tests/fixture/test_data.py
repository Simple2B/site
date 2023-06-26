from typing import Generator

import pytest
from pydantic import BaseModel


from app import schema as s
from app.schema.user import BaseUser

class SuperUser(BaseUser):
    password: str

class TestAnswer(BaseModel):
    text: str
    answer_mark: int

class TestQuestions(BaseModel):
    text: str
    correct_answer_mark: int
    answers: list[TestAnswer]


class TestData(BaseModel):
    __test__ = False

    test_candidate: s.IsAuthenticated

    test_superuser: SuperUser
    questions: list[TestQuestions]



@pytest.fixture
def test_data() -> Generator[TestData, None, None]:
    yield TestData.parse_file("tests/test_data.json")
