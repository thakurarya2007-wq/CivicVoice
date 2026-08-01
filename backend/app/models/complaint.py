from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import relationship

from app.database.database import Base

from sqlalchemy import Float


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)

    description = Column(Text, nullable=False)

    category = Column(String(100), nullable=False)

    status = Column(
        String(50),
        default="Pending",
        nullable=False,
    )

    priority = Column(
        String(50),
        default="Medium",
        nullable=False,
    )

    ai_category = Column(
        String(100),
        nullable=True,
    )

    ai_priority = Column(
        String(50),
        nullable=True,
    )

    sentiment = Column(
        String(50),
        nullable=True,
    )

    department = Column(
        String(100),
        nullable=True,
    )

    urgency_score = Column(
        Integer,
        nullable=True,
    )
    
    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    latitude = Column(Float, nullable=True)

    longitude = Column(Float, nullable=True)

    location = Column(String)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    user = relationship(
        "User",
        back_populates="complaints",
    )

    cluster_id = Column(Integer, nullable=True)