# Page 3: Pricing

## Purpose
Clear value tiers. Reduce decision friction.

## Route
`/pricing` → `app/(marketing)/pricing/page.tsx`

## Sections (4 Total)

### Section 1: Pricing Toggle
- [x] Centered toggle (Monthly/Annual with 20% savings badge)
- [x] Smooth transition animation between pricing

### Section 2: Pricing Cards
- [x] 4 cards with "Pro" highlighted as recommended
- [x] Starter: Free — 10MB files, 3 projects, basic charts (Hobbyists, students)
- [x] Pro: $39/mo — 100MB files, unlimited projects, PDF extraction, API (Freelancers)
- [x] Business: $149/mo — 1GB files, multi-user, custom ML, priority support (Growth companies)
- [x] Enterprise: Custom — Unlimited, on-premise, dedicated manager (Large orgs)
- [x] Pro card: "Most Popular" ribbon + glow border
- [x] Each card: Plan name + price, 5 features with checkmarks, CTA button
- [ ] "Compare all features" link

### Section 3: Usage-Based Add-ons
- [x] Calculator-style interactive section
- [x] Slider: Additional processing credits
- [x] Slider: Extra storage
- [x] Slider: Advanced API calls
- [x] Live price updates as user adjusts

### Section 4: FAQ — "Pricing Questions"
- [x] Accordion (5 questions)
- [x] "What happens if I exceed my file size limit?"
- [x] "Can I upgrade/downgrade anytime?"
- [x] "Do you offer refunds?"
- [x] "What counts as a processing credit?"
- [x] "Is my data deleted if I cancel?"

## Components Needed
- `components/marketing/pricing/PricingToggle.tsx`
- `components/marketing/pricing/PricingCards.tsx`
- `components/marketing/pricing/AddonsCalculator.tsx`
- `components/marketing/pricing/PricingFAQ.tsx`
