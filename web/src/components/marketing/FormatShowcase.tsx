"use client";

import { motion } from "framer-motion";
import { FileSpreadsheet, FileText, ImageIcon, Database } from "lucide-react";

const formats = [
  {
    icon: FileSpreadsheet,
    title: "Spreadsheets",
    desc: "CSV, XLSX, XLS, Google Sheets — parsed with structure intact.",
    tags: ["CSV", "XLSX", "XLS"],
  },
  {
    icon: FileText,
    title: "Documents",
    desc: "PDFs and text files — tables and data extracted automatically.",
    tags: ["PDF", "TXT", "DOCX"],
  },
  {
    icon: ImageIcon,
    title: "Images",
    desc: "Photos of tables, receipts, whiteboards — OCR powered extraction.",
    tags: ["PNG", "JPG", "TIFF"],
  },
  {
    icon: Database,
    title: "Databases",
    desc: "SQL dumps, JSON, XML — schema detection and normalization.",
    tags: ["JSON", "XML", "SQL"],
  },
];

export function FormatShowcase() {
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
            Any format. <span className="gradient-text">Instantly.</span>
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            Upload virtually any data file and DataMorph handles the rest.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {formats.map((fmt, i) => (
            <motion.div
              key={fmt.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-xl border border-border bg-surface/50 p-6"
            >
              <fmt.icon className="w-6 h-6 text-primary mb-3" />
              <p className="text-sm font-semibold text-text-primary mb-1">{fmt.title}</p>
              <p className="text-xs text-text-muted leading-relaxed mb-3">{fmt.desc}</p>
              <div className="flex gap-1.5">
                {fmt.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
