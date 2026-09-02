import os
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "WSFU - Who Swear For Us"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    
    # Supabase Configuration
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""  # anon or service_role key
    SUPABASE_SERVICE_ROLE_KEY: str = ""
    
    # Gemini AI
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-3.7-flash"



    
    # Redis / Task Queue (Optional)
    REDIS_URL: str = "redis://localhost:6379"
    
    # CORS Origins (allow local dev, Vercel frontend, and mobile apps)
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:8081",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "https://wsfu.ng",
        "https://www.wsfu.ng"
    ]
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()
