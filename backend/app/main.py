from fastapi import FastAPI

from app.database.database import Base, engine
from app.models.user import User


app = FastAPI(
    title="CivicVoice AI",
    description="AI-powered civic issue reporting platform",
    version="1.0.0"
)


@app.get("/")
def home():
    return {"message": "Welcome to CivicVoice AI 🚀"}


@app.get("/health")
def health():
    return {"status": "healthy"}