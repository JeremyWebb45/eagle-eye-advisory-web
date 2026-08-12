from db.db import db
from uuid import uuid4
from datetime import datetime
from typing import List

class Leads(db.Model):
    __tablename__ = 'leads'

    id = db.Column(db.String(36), primary_key=True, index=True, default=lambda: str(uuid4()))
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    title = db.Column(db.String(255))
    phone = db.Column(db.String(20), unique=True)
    company = db.Column(db.String(255))
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    @classmethod
    def get_all(cls) -> List['Leads']:
        return cls.query.all()

    @classmethod
    def create(cls, name, email, title, phone, company, message):
        new_lead = cls(
            name=name,
            email=email,
            title=title,
            phone=phone,
            company=company,
            message=message
        )
        db.session.add(new_lead)
        db.session.commit()
        return 200

    @classmethod
    def delete(cls, lead_id):
        lead = cls.query.get(lead_id)
        if lead:
            db.session.delete(lead)
            db.session.commit()
            return 200
        return 404