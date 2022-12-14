from fastapi import HTTPException, Depends, APIRouter
from app import model, schema, oauth2
from app.database import get_db
from sqlalchemy.orm import Session
from app.logger import log

router = APIRouter(prefix="/backend/user", tags=["Users"])


@router.post("/create_user", status_code=201, response_model=schema.UserOut)
def create_user(new_user: schema.UserCreate, db: Session = Depends(get_db)):
    user = db.query(model.User).filter(model.User.email == new_user.email).first()
    log(log.INFO, f"create_user: user {new_user.email} exists: {bool(user)}")

    if not user:
        user = model.User(**new_user.dict())
        db.add(user)
        db.commit()
        db.refresh(user)

        log(log.INFO, f"create_user: user {user} created")

    log(log.INFO, f"create_user: user {user} already in db")

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "created_at": user.created_at.strftime("%m/%d/%Y, %H:%M:%S"),
    }


@router.get("/{id}", response_model=schema.UserOut)
def get_user(
    id: int,
    db: Session = Depends(get_db),
    current_user: int = Depends(oauth2.get_current_user),
):
    user = db.query(model.User).get(id)

    if not user:
        raise HTTPException(status_code=404, detail="This user was not found")

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "created_at": user.created_at.strftime("%m/%d/%Y, %H:%M:%S"),
    }
