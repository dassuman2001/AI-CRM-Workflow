from fastapi import Depends
from fastapi import HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from fastapi.security import HTTPBearer

from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.user import User

from app.core.security import decode_access_token

security = HTTPBearer()


def get_current_user(

    credentials: HTTPAuthorizationCredentials = Depends(security),

    db: Session = Depends(get_db),

):

    token = credentials.credentials

    payload = decode_access_token(token)

    if payload is None:

        raise HTTPException(

            status_code=401,

            detail="Invalid token",

        )

    email = payload.get("sub")

    user = (

        db.query(User)

        .filter(User.email == email)

        .first()

    )

    if user is None:

        raise HTTPException(

            status_code=401,

            detail="User not found",

        )

    return user