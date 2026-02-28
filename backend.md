 a comprehensive technical architecture that bridges UI/UX design with the Next.js + FastAPI + PostgreSQL stack. This will cover database schema, API design, frontend structure, and deployment strategy.

---

## **SYSTEM ARCHITECTURE OVERVIEW**

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Next.js   │  │  React App  │  │  Tailwind + Framer  │ │
│  │   (Pages)   │  │   (States)  │  │   (Animations)      │ │
│  └──────┬──────┘  └─────────────┘  └─────────────────────┘ │
│         │                                                    │
│         │ HTTP/REST + WebSocket (real-time updates)         │
│         ▼                                                    │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              API GATEWAY / LOAD BALANCER                │ │
│  │              (Nginx / AWS ALB / Vercel Edge)            │ │
│  └─────────────────────────┬───────────────────────────────┘ │
│                            │                                 │
│  ┌─────────────────────────┼───────────────────────────────┐ │
│  │                     SERVER LAYER                         │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │              FastAPI Application                     │ │ │
│  │  │  ┌─────────────┐ ┌─────────────┐ ┌───────────────┐ │ │ │
│  │  │  │   Auth      │ │   Upload    │ │   Analysis    │ │ │ │
│  │  │  │   Router    │ │   Router    │ │   Router      │ │ │ │
│  │  │  └─────────────┘ └─────────────┘ └───────────────┘ │ │ │
│  │  │  ┌─────────────┐ ┌─────────────┐ ┌───────────────┐ │ │ │
│  │  │  │   Clean     │ │   Predict   │ │   Export      │ │ │ │
│  │  │  │   Router    │ │   Router    │ │   Router      │ │ │ │
│  │  │  └─────────────┘ └─────────────┘ └───────────────┘ │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │                          │                               │ │
│  │  ┌───────────────────────┼─────────────────────────────┐ │ │
│  │  │         Background Workers (Celery + Redis)          │ │ │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────────┐  │ │ │
│  │  │  │  OCR    │ │  ML     │ │  Data   │ │  Email   │  │ │ │
│  │  │  │  Jobs   │ │  Training│ │  Processing│ │  Notifications│  │ │ │
│  │  │  └─────────┘ └─────────┘ └─────────┘ └──────────┘  │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────┬───────────────────────────────┘ │
│                            │                                 │
│  ┌─────────────────────────┼───────────────────────────────┐ │
│  │                   DATA LAYER                             │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │              PostgreSQL (Primary DB)                 │ │ │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────────┐  │ │ │
│  │  │  │  Users  │ │ Projects│ │  Files  │ │ Analysis │  │ │ │
│  │  │  │  Table  │ │  Table  │ │  Table  │ │  Table   │  │ │ │
│  │  │  └─────────┘ └─────────┘ └─────────┘ └──────────┘  │ │ │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────────┐  │ │ │
│  │  │  │Cleaning │ │Predictions│ │Audit   │ │Sessions │  │ │ │
│  │  │  │ History │ │  Table   │ │  Log    │ │  Table  │  │ │ │
│  │  │  └─────────┘ └─────────┘ └─────────┘ └──────────┘  │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │                                                          │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │              Redis (Cache + Queue)                   │ │ │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────────┐  │ │ │
│  │  │  │  Job    │ │  Session│ │  Rate   │ │  Real-   │  │ │ │
│  │  │  │  Queue  │ │  Store  │ │  Limiter│ │  time    │  │ │ │
│  │  │  │         │ │         │ │         │ │  Pub/Sub │  │ │ │
│  │  │  └─────────┘ └─────────┘ └─────────┘ └──────────┘  │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │                                                          │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │              Object Storage (S3/MinIO)               │ │ │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────────┐  │ │ │
│  │  │  │ Original│ │Processed│ │  Exports│ │  Temp    │  │ │ │
│  │  │  │  Files  │ │  Data   │ │  (CSV/  │ │  Files   │  │ │ │
│  │  │  │         │ │         │ │  PNG)   │ │         │  │ │ │
│  │  │  └─────────┘ └─────────┘ └─────────┘ └──────────┘  │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
```

---

## **DATABASE SCHEMA (PostgreSQL)**

### **Core Tables**

```sql
-- Users & Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255), -- NULL for OAuth users
    full_name VARCHAR(255),
    avatar_url TEXT,
    tier VARCHAR(50) DEFAULT 'starter', -- starter, pro, business, enterprise
    storage_used_bytes BIGINT DEFAULT 0,
    processing_credits_used INTEGER DEFAULT 0,
    email_verified BOOLEAN DEFAULT FALSE,
    oauth_provider VARCHAR(50), -- google, microsoft, github
    oauth_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT
);

