"use client";

import { motion } from "framer-motion";
import { Upload, FileSpreadsheet, FileText, Image } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-[#1a0533] to-bg-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Your data is waiting.
          <br />
          <span className="gradient-text">So are your insights.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-text-secondary text-lg mb-10"
        >
          Start your first analysis in seconds. Free forever for small datasets.
        </motion.p>

        {/* Upload zone */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="border-2 border-dashed border-primary/40 rounded-2xl p-8 bg-surface/30 backdrop-blur-sm hover:border-primary/70 transition-colors cursor-pointer glow-border group">
            <div className="flex justify-center gap-3 mb-4">
              <FileSpreadsheet className="w-8 h-8 text-success/60 group-hover:text-success transition-colors" />
              <FileText className="w-8 h-8 text-error/60 group-hover:text-error transition-colors" />
              <Image className="w-8 h-8 text-primary/60 group-hover:text-primary transition-colors" />
            </div>
            <p className="text-text-primary font-semibold mb-1">
              Drop your file here
            </p>
            <p className="text-sm text-text-secondary mb-4">
              CSV, Excel, PDF, or images
            </p>
            <button className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-full transition-colors shadow-lg shadow-primary/25">
              <Upload className="w-4 h-4 inline mr-2" />
              Start Your First Analysis
            </button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-sm text-text-muted"
        >
          No credit card required • Free forever for small datasets • GDPR
          compliant
        </motion.p>
      </div>
    </section>
  );
}
