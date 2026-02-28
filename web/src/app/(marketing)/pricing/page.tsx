"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Zap,
  ChevronDown,
  Calculator,
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "For hobbyists & students",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      "10MB file uploads",
      "3 projects",
      "Basic charts",
      "CSV/Excel only",
      "Community support",
    ],
    notIncluded: ["PDF extraction", "API access", "Custom ML models"],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "For freelancers & small teams",
    monthlyPrice: 39,
    annualPrice: 31,
    features: [
      "100MB file uploads",
      "Unlimited projects",
      "PDF extraction",
      "Advanced charts & insights",
      "API access",
      "1-year forecasts",
      "Email support",
    ],
    notIncluded: ["Custom ML models"],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Business",
    description: "For growth companies",
    monthlyPrice: 149,
    annualPrice: 119,
    features: [
      "1GB file uploads",
      "Multi-user workspace",
      "Custom ML models",
      "Image OCR",
      "Priority support",
      "Advanced API",
      "Audit logs",
      "Team collaboration",
    ],
    notIncluded: [],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    monthlyPrice: -1,
    annualPrice: -1,
    features: [
      "Unlimited everything",
      "On-premise deployment",
      "Dedicated success manager",
      "Custom integrations",
      "SLA guarantee",
      "SSO / SAML",
      "Custom model training",
      "24/7 phone support",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "What happens if I exceed my file size limit?",
    a: "You'll be prompted to upgrade your plan. Files over your limit won't be processed, but you can upgrade instantly and retry without re-uploading.",
  },
  {
    q: "Can I upgrade/downgrade anytime?",
    a: "Yes! Upgrades take effect immediately with prorated billing. Downgrades apply at the next billing cycle, so you keep your current features until then.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a 14-day money-back guarantee on all paid plans. No questions asked. If you're not satisfied, we'll refund you completely.",
  },
  {
    q: "What counts as a \"processing credit\"?",
    a: "One processing credit equals one file upload and analysis cycle. PDF extraction and image OCR may use additional credits depending on complexity.",
  },
  {
    q: "Is my data deleted if I cancel?",
    a: "Your data is retained for 30 days after cancellation. You can export everything during this period. After 30 days, all data is permanently and securely deleted.",
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Simple, transparent{" "}
            <span className="gradient-text">pricing</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto mb-10"
          >
            Start free. Scale as you grow. No hidden fees, no surprises.
          </motion.p>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4"
          >
            <span
              className={`text-sm font-medium ${!isAnnual ? "text-text-primary" : "text-text-muted"}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${isAnnual ? "bg-primary" : "bg-surface-hover"}`}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full absolute top-1"
                animate={{ left: isAnnual ? 30 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span
              className={`text-sm font-medium ${isAnnual ? "text-text-primary" : "text-text-muted"}`}
            >
              Annual
            </span>
            {isAnnual && (
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-success/10 text-success rounded-full border border-success/20">
                Save 20%
              </span>
            )}
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-6 rounded-2xl border ${
                plan.highlighted
                  ? "border-primary/50 bg-primary/5 glow-border"
                  : "border-border bg-surface/30"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-primary text-white text-xs font-semibold rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-text-primary">
                  {plan.name}
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                {plan.monthlyPrice === -1 ? (
                  <div className="text-3xl font-bold text-text-primary">
                    Custom
                  </div>
                ) : plan.monthlyPrice === 0 ? (
                  <div className="text-3xl font-bold text-text-primary">
                    Free
                  </div>
                ) : (
                  <div>
                    <span className="text-3xl font-bold text-text-primary">
                      ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-text-muted text-sm">/month</span>
                  </div>
                )}
                {isAnnual && plan.monthlyPrice > 0 && (
                  <p className="text-xs text-text-muted mt-1">
                    Billed annually (${plan.annualPrice * 12}/year)
                  </p>
                )}
              </div>

              <button
                className={`w-full py-2.5 rounded-full text-sm font-medium transition-colors mb-6 ${
                  plan.highlighted
                    ? "bg-primary hover:bg-primary-hover text-white"
                    : "bg-surface hover:bg-surface-hover text-text-primary border border-border"
                }`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-2.5">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
                {plan.notIncluded.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-text-muted"
                  >
                    <X className="w-4 h-4 text-text-muted flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Add-ons Calculator */}
      <section className="py-24 bg-surface/20 border-y border-border/50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-3">
              Usage-Based Add-ons
            </h2>
            <p className="text-text-secondary">
              Pay only for what you use. Add extra capacity anytime.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                label: "Processing Credits",
                unit: "credits/month",
                basePrice: 0.1,
                values: [100, 500, 1000, 5000, 10000],
              },
              {
                label: "Extra Storage",
                unit: "GB",
                basePrice: 0.5,
                values: [10, 50, 100, 500, 1000],
              },
              {
                label: "API Calls",
                unit: "calls/month",
                basePrice: 0.01,
                values: [1000, 5000, 10000, 50000, 100000],
              },
            ].map((addon) => (
              <div
                key={addon.label}
                className="p-5 rounded-xl border border-border bg-surface/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-text-primary">
                    {addon.label}
                  </span>
                  <span className="text-sm text-text-secondary">
                    from ${addon.basePrice}/{addon.unit.split("/")[0]}
                  </span>
                </div>
                <div className="flex gap-2">
                  {addon.values.map((v) => (
                    <button
                      key={v}
                      className="px-3 py-1.5 text-xs rounded-lg border border-border bg-surface hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {v >= 1000 ? `${v / 1000}K` : v}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pricing <span className="gradient-text">Questions</span>
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-surface/50 transition-colors"
                >
                  <span className="font-medium text-text-primary pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-4 text-text-secondary text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
