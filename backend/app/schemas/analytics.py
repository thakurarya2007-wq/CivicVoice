from pydantic import BaseModel

class ClusterAnalyticsResponse(BaseModel):
    cluster_id: int
    total_complaints: int

    category: str
    department: str
    priority: str

    latest_complaint: str
    
    affected_citizens: int