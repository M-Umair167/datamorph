"use client";

import { motion } from "framer-motion";
import {
  Upload,
  ScanSearch,
  Table,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Drop",
    description: "Drag any file — CSV, PDF, or image",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: ScanSearch,
    title: "Detect",
    description: "AI identifies format and content structure",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Table,
    title: "Extract",
    description: "Structured tables emerge from any format",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: Sparkles,
    title: "Clean",
    description: "Auto-fix errors, fill gaps, normalize data",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    icon: TrendingUp,
    title: "Predict",
    description: "ML models forecast trends and patterns",
    color: "text-error",
    bg: "bg-error/10",
  },
];

export function HowItWorks() {
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
            The <span className="gradient-text">30-Second</span> Magic
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Five steps. Fully automated. From raw chaos to actionable insights.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-primary via-secondary to-error opacity-20" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="p-6 rounded-2xl border border-border bg-surface/50 hover:bg-surface transition-colors text-center group">
                  {/* Step number */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-bg-dark border border-border flex items-center justify-center">
                    <span className="text-xs font-bold text-text-muted">
                      {i + 1}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 mx-auto rounded-xl ${step.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <step.icon className={`w-7 h-7 ${step.color}`} />
                  </div>

                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
