from pydantic_settings import BaseSettings

from utils.get_env_values import get_env_values


class Settings(BaseSettings):
    """Application settings from environment variables."""
    
    # Database
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_HOST: str
    POSTGRES_PORT: str
    POSTGRES_DB: str
    
    # JWT
    JWT_SECRET_KEY: str
    JWT_ACCESS_TOKEN_EXPIRES: int = 3600  # 1 hour
    JWT_REFRESH_TOKEN_EXPIRES: int = 604800  # 7 days
    
    # CORS & Environment
    TIER: str = "development"
    
    @property
    def DATABASE_URL(self) -> str:
        """Construct database URL."""
        return f"postgresql+psycopg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

env_values = get_env_values()

settings = Settings(
    POSTGRES_USER=env_values["POSTGRES_USER"],
    POSTGRES_PASSWORD=env_values["POSTGRES_PASSWORD"],
    POSTGRES_HOST=env_values["POSTGRES_HOST"],
    POSTGRES_PORT=env_values["POSTGRES_PORT"],
    POSTGRES_DB=env_values["POSTGRES_DB"],
    JWT_SECRET_KEY=env_values["JWT_SECRET_KEY"],
    TIER=env_values["TIER"]
)
