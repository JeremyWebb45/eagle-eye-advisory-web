from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.sql import func
from uuid import uuid4
from ..core.database import Base


class Leads(Base):
    """Leads model for contact form submissions."""
    __tablename__ = "leads"
    
    id = Column(String(36), primary_key=True, index=True, default=lambda: str(uuid4()))
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    title = Column(String(255))
    phone = Column(String(20), unique=True)
    company = Column(String(255))
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<Lead {self.email}>"
