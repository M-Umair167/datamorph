import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ShoppingCart,
  Landmark,
  HeartPulse,
  Factory,
  Megaphone,
  Building2,
  ArrowLeft,
  Check,
} from "lucide-react";

const data: Record<
  string,
  {
    icon: typeof ShoppingCart;
    title: string;
    headline: string;
    description: string;
    painPoints: string[];
    solutions: string[];
    testimonial: { quote: string; author: string; role: string };
    metrics: { label: string; value: string }[];
  }
> = {
  ecommerce: {
    icon: ShoppingCart,
    title: "E-commerce & Retail",
    headline: "From scattered exports to unified forecasting",
    description:
      "Stop juggling Shopify exports, supplier PDFs, and competitor screenshots. DataMorph unifies all your data sources into one actionable dashboard.",
    painPoints: [
      "Shopify exports in different formats every month",
      "Supplier invoices locked in scanned PDFs",
      "Competitor pricing tracked via screenshots",
      "Inventory forecasting done manually in Excel",
    ],
    solutions: [
      "Auto-extract from any format — CSV, PDF, or image",
      "Unified inventory dashboard across all sources",
      "AI-powered 30-day demand forecasting",
      "Automated reorder alerts based on predictions",
    ],
    testimonial: {
      quote:
        "DataMorph saved us 15 hours every week. We went from manually entering supplier data to having automated forecasts in minutes.",
      author: "Sarah Mitchell",
      role: "Operations Manager, OceanBreeze Store",
    },
    metrics: [
      { label: "Time Saved", value: "15 hrs/week" },
      { label: "Forecast Accuracy", value: "94%" },
      { label: "Data Sources Unified", value: "7" },
    ],
  },
  finance: {
    icon: Landmark,
    title: "Financial Services",
    headline: "Automate report extraction and anomaly detection",
    description:
      "Extract tables from annual reports, reconcile spreadsheets across departments, and detect discrepancies that manual review misses.",
    painPoints: [
      "Annual reports with hundreds of PDF tables",
      "Inconsistent formats across departments",
      "Manual reconciliation taking days",
      "Anomalies hidden in massive datasets",
    ],
    solutions: [
      "Multi-page PDF table extraction with 99.7% accuracy",
      "Cross-document format normalization",
      "Automated reconciliation with flagged discrepancies",
      "AI anomaly detection across financial data",
    ],
    testimonial: {
      quote:
        "We found a $2M discrepancy in 5 minutes that our team had missed for months. DataMorph paid for itself on day one.",
      author: "James Keller",
      role: "Senior Analyst, Meridian Capital",
    },
    metrics: [
      { label: "Discrepancy Found", value: "$2M" },
      { label: "Processing Time", value: "5 min" },
      { label: "Accuracy Rate", value: "99.7%" },
    ],
  },
  healthcare: {
    icon: HeartPulse,
    title: "Healthcare & Life Sciences",
    headline: "Digitize records with HIPAA compliance built in",
    description:
      "Transform patient forms, insurance documents, and handwritten notes into structured data — all with a complete audit trail.",
    painPoints: [
      "Patient intake forms still paper-based",
      "Insurance PDFs need manual data entry",
      "Handwritten doctor notes unstructured",
      "HIPAA compliance requires IT team involvement",
    ],
    solutions: [
      "OCR for handwritten notes and forms",
      "Insurance document auto-extraction",
      "HIPAA-compliant processing with audit trail",
      "Structured database ready for analysis",
    ],
    testimonial: {
      quote:
        "We achieved full HIPAA compliance without needing an IT team. Patient data flows seamlessly from paper to database.",
      author: "Dr. Lisa Rodriguez",
      role: "Clinic Director, MedFirst Health",
    },
    metrics: [
      { label: "Compliance", value: "100%" },
      { label: "Data Entry Time", value: "-80%" },
      { label: "Error Rate", value: "<1%" },
    ],
  },
  manufacturing: {
    icon: Factory,
    title: "Manufacturing & Supply Chain",
    headline: "Unify IoT, invoices, and quality data",
    description:
      "Process sensor data, supplier invoices, and quality reports in one pipeline. Predict supply chain disruptions before they happen.",
    painPoints: [
      "IoT sensor data in proprietary formats",
      "Supplier invoices in mixed PDF/CSV formats",
      "Quality reports siloed by factory",
      "No predictive supply chain analytics",
    ],
    solutions: [
      "Universal format ingestion for all data types",
      "Cross-factory quality dashboard",
      "Predictive maintenance from sensor data",
      "Supply chain delay prediction",
    ],
    testimonial: {
      quote:
        "We reduced supply chain delays by 30% with DataMorph's predictive analytics. The ROI was immediate.",
      author: "Tom Chen",
      role: "VP Operations, Precision Manufacturing Co.",
    },
    metrics: [
      { label: "Delay Reduction", value: "30%" },
      { label: "Factories Unified", value: "12" },
      { label: "Prediction Lead Time", value: "14 days" },
    ],
  },
  marketing: {
    icon: Megaphone,
    title: "Marketing & Agencies",
    headline: "One dashboard for all your analytics platforms",
    description:
      "Consolidate exports from Google Analytics, Meta, LinkedIn, and CRM into a single cross-channel attribution view.",
    painPoints: [
      "Data exports from 5+ analytics platforms",
      "No cross-channel attribution",
      "Hours spent merging CSV exports weekly",
      "Client reports assembled manually",
    ],
    solutions: [
      "Auto-merge exports from any platform",
      "Cross-channel attribution modeling",
      "Automated client reporting",
      "Campaign performance prediction",
    ],
    testimonial: {
      quote:
        "Our weekly reporting went from 6 hours to 15 minutes. Clients love the automated dashboards.",
      author: "Nina Park",
      role: "Analytics Director, Spark Agency",
    },
    metrics: [
      { label: "Report Time", value: "15 min" },
      { label: "Platforms Unified", value: "8" },
      { label: "Client Satisfaction", value: "4.9/5" },
    ],
  },
  realestate: {
    icon: Building2,
    title: "Real Estate",
    headline: "Unlock market data from PDFs and listings",
    description:
      "Extract data from property listings, appraisals, and tax documents to power faster, more accurate market analysis.",
    painPoints: [
      "Market data locked in lengthy PDF reports",
      "Appraisals require manual data extraction",
      "Tax documents in inconsistent formats",
      "Property comparison done via spreadsheets",
    ],
    solutions: [
      "PDF table extraction from appraisals and reports",
      "Tax document auto-parsing",
      "Market trend analysis with predictions",
      "Automated property comparison dashboards",
    ],
    testimonial: {
      quote:
        "Property valuations that took a day now take under an hour. DataMorph changed how our firm operates.",
      author: "Michael Torres",
      role: "Managing Partner, Apex Realty Group",
    },
    metrics: [
      { label: "Valuation Speed", value: "3x faster" },
      { label: "Data Accuracy", value: "99.2%" },
      { label: "Documents/Month", value: "2,400" },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(data).map((industry) => ({ industry }));
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const d = data[industry];
  if (!d) notFound();

  const Icon = d.icon;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Link
            href="/use-cases"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Use Cases
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">{d.title}</p>
              <h1 className="text-3xl md:text-5xl font-bold">{d.headline}</h1>
            </div>
          </div>

          <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
            {d.description}
          </p>
        </div>
      </section>

      {/* Pain vs Solution */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-error/20 bg-error/5">
            <h3 className="text-lg font-semibold text-error mb-4">
              The Challenge
            </h3>
            <ul className="space-y-3">
              {d.painPoints.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2 text-sm text-text-secondary"
                >
                  <span className="w-2 h-2 bg-error rounded-full mt-1.5 flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-success/20 bg-success/5">
            <h3 className="text-lg font-semibold text-success mb-4">
              The DataMorph Solution
            </h3>
            <ul className="space-y-3">
              {d.solutions.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 text-sm text-text-secondary"
                >
                  <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-16 bg-surface/20 border-y border-border/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            {d.metrics.map((m) => (
              <div key={m.label}>
                <p className="text-3xl font-bold gradient-text">{m.value}</p>
                <p className="text-sm text-text-secondary mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xl md:text-2xl text-text-primary font-medium italic leading-relaxed mb-6">
            &ldquo;{d.testimonial.quote}&rdquo;
          </p>
          <p className="text-text-secondary">
            <span className="font-semibold">{d.testimonial.author}</span>
            <br />
            {d.testimonial.role}
          </p>

          <div className="mt-10">
            <Link
              href="/workspace"
              className="inline-flex px-8 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-full transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
