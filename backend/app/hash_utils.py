from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def make_hash(password: str):
    return pwd_context.hash(password)


def hash_verify(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
