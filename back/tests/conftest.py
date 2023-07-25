from dotenv import load_dotenv

load_dotenv("tests/test.env", override=True)


pytest_plugins = [
    "tests.fixture.db",
    "tests.fixture.client",
    "tests.fixture.test_data",
]
