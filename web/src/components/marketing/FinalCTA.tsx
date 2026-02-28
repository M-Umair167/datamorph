"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative py-24 border-t border-border">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
            Ready to transform
            <br />
            <span className="gradient-text">your data?</span>
          </h2>
          <p className="text-text-secondary max-w-md mx-auto mb-8">
            Join thousands of teams making better decisions with cleaner, smarter data — for free.
          </p>
          <a
            href="/workspace"
            className="inline-flex items-center gap-2 px-7 py-3 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="mt-5 text-xs text-text-muted">
            No credit card required &bull; Free forever for small datasets
          </p>
        </motion.div>
      </div>
    </section>
  );
}
