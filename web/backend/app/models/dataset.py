import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Integer, DateTime, Text, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base


class Dataset(Base):
    __tablename__ = "datasets"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    file_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("files.id", ondelete="CASCADE"), nullable=False)
    project_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)

    # Schema info
    row_count: Mapped[int | None] = mapped_column(Integer)
    column_count: Mapped[int | None] = mapped_column(Integer)
    column_schema: Mapped[dict] = mapped_column(JSONB, nullable=False)

    # Data quality
    quality_score: Mapped[int | None] = mapped_column(Integer)
    quality_details: Mapped[dict | None] = mapped_column(JSONB)

    # Storage
    storage_key_parquet: Mapped[str | None] = mapped_column(Text)
    storage_key_csv: Mapped[str | None] = mapped_column(Text)

    # Versioning
    version: Mapped[int] = mapped_column(Integer, default=1)
    parent_dataset_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("datasets.id"), nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    file: Mapped["File"] = relationship(back_populates="datasets")  # type: ignore[name-defined]
    project: Mapped["Project"] = relationship(back_populates="datasets")  # type: ignore[name-defined]
    cleaning_operations: Mapped[list["CleaningOperation"]] = relationship(back_populates="dataset", cascade="all, delete-orphan")


class CleaningOperation(Base):
    __tablename__ = "cleaning_operations"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    dataset_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("datasets.id", ondelete="CASCADE"), nullable=False)
    user_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"))

    operation_type: Mapped[str] = mapped_column(String(100), nullable=False)
    column_name: Mapped[str | None] = mapped_column(String(255))
    operation_params: Mapped[dict | None] = mapped_column(JSONB)

    rows_before: Mapped[int | None] = mapped_column(Integer)
    rows_after: Mapped[int | None] = mapped_column(Integer)
    quality_score_before: Mapped[int | None] = mapped_column(Integer)
    quality_score_after: Mapped[int | None] = mapped_column(Integer)

    applied_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    reverted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    reverted_by: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("users.id"))

    # Relationships
    dataset: Mapped["Dataset"] = relationship(back_populates="cleaning_operations")
