import uuid
from datetime import datetime
from pydantic import BaseModel, Field


# ─── Cleaning Operations ──────────────────────────────────────

class CleaningOperationSchema(BaseModel):
    type: str = Field(..., description="fill_missing | remove_duplicates | normalize | convert_type | filter_rows | rename_column")
    column_name: str | None = None
    params: dict | None = None


class CleaningPreview(BaseModel):
    operation: str
    preview: dict
    affected_rows: int


class CleaningResult(BaseModel):
    dataset_id: uuid.UUID | None = None
    status: str
    previews: list[CleaningPreview] | None = None


# ─── Visualization ─────────────────────────────────────────────

class VisualizationConfig(BaseModel):
    chart_type: str = Field(..., description="bar | line | scatter | pie | heatmap | histogram | area")
    x_column: str | None = None
    y_column: str | None = None
    group_by: str | None = None
    title: str | None = None
    auto_suggest: bool = False
    intent: str | None = None


class VisualizationResponse(BaseModel):
    id: uuid.UUID
    name: str
    chart_type: str
    config: dict
    render_spec: dict | None
    thumbnail_url: str | None
    is_shared: bool
    created_at: datetime

    model_config = {"from_attributes": True}


# ─── Dataset ───────────────────────────────────────────────────

class DatasetResponse(BaseModel):
    id: uuid.UUID
    file_id: uuid.UUID
    project_id: uuid.UUID
    name: str
    description: str | None
    row_count: int | None
    column_count: int | None
    column_schema: dict
    quality_score: int | None
    quality_details: dict | None
    version: int
    parent_dataset_id: uuid.UUID | None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class DatasetListResponse(BaseModel):
    datasets: list[DatasetResponse]
    total: int


class DatasetPreviewResponse(BaseModel):
    columns: list[str]
    rows: list[dict]
    total_rows: int
    page: int
    page_size: int
