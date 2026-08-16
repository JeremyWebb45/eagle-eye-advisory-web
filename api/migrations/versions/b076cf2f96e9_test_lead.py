"""test-lead

Revision ID: b076cf2f96e9
Revises: 6041737510bc
Create Date: 2026-08-15 19:54:28.757091

"""
from typing import Sequence, Union
from uuid import uuid4

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b076cf2f96e9'
down_revision: Union[str, Sequence[str], None] = '6041737510bc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema - add a test lead."""
    op.execute(
        """
        INSERT INTO leads (id, name, email, title, phone, company, message, created_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, NOW())
        """,
        (
            str(uuid4()),
            "Test Lead",
            "test@example.com",
            "Senior Manager",
            "+1-555-0123",
            "Test Company",
            "This is a test lead created for migration testing purposes."
        )
    )


def downgrade() -> None:
    """Downgrade schema - remove the test lead."""
    op.execute(
        "DELETE FROM leads WHERE email = %s",
        ("test@example.com",)
    )
