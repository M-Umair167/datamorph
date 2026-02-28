import uuid
from datetime import datetime
from pydantic import BaseModel, Field


# ─── Request Schemas ───────────────────────────────────────────

class UploadResponse(BaseModel):
    file_id: uuid.UUID
    status: str
    detected_format: str | None
    progress_url: str
    estimated_seconds: int | None


class FileProgressResponse(BaseModel):
    status: str
    progress: int
    extraction_metadata: dict | None = None
    error: str | None = None


# ─── File Response ─────────────────────────────────────────────

class FileResponse(BaseModel):
    id: uuid.UUID
    project_id: uuid.UUID
    original_filename: str
    file_size_bytes: int
    mime_type: str | None
    detected_format: str | None
    status: str
    processing_progress: int
    extraction_metadata: dict | None
    extracted_schema: dict | None
    error_message: str | None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class FileListResponse(BaseModel):
    files: list[FileResponse]
    total: int
