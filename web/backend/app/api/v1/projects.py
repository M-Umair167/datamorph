"""
Project CRUD API routes.
"""
import uuid
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.api.deps import get_current_user, PaginationParams
from app.models.user import User
from app.schemas.project import (
    ProjectCreateRequest, ProjectUpdateRequest,
    ProjectResponse, ProjectListResponse, ProjectDetailResponse,
)
from app.services.project_service import (
    create_project, get_project, list_projects, update_project, delete_project, get_project_detail,
)

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.post("/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create(
    body: ProjectCreateRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = await create_project(
        db, user_id=current_user.id, name=body.name,
        description=body.description, settings=body.settings,
    )
    return ProjectResponse.model_validate(project)


@router.get("/", response_model=ProjectListResponse)
async def list_all(
    pagination: PaginationParams = Depends(),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    projects, total = await list_projects(
        db, user_id=current_user.id,
        offset=pagination.offset, limit=pagination.page_size,
    )
    return ProjectListResponse(
        projects=[ProjectResponse.model_validate(p) for p in projects],
        total=total,
    )


@router.get("/{project_id}", response_model=ProjectDetailResponse)
async def get_one(
    project_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    detail = await get_project_detail(db, project_id=project_id, user_id=current_user.id)
    return ProjectDetailResponse(**detail)


@router.patch("/{project_id}", response_model=ProjectResponse)
async def update(
    project_id: uuid.UUID,
    body: ProjectUpdateRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = await update_project(
        db, project_id=project_id, user_id=current_user.id,
        **body.model_dump(exclude_unset=True),
    )
    return ProjectResponse.model_validate(project)


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete(
    project_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    await delete_project(db, project_id=project_id, user_id=current_user.id)
