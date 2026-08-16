from typing import Dict, Optional

from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from jwt import decode, ExpiredSignatureError, InvalidTokenError
from app.core.config import settings
from app.core.database import get_db
from app.models.user import User
from app.models.admin import Admin
import logging

logger = logging.getLogger(__name__)
security = HTTPBearer(auto_error=False)


def get_token_from_request(
    request: Request,
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
) -> str:
    """
    Extract JWT token from cookie or Authorization header.
    Tries cookies first, then Authorization header.
    """
    # Try to get token from cookie first
    token = request.cookies.get("access_token_cookie")
    
    if token:
        return token
    
    # Fall back to Authorization header
    if credentials:
        return credentials.credentials
    
    # No token found
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Not authenticated"
    )


def get_current_user_id(token: str = Depends(get_token_from_request)) -> str:
    """
    Extract and validate JWT token.
    Returns the user ID.
    """
    try:
        payload: Dict[str, str] = decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=["HS256"]
        )
        user_id: str | None = payload.get("sub")
        
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials"
            )
        
        return user_id
    
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired"
        )
    except InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )


def get_current_user(
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db)
) -> User:
    """
    Get current user from database.
    """
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    return user


def require_admin(
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db)
) -> str:
    """
    Dependency that requires user to be admin.
    Returns the user_id if authorized.
    """
    admin = db.query(Admin).filter(Admin.user_id == user_id).first()
    
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Unauthorized - admin access required"
        )
    
    return user_id
