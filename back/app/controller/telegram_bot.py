from datetime import date, datetime
from time import sleep
import telebot

from app.config import Settings
from app.logger import log
from .markdown import md_quote


class TelegramBot:
    def __init__(self, settings: Settings = None):
        if not settings:
            from app.config import get_settings

            settings = get_settings()

        super().__init__()
        self.WEATHER_SLEEP_TIME = settings.WEATHER_SLEEP_TIME
        self.config = settings
        self.bot = telebot.TeleBot(settings.TELEGRAM_TOKEN)
        self.chat_id_candidates = settings.TELEGRAM_CHAT_ID_CANDIDATE
        self.chat_id_clients = settings.TELEGRAM_CHAT_ID_CLIENTS
        self.chat_id_info = settings.TELEGRAM_CHAT_ID_INFO

    def _send(self, chat_id, user_type, message, file, file_name):
        try:
            if file_name:
                self.bot.send_document(
                    chat_id,
                    file.read(),
                    caption=message,
                    visible_file_name=file_name,
                )
            else:
                self.bot.send_message(chat_id, message)

            log(log.INFO, "Message sent to Telegram successfully!")

        except telebot.apihelper.ApiException as e:
            log(
                log.ERROR,
                f"An error occurred while sending a message from the {user_type} to Telegram - %s",
                e,
            )
            return False
        return True

    def send_to_group_clients(self, message, file, file_name=None):
        return self._send(self.chat_id_clients, "Client", message, file, file_name)

    def send_to_group_candidates(self, message, file, file_name=None):
        return self._send(
            self.chat_id_candidates, "Candidate", message, file, file_name
        )

    def send_to_group_info(self, message):
        return self.bot.send_message(
            self.chat_id_info,
            message,
            parse_mode="MarkdownV2",
        )

    def _format_greeting_message(self) -> str:
        now = datetime.now()
        today = date.today().strftime("%d %B %Y, %A")
        if now.hour >= 22:
            message = (
                f"\U0001F319 *Good night\\!* _Доброї ночі\\!_\n_Сьогодні_ *{today}*\n"
            )
        elif now.hour >= 18:
            message = f"\U0001F307 *Good evening\\!* _Добрий вечір\\!_\n_Сьогодні_ *{today}*\n"
        elif now.hour >= 12:
            message = f"\U0001F304 *Good afternoon\\!* _Добрий день\\!_\n_Сьогодні_ *{today}*\n"
        elif now.hour >= 11:
            message = (
                f"\U0001F304 *Good morning\\!* _Добрий день\\!_\n_Сьогодні_ *{today}*\n"
            )
        elif now.hour >= 6:
            message = f"\U0001F305 *Good morning\\!* _Добрий ранок\\!_\n_Сьогодні_ *{today}*\n"
        else:
            message = f"\U0001F319 *Hey\\!* Привіт\\!_\n_Сьогодні_ *{today}*\n"
        return message

    def _format_weather_message(self) -> str:
        from .weather import get_weather_for_city, weather_to_markdown

        message = ""
        for place in self.config.WEATHER_PLACES:
            weather = get_weather_for_city(*place)

            if weather:
                message += weather_to_markdown(weather)
            sleep(self.WEATHER_SLEEP_TIME)
            log(log.INFO, "Sleep after got weather info for [%s]", place)
        return message

    def _format_calendar_message(self) -> str:
        from .odoo.client import OdooClient

        odoo = OdooClient()
        message = "\U0001F4C5 *Vacations:*"
        today = date.today()
        for event in odoo.calendar_events(min_stop=today, max_start=today):
            message += f"\n*{md_quote(event.name)}*"
            message += f" _{md_quote(event.start.strftime('%d.%m'))}\\-{md_quote(event.stop.strftime('%d.%m'))}_"
        return message

    def hello(self):
        # Greeting message
        message = self._format_greeting_message()

        # Weather in our cities
        message += self._format_weather_message()

        # Calendar events
        message += self._format_calendar_message()

        self.send_to_group_info(message)
