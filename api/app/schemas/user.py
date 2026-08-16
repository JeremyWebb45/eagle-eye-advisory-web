from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class UserCreate(BaseModel):
    """Create user schema."""
    email: EmailStr
    temp_password: str


class UserUpdate(BaseModel):
    """Update user schema."""
    preferred_name: Optional[str] = None
    company: Optional[str] = None
    title: Optional[str] = None
    phone: Optional[str] = None
    status: Optional[str] = None


class UserResponse(BaseModel):
    """User response schema."""
    id: str
    email: str
    name: Optional[str]
    company: Optional[str]
    title: Optional[str]
    phone: Optional[str]
    status: str
    isAdmin: bool
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