-- Projects (Workspace organization)
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active', -- active, archived, deleted
    settings JSONB DEFAULT '{}', -- project-specific preferences
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Files (Universal upload storage)
CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Upload metadata
    original_filename VARCHAR(500) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    mime_type VARCHAR(255), -- detected, not trusted
    detected_format VARCHAR(50), -- csv, excel, pdf, image, unknown
    
    -- Storage locations
    storage_bucket VARCHAR(255) NOT NULL,
    storage_key_original TEXT NOT NULL, -- S3/MinIO path
    storage_key_processed TEXT, -- extracted/cleaned version
    
    -- Processing status
    status VARCHAR(50) DEFAULT 'uploaded', -- uploaded, extracting, cleaning, ready, error
    processing_progress INTEGER DEFAULT 0, -- 0-100
    
    -- Extraction results (for PDFs/Images)
    extraction_metadata JSONB, -- {tables_found: 3, pages: 12, ocr_confidence: 0.95}
    extracted_schema JSONB, -- column names, types, sample data
    
    -- Error handling
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Datasets (Structured data post-extraction)
CREATE TABLE datasets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_id UUID REFERENCES files(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Schema info
    row_count INTEGER,
    column_count INTEGER,
    column_schema JSONB NOT NULL, -- [{name: "revenue", type: "numeric", nullable: false}]
    
    -- Data quality score
    quality_score INTEGER, -- 0-100 calculated
    quality_details JSONB, -- {completeness: 95, consistency: 88, uniqueness: 92}
    
    -- Storage
    storage_key_parquet TEXT, -- optimized columnar format
    storage_key_csv TEXT, -- export format
    
    -- Versioning
    version INTEGER DEFAULT 1,
    parent_dataset_id UUID REFERENCES datasets(id), -- for branching
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cleaning operations (Audit trail)
CREATE TABLE cleaning_operations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_id UUID REFERENCES datasets(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    operation_type VARCHAR(100) NOT NULL, -- missing_value_imputation, outlier_removal, type_conversion
    column_name VARCHAR(255),
    operation_params JSONB, -- {strategy: "mean", affected_rows: 47}
    
    rows_before INTEGER,
    rows_after INTEGER,
    quality_score_before INTEGER,
    quality_score_after INTEGER,
    
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reverted_at TIMESTAMP WITH TIME ZONE, -- soft delete support
    reverted_by UUID REFERENCES users(id)
);

-- Visualizations
CREATE TABLE visualizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_id UUID REFERENCES datasets(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    name VARCHAR(255) NOT NULL,
    chart_type VARCHAR(50) NOT NULL, -- line, bar, scatter, heatmap, etc.
    config JSONB NOT NULL, -- {x_axis: "date", y_axis: "revenue", color_by: "region"}
    
    -- Generated artifacts
    render_spec JSONB, -- Vega-Lite or Plotly spec
    thumbnail_key TEXT, -- S3 path to PNG preview
    
    is_shared BOOLEAN DEFAULT FALSE,
    share_token VARCHAR(255),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Predictions & Models
CREATE TABLE predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_id UUID REFERENCES datasets(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    name VARCHAR(255) NOT NULL,
    prediction_type VARCHAR(50) NOT NULL, -- time_series, classification, regression
    
    -- Model config
    target_column VARCHAR(255) NOT NULL,
    feature_columns JSONB NOT NULL,
    model_algorithm VARCHAR(100), -- auto_selected, prophet, xgboost, etc.
    hyperparameters JSONB,
    
    -- Results
    model_metrics JSONB, -- {mae: 0.05, rmse: 0.08, r2: 0.92}
    prediction_results JSONB, -- stored summary, full results in S3
    forecast_horizon INTEGER, -- for time series (days ahead)
    
    -- Artifacts
    model_artifact_key TEXT, -- S3 path to serialized model
    results_key TEXT, -- S3 path to full predictions CSV
    
    status VARCHAR(50) DEFAULT 'training', -- training, completed, failed
    training_duration_seconds INTEGER,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Audit log (Compliance)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    
    action VARCHAR(100) NOT NULL, -- file_uploaded, data_cleaned, prediction_created
    resource_type VARCHAR(50) NOT NULL, -- file, dataset, visualization, prediction
    resource_id UUID,
    
    ip_address INET,
    user_agent TEXT,
    metadata JSONB, -- additional context
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_files_project_status ON files(project_id, status);
CREATE INDEX idx_datasets_project ON datasets(project_id);
CREATE INDEX idx_cleaning_dataset ON cleaning_operations(dataset_id, applied_at);
CREATE INDEX idx_audit_user_time ON audit_logs(user_id, created_at);
CREATE INDEX idx_predictions_dataset ON predictions(dataset_id, status);
```

---

## **FASTAPI BACKEND STRUCTURE**

### **Project Structure**
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app initialization
│   ├── config.py               # Pydantic settings (env vars)
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   ├── deps.py             # Dependencies (auth, DB session)
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py         # Login, signup, OAuth
│   │   │   ├── uploads.py      # File upload, detection, extraction
│   │   │   ├── datasets.py     # CRUD, cleaning operations
│   │   │   ├── visualizations.py # Chart generation
│   │   │   ├── predictions.py  # ML model training/inference
│   │   │   ├── exports.py      # Download results
│   │   │   └── websocket.py    # Real-time progress updates
│   │   └── router.py           # API version aggregator
│   │
│   ├── core/
│   │   ├── security.py         # JWT, password hashing
│   │   ├── storage.py          # S3/MinIO client
│   │   └── exceptions.py       # Custom HTTP exceptions
│   │
│   ├── models/                 # SQLAlchemy models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── project.py
│   │   ├── file.py
│   │   ├── dataset.py
│   │   └── prediction.py
│   │
│   ├── schemas/                # Pydantic models (request/response)
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── upload.py
│   │   ├── dataset.py
│   │   └── prediction.py
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   ├── file_detector.py    # Magic bytes + content analysis
│   │   ├── extractor.py        # PDF, Image, CSV extraction
│   │   ├── cleaner.py          # Data cleaning algorithms
│   │   ├── visualizer.py       # Chart generation (Plotly/Altair)
│   │   ├── predictor.py        # ML model management
│   │   └── notifier.py         # Email/WebSocket notifications
│   │
│   └── tasks/                  # Celery background jobs
│       ├── __init__.py
│       ├── extraction.py       # OCR, table detection
│       ├── cleaning.py         # Async data processing
│       ├── training.py         # Model training
│       └── exports.py          # File generation
│
├── alembic/                    # Database migrations
├── tests/
├── Dockerfile
├── requirements.txt
└── celery_worker.py
```

### **Key API Endpoints**

```python
# app/api/v1/uploads.py

from fastapi import APIRouter, UploadFile, File, Depends, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_current_user, get_db
from app.services.file_detector import detect_file_type
from app.services.extractor import extract_data
from app.tasks.extraction import process_file_extraction

router = APIRouter()

@router.post("/upload")
async def upload_file(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    project_id: UUID = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Universal upload endpoint - handles CSV, PDF, Image automatically
    """
    # 1. Validate user tier limits
    await check_storage_limits(current_user, file.size)
    
    # 2. Stream to temporary storage
    temp_path = await stream_to_temp(file)
    
    # 3. Detect true format (magic bytes, not extension)
    detection_result = await detect_file_type(temp_path)
    # Returns: {format: "pdf", confidence: 0.99, mime_type: "application/pdf"}
    
    # 4. Create file record
    file_record = await create_file_record(
        db, 
        user_id=current_user.id,
        project_id=project_id,
        filename=file.filename,
        size=file.size,
        detected_format=detection_result["format"]
    )
    
    # 5. Move to permanent storage
    storage_key = await move_to_storage(temp_path, file_record.id)
    file_record.storage_key_original = storage_key
    
    # 6. Queue background extraction
    process_file_extraction.delay(file_record.id)
    
    # 7. Return immediate response with polling URL
    return {
        "file_id": file_record.id,
        "status": "processing",
        "detected_format": detection_result["format"],
        "progress_url": f"/api/v1/uploads/{file_record.id}/progress",
        "estimated_seconds": estimate_processing_time(detection_result["format"], file.size)
    }

@router.get("/uploads/{file_id}/progress")
async def get_upload_progress(
    file_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    WebSocket fallback: polling endpoint for extraction progress
    """
    file = await get_file(db, file_id, current_user.id)
    return {
        "status": file.status,
        "progress": file.processing_progress,
        "extraction_metadata": file.extraction_metadata,
        "error": file.error_message
    }

@router.websocket("/ws/uploads/{file_id}")
async def upload_websocket(
    websocket: WebSocket,
    file_id: UUID,
    token: str
):
    """
    Real-time progress updates via WebSocket
    """
    await websocket.accept()
    user = await verify_ws_token(token)
    
    # Subscribe to Redis channel for this file
    channel = f"file_progress:{file_id}"
    async for message in redis_subscribe(channel):
        await websocket.send_json(message)
        
        if message["status"] in ["ready", "error"]:
            await websocket.close()
            break
```

```python
# app/api/v1/datasets.py

@router.post("/datasets/{dataset_id}/clean")
async def clean_dataset(
    dataset_id: UUID,
    operations: List[CleaningOperationSchema],
    auto_apply: bool = False,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Apply cleaning operations with preview capability
    """
    dataset = await get_dataset(db, dataset_id, current_user.id)
    
    # Load data from Parquet (columnar, fast)
    df = await load_from_storage(dataset.storage_key_parquet)
    
    results = []
    for op in operations:
        if auto_apply:
            # Apply immediately
            df = await apply_cleaning_operation(df, op)
            await log_cleaning_operation(db, dataset_id, op, current_user.id)
        else:
            # Preview mode: show before/after sample
            preview_df = await apply_cleaning_operation(df.head(1000).copy(), op)
            results.append({
                "operation": op.type,
                "preview": preview_df.to_dict(),
                "affected_rows": calculate_affected_rows(df, op)
            })
    
    if auto_apply:
        # Save new version
        new_dataset = await save_dataset_version(db, dataset, df)
        return {"dataset_id": new_dataset.id, "status": "applied"}
    
    return {"previews": results, "status": "preview"}

@router.post("/datasets/{dataset_id}/visualize")
async def create_visualization(
    dataset_id: UUID,
    config: VisualizationConfig,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Generate chart with AI suggestions
    """
    dataset = await get_dataset(db, dataset_id, current_user.id)
    df = await load_from_storage(dataset.storage_key_parquet)
    
    # Auto-suggest if config is minimal
    if config.auto_suggest:
        suggestions = await suggest_charts(df, dataset.column_schema)
        config = select_best_suggestion(suggestions, config.intent)
    
    # Generate using Vega-Lite or Plotly
    chart_spec = await generate_chart_spec(df, config)
    
    # Render to PNG for thumbnail
    thumbnail_key = await render_thumbnail(chart_spec)
    
    viz = await save_visualization(db, dataset_id, config, chart_spec, thumbnail_key)
    
    return {
        "visualization_id": viz.id,
        "spec": chart_spec,
        "thumbnail_url": generate_presigned_url(thumbnail_key)
    }
```

---

## **NEXT.JS FRONTEND STRUCTURE**

### **Project Structure**
```
frontend/
├── app/                          # Next.js 13+ App Router
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home/Landing page
│   ├── globals.css               # Tailwind + custom styles
│   │
│   ├── (marketing)/              # Group: Public pages
│   │   ├── page.tsx              # Hero landing
│   │   ├── product/
│   │   │   └── page.tsx          # Features deep-dive
│   │   ├── pricing/
│   │   │   └── page.tsx          # Pricing tiers
│   │   ├── use-cases/
│   │   │   └── page.tsx          # Industry solutions
│   │   └── about/
│   │       └── page.tsx          # Company info
│   │
│   ├── (dashboard)/              # Group: Authenticated app
│   │   ├── layout.tsx            # Dashboard shell (sidebar + header)
│   │   ├── workspace/
│   │   │   └── page.tsx          # Projects list + upload zone
│   │   ├── project/
│   │   │   └── [id]/
│   │   │       ├── page.tsx      # Project overview
│   │   │       ├── clean/
│   │   │       │   └── page.tsx  # Data cleaning interface
│   │   │       ├── visualize/
│   │   │       │   └── page.tsx  # Chart builder
│   │   │       └── predict/
│   │   │           └── page.tsx  # Prediction setup
│   │   └── settings/
│   │       └── page.tsx          # Account settings
│   │
│   ├── api/                      # API routes (Next.js)
│   │   ├── auth/
│   │   │   └── [...nextauth]/    # NextAuth.js config
│   │   └── upload/
│   │       └── route.ts          # Upload proxy (optional)
│   │
│   └── layout.tsx                # Root layout
│
├── components/
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   │
│   ├── marketing/                # Landing page sections
│   │   ├── HeroUpload.tsx        # Interactive upload demo
│   │   ├── FeatureGrid.tsx       # Bento grid showcase
│   │   ├── PricingCards.tsx      # Pricing tier cards
│   │   └── TestimonialMarquee.tsx
│   │
│   ├── dashboard/                # App components
│   │   ├── Sidebar.tsx           # Navigation sidebar
│   │   ├── ProjectCard.tsx       # Project preview card
│   │   ├── UploadZone.tsx        # Drag-drop upload component
│   │   ├── DataTable.tsx         # AG Grid or TanStack Table
│   │   ├── ChartBuilder.tsx      # Visualization config
│   │   ├── CleaningPanel.tsx     # Data quality interface
│   │   └── PredictionWizard.tsx  # Step-by-step ML setup
│   │
│   └── shared/                   # Cross-cutting components
│       ├── FileIcon.tsx          # Format-specific icons
│       ├── ProgressBar.tsx       # Animated progress
│       ├── ConfidenceBadge.tsx   # Quality indicators
│       └── ErrorBoundary.tsx
│
├── hooks/                        # Custom React hooks
│   ├── useUpload.ts              # Upload + progress tracking
│   ├── useWebSocket.ts           # Real-time updates
│   ├── useDataset.ts             # Data fetching + mutations
│   └── useAutoSave.ts            # Debounced auto-save
│
├── lib/                          # Utilities
│   ├── api.ts                    # Axios/Fetch wrapper
│   ├── auth.ts                   # Auth helpers
│   ├── storage.ts                # Local storage utils
│   └── utils.ts                  # General utilities
│
├── types/                        # TypeScript definitions
│   ├── api.ts                    # API response types
│   ├── models.ts                 # Domain models
│   └── index.ts
│
├── public/                       # Static assets
│   ├── images/
│   └── fonts/
│
├── styles/
│   └── animations.css            # Framer Motion variants
│
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### **Key Frontend Components**

```typescript
// components/dashboard/UploadZone.tsx
'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { useUpload } from '@/hooks/useUpload';
import { FileIcon } from '@/components/shared/FileIcon';

interface UploadZoneProps {
  projectId?: string;
  onUploadComplete?: (fileId: string) => void;
}

export function UploadZone({ projectId, onUploadComplete }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const { upload, progress, status, fileId, error } = useUpload();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const result = await upload(file, { projectId });
    if (result.fileId && onUploadComplete) {
      onUploadComplete(result.fileId);
    }
  }, [projectId, upload, onUploadComplete]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    multiple: false,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    }
  });

  return (
    <motion.div
      {...getRootProps()}
      className={`
        relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
        transition-colors duration-300
        ${isDragging ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-600 hover:border-slate-500'}
        ${status === 'uploading' ? 'pointer-events-none' : ''}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <input {...getInputProps()} />
      
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="flex justify-center gap-4 text-slate-400">
              <FileIcon type="csv" className="w-12 h-12" />
              <FileIcon type="pdf" className="w-12 h-12" />
              <FileIcon type="image" className="w-12 h-12" />
            </div>
            <div>
              <p className="text-xl font-semibold text-white">
                Drop your file here
              </p>
              <p className="text-slate-400 mt-2">
                CSV, Excel, PDF, or images up to 100MB
              </p>
            </div>
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
              Browse Files
            </button>
          </motion.div>
        )}

        {status === 'uploading' && (
          <motion.div
            key="uploading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="relative w-24 h-24 mx-auto">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-700"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <motion.path
                  className="text-indigo-500"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${progress}, 100`}
                  initial={{ strokeDasharray: "0, 100" }}
                  animate={{ strokeDasharray: `${progress}, 100` }}
                  transition={{ duration: 0.5 }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
                {progress}%
              </span>
            </div>
            <p className="text-slate-300">Uploading...</p>
          </motion.div>
        )}

        {status === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex justify-center">
              <motion.div
                className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div>
              <p className="text-white font-semibold">AI is analyzing your file...</p>
              <p className="text-slate-400 text-sm mt-1">
                Detecting format • Extracting tables • Validating data
              </p>
            </div>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 space-y-2"
          >
            <p className="text-xl">⚠️ Upload failed</p>
            <p className="text-sm">{error}</p>
            <button 
              onClick={(e) => { e.stopPropagation(); window.location.reload(); }}
              className="text-indigo-400 hover:text-indigo-300 underline"
            >
              Try again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
```

```typescript
// hooks/useUpload.ts
'use client';

import { useState, useCallback } from 'react';
import { useWebSocket } from './useWebSocket';

interface UploadOptions {
  projectId?: string;
  onProgress?: (progress: number) => void;
}

export function useUpload() {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'completed' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [fileId, setFileId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async (file: File, options: UploadOptions = {}) => {
    setStatus('uploading');
    setProgress(0);
    setError(null);

    try {
      // Step 1: Get presigned URL or use multipart upload for large files
      const formData = new FormData();
      formData.append('file', file);
      if (options.projectId) formData.append('project_id', options.projectId);

      const xhr = new XMLHttpRequest();
      
      // Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const uploadProgress = Math.round((e.loaded / e.total) * 100);
          setProgress(uploadProgress);
          options.onProgress?.(uploadProgress);
        }
      });

      // Perform upload
      const response = await new Promise<{ file_id: string; status: string }>((resolve, reject) => {
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error(xhr.statusText));
          }
        });
        xhr.addEventListener('error', () => reject(new Error('Upload failed')));
        
        xhr.open('POST', `${process.env.NEXT_PUBLIC_API_URL}/api/v1/upload`);
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
        xhr.send(formData);
      });

      setFileId(response.file_id);
      setStatus('processing');
      setProgress(0);

      // Step 2: Connect WebSocket for real-time extraction updates
      const ws = useWebSocket(`wss://api.datamorph.ai/ws/uploads/${response.file_id}`);
      
      ws.onMessage((data) => {
        if (data.progress) setProgress(data.progress);
        if (data.status === 'ready') {
          setStatus('completed');
          ws.close();
        }
        if (data.status === 'error') {
          setStatus('error');
          setError(data.error_message);
          ws.close();
        }
      });

      return { fileId: response.file_id, status: response.status };
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, []);

  return { upload, status, progress, fileId, error };
}
```

---

## **DEPLOYMENT ARCHITECTURE**

### **Docker Compose (Development)**
```yaml
# docker-compose.yml
version: '3.8'

