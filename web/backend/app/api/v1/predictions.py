"""
Predictions API routes — ML model training and inference.
"""
import uuid
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.api.deps import get_current_user, PaginationParams
from app.models.user import User
from app.models.prediction import Prediction
from app.schemas.prediction import PredictionCreateRequest, PredictionResponse, PredictionListResponse
from app.services.dataset_service import get_dataset
from app.core.exceptions import NotFoundError

from sqlalchemy import select, func

router = APIRouter(prefix="/predictions", tags=["Predictions"])


@router.post("/dataset/{dataset_id}", response_model=PredictionResponse, status_code=status.HTTP_201_CREATED)
async def create_prediction(
    dataset_id: uuid.UUID,
    body: PredictionCreateRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Start a prediction/ML training job."""
    dataset = await get_dataset(db, dataset_id=dataset_id, user_id=current_user.id)

    prediction = Prediction(
        id=uuid.uuid4(),
        dataset_id=dataset_id,
        project_id=dataset.project_id,
        user_id=current_user.id,
        name=body.name,
        prediction_type=body.prediction_type,
        target_column=body.target_column,
        feature_columns={"columns": body.feature_columns},
        model_algorithm=body.model_algorithm,
        hyperparameters=body.hyperparameters,
        forecast_horizon=body.forecast_horizon,
        status="queued",
    )
    db.add(prediction)
    await db.commit()
    await db.refresh(prediction)

    # Queue Celery training task
    try:
        from app.tasks.training import train_model
        train_model.delay(str(prediction.id))
    except Exception:
        pass  # Celery may not be running

    return PredictionResponse.model_validate(prediction)


@router.get("/{prediction_id}", response_model=PredictionResponse)
async def get_prediction(
    prediction_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    from app.models.project import Project

    result = await db.execute(
        select(Prediction)
        .join(Project, Prediction.project_id == Project.id)
        .where(Prediction.id == prediction_id, Project.user_id == current_user.id)
    )
    prediction = result.scalar_one_or_none()
    if prediction is None:
        raise NotFoundError("Prediction not found")
    return PredictionResponse.model_validate(prediction)


@router.get("/project/{project_id}", response_model=PredictionListResponse)
async def list_predictions(
    project_id: uuid.UUID,
    pagination: PaginationParams = Depends(),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    from app.models.project import Project

    count_result = await db.execute(
        select(func.count())
        .select_from(Prediction)
        .join(Project, Prediction.project_id == Project.id)
        .where(Prediction.project_id == project_id, Project.user_id == current_user.id)
    )
    total = count_result.scalar() or 0

    result = await db.execute(
        select(Prediction)
        .join(Project, Prediction.project_id == Project.id)
        .where(Prediction.project_id == project_id, Project.user_id == current_user.id)
        .order_by(Prediction.created_at.desc())
        .offset(pagination.offset)
        .limit(pagination.page_size)
    )
    predictions = list(result.scalars().all())

    return PredictionListResponse(
        predictions=[PredictionResponse.model_validate(p) for p in predictions],
        total=total,
    )
