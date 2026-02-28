"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, LineChart, HeartPulse, Quote } from "lucide-react";

const useCases = [
  {
    id: "ecommerce",
    icon: ShoppingCart,
    label: "E-commerce Seller",
    before:
      "Messy Shopify exports, supplier PDFs, and competitor price screenshots scattered across 5 apps.",
    after:
      "Unified inventory dashboard with 30-day demand forecast and automated reorder alerts.",
    quote: "Saved 15 hours/week on data entry",
    author: "Sarah M., Shopify Store Owner",
    metric: "15 hrs/week saved",
  },
  {
    id: "finance",
    icon: LineChart,
    label: "Financial Analyst",
    before:
      "Scattered annual reports, manual Excel inputs, inconsistent date formats, and missing data everywhere.",
    after:
      "Automated extraction with anomaly detection. Cross-reference validation with confidence scores.",
    quote: "Found $2M discrepancy in 5 minutes",
    author: "James K., Senior Analyst @ Deloitte",
    metric: "$2M found in 5 min",
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    label: "Healthcare Admin",
    before:
      "Patient forms, insurance PDFs, handwritten notes — all needing manual transcription.",
    after:
      "Structured database with compliance audit trail. HIPAA-compliant without the IT team.",
    quote: "HIPAA-compliant without the IT team",
    author: "Dr. Lisa R., Clinic Director",
    metric: "100% compliance",
  },
];

export function UseCaseSpotlight() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 bg-surface/20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            From <span className="text-error">Mess</span> to{" "}
            <span className="text-success">Success</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Real transformations from real users across industries.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Tabs */}
          <div className="flex lg:flex-col gap-3">
            {useCases.map((uc, i) => (
              <button
                key={uc.id}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all w-full ${
                  active === i
                    ? "bg-primary/10 border border-primary/30 text-text-primary"
                    : "border border-transparent text-text-secondary hover:text-text-primary hover:bg-surface"
                }`}
              >
                <uc.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm">{uc.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Before */}
              <div className="p-6 rounded-2xl border border-error/20 bg-error/5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-3 h-3 bg-error rounded-full" />
                  <span className="text-sm font-semibold text-error">
                    Before
                  </span>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  {useCases[active].before}
                </p>
              </div>

              {/* After */}
              <div className="p-6 rounded-2xl border border-success/20 bg-success/5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-3 h-3 bg-success rounded-full" />
                  <span className="text-sm font-semibold text-success">
                    After
                  </span>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  {useCases[active].after}
                </p>
              </div>

              {/* Testimonial */}
              <div className="md:col-span-2 p-6 rounded-2xl border border-border bg-surface/50">
                <Quote className="w-8 h-8 text-primary/40 mb-3" />
                <p className="text-lg text-text-primary font-medium italic mb-3">
                  &ldquo;{useCases[active].quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">
                    — {useCases[active].author}
                  </span>
                  <span className="px-3 py-1 text-sm font-semibold gradient-text bg-primary/10 rounded-full border border-primary/20">
                    {useCases[active].metric}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