services:
  # Frontend (Next.js)
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
      - NEXTAUTH_URL=http://localhost:3000
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - backend

  # Backend (FastAPI)
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql+asyncpg://postgres:password@db:5432/datamorph
      - REDIS_URL=redis://redis:6379
      - AWS_ACCESS_KEY_ID=minio
      - AWS_SECRET_ACCESS_KEY=minio123
      - S3_ENDPOINT=http://minio:9000
    volumes:
      - ./backend:/app
    depends_on:
      - db
      - redis
      - minio

  # Celery Worker
  worker:
    build: ./backend
    command: celery -A app.tasks worker --loglevel=info
    environment:
      - DATABASE_URL=postgresql+asyncpg://postgres:password@db:5432/datamorph
      - REDIS_URL=redis://redis:6379
    volumes:
      - ./backend:/app
    depends_on:
      - db
      - redis

  # Celery Beat (Scheduled tasks)
  scheduler:
    build: ./backend
    command: celery -A app.tasks beat --loglevel=info
    environment:
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis

  # PostgreSQL
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=datamorph
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  # Redis (Cache + Queue)
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  # MinIO (S3-compatible object storage)
  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    environment:
      - MINIO_ROOT_USER=minio
      - MINIO_ROOT_PASSWORD=minio123
    volumes:
      - minio_data:/data
    ports:
      - "9000:9000"
      - "9001:9001"

