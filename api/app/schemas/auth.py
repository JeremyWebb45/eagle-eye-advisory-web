from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class LoginRequest(BaseModel):
    """Login request schema."""
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    """Token response schema."""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class UserInfoResponse(BaseModel):
    """User info response after login."""
    email: str
    name: Optional[str]
    company: Optional[str]
    title: Optional[str]
    phone: Optional[str]
    status: str
    isAdmin: bool
    
    class Config:
        from_attributes = True
