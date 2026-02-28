import uuid
from datetime import datetime, timezone
from sqlalchemy import String, BigInteger, Integer, DateTime, Text, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base


class File(Base):
    __tablename__ = "files"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    project_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    # Upload metadata
    original_filename: Mapped[str] = mapped_column(String(500), nullable=False)
    file_size_bytes: Mapped[int] = mapped_column(BigInteger, nullable=False)
    mime_type: Mapped[str | None] = mapped_column(String(255))
    detected_format: Mapped[str | None] = mapped_column(String(50))

    # Storage locations
    storage_bucket: Mapped[str] = mapped_column(String(255), nullable=False)
    storage_key_original: Mapped[str] = mapped_column(Text, nullable=False)
    storage_key_processed: Mapped[str | None] = mapped_column(Text)

    # Processing status
    status: Mapped[str] = mapped_column(String(50), default="uploaded")
    processing_progress: Mapped[int] = mapped_column(Integer, default=0)

    # Extraction results
    extraction_metadata: Mapped[dict | None] = mapped_column(JSONB)
    extracted_schema: Mapped[dict | None] = mapped_column(JSONB)

    # Error handling
    error_message: Mapped[str | None] = mapped_column(Text)
    retry_count: Mapped[int] = mapped_column(Integer, default=0)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    user: Mapped["User"] = relationship(back_populates="files")  # type: ignore[name-defined]
    project: Mapped["Project"] = relationship(back_populates="files")  # type: ignore[name-defined]
    datasets: Mapped[list["Dataset"]] = relationship(back_populates="file", cascade="all, delete-orphan")  # type: ignore[name-defined]
