"""add inital admins

Revision ID: 002bd6555bbe
Revises: af5cb4607347
Create Date: 2026-08-09 19:54:45.073854

"""
from typing import Sequence, Union
from uuid import uuid4
import bcrypt
import os

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '002bd6555bbe'
down_revision: Union[str, Sequence[str], None] = 'af5cb4607347'
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
    op.execute(
        'INSERT INTO "user" (id, email, password_hash, preferred_name, company, title, phone, status, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW())',
        [
            (barry_id, 'barry@eagleeyeadvisory.us.com', password_hash, 'Barry Webb', 'Eagle Eye Advisory', 'Admin', '7708614415', 'active'),
            (jeremy_id, 'jeremy@eagleeyeadvisory.us.com', password_hash, 'Jeremy Webb', 'Eagle Eye Advisory', 'Admin', '7708614415', 'active'),
        ]
    )
    
    # Insert admins with parameterized query
    op.execute(
        'INSERT INTO "admin" (id, user_id, permissions, created_at, updated_at) VALUES (%s, %s, %s, NOW(), NOW())',
        [
            (str(uuid4()), barry_id, 'full_access'),
            (str(uuid4()), jeremy_id, 'full_access'),
        ]
    )


def downgrade() -> None:
    """Downgrade schema - remove initial admins."""
    op.execute(
        "DELETE FROM admin WHERE user_id IN (SELECT id FROM \"user\" WHERE email = %s OR email = %s)",
        ('barry@eagleeyeadvisory.us.com', 'jeremy@eagleeyeadvisory.us.com')
    )
    op.execute(
        "DELETE FROM \"user\" WHERE email = %s OR email = %s",
        ('barry@eagleeyeadvisory.us.com', 'jeremy@eagleeyeadvisory.us.com')
    )