volumes:
  postgres_data:
  minio_data:
```

### **Production Deployment (AWS)**
```
┌─────────────────────────────────────────────────────────────┐
│                         CDN                                  │
│                    CloudFront / Vercel Edge                  │
│              (Static assets, Next.js frontend)               │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────┼───────────────────────────────────┐
│                   Kubernetes (EKS)                           │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Ingress Controller (Nginx/AWS ALB)                     │ │
│  └─────────────────────────┬───────────────────────────────┘ │
│                            │                                  │
│  ┌─────────────────────────┼───────────────────────────────┐ │
│  │  Next.js Pods (3 replicas)                              │ │
│  │  - SSR/SSG rendering                                    │ │
│  │  - API route handlers (optional)                        │ │
│  └─────────────────────────┬───────────────────────────────┘ │
│                            │                                  │
│  ┌─────────────────────────┼───────────────────────────────┐ │
│  │  FastAPI Pods (5 replicas)                              │ │
│  │  - Auto-scaling based on CPU/Queue depth                │ │
│  │  - Health checks: /health                               │ │
│  └─────────────────────────┬───────────────────────────────┘ │
│                            │                                  │
│  ┌─────────────────────────┼───────────────────────────────┐ │
│  │  Celery Worker Pods (2-10 auto-scaling)                 │ │
│  │  - GPU nodes for ML training (EKS node groups)          │ │
│  │  - Spot instances for cost optimization                 │ │
│  └─────────────────────────────────────────────────────────┘ │
│                            │                                  │
│  ┌─────────────────────────┼───────────────────────────────┐ │
│  │  Managed Services                                        │ │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────────┐      │ │
│  │  │ RDS     │ │ElastiCache│ │ S3      │ │ SQS      │      │ │
│  │  │Postgres │ │ (Redis) │ │ (Files) │ │ (Queue)  │      │ │
│  │  │Multi-AZ │ │ Cluster │ │ + CloudFront│ │ (Backup) │      │ │
│  │  └─────────┘ └─────────┘ └─────────┘ └──────────┘      │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

