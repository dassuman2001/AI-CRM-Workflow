from datetime import datetime

from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.database.database import Base


class Lead(Base):

    __tablename__ = "leads"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
    )

    phone: Mapped[str] = mapped_column(
        String(30),
        nullable=True,
    )

    company: Mapped[str] = mapped_column(
        String(150),
        nullable=True,
    )

    status: Mapped[str] = mapped_column(
        String(50),
        default="NEW",
    )

    priority: Mapped[str] = mapped_column(
        String(50),
        default="MEDIUM",
    )

    source: Mapped[str] = mapped_column(
        String(100),
        default="WEBSITE",
    )

    estimated_value: Mapped[float] = mapped_column(
        Float,
        default=0,
    )


    next_action: Mapped[str] = mapped_column(
        Text,
        nullable=True,
    )

    assigned_user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
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




    ai_summary: Mapped[str] = mapped_column(
        Text,
        nullable=True,
    )

    ai_score: Mapped[int] = mapped_column(
        Integer,
        nullable=True,
    )

    next_action: Mapped[str] = mapped_column(
        Text,
        nullable=True,
    )

    followup_email: Mapped[str] = mapped_column(
        Text,
        nullable=True,
    )

    meeting_summary: Mapped[str] = mapped_column(
        Text,
        nullable=True,
    )

    assigned_user = relationship(

    "User",

    back_populates="leads",

)
    
    