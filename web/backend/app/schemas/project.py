import uuid
from datetime import datetime
from pydantic import BaseModel, Field


# ─── Request Schemas ───────────────────────────────────────────

class ProjectCreateRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: str | None = None
    settings: dict | None = None


class ProjectUpdateRequest(BaseModel):
    name: str | None = Field(None, min_length=1, max_length=255)
    description: str | None = None
    settings: dict | None = None
    status: str | None = None


# ─── Response Schemas ──────────────────────────────────────────

class ProjectResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    name: str
    description: str | None
    status: str
    settings: dict
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ProjectListResponse(BaseModel):
    projects: list[ProjectResponse]
    total: int


class ProjectDetailResponse(ProjectResponse):
    file_count: int = 0
    dataset_count: int = 0
