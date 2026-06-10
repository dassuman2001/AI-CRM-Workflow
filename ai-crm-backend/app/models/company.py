from datetime import datetime

from sqlalchemy import DateTime
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.database.database import Base


class Company(Base):

    __tablename__ = "companies"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(200),
        unique=True,
        nullable=False,
    )

    industry: Mapped[str] = mapped_column(
        String(150),
        nullable=True,
    )

    website: Mapped[str] = mapped_column(
        String(255),
        nullable=True,
    )

    email: Mapped[str] = mapped_column(
        String(255),
        nullable=True,
    )

    phone: Mapped[str] = mapped_column(
        String(50),
        nullable=True,
    )

    address: Mapped[str] = mapped_column(
        Text,
        nullable=True,
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )