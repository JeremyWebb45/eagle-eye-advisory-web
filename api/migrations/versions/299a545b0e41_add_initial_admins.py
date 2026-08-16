"""add initial admins

Revision ID: 299a545b0e41
Revises: 
Create Date: 2026-08-15 22:36:40.643017

"""
from typing import Sequence, Union
import os
from uuid import uuid4
import bcrypt
from alembic import op
import sqlalchemy as sa
from sqlalchemy import text


# revision identifiers, used by Alembic.
revision: str = '299a545b0e41'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema - insert initial admin users."""
    # Get password from environment or use default (should be set in production)
    password = os.getenv('INITIAL_ADMIN_PASSWORD', 'LouieDog429!')
    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(rounds=12)).decode('utf-8')
    
    barry_id = str(uuid4())
    jeremy_id = str(uuid4())
    
    # Insert users with parameterized query
    users_data = [
        {
            'id': barry_id,
            'email': 'barry@eagleeyeadvisory.us.com',
            'password_hash': password_hash,
            'preferred_name': 'Barry Webb',
            'company': 'Eagle Eye Advisory',
            'title': 'Admin',
            'phone': '7708614415',
            'status': 'active'
        },
        {
            'id': jeremy_id,
            'email': 'jeremy@eagleeyeadvisory.us.com',
            'password_hash': password_hash,
            'preferred_name': 'Jeremy Webb',
            'company': 'Eagle Eye Advisory',
            'title': 'Admin',
            'phone': '7708614415',
            'status': 'active'
        },
    ]
    
    for user in users_data:
        op.execute(
            text(f'''INSERT INTO "user" (id, email, password_hash, preferred_name, company, title, phone, status, created_at, updated_at) 
                     VALUES ('{user["id"]}', '{user["email"]}', '{user["password_hash"]}', '{user["preferred_name"]}', '{user["company"]}', '{user["title"]}', '{user["phone"]}', '{user["status"]}', NOW(), NOW())''')
        )
    
    # Insert admins with parameterized query
    admins_data = [
        {
            'id': str(uuid4()),
            'user_id': barry_id,
            'permissions': 'full_access'
        },
        {
            'id': str(uuid4()),
            'user_id': jeremy_id,
            'permissions': 'full_access'
        },
    ]
    
    for admin in admins_data:
        op.execute(
            text(f'''INSERT INTO "admin" (id, user_id, permissions, created_at, updated_at) 
                     VALUES ('{admin["id"]}', '{admin["user_id"]}', '{admin["permissions"]}', NOW(), NOW())''')
        )


def downgrade() -> None:
    """Downgrade schema - remove initial admins."""
    op.execute(
        text(f"DELETE FROM admin WHERE user_id IN (SELECT id FROM \"user\" WHERE email = 'barry@eagleeyeadvisory.us.com' OR email = 'jeremy@eagleeyeadvisory.us.com')")
    )
    op.execute(
        text(f"DELETE FROM \"user\" WHERE email = 'barry@eagleeyeadvisory.us.com' OR email = 'jeremy@eagleeyeadvisory.us.com'")
    )
