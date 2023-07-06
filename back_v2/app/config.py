from functools import lru_cache
import os
from pydantic import BaseSettings

project_env_file = os.path.abspath("project.env")
test_env_file = os.path.abspath("tests/test.env")


class Settings(BaseSettings):
    SAMPLE_ENV_VAR: str
    JWT_SECRET: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    DB_URI: str
    DATABASE_URI: str
    TOTAL_QUESTIONS_NUMBER: int
    DEV_DATABASE_URI: str
    ADMIN_USER: str
    ADMIN_PASS: str
    ADMIN_EMAIL: str

    # quiz
    INITIAL_QUIZ_SCORE: int
    FIFTY_PERSENT_TOTAL_SCORE: float
    NINETY_PERSENT_TOTAL_SCORE: float

    # mail
    INITIAL_EMAIL_TO: str
    CC_EMAIL_TO: str
    BCC_EMAIL_TO: str
    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_FROM: str
    MAIL_PORT: int
    MAIL_SERVER: str
    MAIL_FROM_NAME: str

    # telegram
    TELEGRAM_TOKEN: str
    TELEGRAM_CHAT_ID_CLIENTS: int
    TELEGRAM_CHAT_ID_CANDIDATE: int

    # for test
    TEST_SEND_EMAIL: bool
    TEST_TARGET_EMAIL: str

    class Config:
        env_file = (
            project_env_file,
            test_env_file,
            ".env",
        )

    def __hash__(self):
        return hash((type(self),) + tuple(self.__dict__.values()))


@lru_cache
def get_settings() -> Settings:
    return Settings()
