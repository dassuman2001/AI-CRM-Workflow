from sqlalchemy.orm import Session

from app.models.user import User

from app.schemas.user_schema import UserRegister

from app.utils.password import hash_password

from app.utils.password import verify_password


class AuthService:

    @staticmethod
    def register_user(

        db: Session,

        user: UserRegister,

    ):

        existing = (

            db.query(User)

            .filter(User.email == user.email)

            .first()

        )

        if existing:

            return None

        new_user = User(

            first_name=user.first_name,

            last_name=user.last_name,

            email=user.email,

            password=hash_password(user.password),

        )

        db.add(new_user)

        db.commit()

        db.refresh(new_user)

        return new_user

    @staticmethod
    def authenticate(

        db: Session,

        email: str,

        password: str,

    ):

        user = (

            db.query(User)

            .filter(User.email == email)

            .first()

        )

        if not user:

            return None

        if not verify_password(

            password,

            user.password,

        ):

            return None

        return user