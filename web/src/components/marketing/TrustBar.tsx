"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "2M+", label: "Files Processed" },
  { value: "50+", label: "Formats Supported" },
  { value: "99.7%", label: "Accuracy Rate" },
  { value: "<30s", label: "Average Processing" },
];

export function TrustBar() {
  return (
    <section className="relative py-16 border-y border-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-text-primary mb-1">{stat.value}</p>
              <p className="text-sm text-text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
