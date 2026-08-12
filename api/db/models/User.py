from typing import Optional

from db.db import db
from uuid import uuid4
from datetime import datetime

class User(db.Model):
    __tablename__ = 'user'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid4()))
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    preferred_name = db.Column(db.String(255))
    company = db.Column(db.String(255))
    title = db.Column(db.String(255))
    phone = db.Column(db.String(20))
    status = db.Column(db.String(50), default='active')
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    last_login = db.Column(db.DateTime)
    
    def __repr__(self):
        return f'<User {self.email}>'
    @classmethod
    def find_by_email(cls, email: str) -> Optional['User']:
        return cls.query.filter_by(email=email).first()
    @classmethod
    def find_by_id(cls, user_id: str) -> Optional['User']:
        return cls.query.get(user_id)
