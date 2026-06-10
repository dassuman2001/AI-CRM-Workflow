from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.schemas.user_schema import UserLogin
from app.schemas.user_schema import UserRegister
from app.schemas.user_schema import TokenResponse

from app.services.auth_service import AuthService

from app.core.security import create_access_token


from app.services.current_user import get_current_user

from app.schemas.user_schema import UserResponse




router = APIRouter(

    prefix="/api/auth",

    tags=["Authentication"],

)


@router.post(

    "/register",

)

def register(

    user: UserRegister,

    db: Session = Depends(get_db),

):

    created = AuthService.register_user(

        db,

        user,

    )

    if created is None:

        raise HTTPException(

            status_code=400,

            detail="Email already exists",

        )

    return {

        "message": "User registered successfully"

    }


@router.post(

    "/login",

    response_model=TokenResponse,

)

def login(

    user: UserLogin,

    db: Session = Depends(get_db),

):

    authenticated = AuthService.authenticate(

        db,

        user.email,

        user.password,

    )

    if authenticated is None:

        raise HTTPException(

            status_code=401,

            detail="Invalid credentials",

        )

    token = create_access_token(

        {

            "sub": authenticated.email

        }

    )

    return {

        "access_token": token,

        "token_type": "bearer",

        "user": authenticated,

    }


@router.get(

    "/me",

    response_model=UserResponse,

)

def me(

    current_user=Depends(get_current_user),

):

    return current_user