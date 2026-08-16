import os
from pathlib import Path
from dotenv import load_dotenv

current_dir = Path(__file__).resolve().parent.parent

env_services = current_dir / '.env'

if env_services.exists():
    load_dotenv(env_services)

DB_HOST = os.getenv('POSTGRES_HOST')
DB_PORT = os.getenv('POSTGRES_PORT')
DB_USER = os.getenv('POSTGRES_USER')
DB_PASSWORD = os.getenv('POSTGRES_PASSWORD')
DB_NAME = os.getenv('POSTGRES_DB')
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')

def get_env_values():
  tier = os.getenv("TIER", "development")
  jwt_key = os.getenv("JWT_SECRET_KEY", "dev-key-not-for-production")
  
  # In production, require a proper JWT secret
  if tier == "production":
    if not jwt_key or jwt_key == "dev-key-not-for-production" or jwt_key == "your_jwt_secret_key":
      raise ValueError("JWT_SECRET_KEY must be set to a secure value in production!")
  
  env_values = {
      "TIER": tier,
      "POSTGRES_USER": os.getenv("POSTGRES_USER", "postgres"),
      "POSTGRES_PASSWORD": os.getenv("POSTGRES_PASSWORD", "password"),
      "POSTGRES_HOST": os.getenv("POSTGRES_HOST", "localhost"),
      "POSTGRES_PORT": os.getenv("POSTGRES_PORT", "5432"),
      "POSTGRES_DB": os.getenv("POSTGRES_DB", "eagle_eye_db"),
      "JWT_SECRET_KEY": jwt_key
  }
  return env_values