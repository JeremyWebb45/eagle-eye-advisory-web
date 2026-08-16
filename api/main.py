"""
FastAPI Application Main Entry Point

This is the FastAPI version of the Flask API.
Routes:
  - /auth/* - Authentication endpoints
  - /leads/* - Leads management endpoints
  - /users/* - User management endpoints
  - /files/* - File serving endpoints
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
from app.models import User, Leads, Admin
from app.routes import auth, leads, users, files

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="Eagle Eye Advisory API",
    description="FastAPI backend for Eagle Eye Advisory",
    version="1.0.0"
)

# Configure CORS
allowed_origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://eagleeyeadvisory.us.com",
    "https://www.eagleeyeadvisory.us.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(leads.router)
app.include_router(users.router)
app.include_router(files.router)


@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=5001,
        reload=True
    )
