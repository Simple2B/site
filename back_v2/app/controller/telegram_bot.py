import telebot

from app.config import Settings
from app.logger import log


class TelegramBot:
    def __init__(self, settings: Settings):
        super().__init__()
        self.bot = telebot.TeleBot(settings.TELEGRAM_TOKEN)
        self.chat_id_candidates = settings.TELEGRAM_CHAT_ID_CANDIDATE
        self.chat_id_clients = settings.TELEGRAM_CHAT_ID_CLIENTS

    def _send(self, chat_id, message, file):
        try:
            if file:
                self.bot.send_document(
                    chat_id,
                    file.file.read(),
                    caption=message,
                    visible_file_name=file.filename,
                )
            else:
                self.bot.send_message(chat_id, message)

        except telebot.apihelper.ApiException as e:
            log(log.ERROR, "Telegram send failed: %s", e)
            return False
        return True

    def send_to_group_clients(self, message, file):
        return self._send(self.chat_id_clients, message, file)

    def send_to_group_candidates(self, message, file):
        return self._send(self.chat_id_candidates, message, file)
