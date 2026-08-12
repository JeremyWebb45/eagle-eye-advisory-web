import os
from pathlib import Path
from dotenv import load_dotenv

current_dir = Path(__file__).resolve().parent.parent

env_services = current_dir / '.env.services'

if env_services.exists():
    load_dotenv(env_services)

DB_HOST = os.getenv('POSTGRES_HOST')
DB_PORT = os.getenv('POSTGRES_PORT')
DB_USER = os.getenv('POSTGRES_USER')
DB_PASSWORD = os.getenv('POSTGRES_PASSWORD')
DB_NAME = os.getenv('POSTGRES_DB')
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')

def get_env_values():
  env_values = {
      "TIER": os.getenv("TIER", "development"),
      "POSTGRES_USER": os.getenv("POSTGRES_USER", "postgres"),
      "POSTGRES_PASSWORD": os.getenv("POSTGRES_PASSWORD", "password"),
      "POSTGRES_HOST": os.getenv("POSTGRES_HOST", "localhost"),
      "POSTGRES_PORT": os.getenv("POSTGRES_PORT", "5432"),
      "POSTGRES_DB": os.getenv("POSTGRES_DB", "eagle_eye_db"),
      "JWT_SECRET_KEY": os.getenv("JWT_SECRET_KEY", "your_jwt_secret_key")
  }
  return env_values