from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from jwt import encode
from datetime import datetime, timedelta, timezone
import bcrypt

from app.core.config import settings
from app.core.database import get_db
from app.models.user import User
from app.models.admin import Admin
from app.schemas.auth import LoginRequest, UserInfoResponse
from app.dependencies.auth import get_current_user_id

router = APIRouter(prefix="/auth", tags=["auth"])


def _create_tokens(user_id: str) -> tuple[str, str]:
    """Create access and refresh tokens."""
    now = datetime.now(timezone.utc)
    
    # Access token
    access_payload = {
        "sub": user_id,
        "exp": now + timedelta(seconds=settings.JWT_ACCESS_TOKEN_EXPIRES),
        "iat": now,
        "type": "access"
    }
    access_token = encode(
        access_payload,
        settings.JWT_SECRET_KEY,
        algorithm="HS256"
    )
    
    # Refresh token
    refresh_payload = {
        "sub": user_id,
        "exp": now + timedelta(seconds=settings.JWT_REFRESH_TOKEN_EXPIRES),
        "iat": now,
        "type": "refresh"
    }
    refresh_token = encode(
        refresh_payload,
        settings.JWT_SECRET_KEY,
        algorithm="HS256"
    )
    
    return access_token, refresh_token


@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    """Login endpoint - returns JWT access and refresh tokens in cookies."""
    # Find user by email
    user = db.query(User).filter(User.email == request.email).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Verify password
    if not bcrypt.checkpw(
        request.password.encode('utf-8'),
        user.password_hash.encode('utf-8')
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Check if user is active
    if user.status != 'active':
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is not active"
        )
    
    # Create tokens
    access_token, refresh_token = _create_tokens(user.id)
    
    # Check if admin
    is_admin = db.query(Admin).filter(Admin.user_id == user.id).first() is not None
    
    # Create response with user info
    response = JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "email": user.email,
            "name": user.preferred_name,
            "company": user.company,
            "title": user.title,
            "phone": user.phone,
            "status": user.status,
            "isAdmin": is_admin
        }
    )
    
    # Set cookies
    is_production = settings.TIER == "production"
    response.set_cookie(
        "access_token_cookie",
        access_token,
        httponly=True,
        secure=is_production,
        samesite="strict"
    )
    response.set_cookie(
        "refresh_token_cookie",
        refresh_token,
        httponly=True,
        secure=is_production,
        samesite="strict",
        path="/auth/refresh"
    )
    
    return response


@router.post("/refresh")
def refresh(user_id: str = Depends(get_current_user_id)):
    """Refresh endpoint - returns new access token cookie."""
    access_token, _ = _create_tokens(user_id)
    
    response = Response(status_code=status.HTTP_200_OK)
    is_production = settings.TIER == "production"
    response.set_cookie(
        "access_token_cookie",
        access_token,
        httponly=True,
        secure=is_production,
        samesite="strict"
    )
    
    return response


@router.post("/logout")
def logout(user_id: str = Depends(get_current_user_id)):
    """Logout endpoint - clears cookies."""
    response = Response(status_code=status.HTTP_200_OK)
    response.delete_cookie("access_token_cookie")
    response.delete_cookie("refresh_token_cookie", path="/auth/refresh")
    return response


@router.get("/me", response_model=UserInfoResponse)
def get_current_user_info(
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    """Get current user info."""
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    is_admin = db.query(Admin).filter(Admin.user_id == user.id).first() is not None
    
    return UserInfoResponse(
        email=user.email,
        name=user.preferred_name,
        company=user.company,
        title=user.title,
        phone=user.phone,
        status=user.status,
        isAdmin=is_admin
    )
