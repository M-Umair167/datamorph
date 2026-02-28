"use client";

import { motion } from "framer-motion";
import { Upload, Cpu, BarChart3, Download, Sparkles } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload", desc: "Drag and drop any file — CSV, PDF, image, or spreadsheet." },
  { icon: Cpu, title: "Process", desc: "AI automatically detects structure, cleans, and normalizes your data." },
  { icon: Sparkles, title: "Analyze", desc: "Get instant insights, patterns, and predictions powered by ML." },
  { icon: BarChart3, title: "Visualize", desc: "Interactive charts and dashboards generated automatically." },
  { icon: Download, title: "Export", desc: "Download clean data in any format or connect via API." },
];

export function HowItWorks() {
  return (
    <section className="relative py-24 border-t border-border">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How it <span className="gradient-text">works</span>
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            From raw file to actionable insight in under 30 seconds.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-xl border border-border bg-surface/50 p-5 text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs text-text-muted mb-1">Step {i + 1}</p>
              <p className="text-sm font-semibold text-text-primary mb-1.5">{step.title}</p>
              <p className="text-xs text-text-muted leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
