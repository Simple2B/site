from datetime import datetime
import xmlrpc.client

from app.config import get_settings
from app.controller.odoo import schema as s

settings = get_settings()


class OdooClient:
    def __init__(self):
        self.url = settings.ODOO_URL
        self.db = settings.ODOO_DB
        self.uid = settings.ODOO_UID
        self.password = settings.ODOO_PASSWORD
        self.__o_common = None
        self.__o_models = None

    @property
    def __common(self):
        if not self.__o_common:
            self.__o_common = xmlrpc.client.ServerProxy(f"{self.url}/xmlrpc/2/common")
        return self.__o_common

    @property
    def __models(self):
        if not self.__o_models:
            self.__o_models = xmlrpc.client.ServerProxy(f"{self.url}/xmlrpc/2/object")
        return self.__o_models

    @property
    def version(self) -> s.Version:
        return s.Version.model_validate(self.__common.version())

    def update_uid(self, username: str, password: str):
        self.uid = self.common.authenticate(self.db, username, password, {})

    def models(self, model: str, call: str, conditions: list[list[str]], values: dict):
        models = self.__models
        return models.execute_kw(
            self.db, self.uid, self.password, model, call, conditions, values
        )

    def calendar_events(
        self,
        min_start: datetime | None = None,
        max_start: datetime | None = None,
        min_stop: datetime | None = None,
        max_stop: datetime | None = None,
    ) -> list[s.CalendarEvent]:
        conditions = []
        if min_start:
            conditions.append(["start", ">=", min_start.strftime("%Y-%m-%d %H:%M:%S")])
        if max_start:
            conditions.append(["start", "<=", max_start.strftime("%Y-%m-%d %H:%M:%S")])
        if min_stop:
            conditions.append(["stop", ">=", min_stop.strftime("%Y-%m-%d %H:%M:%S")])
        if max_stop:
            conditions.append(["stop", "<=", max_stop.strftime("%Y-%m-%d %H:%M:%S")])
        result = self.models(
            "calendar.event",
            "search_read",
            [conditions],
            {
                "fields": [
                    "name",
                    "start",
                    "stop",
                    "duration",
                    "allday",
                    "description",
                    "location",
                    "recurrency",
                    "follow_recurrence",
                    "show_as",
                    "privacy",
                    "res_id",
                    "res_model_id",
                    "res_model",
                    "user_id",
                    "active",
                    "create_uid",
                    "create_date",
                    "write_uid",
                    "write_date",
                ]
            },
        )
        return [s.CalendarEvent.model_validate(v) for v in result]


# URL = 'https://odoo.simple2b.net'
# models = xmlrpc.client.ServerProxy('{}/xmlrpc/2/object'.format(URL))

# db = 'simple2b'
# uid = 7
# password = '18833f80a264d074ee251d5bdcd9d29c4ffba675'

#   models.execute_kw(db, uid, password, 'calendar.event', 'search_read', [[["start", ">=", "2023-09-05 00:00:00"]]], {"fields": [
#             "display_name",
#             "start",
#             "duration"
#           ]})
