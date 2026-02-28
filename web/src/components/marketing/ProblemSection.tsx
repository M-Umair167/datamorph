"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Keyboard, GitBranch, Sparkles } from "lucide-react";

const painPoints = [
  { icon: Keyboard, text: "Manual data entry" },
  { icon: AlertTriangle, text: "Format errors" },
  { icon: GitBranch, text: "Siloed insights" },
];

export function ProblemSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            The <span className="text-error">Data Chaos</span> Problem
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            You&apos;re drowning in tools. Excel, Tableau, Python, OCR tools — all
            doing different things badly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Pain */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative p-8 rounded-2xl border border-error/20 bg-error/5">
              <h3 className="text-xl font-semibold text-error mb-6">
                Without DataMorph
              </h3>
              <div className="space-y-4">
                {painPoints.map((point) => (
                  <motion.div
                    key={point.text}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-error/10 border border-error/20"
                  >
                    <point.icon className="w-5 h-5 text-error flex-shrink-0" />
                    <span className="text-text-secondary">{point.text}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <span className="text-4xl font-bold text-error/50">😫</span>
                <p className="text-sm text-text-muted mt-2">
                  Hours wasted on data wrangling
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Solution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative p-8 rounded-2xl border border-success/20 bg-success/5 glow-border">
              <h3 className="text-xl font-semibold text-success mb-6">
                With DataMorph
              </h3>
              <div className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-text-primary">
                    One Platform. One Upload.
                  </p>
                  <p className="text-text-secondary mt-2">
                    Data flows in, intelligence flows out. No switching apps, no
                    manual work.
                  </p>
                </div>
                <div className="flex justify-center gap-3">
                  {["Extract", "Clean", "Predict"].map((step) => (
                    <span
                      key={step}
                      className="px-3 py-1 text-xs font-medium bg-success/10 text-success rounded-full border border-success/20"
                    >
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
