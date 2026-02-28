"""
Data cleaning Celery task — async cleaning operations.
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


async def _clean(dataset_id: str, operations: list[dict]):
    from sqlalchemy import select
    from app.core.database import async_session
    from app.models.dataset import Dataset, CleaningOperation

    async with async_session() as db:
        result = await db.execute(select(Dataset).where(Dataset.id == uuid.UUID(dataset_id)))
        dataset = result.scalar_one_or_none()
        if dataset is None:
            return

        # In production: load parquet from S3, apply pandas operations, save new version
        for op_data in operations:
            op = CleaningOperation(
                id=uuid.uuid4(),
                dataset_id=dataset.id,
                operation_type=op_data.get("type", "unknown"),
                column_name=op_data.get("column_name"),
                operation_params=op_data.get("params"),
                rows_before=dataset.row_count,
                rows_after=dataset.row_count,  # Placeholder
            )
            db.add(op)

        await db.commit()


@celery_app.task(bind=True, max_retries=2)
def apply_cleaning_operations(self, dataset_id: str, operations: list[dict]):
    """Background task: apply cleaning operations to a dataset."""
    try:
        _run_async(_clean(dataset_id, operations))
    except Exception as exc:
        self.retry(exc=exc)
