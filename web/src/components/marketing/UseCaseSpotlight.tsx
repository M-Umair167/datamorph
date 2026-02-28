"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { TrendingUp, FlaskConical, DollarSign, Users } from "lucide-react";

const useCases = [
  {
    icon: TrendingUp,
    tab: "Analytics",
    title: "Business Analytics",
    desc: "Upload quarterly reports, sales data, or market CSVs and get instant trend analysis, forecasts, and actionable insights.",
    quote: "We replaced 3 analyst hours per week with a single file drop.",
    author: "Sarah K., Head of Analytics",
  },
  {
    icon: FlaskConical,
    tab: "Research",
    title: "Academic Research",
    desc: "Process survey responses, experiment logs, and lab data. DataMorph handles messy real-world datasets effortlessly.",
    quote: "My PhD data pipeline went from 2 days to 2 minutes.",
    author: "Dr. James L., MIT",
  },
  {
    icon: DollarSign,
    tab: "Finance",
    title: "Financial Data",
    desc: "Bank statements, invoices, and transaction logs — automatically categorized, cleaned, and reconciled.",
    quote: "Month-end reconciliation is now a 5-minute task.",
    author: "Priya M., CFO",
  },
  {
    icon: Users,
    tab: "HR",
    title: "People & Operations",
    desc: "Employee surveys, attendance logs, performance data — all unified and ready for insights.",
    quote: "We finally have a single view of our workforce data.",
    author: "Tom R., VP People Ops",
  },
];

export function UseCaseSpotlight() {
  const [active, setActive] = useState(0);
  const current = useCases[active];

  return (
    <section className="relative py-24 border-t border-border">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for <span className="gradient-text">every team</span>
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            See how different industries use DataMorph to unlock their data.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex gap-1 p-1 rounded-lg border border-border bg-surface/50">
            {useCases.map((uc, i) => (
              <button
                key={uc.tab}
                onClick={() => setActive(i)}
                className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
                  active === i
                    ? "bg-primary text-white font-medium"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {uc.tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl border border-border bg-surface/50 p-8 max-w-2xl mx-auto"
        >
          <current.icon className="w-6 h-6 text-primary mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">{current.title}</h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-6">{current.desc}</p>
          <blockquote className="border-l-2 border-primary pl-4">
            <p className="text-sm text-text-secondary italic mb-2">&ldquo;{current.quote}&rdquo;</p>
            <cite className="text-xs text-text-muted not-italic">{current.author}</cite>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
