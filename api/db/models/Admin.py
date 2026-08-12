from db.db import db
from uuid import uuid4
from datetime import datetime

class Admin(db.Model):
    __tablename__ = 'admin'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False, unique=True, index=True)
    permissions = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    # Relationship
    user = db.relationship('User', foreign_keys=[user_id])
    
    def __repr__(self):
        return f'<Admin {self.user_id}>'

    @classmethod
    def is_admin(cls, user_id: str) -> bool:
        """Check if a user is an admin."""
        return cls.query.filter_by(user_id=user_id).first() is not None
