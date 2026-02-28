"""
File upload API routes.
"""
import uuid
import os
from fastapi import APIRouter, UploadFile, File as FastAPIFile, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.api.deps import get_current_user, PaginationParams
from app.models.user import User
from app.config import settings
from app.schemas.upload import UploadResponse, FileProgressResponse, FileResponse, FileListResponse
from app.services.file_service import (
    check_storage_limits, stream_to_temp, detect_file_type,
    estimate_processing_time, create_file_record,
    get_file, list_project_files, delete_file_record,
)
from app.core.storage import upload_file_to_s3

router = APIRouter(prefix="/uploads", tags=["Uploads"])


@router.post("/", response_model=UploadResponse, status_code=status.HTTP_201_CREATED)
async def upload_file(
    file: UploadFile = FastAPIFile(...),
    project_id: uuid.UUID | None = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Universal upload endpoint — handles CSV, PDF, Image automatically."""
    file_size = file.size or 0
    await check_storage_limits(current_user, file_size)

    # Stream to temp
    temp_path = await stream_to_temp(file)

    try:
        # Detect format
        detection = detect_file_type(temp_path, file.filename or "file")

        # Create a project if none specified
        if project_id is None:
            from app.services.project_service import create_project
            project = await create_project(db, user_id=current_user.id, name=file.filename or "Untitled")
            project_id = project.id

        # Upload to S3
        storage_key = f"{current_user.id}/{project_id}/{uuid.uuid4()}{os.path.splitext(file.filename or '')[1]}"
        await upload_file_to_s3(
            bucket=settings.S3_BUCKET_NAME,
            key=storage_key,
            file_path=temp_path,
            content_type=detection["mime_type"],
        )

        # Create DB record
        file_record = await create_file_record(
            db,
            user_id=current_user.id,
            project_id=project_id,
            filename=file.filename or "file",
            size=file_size,
            detected_format=detection["format"],
            mime_type=detection["mime_type"],
            storage_bucket=settings.S3_BUCKET_NAME,
            storage_key=storage_key,
        )

        # Queue async extraction (Celery)
        try:
            from app.tasks.extraction import process_file_extraction
            process_file_extraction.delay(str(file_record.id))
        except Exception:
            pass  # Celery may not be running in dev

        return UploadResponse(
            file_id=file_record.id,
            status="processing",
            detected_format=detection["format"],
            progress_url=f"/api/v1/uploads/{file_record.id}/progress",
            estimated_seconds=estimate_processing_time(detection["format"], file_size),
        )
    finally:
        # Clean up temp file
        try:
            os.unlink(temp_path)
        except OSError:
            pass


@router.get("/{file_id}/progress", response_model=FileProgressResponse)
async def get_upload_progress(
    file_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Polling endpoint for extraction progress."""
    f = await get_file(db, file_id=file_id, user_id=current_user.id)
    return FileProgressResponse(
        status=f.status,
        progress=f.processing_progress,
        extraction_metadata=f.extraction_metadata,
        error=f.error_message,
    )


@router.get("/{file_id}", response_model=FileResponse)
async def get_file_info(
    file_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    f = await get_file(db, file_id=file_id, user_id=current_user.id)
    return FileResponse.model_validate(f)


@router.get("/project/{project_id}", response_model=FileListResponse)
async def list_files(
    project_id: uuid.UUID,
    pagination: PaginationParams = Depends(),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    files, total = await list_project_files(
        db, project_id=project_id, user_id=current_user.id,
        offset=pagination.offset, limit=pagination.page_size,
    )
    return FileListResponse(
        files=[FileResponse.model_validate(f) for f in files],
        total=total,
    )


@router.delete("/{file_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_file(
    file_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    await delete_file_record(db, file_id=file_id, user_id=current_user.id)
