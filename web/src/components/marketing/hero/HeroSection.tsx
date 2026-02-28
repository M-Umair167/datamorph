"use client";

import { motion } from "framer-motion";
import { Upload, FileSpreadsheet, FileText, Image, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

const fileFormats = [
  { icon: FileSpreadsheet, label: "CSV" },
  { icon: FileText, label: "PDF" },
  { icon: Image, label: "Images" },
];

export function HeroSection() {
  const uploadRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = () => uploadRef.current?.click();
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    window.location.href = "/workspace";
  };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); window.location.href = "/workspace"; };

  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-bg-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_-10%,rgba(99,102,241,0.12),transparent)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.08] mb-6"
        >
          Drop anything.
          <br />
          <span className="gradient-text">Know everything.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base md:text-lg text-text-secondary max-w-xl mx-auto mb-10 leading-relaxed"
        >
          CSV, PDF, or a photo of your spreadsheet — our AI extracts, cleans,
          and predicts in <span className="text-text-primary font-medium">30 seconds</span>.
        </motion.p>

        {/* Upload Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-lg mx-auto mb-10"
        >
          <input
            ref={uploadRef}
            type="file"
            accept=".csv,.xlsx,.xls,.pdf,.png,.jpg,.jpeg,.gif,.bmp,.tiff"
            onChange={handleFileChange}
            className="hidden"
          />
          <div
            onClick={handleFileSelect}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`rounded-xl p-8 cursor-pointer transition-all duration-200 ${
              isDragging
                ? "border-2 border-primary bg-primary/5"
                : "border border-border bg-surface/50 hover:border-border-light"
            }`}
          >
            <div className="flex justify-center gap-6 mb-5">
              {fileFormats.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <Icon className="w-5 h-5 text-text-muted" />
                  <span className="text-[11px] text-text-muted">{label}</span>
                </div>
              ))}
            </div>
            <p className="text-text-primary font-medium mb-1">
              {isDragging ? "Release to upload" : "Drop your file here"}
            </p>
            <p className="text-text-muted text-sm mb-4">CSV, Excel, PDF, or images up to 100MB</p>
            <button
              onClick={(e) => { e.stopPropagation(); handleFileSelect(); }}
              className="px-5 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Upload className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
              Browse Files
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="/workspace"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors"
          >
            Get Started Free
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-xs text-text-muted"
        >
          No credit card required &bull; Free forever for small datasets &bull; GDPR compliant
        </motion.p>
      </div>
    </section>
  );
}
