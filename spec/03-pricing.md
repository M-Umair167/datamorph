# Page 3: Pricing

## Purpose
Clear value tiers. Reduce decision friction.

## Route
`/pricing` → `app/(marketing)/pricing/page.tsx`

## Sections (4 Total)

### Section 1: Pricing Toggle
- [ ] Centered toggle (Monthly/Annual with 20% savings badge)
- [ ] Smooth transition animation between pricing

### Section 2: Pricing Cards
- [ ] 4 cards with "Pro" highlighted as recommended
- [ ] Starter: Free — 10MB files, 3 projects, basic charts (Hobbyists, students)
- [ ] Pro: $39/mo — 100MB files, unlimited projects, PDF extraction, API (Freelancers)
- [ ] Business: $149/mo — 1GB files, multi-user, custom ML, priority support (Growth companies)
- [ ] Enterprise: Custom — Unlimited, on-premise, dedicated manager (Large orgs)
- [ ] Pro card: "Most Popular" ribbon + glow border
- [ ] Each card: Plan name + price, 5 features with checkmarks, CTA button
- [ ] "Compare all features" link

### Section 3: Usage-Based Add-ons
- [ ] Calculator-style interactive section
- [ ] Slider: Additional processing credits
- [ ] Slider: Extra storage
- [ ] Slider: Advanced API calls
- [ ] Live price updates as user adjusts

### Section 4: FAQ — "Pricing Questions"
- [ ] Accordion (5 questions)
- [ ] "What happens if I exceed my file size limit?"
- [ ] "Can I upgrade/downgrade anytime?"
- [ ] "Do you offer refunds?"
- [ ] "What counts as a processing credit?"
- [ ] "Is my data deleted if I cancel?"

## Components Needed
- `components/marketing/pricing/PricingToggle.tsx`
- `components/marketing/pricing/PricingCards.tsx`
- `components/marketing/pricing/AddonsCalculator.tsx`
- `components/marketing/pricing/PricingFAQ.tsx`
