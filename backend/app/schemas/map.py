from pydantic import BaseModel

class ComplaintMapResponse(BaseModel):
    id: int
    title: str

    cluster_id: int

    latitude: float
    longitude: float

    priority: str
    department: str
    category: str