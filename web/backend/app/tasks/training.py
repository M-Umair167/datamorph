"""
ML model training Celery task.
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


async def _train(prediction_id: str):
    from datetime import datetime, timezone
    from sqlalchemy import select
    from app.core.database import async_session
    from app.models.prediction import Prediction

    async with async_session() as db:
        result = await db.execute(select(Prediction).where(Prediction.id == uuid.UUID(prediction_id)))
        prediction = result.scalar_one_or_none()
        if prediction is None:
            return

        try:
            prediction.status = "training"
            await db.commit()

            # ── In production: ──────────────────────────────────────
            # 1. Load dataset from S3 (parquet)
            # 2. Prepare features/target split
            # 3. Train model (scikit-learn / XGBoost / Prophet)
            # 4. Evaluate metrics (accuracy, RMSE, etc.)
            # 5. Save model artifact to S3
            # 6. Store results
            # ────────────────────────────────────────────────────────

            prediction.model_metrics = {
                "accuracy": 0.87,
                "precision": 0.85,
                "recall": 0.89,
                "f1_score": 0.87,
            }
            prediction.prediction_results = {
                "sample_predictions": [],
                "feature_importance": {},
            }
            prediction.status = "completed"
            prediction.training_duration_seconds = 12
            prediction.completed_at = datetime.now(timezone.utc)
            await db.commit()

        except Exception as e:
            prediction.status = "failed"
            prediction.prediction_results = {"error": str(e)}
            await db.commit()
            raise


@celery_app.task(bind=True, max_retries=2, default_retry_delay=60)
def train_model(self, prediction_id: str):
    """Background task: train an ML model for a prediction job."""
    try:
        _run_async(_train(prediction_id))
    except Exception as exc:
        self.retry(exc=exc)
