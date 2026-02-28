"use client";

import { motion } from "framer-motion";
import { FileSpreadsheet, FileText, ImageIcon, Layers } from "lucide-react";

const formats = [
  {
    icon: FileSpreadsheet,
    title: "CSV / Excel",
    description:
      "Auto-detect schema, encoding, and delimiters. Smart type inference for dates, currencies, and categories.",
    features: ["Schema inference", "Encoding detection", "Duplicate handling"],
    color: "text-success",
    bg: "from-success/10 to-success/5",
    span: "col-span-1 row-span-1",
  },
  {
    icon: FileText,
    title: "PDFs",
    description:
      "Extract tables from digital and scanned PDFs. Multi-page reconstruction with layout preservation.",
    features: ["Table extraction", "OCR support", "Multi-page merging"],
    color: "text-error",
    bg: "from-error/10 to-error/5",
    span: "col-span-1 row-span-2",
  },
  {
    icon: ImageIcon,
    title: "Images",
    description:
      "Photo of a spreadsheet? Screenshot of a chart? We extract structured data from any image.",
    features: ["OCR + CV", "Table reconstruction", "Handwriting support"],
    color: "text-primary",
    bg: "from-primary/10 to-primary/5",
    span: "col-span-1 row-span-1",
  },
  {
    icon: Layers,
    title: "Mixed Sources",
    description:
      "Combine CSV, PDF, and images into a unified dataset. AI auto-detects relationships.",
    features: ["Auto-join", "Cross-modal fusion", "Unified schema"],
    color: "text-secondary",
    bg: "from-secondary/10 to-secondary/5",
    span: "col-span-1 row-span-1",
  },
];

export function FormatShowcase() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            We Speak <span className="gradient-text">All Languages</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Drop any format. Our AI understands them all.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formats.map((format, i) => (
            <motion.div
              key={format.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${i === 1 ? "lg:row-span-2" : ""}`}
            >
              <div
                className={`h-full p-6 rounded-2xl border border-border bg-gradient-to-b ${format.bg} hover:border-border/80 transition-all group`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-surface flex items-center justify-center flex-shrink-0`}
                  >
                    <format.icon className={`w-6 h-6 ${format.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      {format.title}
                    </h3>
                  </div>
                </div>

                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {format.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {format.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2.5 py-1 text-xs font-medium bg-surface/80 text-text-secondary rounded-md border border-border"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
