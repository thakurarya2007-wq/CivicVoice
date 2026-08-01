from datetime import datetime

from typing import Optional

from pydantic import BaseModel, Field


class ComplaintCreate(BaseModel):
    title: str = Field(min_length=5, max_length=200)
    description: str = Field(min_length=10)
    category: str = Field(min_length=2, max_length=100)
    location: str

class ComplaintUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None



class ComplaintResponse(BaseModel):
    id: int
    title: str
    description: str
    category: str
    
    status: str
    priority: str
    
    ai_category: str | None = None
    ai_priority: str | None = None
    sentiment: str | None = None
    department: str
    urgency_score: int | None = None
    latitude: float | None = None
    longitude: float | None = None

    created_at: datetime
    class Config:
        from_attributes = True