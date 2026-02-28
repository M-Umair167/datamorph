import uuid
from datetime import datetime
from pydantic import BaseModel, Field


# ─── Request Schemas ───────────────────────────────────────────

class PredictionCreateRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    prediction_type: str = Field(..., description="regression | classification | time_series | clustering")
    target_column: str
    feature_columns: list[str]
    model_algorithm: str | None = None
    hyperparameters: dict | None = None
    forecast_horizon: int | None = None


# ─── Response Schemas ──────────────────────────────────────────

class PredictionResponse(BaseModel):
    id: uuid.UUID
    dataset_id: uuid.UUID
    project_id: uuid.UUID
    name: str
    prediction_type: str
    target_column: str
    feature_columns: dict
    model_algorithm: str | None
    model_metrics: dict | None
    prediction_results: dict | None
    status: str
    training_duration_seconds: int | None
    created_at: datetime
    completed_at: datetime | None

    model_config = {"from_attributes": True}


class PredictionListResponse(BaseModel):
    predictions: list[PredictionResponse]
    total: int
