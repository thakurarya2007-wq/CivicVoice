from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.dependencies import get_db
from app.models.user import User
from app.repositories.complaint_repository import ComplaintRepository
from app.schemas.complaint import (
    ComplaintCreate,
    ComplaintUpdate,
    ComplaintResponse,
)
from app.schemas.analytics import ClusterAnalyticsResponse
from app.schemas.map import ComplaintMapResponse
from app.services.complaint_service import ComplaintService


router = APIRouter(
    prefix="/complaints",
    tags=["Complaints"],
)


# ---------------- CREATE ----------------

@router.post(
    "",
    response_model=ComplaintResponse,
    status_code=201,
)
def create_complaint(
    data: ComplaintCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    repository = ComplaintRepository(db)
    service = ComplaintService(repository)

    try:
        return service.create_complaint(
            data=data,
            user_id=current_user.id,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=409,
            detail=str(e),
        )


# ---------------- GET ALL ----------------

@router.get(
    "",
    response_model=list[ComplaintResponse],
)
def get_all_complaints(
    db: Session = Depends(get_db),
):
    repository = ComplaintRepository(db)
    service = ComplaintService(repository)

    return service.get_all_complaints()


# ---------------- MAP ----------------

@router.get(
    "/map",
    response_model=list[ComplaintMapResponse],
)
def get_map_data(
    db: Session = Depends(get_db),
):
    repository = ComplaintRepository(db)
    service = ComplaintService(repository)

    return service.get_map_data()


# ---------------- CLUSTER ANALYTICS ----------------

@router.get(
    "/analytics/clusters",
    response_model=list[ClusterAnalyticsResponse],
)
def get_cluster_analytics(
    db: Session = Depends(get_db),
):
    repository = ComplaintRepository(db)
    service = ComplaintService(repository)

    return service.get_cluster_analytics()


# ---------------- GET BY ID ----------------

@router.get(
    "/{complaint_id}",
    response_model=ComplaintResponse,
)
def get_complaint(
    complaint_id: int,
    db: Session = Depends(get_db),
):
    repository = ComplaintRepository(db)
    service = ComplaintService(repository)

    complaint = service.get_complaint(complaint_id)

    if complaint is None:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found.",
        )

    return complaint


# ---------------- UPDATE ----------------

@router.put(
    "/{complaint_id}",
    response_model=ComplaintResponse,
)
def update_complaint(
    complaint_id: int,
    data: ComplaintUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    repository = ComplaintRepository(db)
    service = ComplaintService(repository)

    try:
        return service.update_complaint(
            complaint_id=complaint_id,
            data=data,
            user_id=current_user.id,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )

    except PermissionError as e:
        raise HTTPException(
            status_code=403,
            detail=str(e),
        )


# ---------------- DELETE ----------------

@router.delete(
    "/{complaint_id}",
    status_code=204,
)
def delete_complaint(
    complaint_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    repository = ComplaintRepository(db)
    service = ComplaintService(repository)

    try:
        service.delete_complaint(
            complaint_id=complaint_id,
            user_id=current_user.id,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )

    except PermissionError as e:
        raise HTTPException(
            status_code=403,
            detail=str(e),
        )