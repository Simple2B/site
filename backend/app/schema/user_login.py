from pydantic import BaseModel, AnyHttpUrl


class UserLogin(BaseModel):
    user_id: str
    password: str


class UserGitHubLogin(BaseModel):
    """Scheme for validating user`s sign in via GitHub OAuth data"""

    username: str
    github_openid_key: str
    image_url: AnyHttpUrl | None
