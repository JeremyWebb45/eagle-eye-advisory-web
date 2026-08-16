from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class LeadCreate(BaseModel):
    """Create lead schema."""
    name: str
    email: EmailStr
    title: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    message: str


class LeadResponse(BaseModel):
    """Lead response schema."""
    id: str
    name: str
    email: str
    title: Optional[str]
    phone: Optional[str]
    company: Optional[str]
    message: str
    created_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
