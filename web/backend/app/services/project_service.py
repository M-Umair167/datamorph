"""
Project service — CRUD operations for projects.
"""
import uuid
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.project import Project
from app.models.file import File
from app.models.dataset import Dataset
from app.core.exceptions import NotFoundError, ForbiddenError


async def create_project(
    db: AsyncSession, *, user_id: uuid.UUID, name: str, description: str | None = None, settings: dict | None = None
) -> Project:
    project = Project(
        id=uuid.uuid4(),
        user_id=user_id,
        name=name,
        description=description,
        settings=settings or {},
    )
    db.add(project)
    await db.commit()
    await db.refresh(project)
    return project


async def get_project(db: AsyncSession, *, project_id: uuid.UUID, user_id: uuid.UUID) -> Project:
    result = await db.execute(
        select(Project).where(Project.id == project_id, Project.user_id == user_id)
    )
    project = result.scalar_one_or_none()
    if project is None:
        raise NotFoundError("Project not found")
    return project


async def list_projects(
    db: AsyncSession, *, user_id: uuid.UUID, offset: int = 0, limit: int = 20
) -> tuple[list[Project], int]:
    # Count
    count_result = await db.execute(
        select(func.count()).select_from(Project).where(Project.user_id == user_id)
    )
    total = count_result.scalar() or 0

    # Fetch
    result = await db.execute(
        select(Project)
        .where(Project.user_id == user_id)
        .order_by(Project.updated_at.desc())
        .offset(offset)
        .limit(limit)
    )
    projects = list(result.scalars().all())
    return projects, total


async def update_project(
    db: AsyncSession, *, project_id: uuid.UUID, user_id: uuid.UUID, **fields
) -> Project:
    project = await get_project(db, project_id=project_id, user_id=user_id)
    for key, value in fields.items():
        if value is not None:
            setattr(project, key, value)
    await db.commit()
    await db.refresh(project)
    return project


async def delete_project(db: AsyncSession, *, project_id: uuid.UUID, user_id: uuid.UUID) -> None:
    project = await get_project(db, project_id=project_id, user_id=user_id)
    await db.delete(project)
    await db.commit()


async def get_project_detail(
    db: AsyncSession, *, project_id: uuid.UUID, user_id: uuid.UUID
) -> dict:
    project = await get_project(db, project_id=project_id, user_id=user_id)

    file_count_result = await db.execute(
        select(func.count()).select_from(File).where(File.project_id == project_id)
    )
    dataset_count_result = await db.execute(
        select(func.count()).select_from(Dataset).where(Dataset.project_id == project_id)
    )

    return {
        **{c.name: getattr(project, c.name) for c in project.__table__.columns},
        "file_count": file_count_result.scalar() or 0,
        "dataset_count": dataset_count_result.scalar() or 0,
    }
