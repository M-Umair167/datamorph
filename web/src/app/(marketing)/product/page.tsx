"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Sparkles,
  BarChart3,
  Search,
  TrendingUp,
  Shield,
  FileSpreadsheet,
  FileText,
  ImageIcon,
  CheckCircle,
  Gauge,
  Activity,
  Target,
  Fingerprint,
  Lock,
  Eye,
  Server,
} from "lucide-react";

const features = [
  {
    id: "ingestion",
    icon: Upload,
    label: "Universal Ingestion",
    description:
      "Drop any file format — our AI detects, parses, and structures it automatically. No manual format selection needed.",
    details: [
      {
        title: "CSV / Excel",
        icon: FileSpreadsheet,
        items: [
          "Schema inference with smart type detection",
          "Encoding auto-detection (UTF-8, Latin-1, Windows-1252)",
          "Delimiter auto-detect and duplicate column handling",
          "Support for multi-sheet Excel workbooks",
        ],
      },
      {
        title: "PDF Documents",
        icon: FileText,
        items: [
          "Layout preservation and multi-page handling",
          "Scanned vs digital PDF detection",
          "Table extraction from complex layouts",
          "Cross-reference linking (captions to data)",
        ],
      },
      {
        title: "Images",
        icon: ImageIcon,
        items: [
          "Multi-engine OCR (Tesseract + PaddleOCR + Cloud Vision)",
          "Table reconstruction from photos",
          "Chart data extraction using computer vision",
          "Handwriting recognition support",
        ],
      },
    ],
  },
  {
    id: "cleaning",
    icon: Sparkles,
    label: "Smart Cleaning",
    description:
      "AI-powered data janitor that detects issues, suggests fixes, and cleans your data in one click or with surgical precision.",
    details: [
      {
        title: "Data Health Score",
        icon: Gauge,
        items: [
          "Completeness analysis (missing values detection)",
          "Consistency checks across columns",
          "Accuracy validation with smart rules",
          "Uniqueness analysis and deduplication",
        ],
      },
      {
        title: "Auto-Fix Engine",
        icon: CheckCircle,
        items: [
          "Missing value imputation (mean, median, ML-based)",
          "Date format normalization",
          "Outlier detection and handling",
          "Type conversion and standardization",
        ],
      },
      {
        title: "Audit Trail",
        icon: Activity,
        items: [
          "Every change logged and reversible",
          "Before/after comparison view",
          "Version history with branching",
          "Export cleaning report for compliance",
        ],
      },
    ],
  },
  {
    id: "visualization",
    icon: BarChart3,
    label: "Visualization Studio",
    description:
      "Intent-based chart recommendations. The AI analyzes your data and suggests the most insightful visualizations.",
    details: [
      {
        title: "Auto-Generated Charts",
        icon: BarChart3,
        items: [
          "Line charts for time-series with trend detection",
          "Scatter plots with correlation analysis",
          "Heatmaps for matrix relationships",
          "Geographic maps for location data",
        ],
      },
      {
        title: "AI Insights",
        icon: Search,
        items: [
          "Seasonal pattern detection",
          "Anomaly highlighting",
          "Correlation discovery",
          "Natural language explanations",
        ],
      },
      {
        title: "Export Options",
        icon: Target,
        items: [
          "PNG, SVG, and PDF export",
          "Interactive embeddable charts",
          "PowerPoint-ready slides",
          "API access for programmatic use",
        ],
      },
    ],
  },
  {
    id: "prediction",
    icon: TrendingUp,
    label: "Prediction Engine",
    description:
      "AutoML that picks the right algorithm for your data. Time series, classification, and scenario planning in one click.",
    details: [
      {
        title: "Time Series",
        icon: TrendingUp,
        items: [
          "Prophet, ARIMA, LSTM auto-selection",
          "Seasonality detection",
          "Confidence intervals visualization",
          "Multi-step forecasting",
        ],
      },
      {
        title: "Classification",
        icon: Target,
        items: [
          "AutoML model competition",
          "Feature importance ranking",
          "SHAP value explanations",
          "Cross-validation scoring",
        ],
      },
      {
        title: "Scenario Planning",
        icon: Activity,
        items: [
          "What-if parameter sliders",
          "Monte Carlo simulation",
          "Risk quantification",
          "Sensitivity analysis",
        ],
      },
    ],
  },
  {
    id: "security",
    icon: Shield,
    label: "Security & Compliance",
    description:
      "Enterprise-grade security with SOC 2, GDPR, HIPAA compliance. Your data never leaves your control.",
    details: [
      {
        title: "Encryption",
        icon: Lock,
        items: [
          "AES-256 encryption at rest",
          "TLS 1.3 in transit",
          "Client-side encryption option",
          "Key management (AWS KMS / Vault)",
        ],
      },
      {
        title: "Compliance",
        icon: Fingerprint,
        items: [
          "SOC 2 Type II certified",
          "GDPR compliant with DPA",
          "HIPAA ready for healthcare",
          "ISO 27001 certified",
        ],
      },
      {
        title: "Control",
        icon: Eye,
        items: [
          "Complete audit logging",
          "Data retention policies",
          "On-premise deployment option",
          "Role-based access control",
        ],
      },
    ],
  },
];

export default function ProductPage() {
  const [activeFeature, setActiveFeature] = useState(features[0].id);
  const active = features.find((f) => f.id === activeFeature)!;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary mb-6"
          >
            <Server className="w-4 h-4" />
            Enterprise-Grade Platform
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Every feature you need.
            <br />
            <span className="gradient-text">Nothing you don&apos;t.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            A deep dive into what makes DataMorph the most powerful data
            platform for teams of any size.
          </motion.p>
        </div>
      </section>

      {/* Feature Navigator */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-2">
            {features.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFeature(f.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  activeFeature === f.id
                    ? "bg-primary/10 border border-primary/30 text-text-primary"
                    : "border border-transparent text-text-secondary hover:text-text-primary hover:bg-surface"
                }`}
              >
                <f.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm">{f.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <active.icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">{active.label}</h2>
              </div>
              <p className="text-text-secondary text-lg leading-relaxed">
                {active.description}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {active.details.map((detail) => (
                <div
                  key={detail.title}
                  className="p-6 rounded-2xl border border-border bg-surface/30 hover:bg-surface/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <detail.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-text-primary">
                      {detail.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {detail.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
