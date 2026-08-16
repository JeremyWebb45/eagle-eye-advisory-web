from sqlalchemy import Column, String, DateTime
from sqlalchemy.sql import func
from uuid import uuid4
from ..core.database import Base


class User(Base):
    """User model for application users."""
    __tablename__ = "user"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    preferred_name = Column(String(255))
    company = Column(String(255))
    title = Column(String(255))
    phone = Column(String(20))
    status = Column(String(50), default="active")
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    last_login = Column(DateTime(timezone=True), nullable=True)
    
    def __repr__(self):
        return f"<User {self.email}>"
