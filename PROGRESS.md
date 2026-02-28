# DataMorph — Project Progress Tracker

> **Last updated:** Feb 28, 2026
> **Status:** Frontend complete. Backend API built and verified (20 endpoints, server running).

---

## Quick Start

```bash
# Frontend
cd web
npm install
npm run dev        # → http://localhost:3000
npm run build      # production build (verified, 0 errors)

# Backend
cd backend
python -m venv venv
.\venv\Scripts\activate         # Windows
pip install -r requirements.txt
uvicorn app.main:app --port 8000  # → http://localhost:8000
# Docs: http://localhost:8000/docs

# Full stack (Docker)
docker-compose up --build       # Starts all services
```

---

## Tech Stack

| Layer       | Choice                                            |
| ----------- | ------------------------------------------------- |
| Framework   | Next.js 16.1.6 (App Router, Turbopack)            |
| Language    | TypeScript 5                                      |
| Styling     | Tailwind CSS v4 (CSS-only config, **no** tailwind.config.ts) |
| Animations  | Framer Motion 12                                  |
| Icons       | Lucide React                                      |
| Utilities   | clsx + tailwind-merge (`cn()` helper)             |
| Fonts       | Inter (sans) + JetBrains Mono (mono) via next/font |
| React       | 19.2.3                                            |
| Backend     | FastAPI 0.115.0 (Python 3.12)                     |
| Database    | PostgreSQL 15 + async SQLAlchemy 2.0.36           |
| Migrations  | Alembic 1.14.0                                    |
| Auth        | JWT (python-jose) + bcrypt (passlib)              |
| Storage     | S3/MinIO (boto3)                                  |
| Queue       | Celery 5.4 + Redis 7                              |
| Data        | pandas 2.2.3                                      |

### Important: Tailwind v4

There is **no `tailwind.config.ts`**. All design tokens are defined via `@theme inline` inside `src/app/globals.css`. If you need to add a new color or spacing value, add it there.

---

## Project Structure

```
datamorph/
├── backend.md              # Backend spec (not implemented yet)
├── bussines_idea.md        # Business idea document
├── design.md               # UI/UX design spec
├── spec.md                 # Full product specification
├── PROGRESS.md             # ← You are here
├── spec/                   # Per-page task breakdowns
│   ├── 01-home-landing.md
│   ├── 02-product.md
│   ├── 03-pricing.md
│   ├── 04-use-cases.md
│   ├── 05-about.md
│   ├── 06-auth-pages.md
│   ├── 07-dashboard.md
│   └── 08-system-pages.md
└── web/                    # Next.js project root
    ├── package.json
    ├── next.config.ts
    ├── tsconfig.json
    └── src/
        ├── lib/
        │   └── utils.ts             # cn() — clsx + twMerge
        └── app/
            ├── globals.css           # Design tokens, scrollbar, utilities
            ├── layout.tsx            # Root layout (fonts, metadata)
            ├── page.tsx              # Re-exports (marketing)/page
            ├── loading.tsx           # Global loading spinner
            ├── error.tsx             # Global error boundary
            ├── not-found.tsx         # 404 page
            │
            ├── (marketing)/          # Public marketing pages
            │   ├── layout.tsx        # Navbar + Footer wrapper
            │   ├── page.tsx          # Home (8 sections)
            │   ├── product/page.tsx
            │   ├── pricing/page.tsx
            │   ├── use-cases/
            │   │   ├── page.tsx              # Hub
            │   │   └── [industry]/page.tsx   # 6 industry pages (SSG)
            │   └── about/page.tsx
            │
            ├── (auth)/               # Auth pages (no nav/footer)
            │   ├── layout.tsx
            │   ├── login/page.tsx
            │   └── signup/page.tsx
            │
            └── (dashboard)/          # Post-login app
                ├── layout.tsx        # Sidebar + Header shell
                ├── workspace/page.tsx
                ├── project/[id]/page.tsx
                └── settings/page.tsx
```

### Shared Components

