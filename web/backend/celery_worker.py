"""
Celery worker entry point.
Usage: celery -A celery_worker.celery_app worker --loglevel=info
"""
from app.tasks import celery_app  # noqa: F401
