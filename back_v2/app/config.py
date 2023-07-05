from functools import lru_cache
from pydantic import BaseSettings


class Settings(BaseSettings):
    SAMPLE_ENV_VAR: str = "<None>"
    JWT_SECRET: str = "<None>"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    DB_URI: str = ""  # use for test
    DATABASE_URI: str = "sqlite:///./dev.db"
    COUNT_OF_QUESTION: int = 25
    DEV_DATABASE_URI: str = ""
    ADMIN_USER: str = "admin"
    ADMIN_PASS: str = "admin"
    ADMIN_EMAIL: str = "admin@admin.com"

    # mail
    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_FROM: str
    MAIL_PORT: int
    MAIL_SERVER: str
    MAIL_FROM_NAME: str

    # telegram (default for testing)
    # please mock telegram bot in tests
    TELEGRAM_TOKEN: str = ""
    TELEGRAM_CHAT_ID_CLIENTS: int = 0
    TELEGRAM_CHAT_ID_CANDIDATE: int = 0

    # for test
    TEST_SEND_EMAIL: bool = False
    TEST_TARGET_EMAIL: str = ""

    class Config:
        env_file = ".env"

    def __hash__(self):
        return hash((type(self),) + tuple(self.__dict__.values()))


@lru_cache
def get_settings() -> Settings:
    return Settings()
