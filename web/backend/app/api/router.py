"""
API version router — aggregates all v1 route modules.
"""
from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.projects import router as projects_router
from app.api.v1.uploads import router as uploads_router
from app.api.v1.datasets import router as datasets_router
from app.api.v1.predictions import router as predictions_router
from app.api.v1.exports import router as exports_router

api_router = APIRouter()

api_router.include_router(auth_router)
api_router.include_router(projects_router)
api_router.include_router(uploads_router)
api_router.include_router(datasets_router)
api_router.include_router(predictions_router)
api_router.include_router(exports_router)
