from pydantic import BaseSettings, EmailStr


class Settings(BaseSettings):
    SERVER_NAME: str = "Simple2B"
    SAMPLE_ENV_VAR: str = "<None>"
    JWT_SECRET: str = "<None>"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    DATABASE_URL: str = ""
    DEV_DATABASE_URL: str = "sqlite:///./test.db"
    ADMIN_USER: str = "admin"
    ADMIN_PASS: str = "admin"
    ADMIN_EMAIL: EmailStr = "admin@admin.com"

    class Config:
        env_file = ".env"


settings = Settings()
