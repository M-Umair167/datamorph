"""
Export generation Celery task — generate downloadable files.
"""
import uuid
import asyncio
from app.tasks import celery_app


def _run_async(coro):
    loop = asyncio.new_event_loop()
    try:
        return loop.run_until_complete(coro)
    finally:
        loop.close()


async def _export(dataset_id: str, export_format: str):
    from sqlalchemy import select
    from app.core.database import async_session
    from app.models.dataset import Dataset

    async with async_session() as db:
        result = await db.execute(select(Dataset).where(Dataset.id == uuid.UUID(dataset_id)))
        dataset = result.scalar_one_or_none()
        if dataset is None:
            return None

        # In production: load parquet, convert to target format, upload to S3
        storage_key = f"exports/{dataset_id}/{uuid.uuid4()}.{export_format}"

        if export_format == "csv":
            dataset.storage_key_csv = storage_key
        elif export_format == "parquet":
            dataset.storage_key_parquet = storage_key

        await db.commit()
        return storage_key


@celery_app.task(bind=True, max_retries=2)
def generate_export(self, dataset_id: str, export_format: str = "csv"):
    """Background task: generate an export file for download."""
    try:
        return _run_async(_export(dataset_id, export_format))
    except Exception as exc:
        self.retry(exc=exc)