```
src/components/
├── marketing/
│   ├── Navbar.tsx               # Fixed glass-morphism nav, responsive
│   ├── Footer.tsx               # 4-column links + compliance badges
│   ├── hero/HeroSection.tsx     # Full-viewport hero with particles
│   ├── TrustBar.tsx             # Stats + infinite logo marquee
│   ├── ProblemSection.tsx       # Split-screen pain vs solution
│   ├── HowItWorks.tsx           # 5-step process cards
│   ├── FormatShowcase.tsx       # 4 format cards (CSV, PDF, Images, Mixed)
│   ├── UseCaseSpotlight.tsx     # 3-tab before/after + testimonial
│   ├── SocialProof.tsx          # AnimatedCounter + metric cards
│   └── FinalCTA.tsx             # CTA with glowing upload zone
│
└── dashboard/
    └── layout/
        ├── Sidebar.tsx          # Collapsible sidebar (projects, templates)
        └── Header.tsx           # Search bar, notifications, profile
```

---

## Design System Reference

### Colors (defined in globals.css `@theme inline`)

| Token             | Value     | Usage                      |
| ----------------- | --------- | -------------------------- |
| `primary`         | `#6366F1` | Buttons, links, accents    |
| `primary-hover`   | `#4F46E5` | Hover states               |
| `secondary`       | `#8B5CF6` | Gradients, secondary accent|
| `success`         | `#10B981` | Positive states, badges    |
| `warning`         | `#F59E0B` | Caution states             |
| `error`           | `#EF4444` | Error states, destructive  |
| `bg-dark`         | `#0F172A` | Page background            |
| `surface`         | `#1E293B` | Cards, panels              |
| `surface-hover`   | `#334155` | Card hover, active states  |
| `text-primary`    | `#F8FAFC` | Headings, body text        |
| `text-secondary`  | `#94A3B8` | Descriptions, subtitles    |
| `text-muted`      | `#64748B` | Placeholders, meta text    |
| `border`          | `#334155` | Borders, dividers          |

### CSS Utility Classes (globals.css)

| Class           | Effect                                        |
| --------------- | --------------------------------------------- |
| `.gradient-text` | Primary → Secondary gradient on text          |
| `.glass`        | Glass-morphism panel (blur + tinted border)   |
| `.glow-primary` | Primary-colored box shadow glow               |
| `.glow-border`  | Subtle glowing border                         |

### cn() Helper (src/lib/utils.ts)

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## Completed Work (✅)

### 1. Home / Landing Page
- **Route:** `/`
- **File:** `src/app/(marketing)/page.tsx`
- **Sections:** Hero (animated gradient, floating particles, upload zone), TrustBar (stats + logo marquee), ProblemSection (pain vs solution split), HowItWorks (5-step process), FormatShowcase (CSV/PDF/Images/Mixed bento grid), UseCaseSpotlight (3-tab with before/after), SocialProof (IntersectionObserver animated counters), FinalCTA (glowing upload CTA)
- **All sections** are separate components in `src/components/marketing/`

### 2. Product Page
- **Route:** `/product`
- **File:** `src/app/(marketing)/product/page.tsx`
- **Features:** Sidebar navigator with 5 feature categories (Ingestion, Cleaning, Visualization, Prediction, Security). Each has 3 detail cards. Animation on section switch.

### 3. Pricing Page
- **Route:** `/pricing`
- **File:** `src/app/(marketing)/pricing/page.tsx`
- **Features:** Monthly/Annual toggle (annual shows savings), 4 pricing tiers (Starter free, Pro $39/mo, Business $149/mo, Enterprise custom), add-ons calculator (3 add-ons with checkboxes and running total), 5-item FAQ accordion.

### 4. Use Cases Pages
- **Hub Route:** `/use-cases`
- **Hub File:** `src/app/(marketing)/use-cases/page.tsx`
- **Features:** 6 industry vertical cards, universal workflow diagram, ROI calculator with interactive slider.
- **Individual Routes:** `/use-cases/[industry]` — 6 SSG pages via `generateStaticParams()` for: ecommerce, finance, healthcare, manufacturing, marketing, realestate. Each page has hero, pain/solution comparison, metrics, and testimonial.

### 5. About Page
- **Route:** `/about`
- **File:** `src/app/(marketing)/about/page.tsx`
- **Sections:** Mission hero, Timeline (5 milestones), Team grid (6 members with hover-reveal fun facts), 4 values cards, 5 open job positions.

### 6. Auth Pages
- **Login Route:** `/login`
- **File:** `src/app/(auth)/login/page.tsx`
- **Features:** Split-screen layout, social login (Google, Microsoft, GitHub), email/password form, show/hide password toggle, forgot password link, enterprise SSO link.

