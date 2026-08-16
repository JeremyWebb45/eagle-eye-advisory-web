from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import bcrypt

from app.core.database import get_db
from app.models.user import User
from app.models.leads import Leads
from app.models.admin import Admin
from app.schemas.user import UserCreate, UserUpdate, UserResponse
from app.dependencies.auth import require_admin

router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=list[UserResponse])
def get_users(
    admin_id: str = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Get all users - admin only."""
    users = db.query(User).all()
    
    # Add isAdmin field to each user
    result = []
    for user in users:
        is_admin = db.query(Admin).filter(Admin.user_id == user.id).first() is not None
        user_dict = {
            "id": user.id,
            "email": user.email,
            "name": user.preferred_name,
            "company": user.company,
            "title": user.title,
            "phone": user.phone,
            "status": user.status,
            "isAdmin": is_admin,
            "created_at": user.created_at,
            "updated_at": user.updated_at
        }
        result.append(user_dict)
    
    return result


@router.post("/{lead_id}", response_model=UserResponse)
def create_user_from_lead(
    lead_id: str,
    user_data: UserCreate,
    admin_id: str = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Create a user from a lead - admin only."""
    # Get the lead
    lead = db.query(Leads).filter(Leads.id == lead_id).first()
    if not lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lead not found"
        )
    
    # Check if user already exists with this email
    existing_user = db.query(User).filter(User.email == lead.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with this email already exists"
        )
    
    # Hash password
    password_hash = bcrypt.hashpw(
        user_data.temp_password.encode('utf-8'),
        bcrypt.gensalt()
    ).decode('utf-8')
    
    # Create new user from lead data
    new_user = User(
        email=lead.email,
        password_hash=password_hash,
        preferred_name=lead.name,
        company=lead.company,
        title=lead.title,
        phone=lead.phone,
        status="active"
    )
    
    db.add(new_user)
    db.flush()  # Flush to get the ID without committing
    
    # Delete the lead
    db.delete(lead)
    db.commit()
    
    return UserResponse(
        id=new_user.id,
        email=new_user.email,
        name=new_user.preferred_name,
        company=new_user.company,
        title=new_user.title,
        phone=new_user.phone,
        status=new_user.status,
        isAdmin=False,
        created_at=new_user.created_at,
        updated_at=new_user.updated_at
    )


@router.patch("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: str,
    user_update: UserUpdate,
    admin_id: str = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Update a user - admin only."""
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Update allowed fields
    if user_update.preferred_name is not None:
        user.preferred_name = user_update.preferred_name
    if user_update.company is not None:
        user.company = user_update.company
    if user_update.title is not None:
        user.title = user_update.title
    if user_update.phone is not None:
        user.phone = user_update.phone
    if user_update.status is not None:
        user.status = user_update.status
    
    db.commit()
    db.refresh(user)
    
    is_admin = db.query(Admin).filter(Admin.user_id == user.id).first() is not None
    
    return UserResponse(
        id=user.id,
        email=user.email,
        name=user.preferred_name,
        company=user.company,
        title=user.title,
        phone=user.phone,
        status=user.status,
        isAdmin=is_admin,
        created_at=user.created_at,
        updated_at=user.updated_at
    )
