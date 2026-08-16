"""Alembic environment configuration for database migrations."""
import sys
from pathlib import Path
from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool, MetaData
from alembic import context

# Add parent directory to path so we can import utils
sys.path.insert(0, str(Path(__file__).parent.parent))

from utils.get_env_values import get_env_values

# Get the Alembic config object
config = context.config

# Get environment variables for database connection
env_values = get_env_values()

# Build the database URL
sqlalchemy_url = (
    f"postgresql+psycopg://"
    f"{env_values['POSTGRES_USER']}:"
    f"{env_values['POSTGRES_PASSWORD']}@"
    f"{env_values['POSTGRES_HOST']}:"
    f"{env_values['POSTGRES_PORT']}/"
    f"{env_values['POSTGRES_DB']}"
)

config.set_main_option("sqlalchemy.url", sqlalchemy_url)

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
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
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
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

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
