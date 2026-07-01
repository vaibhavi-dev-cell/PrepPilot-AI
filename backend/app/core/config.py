import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Load environment variables from .env file
load_dotenv(os.path.join(BASE_DIR, '.env'))

SECRET_KEY = os.getenv('SECRET_KEY', 'a2R0ZW1wbGF0ZV9zZWNyZXRfa2V5X2Zvcl9wcmVw')
ALGORITHM = os.getenv('ALGORITHM', 'HS256')
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', '30'))

DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///./preppilot.db')
BACKEND_HOST = os.getenv('BACKEND_HOST', '127.0.0.1')
BACKEND_PORT = int(os.getenv('BACKEND_PORT', '8001'))
FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:5173')


class Settings:
    app_name: str = 'PrepPilot AI'
    admin_email: str = 'admin@preppilot.ai'


settings = Settings()
