import enum


class UserRole(enum.Enum):
    candidate = "candidate"
    worker = "worker"
    admin = "admin"


class VacancyType(enum.Enum):
    developer = "developer"
    seller = "seller"
