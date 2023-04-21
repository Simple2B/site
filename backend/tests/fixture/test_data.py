from typing import Generator

import pytest
from pydantic import BaseModel


class TestUser(BaseModel):
    __test__ = False
    uuid: str | None
    github_openid_key: str | None
    first_name: str | None
    last_name: str | None
    username: str | None
    email: str
    image_url: str | None
    password_hash: str


class TestData(BaseModel):
    __test__ = False

    test_users: list[TestUser]


@pytest.fixture
def test_data() -> Generator[TestData, None, None]:
    yield TestData.parse_file("tests/test_data.json")
