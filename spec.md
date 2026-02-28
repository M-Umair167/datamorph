  I'll create a comprehensive constitution for DataMorph that ensures senior developer approval. This covers architecture rules, testing standards, file organization, and strict separation of concerns.

---

# **DATAMORPH CONSTITUTION**
## *Enterprise-Grade Full Stack Architecture Standards*

---

## **TABLE OF CONTENTS**
1. [Core Philosophy](#core-philosophy)
2. [Project Structure](#project-structure)
3. [Frontend Standards](#frontend-standards)
4. [Backend Standards](#backend-standards)
5. [Database Standards](#database-standards)
6. [Testing Constitution](#testing-constitution)
7. [Code Quality Rules](#code-quality-rules)
8. [Security Standards](#security-standards)
9. [Deployment Standards](#deployment-standards)

---

## **CORE PHILOSOPHY**

### **The Five Immutable Laws**

| Law | Principle | Violation Consequence |
|-----|-----------|----------------------|
| **1. Separation of Concerns** | Frontend never touches DB directly, Backend never renders HTML | Immediate architectural debt |
| **2. Single Responsibility** | One file = one purpose (page, component, hook, API route) | Unmaintainable spaghetti code |
| **3. Explicit over Implicit** | No magic imports, no global state without documentation | Debugging nightmares |
| **4. Test-First Culture** | No code merged without tests (unit + integration) | Production bugs |
| **5. Documentation as Code** | Every public function documented, every decision recorded | Knowledge silos |

### **Directory Structure Golden Rule**
```
❌ WRONG: components/HomePage.tsx (mixed with 20 other components)
✅ CORRECT: app/(marketing)/page.tsx (dedicated route file)
            components/marketing/hero/HeroUpload.tsx (single purpose)
            hooks/marketing/useHeroAnimation.ts (dedicated hook)
```

---

## **PROJECT STRUCTURE**

### **Root Level Organization**

```
datamorph/
├── .github/                    # CI/CD workflows, issue templates
├── .husky/                     # Git hooks (pre-commit, pre-push)
├── .vscode/                    # Shared VS Code settings
├── apps/                       # MONOREPO STRUCTURE
│   ├── web/                    # Next.js frontend (was 'frontend')
│   └── api/                    # FastAPI backend (was 'backend')
├── packages/                   # Shared code
│   ├── shared-types/           # TypeScript + Python shared schemas
│   ├── ui-components/          # Design system (shadcn/ui base)
│   └── eslint-config/          # Shared linting rules
├── infra/                      # Infrastructure as Code
│   ├── docker/                 # Production Dockerfiles
│   ├── k8s/                    # Kubernetes manifests
│   └── terraform/              # AWS/GCP provisioning
├── docs/                       # Architecture Decision Records (ADRs)
├── scripts/                    # Automation scripts
├── Makefile                    # Standardized commands
├── docker-compose.yml          # Local development
└── README.md
```

### **Why Monorepo?**
- Single source of truth
- Atomic changes across frontend/backend
- Shared type safety between TypeScript and Python (via `shared-types`)
- Unified CI/CD pipeline

---

## **FRONTEND STANDARDS (Next.js)**

### **1. Route File Structure**

Every page gets its **own dedicated directory** with co-located assets:

```
apps/web/app/
├── layout.tsx                  # Root layout (auth provider, theme)
├── error.tsx                   # Global error boundary
├── loading.tsx                 # Global loading state
├── not-found.tsx               # 404 page
│
├── (marketing)/                # Route group (no URL prefix)
│   ├── layout.tsx              # Marketing layout (no sidebar)
│   ├── page.tsx                # / (Homepage)
│   ├── product/
│   │   ├── page.tsx            # /product
│   │   ├── features/
│   │   │   └── page.tsx        # /product/features
│   │   └── opengraph-image.tsx # Auto-generated OG image
│   ├── pricing/
│   │   ├── page.tsx            # /pricing
│   │   └── page.test.tsx       # Co-located test (REQUIRED)
│   ├── use-cases/
│   │   ├── page.tsx            # /use-cases
│   │   └── [industry]/
│   │       ├── page.tsx        # /use-cases/healthcare
│   │       └── loading.tsx     # Skeleton for dynamic route
│   └── about/
│       ├── page.tsx
│       └── team-section.tsx    # Sub-component (only used here)
│
├── (dashboard)/                # Route group (requires auth)
│   ├── layout.tsx              # Dashboard shell (sidebar + header)
│   ├── page.tsx                # /workspace (redirects or shows projects)
│   ├── workspace/
│   │   ├── page.tsx            # /workspace (projects list)
│   │   ├── page.test.tsx       # Route test
│   │   ├── components/         # ONLY for this page
│   │   │   ├── ProjectGrid.tsx
│   │   │   └── EmptyState.tsx
│   │   └── hooks/              # ONLY for this page
│   │       └── useProjects.ts
│   │
│   └── project/
│       └── [id]/
│           ├── layout.tsx      # Project-level layout
│           ├── page.tsx          # Overview tab (default)
│           ├── clean/
│           │   ├── page.tsx      # /project/[id]/clean
│           │   ├── page.test.tsx
│           │   ├── components/
│           │   │   ├── DataTable.tsx
│           │   │   ├── CleaningSidebar.tsx
│           │   │   └── OperationLog.tsx
│           │   └── hooks/
│           │       ├── useDataset.ts
│           │       └── useCleaningOperations.ts
│           │
│           ├── visualize/
│           │   ├── page.tsx
│           │   ├── page.test.tsx
│           │   ├── components/
│           │   │   ├── ChartCanvas.tsx
│           │   │   ├── ChartConfigPanel.tsx
│           │   │   └── SuggestionCarousel.tsx
│           │   └── hooks/
│           │       ├── useChartSuggestions.ts
│           │       └── useVisualizationExport.ts
│           │
│           └── predict/
│               ├── page.tsx
│               ├── page.test.tsx
│               ├── components/
│               │   ├── ModelConfigForm.tsx
│               │   ├── TrainingMonitor.tsx
│               │   └── PredictionResults.tsx
│               └── hooks/
│                   ├── useModelTraining.ts
│                   └── usePredictionSimulation.ts
│
├── api/                          # Next.js API routes (minimal proxy)
│   ├── auth/
│   │   └── [...nextauth]/
│   │       └── route.ts
│   └── health/
│       └── route.ts
│
└── components/                   # Shared components (NOT in routes)
    ├── ui/                       # shadcn/ui components (no custom logic)
    │   ├── button.tsx
    │   ├── card.tsx
    │   └── input.tsx
    │
    ├── marketing/                # Marketing sections (isolated)
    │   ├── hero/
    │   │   ├── HeroUpload.tsx
    │   │   ├── HeroUpload.test.tsx
    │   │   ├── HeroAnimation.tsx
    │   │   └── hooks/
    │   │       └── useUploadDemo.ts
    │   ├── features/
    │   │   ├── FeatureGrid.tsx
    │   │   └── FeatureCard.tsx
    │   └── pricing/
    │       ├── PricingCards.tsx
    │       └── PricingToggle.tsx
    │
    ├── dashboard/                # Dashboard shared components
    │   ├── layout/
    │   │   ├── Sidebar.tsx
    │   │   ├── Header.tsx
    │   │   └── Breadcrumb.tsx
    │   ├── shared/
    │   │   ├── DataStatusBadge.tsx
    │   │   ├── FileTypeIcon.tsx
    │   │   └── ProgressIndicator.tsx
    │   └── upload/
    │       ├── UploadZone.tsx
    │       ├── UploadZone.test.tsx
    │       ├── FilePreview.tsx
    │       └── ProcessingStatus.tsx
    │
    └── providers/                # React context providers
        ├── AuthProvider.tsx
        ├── ThemeProvider.tsx
        └── WebSocketProvider.tsx
```

### **2. Component File Structure**

Every component file **MUST** follow this exact template:

```typescript
// components/dashboard/upload/UploadZone.tsx

// 1. IMPORTS (grouped and ordered)
// External libraries
import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';

// Internal absolute imports (@/ alias)
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useUpload } from '@/hooks/upload/useUpload';
import { useWebSocket } from '@/hooks/websocket/useWebSocket';
import { cn } from '@/lib/utils';

// Types
import { UploadStatus, FileMetadata } from '@datamorph/shared-types';

// 2. COMPONENT INTERFACE (documented)
/**
 * UploadZone - Drag-and-drop file upload with real-time processing feedback
 * 
 * @param projectId - Optional project to associate upload with
 * @param onUploadComplete - Callback when file is fully processed
 * @param maxFileSize - Maximum file size in bytes (default: 100MB)
 * @param acceptedFormats - Restrict to specific formats (default: all)
 * 
 * @example
 * <UploadZone 
 *   projectId="proj_123" 
 *   onUploadComplete={(fileId) => router.push(`/project/${fileId}`)}
 * />
 */
interface UploadZoneProps {
  projectId?: string;
  onUploadComplete?: (fileId: string) => void;
  maxFileSize?: number;
  acceptedFormats?: string[];
}

// 3. COMPONENT IMPLEMENTATION
export function UploadZone({
  projectId,
  onUploadComplete,
  maxFileSize = 100 * 1024 * 1024, // 100MB
  acceptedFormats = ['csv', 'pdf', 'png', 'jpg', 'xlsx']
}: UploadZoneProps) {
  // State declarations (grouped by purpose)
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  // Custom hooks (alphabetical order)
  const { upload, status, progress, fileId, error } = useUpload({
    projectId,
    maxFileSize
  });
  const { connectionStatus } = useWebSocket(`file:${fileId}`);

  // Event handlers (useCallback for memoization)
  const handleDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploadError(null);
    
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    
    try {
      const result = await upload(file);
      onUploadComplete?.(result.fileId);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    }
  }, [upload, onUploadComplete]);

  // Render helpers (extracted for readability)
  const renderIdleState = () => (
    <div className="space-y-4 text-center">
      <FileTypeIcons formats={acceptedFormats} />
      <div>
        <h3 className="text-lg font-semibold">Drop your file here</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Supports {acceptedFormats.join(', ')} up to {formatBytes(maxFileSize)}
        </p>
      </div>
      <Button variant="outline">Browse Files</Button>
    </div>
  );

  const renderProcessingState = () => (
    <div className="space-y-4 text-center">
      <ProcessingAnimation status={status} progress={progress} />
      <p className="text-sm text-muted-foreground">
        {getStatusMessage(status, progress)}
      </p>
    </div>
  );

  // Main render
  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-8 transition-colors",
        isDragging ? "border-primary bg-primary/10" : "border-muted",
        status === 'uploading' && "pointer-events-none opacity-80"
      )}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
    >
      {status === 'idle' && renderIdleState()}
      {(status === 'uploading' || status === 'processing') && renderProcessingState()}
      {status === 'error' && <UploadError message={uploadError || error} />}
      
      <input type="file" className="hidden" accept={acceptedFormats.map(f => `.${f}`).join(',')} />
    </div>
  );
}

// 4. SUB-COMPONENTS (co-located, not exported)
function FileTypeIcons({ formats }: { formats: string[] }) {
  return (
    <div className="flex justify-center gap-2">
      {formats.map(format => (
        <FileIcon key={format} type={format} className="w-8 h-8" />
      ))}
    </div>
  );
}

function ProcessingAnimation({ status, progress }: { status: string; progress: number }) {
  return (
    <div className="relative w-20 h-20 mx-auto">
      <Progress value={progress} className="absolute inset-0" />
      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
        {progress}%
      </span>
    </div>
  );
}

// 5. UTILITY FUNCTIONS (alphabetical)
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getStatusMessage(status: string, progress: number): string {
  const messages: Record<string, string> = {
    uploading: `Uploading... ${progress}%`,
    processing: 'AI is analyzing your file...',
    extracting: 'Extracting tables and data...',
    cleaning: 'Validating data quality...',
    completed: 'Ready for analysis!'
  };
  return messages[status] || 'Processing...';
}
```

### **3. Hook Structure**

Every hook gets its **own file**, no hook aggregation:

```
hooks/
├── upload/
│   ├── useUpload.ts            # Main upload logic
│   ├── useUpload.test.ts       # Unit tests
│   ├── useUpload.types.ts      # Hook-specific types
│   └── useUpload.utils.ts      # Helper functions
├── websocket/
│   ├── useWebSocket.ts
│   ├── useWebSocket.test.ts
│   └── useWebSocket.types.ts
├── dataset/
│   ├── useDataset.ts
│   ├── useDatasetFetch.ts      # Data fetching only
│   ├── useDatasetMutate.ts     # Mutations only
│   └── useDatasetCache.ts      # Caching logic
└── auth/
    ├── useAuth.ts
    ├── useSession.ts
    └── usePermissions.ts
```

**Hook Template:**

```typescript
// hooks/upload/useUpload.ts

import { useState, useCallback, useRef } from 'react';
import { useWebSocket } from '@/hooks/websocket/useWebSocket';
import { apiClient } from '@/lib/api/client';
import type { UploadOptions, UploadResult, UploadState } from './useUpload.types';

/**
 * useUpload - Manages file upload with progress tracking and WebSocket updates
 * 
 * Features:
 * - Resumable multipart uploads
 * - Real-time extraction progress
 * - Automatic retry on network errors
 * - Cancellation support
 */
export function useUpload(options: UploadOptions = {}) {
  const [state, setState] = useState<UploadState>({
    status: 'idle',
    progress: 0,
    fileId: null,
    error: null
  });
  
  const abortControllerRef = useRef<AbortController | null>(null);

  const upload = useCallback(async (file: File): Promise<UploadResult> => {
    // Implementation
  }, [options]);

  const cancel = useCallback(() => {
    abortControllerRef.current?.abort();
    setState(prev => ({ ...prev, status: 'cancelled' }));
  }, []);

  const reset = useCallback(() => {
    setState({
      status: 'idle',
      progress: 0,
      fileId: null,
      error: null
    });
  }, []);

  return {
    ...state,
    upload,
    cancel,
    reset,
    isIdle: state.status === 'idle',
    isUploading: state.status === 'uploading',
    isProcessing: state.status === 'processing',
    isCompleted: state.status === 'completed',
    isError: state.status === 'error'
  };
}
```

### **4. API Client Structure**

```typescript
// lib/api/client.ts
import axios, { AxiosInstance, AxiosError } from 'axios';
import { useAuthStore } from '@/stores/authStore';

class ApiClient {
  private client: AxiosInstance;
  
  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor: Add auth token
    this.client.interceptors.request.use((config) => {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor: Handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          useAuthStore.getState().logout();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Typed API methods
  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  async uploadFile(
    url: string, 
    file: File, 
    onProgress?: (progress: number) => void
  ): Promise<{ fileId: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress?.(progress);
        }
      }
    });

    return response.data;
  }
}

export const apiClient = new ApiClient();
```

---

## **BACKEND STANDARDS (FastAPI)**

### **1. API Route Structure**

```
apps/api/app/
├── main.py                     # App factory, middleware registration
├── config.py                   # Pydantic Settings (env vars)
├── dependencies.py             # FastAPI Depends() injectables
├── exceptions.py               # Custom exception handlers
├── middleware/
│   ├── cors.py
│   ├── logging.py
│   ├── rate_limit.py
│   └── timing.py
├── routers/                    # Each router = one feature domain
│   ├── __init__.py
│   ├── auth.py                 # /auth/* routes
│   ├── uploads.py              # /uploads/* routes
│   ├── datasets.py             # /datasets/* routes
│   ├── visualizations.py       # /visualizations/* routes
│   ├── predictions.py          # /predictions/* routes
│   └── exports.py              # /exports/* routes
├── services/                   # Business logic (no HTTP here!)
│   ├── __init__.py
│   ├── file_detector.py
│   ├── extractor/
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── csv_extractor.py
│   │   ├── pdf_extractor.py
│   │   └── image_extractor.py
│   ├── cleaner/
│   │   ├── __init__.py
│   │   ├── operations.py
│   │   └── quality_scorer.py
│   ├── visualizer.py
│   └── predictor/
│       ├── __init__.py
│       ├── auto_ml.py
│       ├── time_series.py
│       └── classification.py
├── models/                     # SQLAlchemy ORM
│   ├── __init__.py
│   ├── user.py
│   ├── project.py
│   ├── file.py
│   ├── dataset.py
│   ├── cleaning_operation.py
│   ├── visualization.py
│   └── prediction.py
├── schemas/                    # Pydantic request/response models
│   ├── __init__.py
│   ├── auth.py
│   ├── upload.py
│   ├── dataset.py
│   ├── cleaning.py
│   ├── visualization.py
│   └── prediction.py
├── tasks/                      # Celery background jobs
│   ├── __init__.py
│   ├── extraction.py
│   ├── cleaning.py
│   ├── training.py
│   └── notifications.py
├── utils/
│   ├── storage.py              # S3/MinIO operations
│   ├── security.py             # JWT, encryption
│   └── validators.py           # Input validation
└── tests/                      # Mirror structure of app/
    ├── __init__.py
    ├── conftest.py             # pytest fixtures
    ├── unit/
    │   ├── test_file_detector.py
    │   ├── test_csv_extractor.py
    │   └── test_quality_scorer.py
    ├── integration/
    │   ├── test_upload_flow.py
    │   ├── test_cleaning_api.py
    │   └── test_prediction_api.py
    └── fixtures/
        ├── sample_csv.csv
        ├── sample_pdf.pdf
        └── sample_image.png
```

### **2. Router File Template**

```python
# apps/api/app/routers/uploads.py

"""
Upload Router - Handles file ingestion and processing initiation.

Routes:
  POST /uploads              - Upload new file
  GET  /uploads/{id}         - Get upload status
  GET  /uploads/{id}/progress - WebSocket for real-time updates
  DELETE /uploads/{id}       - Cancel/delete upload
"""

from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, BackgroundTasks, WebSocket
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
import structlog

from app.dependencies import get_db, get_current_user, require_tier
from app.schemas.upload import UploadResponse, UploadStatusResponse, UploadRequest
from app.services.file_detector import FileDetector
from app.services.extractor import get_extractor
from app.tasks.extraction import process_file_extraction
from app.models.file import File as FileModel
from app.utils.storage import StorageClient

logger = structlog.get_logger()
router = APIRouter(prefix="/uploads", tags=["uploads"])

@router.post(
    "",
    response_model=UploadResponse,
    status_code=202,
    summary="Upload file for processing",
    description="""
    Accepts CSV, Excel, PDF, or image files.
    Returns immediately with file ID; processing continues in background.
    Use WebSocket or polling endpoint to track progress.
    """
)
async def upload_file(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="File to upload (max 100MB)"),
    project_id: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user),
    storage: StorageClient = Depends(StorageClient)
) -> UploadResponse:
    """
    Handle universal file upload with format auto-detection.
    
    Args:
        file: The uploaded file
        project_id: Optional project to associate with
        
    Returns:
        UploadResponse with file_id and polling information
        
    Raises:
        413: File too large
        415: Unsupported file type
        422: Corrupted or invalid file
    """
    # 1. Validate file size (tier-based limits)
    await require_tier(current_user, max_file_size=file.size)
    
    logger.info(
        "upload_started",
        user_id=str(current_user.id),
        filename=file.filename,
        size=file.size,
        content_type=file.content_type
    )
    
    try:
        # 2. Stream to temporary storage
        temp_path = await storage.stream_to_temp(file)
        
        # 3. Detect true format (magic bytes, not extension)
        detector = FileDetector()
        detection_result = await detector.detect(temp_path)
        
        if detection_result.confidence < 0.8:
            raise HTTPException(
                status_code=422,
                detail=f"Could not reliably detect file format. Detected: {detection_result.format}"
            )
        
        # 4. Create database record
        file_record = FileModel(
            user_id=current_user.id,
            project_id=project_id,
            original_filename=file.filename,
            file_size_bytes=file.size,
            mime_type=file.content_type,
            detected_format=detection_result.format,
            status="uploaded",
            storage_key_original=await storage.move_to_permanent(
                temp_path, 
                f"uploads/{current_user.id}/{file_record.id}"
            )
        )
        
        db.add(file_record)
        await db.commit()
        await db.refresh(file_record)
        
        # 5. Queue background extraction
        process_file_extraction.delay(str(file_record.id))
        
        logger.info(
            "upload_accepted",
            file_id=str(file_record.id),
            format=detection_result.format
        )
        
        return UploadResponse(
            file_id=str(file_record.id),
            status="processing",
            detected_format=detection_result.format,
            estimated_seconds=detection_result.estimate_processing_time(),
            progress_url=f"/uploads/{file_record.id}/progress",
            websocket_url=f"/ws/uploads/{file_record.id}"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("upload_failed", error=str(e), exc_info=True)
        raise HTTPException(status_code=500, detail="Upload processing failed")

@router.get(
    "/{file_id}",
    response_model=UploadStatusResponse,
    summary="Get upload processing status"
)
async def get_upload_status(
    file_id: str,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
) -> UploadStatusResponse:
    """Poll-based status check for clients without WebSocket support."""
    file_record = await FileModel.get_by_id(db, file_id, user_id=current_user.id)
    
    if not file_record:
        raise HTTPException(status_code=404, detail="File not found")
    
    return UploadStatusResponse(
        file_id=file_id,
        status=file_record.status,
        progress=file_record.processing_progress,
        extraction_metadata=file_record.extraction_metadata,
        error=file_record.error_message,
        created_at=file_record.created_at,
        updated_at=file_record.updated_at
    )

@router.websocket("/{file_id}/progress")
async def upload_websocket(
    websocket: WebSocket,
    file_id: str,
    token: str,
    db: AsyncSession = Depends(get_db)
):
    """
    WebSocket endpoint for real-time upload progress.
    
    Connection flow:
    1. Client connects with JWT token
    2. Server validates access to file_id
    3. Server streams progress updates from Redis pub/sub
    4. Connection closes when status is 'ready' or 'error'
    """
    await websocket.accept()
    
    try:
        # Validate token and permissions
        user = await validate_ws_token(token)
        file_record = await FileModel.get_by_id(db, file_id, user_id=user.id)
        
        if not file_record:
            await websocket.close(code=4004, reason="File not found")
            return
        
        # Subscribe to Redis channel for this file
        redis = await get_redis()
        channel = f"file_progress:{file_id}"
        
        async for message in redis.subscribe(channel):
            await websocket.send_json(message)
            
            if message["status"] in ["ready", "error"]:
                await websocket.close()
                break
                
    except Exception as e:
        logger.error("websocket_error", error=str(e))
        await websocket.close(code=1011, reason="Internal error")

@router.delete(
    "/{file_id}",
    status_code=204,
    summary="Cancel processing or delete completed upload"
)
async def delete_upload(
    file_id: str,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user),
    storage: StorageClient = Depends(StorageClient)
):
    """Cancel ongoing processing and remove all associated data."""
    file_record = await FileModel.get_by_id(db, file_id, user_id=current_user.id)
    
    if not file_record:
        raise HTTPException(status_code=404, detail="File not found")
    
    # Cancel Celery task if still processing
    if file_record.status in ["uploaded", "extracting", "cleaning"]:
        from celery import current_app as celery_app
        celery_app.control.revoke(
            f"extraction-{file_id}", 
            terminate=True, 
            signal="SIGTERM"
        )
    
    # Delete from storage
    await storage.delete(file_record.storage_key_original)
    if file_record.storage_key_processed:
        await storage.delete(file_record.storage_key_processed)
    
    # Soft delete in database
    file_record.status = "deleted"
    await db.commit()
    
    logger.info("upload_deleted", file_id=file_id, user_id=str(current_user.id))
```

### **3. Service Layer Pattern**

```python
# apps/api/app/services/extractor/pdf_extractor.py

"""
PDF Extraction Service - Extracts structured data from PDF documents.

Supports:
- Digital PDFs (text layer extraction)
- Scanned PDFs (OCR with table detection)
- Mixed documents
- Multi-page table reconstruction
"""

from typing import List, Dict, Any, Optional
from dataclasses import dataclass
import fitz  # PyMuPDF
from PIL import Image
import io
import structlog

from app.services.extractor.base import BaseExtractor, ExtractionResult, TableData
from app.services.ocr import OCREngine
from app.utils.table_detector import TableDetector

logger = structlog.get_logger()

@dataclass
class PDFPage:
    number: int
    text: str
    tables: List[TableData]
    images: List[Dict[str, Any]]
    has_text_layer: bool

class PDFExtractor(BaseExtractor):
    """
    Extractor for PDF documents.
    
    Processing pipeline:
    1. Open document with PyMuPDF
    2. Detect if page has text layer or is scanned
    3. For digital: extract text and table structures
    4. For scanned: convert to image, run OCR + table detection
    5. Reconstruct tables spanning multiple pages
    6. Return structured data with provenance
    """
    
    def __init__(self):
        self.ocr = OCREngine()
        self.table_detector = TableDetector()
        self.confidence_threshold = 0.85
    
    async def extract(self, file_path: str) -> ExtractionResult:
        """
        Extract all structured data from PDF.
        
        Args:
            file_path: Local path to PDF file
            
        Returns:
            ExtractionResult with tables, metadata, and confidence scores
        """
        logger.info("pdf_extraction_started", file_path=file_path)
        
        try:
            doc = fitz.open(file_path)
            pages: List[PDFPage] = []
            
            for page_num in range(len(doc)):
                page = doc[page_num]
                page_data = await self._process_page(page, page_num)
                pages.append(page_data)
            
            # Reconstruct multi-page tables
            tables = self._reconstruct_tables(pages)
            
            # Calculate overall confidence
            avg_confidence = sum(
                p.tables[0].confidence if p.tables else 0.5 
                for p in pages
            ) / len(pages) if pages else 0
            
            result = ExtractionResult(
                format="pdf",
                tables=tables,
                page_count=len(doc),
                has_text_layer=all(p.has_text_layer for p in pages),
                ocr_confidence=avg_confidence,
                metadata={
                    "title": doc.metadata.get("title"),
                    "author": doc.metadata.get("author"),
                    "pages": len(doc),
                    "tables_found": len(tables)
                }
            )
            
            logger.info(
                "pdf_extraction_completed",
                pages=len(pages),
                tables=len(tables),
                confidence=avg_confidence
            )
            
            return result
            
        except Exception as e:
            logger.error("pdf_extraction_failed", error=str(e))
            raise ExtractionError(f"PDF extraction failed: {str(e)}") from e
    
    async def _process_page(self, page: fitz.Page, page_num: int) -> PDFPage:
        """Process single PDF page."""
        text = page.get_text()
        has_text_layer = len(text.strip()) > 100  # Heuristic
        
        if has_text_layer:
            # Digital PDF - extract native tables
            tables = await self._extract_native_tables(page)
        else:
            # Scanned PDF - OCR required
            pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))  # 2x scale for OCR
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            tables = await self._extract_scanned_tables(img, page_num)
        
        return PDFPage(
            number=page_num,
            text=text[:1000],  # Truncate for preview
            tables=tables,
            images=[],  # TODO: Extract embedded images
            has_text_layer=has_text_layer
        )
    
    async def _extract_native_tables(self, page: fitz.Page) -> List[TableData]:
        """Extract tables from digital PDF using native structures."""
        # Implementation using PyMuPDF table detection
        pass
    
    async def _extract_scanned_tables(
        self, 
        image: Image.Image, 
        page_num: int
    ) -> List[TableData]:
        """Extract tables from scanned image using OCR + CV."""
        # Run OCR
        ocr_result = await self.ocr.recognize(image)
        
        # Detect table structures
        tables = await self.table_detector.detect(image, ocr_result)
        
        return [
            TableData(
                page=page_num,
                rows=table.rows,
                columns=table.columns,
                data=table.data,
                confidence=table.confidence,
                bbox=table.bounding_box
            )
            for table in tables
        ]
    
    def _reconstruct_tables(self, pages: List[PDFPage]) -> List[TableData]:
        """Merge tables that span multiple pages."""
        # Implementation for multi-page table reconstruction
        pass
```

---

## **TESTING CONSTITUTION**

### **1. Testing Pyramid Mandate**

```
        /\
       /  \     E2E Tests (Playwright) - 5% critical paths
      /____\    
     /      \   Integration Tests - 15% API contracts, DB
    /________\  
   /          \ Unit Tests - 80% business logic, utilities
  /____________\
```

### **2. Frontend Testing Standards**

```typescript
// components/dashboard/upload/UploadZone.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UploadZone } from './UploadZone';
import { useUpload } from '@/hooks/upload/useUpload';
import { mockFile, createMockFile } from '@/tests/fixtures/files';

// Mock the hook
jest.mock('@/hooks/upload/useUpload');

describe('UploadZone', () => {
  const mockUpload = jest.fn();
  const mockCancel = jest.fn();
  const mockReset = jest.fn();

  beforeEach(() => {
    (useUpload as jest.Mock).mockReturnValue({
      status: 'idle',
      progress: 0,
      fileId: null,
      error: null,
      upload: mockUpload,
      cancel: mockCancel,
      reset: mockReset,
      isIdle: true,
      isUploading: false,
      isProcessing: false,
      isCompleted: false,
      isError: false
    });
  });

  describe('Idle State', () => {
    it('renders upload prompt with accepted formats', () => {
      render(<UploadZone acceptedFormats={['csv', 'pdf']} />);
      
      expect(screen.getByText('Drop your file here')).toBeInTheDocument();
      expect(screen.getByText(/csv, pdf/)).toBeInTheDocument();
    });

    it('triggers file input when browse button clicked', async () => {
      const user = userEvent.setup();
      render(<UploadZone />);
      
      const input = screen.getByLabelText(/browse/i);
      await user.click(input);
      
      // Verify input is triggered
      expect(input).toHaveAttribute('type', 'file');
    });
  });

  describe('Drag & Drop', () => {
    it('highlights on drag enter', async () => {
      const user = userEvent.setup();
      render(<UploadZone />);
      
      const dropzone = screen.getByTestId('upload-zone');
      
      await user.dragEnter(dropzone, {
        dataTransfer: { files: [createMockFile('test.csv')] }
      });
      
      expect(dropzone).toHaveClass('border-primary');
    });

    it('calls upload on valid file drop', async () => {
      const user = userEvent.setup();
      const file = createMockFile('data.csv', 'text/csv', 1024);
      
      render(<UploadZone onUploadComplete={jest.fn()} />);
      
      const dropzone = screen.getByTestId('upload-zone');
      await user.drop(dropzone, file);
      
      await waitFor(() => {
        expect(mockUpload).toHaveBeenCalledWith(file);
      });
    });

    it('rejects files exceeding max size', async () => {
      const user = userEvent.setup();
      const largeFile = createMockFile('large.csv', 'text/csv', 200 * 1024 * 1024);
      
      render(<UploadZone maxFileSize={100 * 1024 * 1024} />);
      
      const dropzone = screen.getByTestId('upload-zone');
      await user.drop(dropzone, largeFile);
      
      expect(screen.getByText(/file too large/i)).toBeInTheDocument();
      expect(mockUpload).not.toHaveBeenCalled();
    });
  });

  describe('Processing State', () => {
    it('shows progress animation when uploading', () => {
      (useUpload as jest.Mock).mockReturnValue({
        ...useUpload(),
        status: 'uploading',
        progress: 45,
        isUploading: true
      });
      
      render(<UploadZone />);
      
      expect(screen.getByText('45%')).toBeInTheDocument();
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '45');
    });

    it('disables interaction during processing', () => {
      (useUpload as jest.Mock).mockReturnValue({
        ...useUpload(),
        status: 'processing',
        isProcessing: true
      });
      
      render(<UploadZone />);
      
      expect(screen.getByTestId('upload-zone')).toHaveClass('pointer-events-none');
    });
  });

  describe('Error State', () => {
    it('displays error message and retry option', () => {
      (useUpload as jest.Mock).mockReturnValue({
        ...useUpload(),
        status: 'error',
        error: 'Network timeout',
        isError: true
      });
      
      render(<UploadZone />);
      
      expect(screen.getByText(/network timeout/i)).toBeInTheDocument();
      expect(screen.getByText(/try again/i)).toBeInTheDocument();
    });

    it('calls reset when retry clicked', async () => {
      const user = userEvent.setup();
      (useUpload as jest.Mock).mockReturnValue({
        ...useUpload(),
        status: 'error',
        isError: true,
        reset: mockReset
      });
      
      render(<UploadZone />);
      
      await user.click(screen.getByText(/try again/i));
      expect(mockReset).toHaveBeenCalled();
    });
  });

  describe('Completion', () => {
    it('calls onUploadComplete with fileId', async () => {
      const onComplete = jest.fn();
      
      (useUpload as jest.Mock).mockReturnValue({
        ...useUpload(),
        status: 'completed',
        fileId: 'file_123',
        isCompleted: true
      });
      
      render(<UploadZone onUploadComplete={onComplete} />);
      
      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledWith('file_123');
      });
    });
  });
});
```

### **3. Backend Testing Standards**

```python
# apps/api/app/tests/unit/services/test_file_detector.py

import pytest
from pathlib import Path
from app.services.file_detector import FileDetector, DetectionResult

class TestFileDetector:
    """Unit tests for file format detection service."""
    
    @pytest.fixture
    def detector(self):
        return FileDetector()
    
    @pytest.fixture
    def fixtures_dir(self):
        return Path(__file__).parent.parent.parent / "fixtures"
    
    def test_detects_csv_by_content(self, detector, fixtures_dir):
        """Should detect CSV by magic bytes, not extension."""
        csv_file = fixtures_dir / "sample_csv.csv"
        
        result = detector.detect(str(csv_file))
        
        assert result.format == "csv"
        assert result.confidence > 0.95
        assert result.mime_type == "text/csv"
    
    def test_detects_pdf_by_header(self, detector, fixtures_dir):
        """Should detect PDF by %PDF- header."""
        pdf_file = fixtures_dir / "sample_pdf.pdf"
        
        result = detector.detect(str(pdf_file))
        
        assert result.format == "pdf"
        assert result.confidence == 1.0
    
    def test_detects_image_by_magic_bytes(self, detector, fixtures_dir):
        """Should detect PNG by magic bytes."""
        png_file = fixtures_dir / "sample_image.png"
        
        result = detector.detect(str(png_file))
        
        assert result.format == "png"
        assert result.mime_type == "image/png"
    
    def test_rejects_unknown_binary(self, detector, tmp_path):
        """Should return low confidence for unknown formats."""
        unknown_file = tmp_path / "unknown.xyz"
        unknown_file.write_bytes(b"\x00\x01\x02\x03\x04\x05")
        
        result = detector.detect(str(unknown_file))
        
        assert result.format == "unknown"
        assert result.confidence < 0.5
    
    def test_detects_excel_disguised_as_csv(self, detector, tmp_path):
        """Should detect true format even with wrong extension."""
        # Create Excel file with .csv extension
        excel_file = tmp_path / "fake.csv"
        excel_file.write_bytes(b"\x50\x4B\x03\x04")  # ZIP header (Excel is ZIP)
        
        result = detector.detect(str(excel_file))
        
        assert result.format == "xlsx"  # True format
        assert result.confidence > 0.9
    
    @pytest.mark.parametrize("filename,expected_format", [
        ("data.CSV", "csv"),      # Case insensitive
        ("report.PDF", "pdf"),    # Uppercase extension
        ("file", "csv"),          # No extension, detect by content
    ])
    def test_case_insensitive_detection(self, detector, tmp_path, filename, expected_format):
        """Should handle various filename formats."""
        file_path = tmp_path / filename
        file_path.write_text("a,b,c\n1,2,3")  # CSV content
        
        result = detector.detect(str(file_path))
        
        assert result.format == expected_format

# Integration test example
# apps/api/app/tests/integration/test_upload_flow.py

import pytest
import asyncio
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.main import app
from app.models.file import FileStatus

@pytest.mark.asyncio
class TestUploadFlow:
    """End-to-end upload and extraction flow."""
    
    async def test_complete_upload_flow(
        self, 
        client: AsyncClient, 
        auth_headers: dict,
        db_session: AsyncSession,
        sample_csv: bytes
    ):
        """
        Test: Upload CSV → Detect format → Queue extraction → Verify completion
        
        This tests the entire pipeline without mocking external services.
        """
        # 1. Upload file
        files = {"file": ("test.csv", sample_csv, "text/csv")}
        response = await client.post(
            "/uploads",
            files=files,
            headers=auth_headers
        )
        
        assert response.status_code == 202
        data = response.json()
        file_id = data["file_id"]
        assert data["detected_format"] == "csv"
        assert data["status"] == "processing"
        
        # 2. Poll for completion (with timeout)
        max_attempts = 30
        for attempt in range(max_attempts):
            status_response = await client.get(
                f"/uploads/{file_id}",
                headers=auth_headers
            )
            status_data = status_response.json()
            
            if status_data["status"] == "ready":
                break
            
            assert status_data["status"] in ["uploaded", "extracting", "cleaning"]
            await asyncio.sleep(0.5)  # Wait between polls
        else:
            pytest.fail("Upload processing timed out")
        
        # 3. Verify database state
        from app.models.file import File
        file_record = await db_session.get(File, file_id)
        
        assert file_record.status == FileStatus.READY
        assert file_record.row_count > 0
        assert file_record.column_count > 0
        assert file_record.quality_score > 0
        
        # 4. Verify storage artifacts exist
        from app.utils.storage import StorageClient
        storage = StorageClient()
        
        assert await storage.exists(file_record.storage_key_processed)
        
        # 5. Verify dataset was created
        from app.models.dataset import Dataset
        dataset = await db_session.execute(
            select(Dataset).where(Dataset.file_id == file_id)
        )
        dataset_record = dataset.scalar_one_or_none()
        
        assert dataset_record is not None
        assert dataset_record.row_count == file_record.row_count
```

---

## **CODE QUALITY RULES**

### **1. Pre-commit Hooks (Mandatory)**

```yaml
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."

# Frontend checks
cd apps/web
echo "➡️  Checking TypeScript..."
npx tsc --noEmit

echo "➡️  Linting..."
npx next lint

echo "➡️  Running affected tests..."
npx jest --changedSince=HEAD --passWithNoTests

# Backend checks
cd ../api
echo "➡️  Checking Python formatting..."
black --check app
isort --check-only app

echo "➡️  Running mypy..."
mypy app

echo "➡️  Running pytest on changed files..."
git diff --name-only --cached | grep -E '\.py$' | xargs pytest --co -q

echo "✅ All checks passed!"
```

### **2. Linting Configuration**

```javascript
// packages/eslint-config/index.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  plugins: ['@typescript-eslint', 'import', 'unused-imports'],
  rules: {
    // Enforce absolute imports for clean structure
    'no-restricted-imports': ['error', {
      patterns: ['../../*', './../../*']  // No deep relative imports
    }],
    
    // Auto-remove unused imports
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': ['warn', { 
      vars: 'all', 
      varsIgnorePattern: '^_', 
      args: 'after-used', 
      argsIgnorePattern: '^_' 
    }],
    
    // Import ordering
    'import/order': ['error', {
      groups: [
        ['builtin', 'external'],
        ['internal', 'parent', 'sibling', 'index']
      ],
      'newlines-between': 'always',
      alphabetize: { order: 'asc', caseInsensitive: true }
    }],
    
    // Component standards
    'react/function-component-definition': ['error', {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function'
    }],
    
    // Documentation
    'require-jsdoc': ['warn', {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: true
      }
    }]
  }
};
```

### **3. CI/CD Pipeline**

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  changes:
    runs-on: ubuntu-latest
    outputs:
      web: ${{ steps.changes.outputs.web }}
      api: ${{ steps.changes.outputs.api }}
    steps:
      - uses: actions/checkout@v3
      - uses: dorny/paths-filter@v2
        id: changes
        with:
          filters: |
            web:
              - 'apps/web/**'
              - 'packages/**'
            api:
              - 'apps/api/**'
              - 'packages/**'

  frontend:
    needs: changes
    if: ${{ needs.changes.outputs.web == 'true' }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npx tsc --noEmit -p apps/web/tsconfig.json
      
      - name: Lint
        run: npx eslint apps/web --ext .ts,.tsx
      
      - name: Unit tests
        run: npx jest --coverage --coverageThreshold='{"global":{"branches":80,"functions":80,"lines":80,"statements":80}}'
      
      - name: Build
        run: npm run build --workspace=web
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  backend:
    needs: changes
    if: ${{ needs.changes.outputs.api == 'true' }}
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
      redis:
        image: redis:7
        ports:
          - 6379:6379
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          cd apps/api
          pip install -r requirements.txt
          pip install -r requirements-test.txt
      
      - name: Lint with black
        run: |
          cd apps/api
          black --check app
      
      - name: Type check with mypy
        run: |
          cd apps/api
          mypy app
      
      - name: Run migrations
        env:
          DATABASE_URL: postgresql+asyncpg://postgres:postgres@localhost:5432/test
        run: |
          cd apps/api
          alembic upgrade head
      
      - name: Run tests with coverage
        env:
          DATABASE_URL: postgresql+asyncpg://postgres:postgres@localhost:5432/test
          REDIS_URL: redis://localhost:6379
        run: |
          cd apps/api
          pytest --cov=app --cov-report=xml --cov-fail-under=80
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  e2e:
    needs: [frontend, backend]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Start services
        run: docker-compose -f docker-compose.test.yml up -d
      
      - name: Run Playwright tests
        run: |
          cd apps/web
          npx playwright install
          npx playwright test
      
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: apps/web/playwright-report/

  deploy:
    needs: [frontend, backend, e2e]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: |
          # Production deployment script
          echo "Deploying..."
```

---

## **ARCHITECTURE DECISION RECORDS (ADRs)**

Every significant decision must be documented:

```markdown
# docs/adr/001-monorepo-structure.md

# ADR 001: Monorepo with Turborepo

## Status
Accepted

## Context
We needed to decide on repository structure for DataMorph with:
- Next.js frontend
- FastAPI backend
- Shared TypeScript/Python types
- Unified CI/CD

## Decision
Use Turborepo monorepo with apps/ and packages/ structure.

## Consequences
### Positive
- Single PR for cross-cutting changes
- Shared type definitions between frontend/backend
- Unified dependency management
- Caching across builds

### Negative
- Steeper learning curve for new developers
- Requires understanding of workspace protocols
- Larger initial clone size

## Alternatives Considered
- Separate repos: Rejected due to type synchronization overhead
- Nx: Rejected in favor of Turborepo's simpler caching model
- pnpm workspaces alone: Rejected, needed task orchestration
```

---

## **FINAL CHECKLIST FOR SENIOR DEV APPROVAL**

Before any code reaches `main`, verify:

- [ ] **Structure**: Every page has dedicated directory with co-located components/hooks
- [ ] **Imports**: No `../../` relative imports, all use `@/` aliases
- [ ] **Tests**: 80%+ coverage, co-located `.test.ts` files
- [ ] **Types**: No `any` types, strict TypeScript enabled
- [ ] **Docs**: Every public function has JSDoc/docstring
- [ ] **Error Handling**: All async operations have try/catch with structured logging
- [ ] **Security**: No secrets in code, all env vars validated
- [ ] **Performance**: No N+1 queries, images optimized, lazy loading implemented
- [ ] **Accessibility**: ARIA labels, keyboard navigation, color contrast
- [ ] **ADR**: Architectural decisions documented in `/docs/adr/`

---

This constitution ensures your codebase is **indistinguishable from top-tier enterprise software**. Senior developers will recognize:
- **Predictability**: Every file has exactly one purpose, found exactly where expected
- **Testability**: Business logic isolated, thoroughly tested, no mocking nightmares
- **Scalability**: Clear separation allows independent scaling of frontend/backend/workers
- **Maintainability**: Documentation, types, and tests make onboarding instant

Use this as your **single source of truth** when working with AI coding agents or human developers.