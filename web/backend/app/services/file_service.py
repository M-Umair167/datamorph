"""
File upload service — storage, detection, record management.
"""
import uuid
import os
import tempfile
import shutil
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import UploadFile

from app.models.file import File
from app.models.user import User
from app.core.storage import upload_file_to_s3, delete_file_from_s3
from app.core.exceptions import NotFoundError, ForbiddenError, StorageLimitError

# Tier storage limits (bytes)
TIER_LIMITS = {
    "starter": 500 * 1024 * 1024,        # 500 MB
    "professional": 10 * 1024**3,          # 10 GB
    "team": 50 * 1024**3,                  # 50 GB
    "enterprise": 500 * 1024**3,           # 500 GB
}


async def check_storage_limits(user: User, file_size: int) -> None:
    limit = TIER_LIMITS.get(user.tier, TIER_LIMITS["starter"])
    if user.storage_used_bytes + file_size > limit:
        raise StorageLimitError(
            f"Storage limit exceeded. Used: {user.storage_used_bytes}, "
            f"Limit: {limit}, File: {file_size}"
        )


async def stream_to_temp(upload: UploadFile) -> str:
    """Stream uploaded file to a temporary location."""
    suffix = os.path.splitext(upload.filename or "file")[1]
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
    try:
        shutil.copyfileobj(upload.file, tmp)
    finally:
        tmp.close()
    return tmp.name


def detect_file_type(file_path: str, filename: str) -> dict:
    """Basic file-type detection by extension (placeholder for magic-byte detection)."""
    ext = os.path.splitext(filename)[1].lower()
    format_map = {
        ".csv": ("csv", "text/csv"),
        ".tsv": ("tsv", "text/tab-separated-values"),
        ".xls": ("excel", "application/vnd.ms-excel"),
        ".xlsx": ("excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"),
        ".pdf": ("pdf", "application/pdf"),
        ".json": ("json", "application/json"),
        ".png": ("image", "image/png"),
        ".jpg": ("image", "image/jpeg"),
        ".jpeg": ("image", "image/jpeg"),
        ".webp": ("image", "image/webp"),
        ".parquet": ("parquet", "application/octet-stream"),
    }
    fmt, mime = format_map.get(ext, ("unknown", "application/octet-stream"))
    return {"format": fmt, "confidence": 0.95, "mime_type": mime}


def estimate_processing_time(fmt: str, size: int) -> int:
    """Rough estimate of processing time in seconds."""
    base = {"csv": 2, "excel": 3, "pdf": 10, "image": 15, "json": 2}
    seconds = base.get(fmt, 5)
    # Add time for larger files
    mb = size / (1024 * 1024)
    return int(seconds + mb * 0.5)


async def create_file_record(
    db: AsyncSession,
    *,
    user_id: uuid.UUID,
    project_id: uuid.UUID,
    filename: str,
    size: int,
    detected_format: str,
    mime_type: str,
    storage_bucket: str,
    storage_key: str,
) -> File:
    file = File(
        id=uuid.uuid4(),
        project_id=project_id,
        user_id=user_id,
        original_filename=filename,
        file_size_bytes=size,
        mime_type=mime_type,
        detected_format=detected_format,
        storage_bucket=storage_bucket,
        storage_key_original=storage_key,
        status="uploaded",
    )
    db.add(file)

    # Update user storage used
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one()
    user.storage_used_bytes += size

    await db.commit()
    await db.refresh(file)
    return file


async def get_file(
    db: AsyncSession, *, file_id: uuid.UUID, user_id: uuid.UUID
) -> File:
    result = await db.execute(
        select(File).where(File.id == file_id, File.user_id == user_id)
    )
    file = result.scalar_one_or_none()
    if file is None:
        raise NotFoundError("File not found")
    return file


async def list_project_files(
    db: AsyncSession, *, project_id: uuid.UUID, user_id: uuid.UUID, offset: int = 0, limit: int = 50
) -> tuple[list[File], int]:
    count_result = await db.execute(
        select(func.count()).select_from(File).where(
            File.project_id == project_id, File.user_id == user_id
        )
    )
    total = count_result.scalar() or 0

    result = await db.execute(
        select(File)
        .where(File.project_id == project_id, File.user_id == user_id)
        .order_by(File.created_at.desc())
        .offset(offset)
        .limit(limit)
    )
    return list(result.scalars().all()), total


async def delete_file_record(
    db: AsyncSession, *, file_id: uuid.UUID, user_id: uuid.UUID
) -> None:
    file = await get_file(db, file_id=file_id, user_id=user_id)

    # Clean up S3
    try:
        await delete_file_from_s3(file.storage_bucket, file.storage_key_original)
        if file.storage_key_processed:
            await delete_file_from_s3(file.storage_bucket, file.storage_key_processed)
    except Exception:
        pass  # Best-effort cleanup

    # Update user storage
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one()
    user.storage_used_bytes = max(0, user.storage_used_bytes - file.file_size_bytes)

    await db.delete(file)
    await db.commit()
