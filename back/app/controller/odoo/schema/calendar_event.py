from datetime import datetime
from pydantic import BaseModel, RootModel


class CalendarEvent(BaseModel):
    id: int
    name: str
    start: datetime
    stop: datetime
    duration: float
    allday: bool
    description: bool
    location: bool
    # cSpell: ignore recurrency
    recurrency: bool
    follow_recurrence: bool
    show_as: str
    privacy: str
    res_id: int
    res_model_id: tuple[int, str]
    res_model: str
    user_id: bool
    active: bool
    create_uid: tuple[int, str]
    create_date: datetime
    write_uid: tuple[int, str]
    write_date: datetime


CalendarEventList = RootModel(list[CalendarEvent])
