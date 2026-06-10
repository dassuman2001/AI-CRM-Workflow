from sqlalchemy import create_engine

from sqlalchemy.orm import sessionmaker

from sqlalchemy.orm import DeclarativeBase

from app.core.config import settings


DATABASE_URL = (
    f"mysql+pymysql://"
    f"{settings.MYSQL_USER}:"
    f"{settings.MYSQL_PASSWORD}@"
    f"{settings.MYSQL_HOST}:"
    f"{settings.MYSQL_PORT}/"
    f"{settings.MYSQL_DB}"
    "?ssl_verify_cert=false"
)


engine = create_engine(

    DATABASE_URL,

    echo=True,

    future=True,

    pool_pre_ping=True,

)


SessionLocal = sessionmaker(

    bind=engine,

    autoflush=False,

    autocommit=False,

)


class Base(DeclarativeBase):

    pass


def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()