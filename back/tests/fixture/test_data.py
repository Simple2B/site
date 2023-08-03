from typing import Generator

import pytest
from pydantic import BaseModel


from app import schema as s
from app.config import Settings, get_settings
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


class SubImages(BaseModel):
    url: int


class TestCase(BaseModel):
    title: str
    sub_title: str
    description: str
    role: str
    project_link: str


class CaseImage(BaseModel):
    case_id: int
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


@pytest.fixture
def test_data() -> Generator[TestData, None, None]:
    yield TestData.parse_file("tests/test_data.json")


@pytest.fixture
def settings() -> Settings:
    return get_settings()
