from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.leads import Leads
from app.schemas.leads import LeadCreate, LeadResponse
from app.dependencies.auth import require_admin

router = APIRouter(prefix="/leads", tags=["leads"])


@router.get("", response_model=list[LeadResponse])
def get_leads(
    admin_id: str = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Get all leads - admin only."""
    leads = db.query(Leads).all()
    return leads


@router.post("", response_model=dict)
def create_lead(lead: LeadCreate, db: Session = Depends(get_db)):
    """Create a new lead."""
    # Check if email already exists
    existing_lead = db.query(Leads).filter(Leads.email == lead.email).first()
    if existing_lead:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Lead with this email already exists"
        )
    
    # Create new lead
    new_lead = Leads(
        name=lead.name,
        email=lead.email,
        title=lead.title,
        phone=lead.phone,
        company=lead.company,
        message=lead.message
    )
    
    db.add(new_lead)
    db.commit()
    
    return {"message": "Lead created successfully"}


@router.delete("/{lead_id}", response_model=dict)
def delete_lead(
    lead_id: str,
    admin_id: str = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Delete a lead - admin only."""
    lead = db.query(Leads).filter(Leads.id == lead_id).first()
    
    if not lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lead not found"
        )
    
    db.delete(lead)
    db.commit()
    
    return {"message": "Lead deleted successfully"}
