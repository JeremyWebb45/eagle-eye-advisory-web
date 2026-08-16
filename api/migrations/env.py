"""Alembic environment configuration for database migrations."""
import os
import sys
from pathlib import Path
from logging.config import fileConfig
from dotenv import load_dotenv
from urllib.parse import quote

from sqlalchemy import pool, MetaData, create_engine
from alembic import context

# Load .env if it exists
dotenv_path = Path(__file__).parent.parent / ".env"
if dotenv_path.exists():
    load_dotenv(dotenv_path)

# Get the Alembic config object
config = context.config

# Get environment variables for database connection
postgres_user = os.getenv("POSTGRES_USER", "postgres")
postgres_password = os.getenv("POSTGRES_PASSWORD", "password")
postgres_host = os.getenv("POSTGRES_HOST", "localhost")
postgres_port = os.getenv("POSTGRES_PORT", "5432")
postgres_db = os.getenv("POSTGRES_DB", "eagle_eye_db")

# Build the database URL with proper URL encoding
user = quote(postgres_user, safe='')
password = quote(postgres_password, safe='')
sqlalchemy_url = (
    f"postgresql+psycopg://"
    f"{user}:"
    f"{password}@"
    f"{postgres_host}:"
    f"{postgres_port}/"
    f"{postgres_db}"
)

# Setup logging configuration
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Define target metadata - using empty metadata for now
# Models will be auto-detected via autogenerate when properly configured
target_metadata = MetaData()


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.
    
    This configures the context with just a URL and not an Engine.
    """
    context.configure(
        url=sqlalchemy_url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode.
    
    This scenario creates an Engine and associates a connection with the context.
    """
    # Create engine directly from URL to avoid ConfigParser interpolation issues

    connectable = create_engine(sqlalchemy_url, poolclass=pool.NullPool)

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
