"""
File extraction Celery task — parse uploaded files into structured datasets.
"""
import uuid
import asyncio
from app.tasks import celery_app


def _run_async(coro):
    """Helper to run async code from sync Celery tasks."""
    loop = asyncio.new_event_loop()
    try:
        return loop.run_until_complete(coro)
    finally:
        loop.close()


async def _process(file_id: str):
    from sqlalchemy import select
    from app.core.database import async_session
    from app.models.file import File
    from app.models.dataset import Dataset

    async with async_session() as db:
        result = await db.execute(select(File).where(File.id == uuid.UUID(file_id)))
        file = result.scalar_one_or_none()
        if file is None:
            return

        try:
            # Update status
            file.status = "processing"
            file.processing_progress = 10
            await db.commit()

            # --- Format-specific extraction ---
            fmt = file.detected_format or "unknown"
            schema = {}
            row_count = 0
            column_count = 0

            if fmt in ("csv", "tsv", "excel"):
                # In production: download from S3, parse with pandas
                schema = {"column_1": "string", "column_2": "number"}
                row_count = 100
                column_count = 2
                file.processing_progress = 60

            elif fmt == "pdf":
                # In production: OCR + table extraction
                schema = {"page": "integer", "text": "string"}
                row_count = 10
                column_count = 2
                file.processing_progress = 60

            elif fmt == "image":
                # In production: OCR + structured extraction
                schema = {"extracted_text": "string", "confidence": "float"}
                row_count = 1
                column_count = 2
                file.processing_progress = 60

            elif fmt == "json":
                schema = {"key": "string", "value": "any"}
                row_count = 50
                column_count = 2
                file.processing_progress = 60

            await db.commit()

            # Create dataset record
            dataset = Dataset(
                id=uuid.uuid4(),
                file_id=file.id,
                project_id=file.project_id,
                name=file.original_filename,
                column_schema=schema,
                row_count=row_count,
                column_count=column_count,
                quality_score=85,
                version=1,
            )
            db.add(dataset)

            # Mark file as ready
            file.status = "ready"
            file.processing_progress = 100
            file.extracted_schema = schema
            file.extraction_metadata = {
                "format": fmt,
                "row_count": row_count,
                "column_count": column_count,
            }
            await db.commit()

        except Exception as e:
            file.status = "error"
            file.error_message = str(e)
            file.retry_count += 1
            await db.commit()
            raise


@celery_app.task(bind=True, max_retries=3, default_retry_delay=30)
def process_file_extraction(self, file_id: str):
    """
    Background task: extract structured data from uploaded file.
    Triggered after file upload.
    """
    try:
        _run_async(_process(file_id))
    except Exception as exc:
        self.retry(exc=exc)
