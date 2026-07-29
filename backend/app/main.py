from fastapi import FastAPI

from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router

app = FastAPI(
    title="CivicVoice AI",
    description="AI-powered civic issue reporting platform",
    version="1.0.0",
)

app.include_router(auth_router, prefix="/api/v1")
app.include_router(users_router, prefix="/api/v1")


@app.get("/")
def home():
    return {"message": "Welcome to CivicVoice AI 🚀"}


@app.get("/health")
def health():
    return {"status": "healthy"}