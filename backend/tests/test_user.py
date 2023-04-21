from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
import app.model as m
import app.schema as s
from tests import TestData


def test_auth(client: TestClient, db: Session):
    USER_NAME = "michael"
    USER_EMAIL = "test@test.ku"
    USER_PASSWORD = "secret"
    # data = {"username": USER_NAME, "email": USER_EMAIL, "password": USER_PASSWORD}
    data = s.UserCreate(
        username=USER_NAME,
        email=USER_EMAIL,
        password=USER_PASSWORD,
    )
    # create new user
    response = client.post("/user/create_user", json=data.dict())
    assert response

    new_user = s.UserOut.parse_obj(response.json())
    user = db.query(m.User).get(new_user.id)
    assert user.username == new_user.username

    # login by username and password
    response = client.post(
        "/login", data=dict(username=USER_NAME, password=USER_PASSWORD)
    )
    assert response, "unexpected response"
    token = s.Token.parse_obj(response.json())
    headers = {"Authorization": f"Bearer {token.access_token}"}

    # get user by id
    response = client.get(f"/user/{new_user.id}", headers=headers)
    assert response
    user = s.UserOut.parse_obj(response.json())
    assert user.username == USER_NAME


# def test_github_auth(
#     client: TestClient,
#     db: Session,
#     test_data: TestData,
# ):
#     test_data
#     # existing student
#     user = (
#         db.query(m.User).filter_by(email=test_data.test_users[0].email).first()
#     )
#     assert user
#     request_data = s.UserGitHubLogin(
#         email=user.email,
#         username=user.email,
#         github_openid_key=user.github_openid_key,
#         image_url=user.image_url,
#     ).dict()
#     response = client.post("api/git-hub-oauth", json=request_data)
#     assert response

#     # non existing student
#     user = db.query(m.User).filter_by(email=test_data.test_users.email).first()
#     assert not user
#     request_data = s.UserGitHubLogin(
#         email=user.email,
#         username=user.email,
#         github_openid_key=user.github_openid_key,
#         image_url=user.image_url,
#     ).dict()
#     response = client.post("api/git-hub-oauth", json=request_data)
#     assert response

#     user = db.query(m.User).filter_by(email=test_data.test_users.email).first()
#     assert user
