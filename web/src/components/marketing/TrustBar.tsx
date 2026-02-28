"use client";

import { motion } from "framer-motion";

const logos = [
  "Acme Corp",
  "TechFlow",
  "DataWave",
  "CloudSync",
  "AnalytIQ",
  "NexGen",
];

const stats = [
  { value: "50M+", label: "Files Processed" },
  { value: "99.7%", label: "Extraction Accuracy" },
  { value: "GDPR", label: "Compliant" },
];

export function TrustBar() {
  return (
    <section className="py-16 border-y border-border/50 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-bold gradient-text">
                {stat.value}
              </p>
              <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Logo marquee */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-dark to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-dark to-transparent z-10" />

          <motion.div
            className="flex gap-16 items-center"
            animate={{ x: [0, -600] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 text-text-muted hover:text-text-secondary transition-colors duration-300 text-lg font-semibold tracking-wide cursor-default select-none opacity-40 hover:opacity-70"
              >
                {logo}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
