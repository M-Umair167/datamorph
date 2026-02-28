"""
Dataset API routes — CRUD, cleaning, visualization.
"""
import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.api.deps import get_current_user, PaginationParams
from app.models.user import User
from app.schemas.dataset import (
    DatasetResponse, DatasetListResponse, DatasetPreviewResponse,
    CleaningOperationSchema, CleaningResult,
    VisualizationConfig, VisualizationResponse,
)
from app.services.dataset_service import get_dataset, list_datasets, log_cleaning_operation

router = APIRouter(prefix="/datasets", tags=["Datasets"])


@router.get("/project/{project_id}", response_model=DatasetListResponse)
async def list_project_datasets(
    project_id: uuid.UUID,
    pagination: PaginationParams = Depends(),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    datasets, total = await list_datasets(
        db, project_id=project_id, user_id=current_user.id,
        offset=pagination.offset, limit=pagination.page_size,
    )
    return DatasetListResponse(
        datasets=[DatasetResponse.model_validate(d) for d in datasets],
        total=total,
    )


@router.get("/{dataset_id}", response_model=DatasetResponse)
async def get_one(
    dataset_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    dataset = await get_dataset(db, dataset_id=dataset_id, user_id=current_user.id)
    return DatasetResponse.model_validate(dataset)


@router.get("/{dataset_id}/preview", response_model=DatasetPreviewResponse)
async def preview_data(
    dataset_id: uuid.UUID,
    page: int = 1,
    page_size: int = 100,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Return a paginated preview of the dataset rows."""
    dataset = await get_dataset(db, dataset_id=dataset_id, user_id=current_user.id)

    # In production, load from Parquet in S3
    # For now, return schema-based stub
    columns = list(dataset.column_schema.keys()) if isinstance(dataset.column_schema, dict) else []

    return DatasetPreviewResponse(
        columns=columns,
        rows=[],
        total_rows=dataset.row_count or 0,
        page=page,
        page_size=page_size,
    )


@router.post("/{dataset_id}/clean", response_model=CleaningResult)
async def clean_dataset(
    dataset_id: uuid.UUID,
    operations: list[CleaningOperationSchema],
    auto_apply: bool = False,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Apply cleaning operations with optional preview mode."""
    dataset = await get_dataset(db, dataset_id=dataset_id, user_id=current_user.id)

    if auto_apply:
        for op in operations:
            await log_cleaning_operation(
                db,
                dataset_id=dataset_id,
                user_id=current_user.id,
                operation_type=op.type,
                column_name=op.column_name,
                operation_params=op.params,
            )
        return CleaningResult(dataset_id=dataset_id, status="applied")

    # Preview mode — return stubs (actual pandas logic in Celery tasks)
    previews = [
        {"operation": op.type, "preview": {}, "affected_rows": 0}
        for op in operations
    ]
    return CleaningResult(status="preview", previews=previews)


@router.post("/{dataset_id}/visualize", response_model=VisualizationResponse)
async def create_visualization(
    dataset_id: uuid.UUID,
    config: VisualizationConfig,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Generate a chart visualization from a dataset."""
    import uuid as _uuid
    from datetime import datetime, timezone
    from app.models.prediction import Visualization

    dataset = await get_dataset(db, dataset_id=dataset_id, user_id=current_user.id)

    viz = Visualization(
        id=_uuid.uuid4(),
        dataset_id=dataset_id,
        project_id=dataset.project_id,
        user_id=current_user.id,
        name=config.title or f"{config.chart_type} chart",
        chart_type=config.chart_type,
        config=config.model_dump(),
    )
    db.add(viz)
    await db.commit()
    await db.refresh(viz)

    return VisualizationResponse.model_validate(viz)
