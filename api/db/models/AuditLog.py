from db.db import db
from uuid import uuid4
from datetime import datetime

class AuditLog(db.Model):
    __tablename__ = 'audit_log'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid4()))
    admin_id = db.Column(db.String(36), db.ForeignKey('admin.id'), nullable=False)
    action = db.Column(db.String(255), nullable=False)
    resource_type = db.Column(db.String(255))
    resource_id = db.Column(db.String(36))
    changes = db.Column(db.Text)
    ip_address = db.Column(db.String(45))
    user_agent = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    
    # Relationship
    admin = db.relationship('Admin')
    
    def __repr__(self):
        return f'<AuditLog {self.action} by {self.admin_id}>'
