"use client";

import { motion } from "framer-motion";
import { Upload, Play, FileSpreadsheet, FileText, Image } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0533] via-bg-dark to-[#0c1445]" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary mb-8"
        >
          <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
          Now with AI-powered predictions
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6"
        >
          Drop anything.
          <br />
          <span className="gradient-text">Know everything.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          CSV, PDF, or a photo of your spreadsheet — our AI extracts, cleans,
          and predicts in 30 seconds.
        </motion.p>

        {/* Upload Zone */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-xl mx-auto mb-8"
        >
          <div className="border-2 border-dashed border-primary/40 rounded-2xl p-10 bg-surface/40 backdrop-blur-sm hover:border-primary/70 transition-colors duration-300 cursor-pointer group">
            <div className="flex justify-center gap-4 mb-6">
              <motion.div
                whileHover={{ y: -4 }}
                className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center"
              >
                <FileSpreadsheet className="w-6 h-6 text-success" />
              </motion.div>
              <motion.div
                whileHover={{ y: -4 }}
                className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center"
              >
                <FileText className="w-6 h-6 text-error" />
              </motion.div>
              <motion.div
                whileHover={{ y: -4 }}
                className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center"
              >
                <Image className="w-6 h-6 text-primary" />
              </motion.div>
            </div>
            <p className="text-text-primary font-semibold text-lg mb-1">
              Drop your file here
            </p>
            <p className="text-text-secondary text-sm mb-4">
              CSV, Excel, PDF, or images up to 100MB
            </p>
            <button className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-full transition-colors duration-200 group-hover:shadow-lg group-hover:shadow-primary/25">
              <Upload className="w-4 h-4 inline mr-2" />
              Browse Files
            </button>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-4"
        >
          <button className="px-8 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-full transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40">
            Try Free Demo
          </button>
          <button className="px-8 py-3 text-text-secondary hover:text-text-primary font-medium rounded-full border border-border hover:border-text-muted transition-all duration-200 flex items-center gap-2">
            <Play className="w-4 h-4" />
            Watch 2-Min Video
          </button>
        </motion.div>
      </div>
    </section>
  );
}
