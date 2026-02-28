"""
Dataset service — CRUD, cleaning operations, data loading.
"""
import uuid
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.dataset import Dataset, CleaningOperation
from app.core.exceptions import NotFoundError


async def create_dataset(
    db: AsyncSession,
    *,
    file_id: uuid.UUID,
    project_id: uuid.UUID,
    name: str,
    column_schema: dict,
    row_count: int | None = None,
    column_count: int | None = None,
    quality_score: int | None = None,
    quality_details: dict | None = None,
    storage_key_parquet: str | None = None,
    storage_key_csv: str | None = None,
) -> Dataset:
    dataset = Dataset(
        id=uuid.uuid4(),
        file_id=file_id,
        project_id=project_id,
        name=name,
        column_schema=column_schema,
        row_count=row_count,
        column_count=column_count,
        quality_score=quality_score,
        quality_details=quality_details,
        storage_key_parquet=storage_key_parquet,
        storage_key_csv=storage_key_csv,
    )
    db.add(dataset)
    await db.commit()
    await db.refresh(dataset)
    return dataset


async def get_dataset(
    db: AsyncSession, *, dataset_id: uuid.UUID, user_id: uuid.UUID
) -> Dataset:
    """Fetch dataset ensuring the user owns the parent project."""
    from app.models.project import Project

    result = await db.execute(
        select(Dataset)
        .join(Project, Dataset.project_id == Project.id)
        .where(Dataset.id == dataset_id, Project.user_id == user_id)
    )
    dataset = result.scalar_one_or_none()
    if dataset is None:
        raise NotFoundError("Dataset not found")
    return dataset


async def list_datasets(
    db: AsyncSession, *, project_id: uuid.UUID, user_id: uuid.UUID, offset: int = 0, limit: int = 50
) -> tuple[list[Dataset], int]:
    from app.models.project import Project

    count_result = await db.execute(
        select(func.count())
        .select_from(Dataset)
        .join(Project, Dataset.project_id == Project.id)
        .where(Dataset.project_id == project_id, Project.user_id == user_id)
    )
    total = count_result.scalar() or 0

    result = await db.execute(
        select(Dataset)
        .join(Project, Dataset.project_id == Project.id)
        .where(Dataset.project_id == project_id, Project.user_id == user_id)
        .order_by(Dataset.created_at.desc())
        .offset(offset)
        .limit(limit)
    )
    return list(result.scalars().all()), total


async def log_cleaning_operation(
    db: AsyncSession,
    *,
    dataset_id: uuid.UUID,
    user_id: uuid.UUID,
    operation_type: str,
    column_name: str | None = None,
    operation_params: dict | None = None,
    rows_before: int | None = None,
    rows_after: int | None = None,
    quality_score_before: int | None = None,
    quality_score_after: int | None = None,
) -> CleaningOperation:
    op = CleaningOperation(
        id=uuid.uuid4(),
        dataset_id=dataset_id,
        user_id=user_id,
        operation_type=operation_type,
        column_name=column_name,
        operation_params=operation_params,
        rows_before=rows_before,
        rows_after=rows_after,
        quality_score_before=quality_score_before,
        quality_score_after=quality_score_after,
    )
    db.add(op)
    await db.commit()
    await db.refresh(op)
    return op
