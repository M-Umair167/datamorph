# Page 4: Use Cases (Industry Solutions)

## Purpose
Vertical-specific landing pages. SEO + conversion.

## Route
`/use-cases` → `app/(marketing)/use-cases/page.tsx`
`/use-cases/[industry]` → `app/(marketing)/use-cases/[industry]/page.tsx`

## Hub Page Sections (5 Total)

### Section 1: Vertical Selector
- [x] 6 cards with industry icons
- [x] E-commerce & Retail
- [x] Financial Services
- [x] Healthcare & Life Sciences
- [x] Manufacturing & Supply Chain
- [x] Marketing & Agencies
- [x] Real Estate

### Section 2: Universal Workflow
- [x] Horizontal process diagram
- [x] Shows how each vertical uses the same core steps (Upload → Detect → Extract → Clean → Predict)

### Section 3: Case Study Teaser
- [ ] 2 featured case studies with "Read Full Story" links
- [ ] Before/after visuals
- [ ] Key metric improvements

### Section 4: ROI Calculator
- [x] Interactive slider: "How many hours do you spend on data entry weekly?"
- [x] Calculate and display annual savings in real-time
- [x] Show time saved, cost reduced, ROI percentage

### Section 5: Vertical CTA
- [ ] "See your industry solution" dropdown selector
- [ ] Animated transition to selected vertical page

## Individual Vertical Pages
- [x] Industry-specific hero with relevant imagery
- [x] Pain points specific to vertical
- [x] Solution walkthrough with industry data examples
- [x] Testimonial from industry customer
- [x] CTA to start free trial

## Components Needed
- `components/marketing/use-cases/VerticalGrid.tsx`
- `components/marketing/use-cases/WorkflowDiagram.tsx`
- `components/marketing/use-cases/CaseStudyCard.tsx`
- `components/marketing/use-cases/ROICalculator.tsx`
- `components/marketing/use-cases/VerticalCTA.tsx`
