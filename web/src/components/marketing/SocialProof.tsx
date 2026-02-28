"use client";

import { motion } from "framer-motion";

const metrics = [
  { value: "10K+", label: "Active Users", sub: "across 40+ countries" },
  { value: "4.9/5", label: "User Rating", sub: "from 2,400+ reviews" },
  { value: "500M+", label: "Rows Processed", sub: "and counting daily" },
];

export function SocialProof() {
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
            Trusted by <span className="gradient-text">thousands</span>
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            Teams worldwide rely on DataMorph to process their most critical data.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border border-border bg-surface/50 p-8 text-center"
            >
              <p className="text-4xl font-bold text-text-primary mb-1">{m.value}</p>
              <p className="text-sm font-medium text-text-secondary mb-0.5">{m.label}</p>
              <p className="text-xs text-text-muted">{m.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
