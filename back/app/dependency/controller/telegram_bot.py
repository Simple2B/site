from functools import lru_cache
from fastapi import Depends
from app.controller import TelegramBot
from app.config import Settings, get_settings


@lru_cache
def get_telegram_bot(settings: Settings = Depends(get_settings)) -> TelegramBot:
    return TelegramBot(settings)