- **Signup Route:** `/signup`
- **File:** `src/app/(auth)/signup/page.tsx`
- **Features:** Matching split-screen, full name + email + password form, real-time password strength indicator (4-bar meter with Weak/Fair/Good/Strong), terms checkbox, benefit highlights on left panel.

### 7. Dashboard
- **Workspace Route:** `/workspace`
- **File:** `src/app/(dashboard)/workspace/page.tsx`
- **Features:** Project card grid with thumbnails, status badges (Cleaned/Analyzed/Predicted), compact drag-and-drop upload zone, EmptyState component with floating icons. Demo projects pre-populated.

- **Project Analysis Route:** `/project/[id]`
- **File:** `src/app/(dashboard)/project/[id]/page.tsx`
- **Features:** 3-panel layout — Left: file tree navigator + version history + metadata, Center: tabbed canvas (Clean spreadsheet with error highlighting, Visualize chart builder placeholder, Predict model configuration placeholder), Right: AI-generated insights + natural language question input + export options (PNG, PDF, PPTX, API).

- **Settings Route:** `/settings`
- **File:** `src/app/(dashboard)/settings/page.tsx`
- **Sections:** Profile (avatar, name, email, company, role), Notifications (4 toggle switches), Security (change password + 2FA), Data/Appearance/API (placeholder panels). Sidebar navigation with active state.

- **Dashboard Layout Components:**
  - `Sidebar.tsx` — Collapsible, New Project button, recent projects list, templates (E-commerce, Financial, Healthcare), trash, settings. Animated width transition.
  - `Header.tsx` — Search bar with ⌘K hint, notification bell with dot indicator, profile avatar dropdown.

### 8. System Pages
- **404:** `src/app/not-found.tsx` — Animated gradient "404" text, home + go-back buttons.
- **Error:** `src/app/error.tsx` — Error boundary with retry button and home link.
- **Loading:** `src/app/loading.tsx` — Bouncing dots animation with gradient logo.

---

## Route Map (18 routes total)

| Route                        | Type    | Status |
| ---------------------------- | ------- | ------ |
| `/`                          | Static  | ✅     |
| `/product`                   | Static  | ✅     |
| `/pricing`                   | Static  | ✅     |
| `/use-cases`                 | Static  | ✅     |
| `/use-cases/ecommerce`       | SSG     | ✅     |
| `/use-cases/finance`         | SSG     | ✅     |
| `/use-cases/healthcare`      | SSG     | ✅     |
| `/use-cases/manufacturing`   | SSG     | ✅     |
| `/use-cases/marketing`       | SSG     | ✅     |
| `/use-cases/realestate`      | SSG     | ✅     |
| `/about`                     | Static  | ✅     |
| `/login`                     | Static  | ✅     |
| `/signup`                    | Static  | ✅     |
| `/workspace`                 | Static  | ✅     |
| `/project/[id]`              | Dynamic | ✅     |
| `/settings`                  | Static  | ✅     |
| `/_not-found`                | Static  | ✅     |
| (error boundary)             | Client  | ✅     |

---

## Not Started Yet (🔲)

### Backend — Completed ✅
- [x] FastAPI server setup with CORS, exception handlers, health check
- [x] Authentication system (JWT signup/login/refresh/me)
- [x] File upload & processing pipeline (S3 storage, format detection)
- [x] Data ingestion engine (CSV, PDF, images — Celery extraction task)
- [x] Cleaning pipeline (cleaning operations API + Celery task)
- [x] Visualization API (chart creation from datasets)
- [x] Prediction model training & serving (Celery ML task)
- [x] Database schema (8 SQLAlchemy models) & Alembic migrations setup
- [x] Export API (presigned S3 download URLs)
- [x] Docker Compose (frontend, backend, worker, Postgres, Redis, MinIO)
- [x] Custom exception handlers (404, 403, 400, 401, 409, 413)

