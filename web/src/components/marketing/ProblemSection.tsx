"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const painPoints = [
  "Hours of manual data cleaning",
  "Incompatible file formats",
  "Lost insights buried in data",
  "Complex tools with steep learning curves",
];

const solutions = [
  "Instant automated cleaning & normalization",
  "Universal format support — drag & drop anything",
  "AI-powered insights in seconds",
  "Simple interface, zero setup required",
];

export function ProblemSection() {
  return (
    <section className="relative py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stop wrestling with <span className="text-red-400">messy data</span>
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            Traditional tools weren&apos;t built for the data challenges you face today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-border bg-surface/50 p-6"
          >
            <p className="text-sm font-semibold text-red-400 mb-4 uppercase tracking-wider">Before DataMorph</p>
            <ul className="space-y-3">
              {painPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-text-secondary text-sm">
                  <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-border bg-surface/50 p-6"
          >
            <p className="text-sm font-semibold text-emerald-400 mb-4 uppercase tracking-wider">With DataMorph</p>
            <ul className="space-y-3">
              {solutions.map((point) => (
                <li key={point} className="flex items-start gap-3 text-text-secondary text-sm">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
