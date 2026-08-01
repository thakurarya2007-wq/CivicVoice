from sqlalchemy.orm import Session

from app.models.complaint import Complaint

from sqlalchemy import func


class ComplaintRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, complaint: Complaint):
        self.db.add(complaint)
        self.db.commit()
        self.db.refresh(complaint)
        return complaint
    
    def update(self, complaint: Complaint):
        self.db.commit()
        self.db.refresh(complaint)
        return complaint
    
    def get_by_id(self, complaint_id: int):
        return (
            self.db.query(Complaint)
            .filter(Complaint.id == complaint_id)
            .first()
        )
    
    def get_by_cluster(self, cluster_id: int):
        return (
            self.db.query(Complaint)
            .filter(Complaint.cluster_id == cluster_id)
            .all()
        )
    
    def get_max_cluster_id(self):
        return (
            self.db.query(func.max(Complaint.cluster_id))
            .scalar()
        )

    def get_all(self):
        return (
            self.db.query(Complaint)
            .order_by(Complaint.created_at.desc())
            .all()
        )
        

    def delete(self, complaint: Complaint):
        self.db.delete(complaint)
        self.db.commit()

    def get_cluster_statistics(self):
        return (
            self.db.query(
                Complaint.cluster_id,
                func.count(Complaint.id).label("total"),
                func.max(Complaint.created_at).label("latest"),
            )
            .group_by(Complaint.cluster_id)
            .all()
        )

    def get_map_data(self):
        return (
            self.db.query(Complaint)
            .filter(
                Complaint.latitude.isnot(None),
                Complaint.longitude.isnot(None),
            )
            .all()
        )
    