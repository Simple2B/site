from functools import lru_cache
from pydantic import BaseSettings, EmailStr
from pydantic.types import OptionalInt


class Settings(BaseSettings):
    SAMPLE_ENV_VAR: str = "<None>"
    JWT_SECRET: str = "<None>"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    DB_URI: str = ""  # use for test
    DATABASE_URI: str = ""
    COUNT_OF_QUESTION: int = 15
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

    class Config:
        env_file = ".env"

    def __hash__(self):
        return hash((type(self),) + tuple(self.__dict__.values()))


@lru_cache
def get_settings() -> Settings:
    return Settings()