### Backend API Endpoints (20 total)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api/v1/auth/signup` | POST | User registration |
| `/api/v1/auth/login` | POST | JWT login |
| `/api/v1/auth/refresh` | POST | Token refresh |
| `/api/v1/auth/me` | GET | Current user profile |
| `/api/v1/projects/` | POST | Create project |
| `/api/v1/projects/` | GET | List projects |
| `/api/v1/projects/{id}` | GET | Project detail |
| `/api/v1/projects/{id}` | PATCH | Update project |
| `/api/v1/projects/{id}` | DELETE | Delete project |
| `/api/v1/uploads/` | POST | Upload file |
| `/api/v1/uploads/{id}/progress` | GET | Upload progress |
| `/api/v1/uploads/{id}` | GET | File info |
| `/api/v1/uploads/project/{id}` | GET | List files |
| `/api/v1/uploads/{id}` | DELETE | Delete file |
| `/api/v1/datasets/project/{id}` | GET | List datasets |
| `/api/v1/datasets/{id}` | GET | Dataset details |
| `/api/v1/datasets/{id}/preview` | GET | Data preview |
| `/api/v1/datasets/{id}/clean` | POST | Clean data |
| `/api/v1/datasets/{id}/visualize` | POST | Create chart |
| `/api/v1/predictions/dataset/{id}` | POST | Start prediction |
| `/api/v1/predictions/{id}` | GET | Prediction result |
| `/api/v1/predictions/project/{id}` | GET | List predictions |
| `/api/v1/exports/dataset/{id}` | GET | Download export |

### Frontend — Not Yet Functional
- [ ] Wire auth pages to real backend (currently static forms)
- [ ] Connect dashboard to real API data (currently demo/mock data)
- [ ] File upload integration (currently UI-only)
- [ ] Real-time data processing progress
- [ ] Chart rendering in Visualize tab (library TBD: Recharts or Chart.js)
- [ ] Spreadsheet editing in Clean tab (consider ag-Grid or TanStack Table)
- [ ] Prediction model results display
- [ ] User session management & protected routes
- [ ] Team collaboration features (sharing, permissions)
- [ ] Toast/notification system
- [ ] Form validation with error messages
- [ ] Responsive polish pass (some dashboard panels are hidden on mobile)

### Nice to Have
- [ ] Dark/Light theme toggle (currently dark-only)
- [ ] i18n / multi-language
- [ ] E2E tests (Playwright)
- [ ] Component tests (Vitest + Testing Library)
- [ ] Storybook for component documentation
- [ ] CI/CD pipeline
- [ ] SEO meta tags per page (Open Graph, Twitter cards)
- [ ] Analytics integration

---

## Known Technical Notes

1. **Tailwind v4** — Uses CSS-only config (`@theme inline` in globals.css). Do NOT create a `tailwind.config.ts`.
2. **Route Groups** — Three groups: `(marketing)` has Navbar+Footer, `(auth)` has no chrome, `(dashboard)` has Sidebar+Header.
3. **Root page.tsx** — Simply re-exports from `(marketing)/page.tsx` via `export { default } from "./(marketing)/page"`.
4. **Next.js 16 async params** — Dynamic route components receive `params` as a `Promise`. See `project/[id]/page.tsx` and `use-cases/[industry]/page.tsx` for pattern.
5. **All pages are "use client"** — Since every page uses Framer Motion or React state. If adding a server-only page, omit the directive.
6. **Demo data is hardcoded** — Project cards, team members, pricing tiers, etc. are all inline arrays. When connecting to a backend, replace these with API calls.

---

## Spec Files Reference

The `spec/` folder contains detailed per-page task breakdowns with checkboxes. Each file lists every component, feature, and design requirement for that page. Use these as your implementation checklists:

| File                    | Covers                              |
| ----------------------- | ----------------------------------- |
| `spec/01-home-landing.md` | Hero, TrustBar, Problem, HowItWorks, FormatShowcase, UseCases, Social, CTA |
| `spec/02-product.md`    | Feature navigator, detail cards      |
| `spec/03-pricing.md`    | Tiers, toggle, add-ons, FAQ          |
| `spec/04-use-cases.md`  | Hub + 6 industry pages               |
| `spec/05-about.md`      | Mission, timeline, team, values, careers |
| `spec/06-auth-pages.md` | Login, signup, social auth, password strength |
| `spec/07-dashboard.md`  | Sidebar, workspace, analysis studio, settings |
| `spec/08-system-pages.md`| 404, error, loading                  |

---

## How to Continue

1. **Read the spec files** in `spec/` and the master docs (`spec.md`, `design.md`, `backend.md`) to understand full scope.
2. **Run `npm run dev`** inside `web/` to see current state.
3. **Pick a task** from the "Not Started Yet" section above.
4. **Follow the design tokens** in `globals.css` — use `text-primary`, `bg-surface`, `border-border`, etc.
5. **Use `cn()`** from `src/lib/utils.ts` for conditional class merging.
6. **Test with `npm run build`** before committing — ensures no TypeScript or SSR errors.
