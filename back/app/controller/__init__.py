# flake8: noqa F401
from .mail_client import MailClient
from .telegram_bot import TelegramBot
from .odoo import OdooClient
from .weather import (
    get_weather_for_city,
    weather_to_markdown,
    weather_to_unicode_symbol,
)
