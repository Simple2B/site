from fastapi import HTTPException, Depends, APIRouter, status
from app import model as m, schema as s
from app.database import get_db
from sqlalchemy.orm import Session
from app.logger import log
from app.oauth2 import create_access_token, get_current_user

router = APIRouter(prefix="/api/user", tags=["Users"])


@router.post(
    "/is_authenticated", status_code=status.HTTP_200_OK, response_model=s.Token
)
def is_authenticated(user_data: s.IsAuthenticated, db: Session = Depends(get_db)):
    log(log.INFO, f"is_authenticated: user {user_data.email}")
    user: m.User = m.User.authenticate(db, git_hub_id=user_data.git_hub_id)

    if not user:
        log(log.INFO, f"is_authenticated: not exist {user_data.email}")
        user = m.User(**user_data.dict())
        db.add(user)
        db.commit()
        db.refresh(user)

        log(log.INFO, f"is_authenticated: created {user}")

    access_token = create_access_token(data={"user_id": user.id})

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/set_answer", status_code=status.HTTP_201_CREATED)
def set_answer(
    data: s.UserAnswer,
    db: Session = Depends(get_db),
    current_user: m.User = Depends(get_current_user),
):
    log(log.INFO, "set_answer: user [%s]", current_user.email)

    answer_id = data.answer_id
    answer: m.VariantAnswer = db.query(m.VariantAnswer).get(answer_id)

    if not answer:
        log(
            log.ERROR,
            "set_user_answer:  This answer was not found: [%d]",
            answer_id,
        )
        raise HTTPException(status_code=422, detail="This answer was not found")

    answer = m.UserAnswer(answer_id=answer_id, user_id=current_user.id)
    db.add(answer)
    db.commit()

    return {"status": "success"}
