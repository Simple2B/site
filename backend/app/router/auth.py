# from shutil import unregister_archive_format
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from app.utils import generate_uuid
from app.logger import log
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
import app.schema as s
from app.database import get_db
from app.model import User
from app.oauth2 import create_access_token

router = APIRouter(tags=["Authentication"])


@router.post("/login", response_model=s.Token)
def login(
    user_credentials: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user: User = User.authenticate(
        db,
        user_credentials.username,
        user_credentials.password,
    )

    if not user:
        raise HTTPException(status_code=403, detail="Invalid credentials")

    access_token = create_access_token(data={"user_id": user.id})

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/git-hub-oauth", status_code=status.HTTP_200_OK)
def github_auth(
    data: s.UserGitHubLogin,
    db: Session = Depends(get_db),
):
    user: User | None = db.query(User).filter_by(email=data.email).first()
    if not user:
        user = User(
            email=data.email,
            username=data.username,
            password="*",
            github_open_id=data.github_openid_key,
            verification_token=generate_uuid(),
        )
        db.add(user)
        try:
            db.commit()
        except SQLAlchemyError as e:
            log(log.INFO, "Error - [%s]", e)
            raise HTTPException(
                status=status.HTTP_409_CONFLICT,
                detail="Error while saving creating a user",
            )
        log(
            log.INFO,
            "User [%s] has been created (via Git Hub account))",
            user.email,
        )

    # if data.picture:
    #     data.picture = data.picture
    db.commit()
    user.authenticate(db, user.username, user.password)
    log(log.INFO, "Authenticating user - [%s]", user.email)
    access_token = create_access_token(data={"user_id": user.id})
    return s.Token(
        access_token=access_token,
        token_type="bearer",
    )
