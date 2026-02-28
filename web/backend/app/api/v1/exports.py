"""
Export API routes — download datasets/visualizations in various formats.
"""
import uuid
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.services.dataset_service import get_dataset
from app.core.storage import generate_presigned_url
from app.core.exceptions import BadRequestError

router = APIRouter(prefix="/exports", tags=["Exports"])


@router.get("/dataset/{dataset_id}")
async def export_dataset(
    dataset_id: uuid.UUID,
    format: str = "csv",
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Generate a presigned download URL for a dataset."""
    dataset = await get_dataset(db, dataset_id=dataset_id, user_id=current_user.id)

    if format == "csv" and dataset.storage_key_csv:
        key = dataset.storage_key_csv
    elif format == "parquet" and dataset.storage_key_parquet:
        key = dataset.storage_key_parquet
    else:
        raise BadRequestError(f"Export format '{format}' not available for this dataset")

    url = await generate_presigned_url(bucket="datamorph-files", key=key, expires_in=3600)

    return JSONResponse(content={
        "download_url": url,
        "format": format,
        "expires_in": 3600,
    })
