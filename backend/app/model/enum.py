import enum


class UserRole(enum.Enum):
    candidate = "candidate"
    сolleague = "сolleague"
    admin = "admin"


class VacancyType(str, enum.Enum):
    developer = "developer"
    seller = "seller"
