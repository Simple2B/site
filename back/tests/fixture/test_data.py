from typing import Generator

import pytest
from pydantic import BaseModel


from app import schema as s
from app.config import Settings, get_settings
from app.schema.user import BaseUser


class SuperUser(BaseUser):
    password: str


class TestAnswer(BaseModel):
    __test__ = False
    text: str
    answer_mark: int


class TestQuestions(BaseModel):
    __test__ = False
    text: str
    correct_answer_mark: int
    answers: list[TestAnswer]


class SubImages(BaseModel):
    url: int


class TestCase(BaseModel):
    __test__ = False
    title: str
    sub_title: str
    description: str
    role: str
    project_link: str


class CaseImage(BaseModel):
    __test__ = False
    type_of_image: str
    url: str
    origin_file_name: str


class TestData(BaseModel):
    __test__ = False

    test_candidate: s.IsAuthenticated

    test_superuser: SuperUser
    questions: list[TestQuestions]

    case: TestCase
    stacks: list[str]
    screenshots: list[SubImages]
    case_images: CaseImage


def get_test_data() -> TestData:
    return TestData.parse_file("tests/test_data.json")


@pytest.fixture
def test_data() -> Generator[TestData, None, None]:
    yield get_test_data()


@pytest.fixture
def settings() -> Settings:
    return get_settings()
