from pydantic_settings import BaseSettings
from urllib.parse import quote


class Settings(BaseSettings):
    """Application settings from environment variables."""
    
    # Database
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "password"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: str = "5432"
    POSTGRES_DB: str = "eagle_eye_db"
    
    # JWT
    JWT_SECRET_KEY: str = "dev-key-not-for-production"
    JWT_ACCESS_TOKEN_EXPIRES: int = 3600  # 1 hour
    JWT_REFRESH_TOKEN_EXPIRES: int = 604800  # 7 days
    
    # CORS & Environment
    TIER: str = "development"
    
    @property
    def DATABASE_URL(self) -> str:
        """Construct database URL with proper URL encoding for special characters."""
        user = quote(self.POSTGRES_USER, safe='')
        password = quote(self.POSTGRES_PASSWORD, safe='')
        return f"postgresql+psycopg://{user}:{password}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()

# Debug: Print database URL for troubleshooting
print(f"[DEBUG] DATABASE_URL: {settings.DATABASE_URL}")
print(f"[DEBUG] POSTGRES_HOST: {settings.POSTGRES_HOST}")
print(f"[DEBUG] POSTGRES_PORT: {settings.POSTGRES_PORT}")
