from app.models.complaint import Complaint
from app.repositories.complaint_repository import ComplaintRepository
from app.schemas.complaint import ComplaintCreate, ComplaintUpdate

from app.ai.complaint_analyzer import ComplaintAnalyzer
from app.ai.similarity_engine import SimilarityEngine
from app.ai.geocoder import GeoCoder


class ComplaintService:
    def __init__(self, repository: ComplaintRepository):
        self.repository = repository

    def create_complaint(
        self,
        data: ComplaintCreate,
        user_id: int,
    ):
        # ---------------- AI Analysis ----------------
        analysis = ComplaintAnalyzer.analyze(
            data.title,
            data.description,
        )

        # ---------------- Similarity Detection ----------------
        new_text = f"{data.title} {data.description}"

        complaints = self.repository.get_all()

        highest_score = 0
        best_match = None

        for complaint in complaints:
            old_text = f"{complaint.title} {complaint.description}"

            score = SimilarityEngine.similarity(
                new_text,
                old_text,
            )

            if score > highest_score:
                highest_score = score
                best_match = complaint

        # ---------------- Cluster Assignment ----------------
        if highest_score >= 85 and best_match is not None:
            cluster_id = best_match.cluster_id
        else:
            max_cluster = self.repository.get_max_cluster_id()

            if max_cluster is None:
                cluster_id = 1
            else:
                cluster_id = max_cluster + 1

        # ---------------- Geocoding ----------------
        coordinates = GeoCoder.get_coordinates(
            data.location
        )

        latitude = coordinates["latitude"]
        longitude = coordinates["longitude"]

        # ---------------- Save Complaint ----------------
        complaint = Complaint(
            title=data.title,
            description=data.description,
            category=data.category,
            user_id=user_id,

            location=data.location,
            latitude=latitude,
            longitude=longitude,

            cluster_id=cluster_id,

            ai_category=analysis["ai_category"],
            ai_priority=analysis["ai_priority"],
            sentiment=analysis["sentiment"],
            department=analysis["department"],
            urgency_score=analysis["urgency_score"],
        )

        return self.repository.create(complaint)

    def get_all_complaints(self):
        return self.repository.get_all()

    def get_complaint(self, complaint_id: int):
        return self.repository.get_by_id(complaint_id)

    def update_complaint(
        self,
        complaint_id: int,
        data: ComplaintUpdate,
        user_id: int,
    ):
        complaint = self.repository.get_by_id(
            complaint_id
        )

        if complaint is None:
            raise ValueError("Complaint not found.")

        if complaint.user_id != user_id:
            raise PermissionError(
                "You are not allowed to update this complaint."
            )

        update_data = data.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(complaint, key, value)

        return self.repository.update(complaint)

    def delete_complaint(
        self,
        complaint_id: int,
        user_id: int,
    ):
        complaint = self.repository.get_by_id(
            complaint_id
        )

        if complaint is None:
            raise ValueError("Complaint not found.")

        if complaint.user_id != user_id:
            raise PermissionError(
                "You are not allowed to delete this complaint."
            )

        self.repository.delete(complaint)

    def get_cluster_analytics(self):
        statistics = self.repository.get_cluster_statistics()

        result = []

        for cluster in statistics:
            complaints = self.repository.get_by_cluster(
                cluster.cluster_id
            )

            first = complaints[0]

            result.append(
                {
                    "cluster_id": cluster.cluster_id,
                    "total_complaints": cluster.total,
                    "category": first.ai_category,
                    "department": first.department,
                    "priority": first.ai_priority,
                    "latest_complaint": str(cluster.latest),
                    "affected_citizens": cluster.total,
                }
            )

        return result

    def get_map_data(self):
        complaints = self.repository.get_map_data()

        result = []

        for complaint in complaints:

            if (
                complaint.latitude is None
                or complaint.longitude is None
            ):
                continue

            result.append(
                {
                    "id": complaint.id,
                    "title": complaint.title,
                    "cluster_id": complaint.cluster_id,
                    "latitude": complaint.latitude,
                    "longitude": complaint.longitude,
                    "priority": complaint.ai_priority,
                    "department": complaint.department,
                    "category": complaint.ai_category,
                }
            )

        return result