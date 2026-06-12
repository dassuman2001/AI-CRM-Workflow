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
)


engine = create_engine(
    DATABASE_URL,
    connect_args={
        "ssl": {
            "ssl_mode": "REQUIRED",
        }
    },
    pool_pre_ping=True,
    pool_recycle=300,
    pool_size=10,
    max_overflow=20,
    pool_timeout=30,
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