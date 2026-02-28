# Page 1: Home (Landing Page)

## Purpose
Convert visitors in 30 seconds. Show, don't tell.

## Route
`/` → `app/(marketing)/page.tsx`

## Sections (8 Total)

### Section 1: Hero — "The Upload Zone"
- [x] Full-viewport immersive hero
- [x] Animated gradient mesh background (deep purple → electric blue)
- [x] Floating data particles animation
- [x] Live interactive upload component (functional demo, not decorative)
- [x] Headline: "Drop anything. Know everything."
- [x] Subheadline: "CSV, PDF, or a photo of your spreadsheet — our AI extracts, cleans, and predicts in 30 seconds."
- [x] CTA Primary: "Try Free Demo" (opens modal with upload)
- [x] CTA Secondary: "Watch 2-Min Video"
- [ ] Drag & drop animation: file → format icon → scanning → data preview

### Section 2: Trust Bar — "They Trust Us"
- [x] Infinite horizontal scroll marquee
- [x] 6 client logos (monochromatic, hover reveals color)
- [x] Stats: "50M+ files processed" | "99.7% extraction accuracy" | "GDPR Compliant"

### Section 3: The Problem — "Data Chaos"
- [x] Split screen layout (Left: pain, Right: solution)
- [x] Left: Animated illustration of user drowning in multiple apps
- [x] Pain points as floating cards: "Manual data entry", "Format errors", "Siloed insights"
- [x] Right: Single glowing DataMorph portal
- [ ] Arrow animation: data flowing in, intelligence flowing out

### Section 4: How It Works — "The 30-Second Magic"
- [x] Horizontal scroll timeline (sticky vertical progression)
- [x] Step 1: Drop — File icon morphing between formats
- [x] Step 2: Detect — AI brain scanning document
- [x] Step 3: Extract — Structured table emerging from chaos
- [x] Step 4: Clean — Auto-fix animation (before/after toggle)
- [x] Step 5: Predict — Graph drawing itself into future

### Section 5: Format Showcase — "We Speak All Languages"
- [x] Bento grid (4 asymmetric cards)
- [x] CSV/Excel card with schema inference popup hover
- [x] PDFs card with layered extraction preview
- [x] Images card with OCR highlight animation
- [x] Mixed card with cross-modal fusion demo

### Section 6: Use Case Spotlight — "From Mess to Success"
- [x] Tabbed interface (3 vertical tabs)
- [x] Tab 1: E-commerce Seller (before/after + testimonial)
- [x] Tab 2: Financial Analyst (before/after + testimonial)
- [x] Tab 3: Healthcare Admin (before/after + testimonial)

### Section 7: Social Proof — "Results That Speak"
- [x] Masonry grid of metrics cards + video testimonials
- [x] Animated counters: "2.3M hours saved", "847% ROI average", "4.9/5 accuracy"
- [ ] 3 vertical video testimonial cards (play on hover)

### Section 8: Final CTA — "Start Your First Analysis"
- [x] Dark section with glowing upload zone (mirrors hero)
- [x] Functional upload component
- [x] "Your data is waiting. So are your insights."
- [x] "Free forever for small datasets"

## Components Needed
- `components/marketing/hero/HeroUpload.tsx`
- `components/marketing/hero/HeroAnimation.tsx`
- `components/marketing/TrustBar.tsx`
- `components/marketing/ProblemSolution.tsx`
- `components/marketing/HowItWorks.tsx`
- `components/marketing/FormatShowcase.tsx`
- `components/marketing/UseCaseSpotlight.tsx`
- `components/marketing/SocialProof.tsx`
- `components/marketing/FinalCTA.tsx`

## Design Tokens
- Background: Animated gradient mesh (deep purple → electric blue)
- Primary CTA: `#6366F1` (Indigo)
- Dark sections: `#0F172A` (Slate 900)
- Card surfaces: `#1E293B` (Slate 800)