---

## **KEY TECHNICAL DECISIONS**

| Decision | Rationale |
|----------|-----------|
| **Next.js App Router** | SSR for SEO (marketing pages), CSR for dashboard (interactivity) |
| **FastAPI + Async SQLAlchemy** | High concurrency for file uploads, non-blocking DB operations |
| **PostgreSQL + Parquet (S3)** | Relational for metadata, columnar for large datasets |
| **Celery + Redis** | Reliable background processing, retry logic, rate limiting |
| **WebSocket for progress** | Real-time UX without polling overhead |
| **Presigned S3 URLs** | Direct browser-to-S3 upload, bypassing backend bandwidth limits |

---

## **PERFORMANCE OPTIMIZATIONS**

1. **Upload Resumption:** Multipart upload with S3, resume interrupted transfers
2. **Lazy Data Loading:** Virtualized tables (react-window), fetch 1000 rows at a time
3. **Query Optimization:** PostgreSQL partitioning by user_id, materialized views for dashboards
4. **CDN Caching:** Visualizations cached as PNGs, API responses cached by ETag
5. **Connection Pooling:** PgBouncer for DB, Redis connection pooling for Celery

---

This architecture gives you a **production-ready foundation** that scales from MVP to enterprise. The separation of concerns (Next.js for UI, FastAPI for business logic, Celery for heavy lifting) ensures each layer can scale independently.