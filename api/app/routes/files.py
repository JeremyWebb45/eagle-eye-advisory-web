from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import os
from urllib.parse import unquote

from app.core.database import get_db
from app.dependencies.auth import get_current_user_id

router = APIRouter(prefix="/files", tags=["files"])

# Whitelist of allowed files that can be served
ALLOWED_FILES = [
    "Eagle Eye Evolution - AUG 4 2026.pdf",
    "EEA - Kinaxis Template AUG 4 - website version.pdf",
    "Executive Summary CV AUG 4 2026.pdf",
    "Skopos CTS Framework - AUG 4 2026.pdf"
]

# Directory where protected files are stored
PROTECTED_FILES_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../protected_files"))


@router.get("/{filename}")
def get_file(
    filename: str,
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    """Get a protected file - authenticated users only."""
    # Decode URL-encoded filename
    filename = unquote(filename)
    
    # Verify file is in whitelist to prevent directory traversal attacks
    if filename not in ALLOWED_FILES:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found"
        )
    
    file_path = os.path.join(PROTECTED_FILES_DIR, filename)
    
    # Verify file exists
    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found"
        )
    
    try:
        return FileResponse(file_path, media_type="application/pdf")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve file"
        )
