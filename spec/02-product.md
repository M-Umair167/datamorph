# Page 2: Product (Features Deep-Dive)

## Purpose
Educate power users. Comparison-friendly.

## Route
`/product` → `app/(marketing)/product/page.tsx`

## Sections (6 Total)

### Section 1: Feature Navigator
- [ ] Sticky sidebar navigation + scrollable content
- [ ] Sidebar menu: Universal Ingestion, Smart Cleaning, Visualization Studio, Data Mining, Prediction Engine, Security & Compliance

### Section 2: Universal Ingestion
- [ ] Interactive file type lab layout
- [ ] Left: Upload simulator (select file type to see processing)
- [ ] Right: Technical specs in tabs (CSV, PDF, Image)
- [ ] CSV: Schema inference, encoding detection, delimiter auto-detect
- [ ] PDF: Layout preservation, multi-page handling, digital vs scanned
- [ ] Image: OCR engines, table reconstruction, handwriting support
- [ ] Interactive demo button

### Section 3: Smart Cleaning — "The AI Data Janitor"
- [ ] Split screen with live playground
- [ ] Left: Data health score dashboard (0-100)
- [ ] Categories: Completeness, Consistency, Accuracy, Uniqueness
- [ ] Right: Before/After slider
- [ ] Highlight specific fixes shown

### Section 4: Visualization Studio
- [ ] Gallery of 6 auto-generated chart cards
- [ ] Line chart — time-series with auto-insight
- [ ] Scatter plot — correlation analysis
- [ ] Heatmap — matrix analysis
- [ ] Bar chart — comparison
- [ ] Box plot — distribution check
- [ ] Geographic — location data heatmap
- [ ] Each card clickable for interactive version

### Section 5: Prediction Engine
- [ ] 3-column feature matrix layout
- [ ] Column 1: Time Series (Prophet, ARIMA, LSTM)
- [ ] Column 2: Classification (AutoML, feature importance, SHAP)
- [ ] Column 3: Scenario Planning (what-if sliders, Monte Carlo)
- [ ] "Predict the Future" interactive demo

### Section 6: Security & Compliance
- [ ] Trust badge grid (SOC 2, GDPR, HIPAA, ISO 27001, CCPA)
- [ ] Expandable security whitepaper sections
- [ ] Data encryption, retention policies, audit logging, on-premise option

## Components Needed
- `components/marketing/features/FeatureNavigator.tsx`
- `components/marketing/features/IngestionLab.tsx`
- `components/marketing/features/CleaningPlayground.tsx`
- `components/marketing/features/VizGallery.tsx`
- `components/marketing/features/PredictionMatrix.tsx`
- `components/marketing/features/SecurityBadges.tsx`
