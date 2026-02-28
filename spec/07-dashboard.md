# Page 7: Dashboard (Post-Login App)

## Purpose
The actual product interface. Task-focused, minimal chrome.

## Routes
`/workspace` → `app/(dashboard)/workspace/page.tsx`
`/project/[id]` → `app/(dashboard)/project/[id]/page.tsx`
`/project/[id]/clean` → `app/(dashboard)/project/[id]/clean/page.tsx`
`/project/[id]/visualize` → `app/(dashboard)/project/[id]/visualize/page.tsx`
`/project/[id]/predict` → `app/(dashboard)/project/[id]/predict/page.tsx`
`/settings` → `app/(dashboard)/settings/page.tsx`

## Dashboard Layout
- [ ] Sidebar navigation (collapsible)
- [ ] Logo (small)
- [ ] New Project (+ button)
- [ ] Recent Projects list with file type icons
- [ ] Templates (E-commerce, Financial, Healthcare)
- [ ] Trash
- [ ] Settings
- [ ] Top bar with search, notifications, profile dropdown

## Workspace Page
- [ ] Empty state: Large upload zone with floating format icons
- [ ] Populated state: Project cards grid
- [ ] Project card: thumbnail preview, name, last edited, status badge, quick actions
- [ ] Status badges: Cleaned, Analyzed, Predicted

## Analysis Studio (3-Panel Layout)
### Left Panel: Data Navigator (20% width)
- [ ] File tree: Original files → Extracted tables → Cleaned datasets
- [ ] Version history (git-style branching)
- [ ] Metadata panel (row count, column types, quality score)

### Center Panel: Canvas (60% width)
- [ ] Tab 1: Clean — Spreadsheet with issue highlighting (Red/Yellow/Blue)
- [ ] Tab 2: Visualize — Drag-and-drop chart builder
- [ ] Tab 3: Predict — Model configuration panel

### Right Panel: Insights (20% width)
- [ ] Auto-generated insights based on current view
- [ ] "Ask a question" natural language input
- [ ] Export options (PNG, PDF, PowerPoint, API code)

## Project Settings
- [ ] General (rename, description)
- [ ] Data Sources (re-upload, refresh)
- [ ] Sharing (team members, permissions)
- [ ] Automation (scheduled re-processing)
- [ ] Danger zone (delete project)

## Components Needed
- `components/dashboard/layout/Sidebar.tsx`
- `components/dashboard/layout/Header.tsx`
- `components/dashboard/layout/Breadcrumb.tsx`
- `components/dashboard/workspace/ProjectGrid.tsx`
- `components/dashboard/workspace/EmptyState.tsx`
- `components/dashboard/upload/UploadZone.tsx`
- `components/dashboard/shared/DataStatusBadge.tsx`
- `components/dashboard/shared/FileTypeIcon.tsx`
