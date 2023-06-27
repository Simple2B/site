from functools import lru_cache
from pydantic import BaseSettings, EmailStr


class Settings(BaseSettings):
    SAMPLE_ENV_VAR: str = "<None>"
    JWT_SECRET: str = "<None>"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    DB_URI: str = "" # use for test
    DATABASE_URI: str = ""
    COUNT_OF_QUESTION: int = 15
    DEV_DATABASE_URI: str = ""
    ADMIN_USER: str = "admin"
    ADMIN_PASS: str = "admin"
    ADMIN_EMAIL: EmailStr = "admin@admin.com"


    MAIL_USERNAME=""
    MAIL_PASSWORD=""
    MAIL_FROM=""
    MAIL_PORT=""
    MAIL_SERVER=""
    MAIL_FROM_NAME=""

    TEST_SEND_EMAIL: bool = False
    TEST_TARGET_EMAIL: str | None

    def __hash__(self):  # make hashable BaseModel subclass
        return hash((type(self),) + tuple(self.__dict__.values()))

    class Config:
        env_file = ".env"


@lru_cache
def get_settings() -> Settings:
    return Settings()
