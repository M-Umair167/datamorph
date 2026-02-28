"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShoppingCart,
  Landmark,
  HeartPulse,
  Factory,
  Megaphone,
  Building2,
  ArrowRight,
  Upload,
  ScanSearch,
  Table,
  Sparkles,
  TrendingUp,
  Calculator,
} from "lucide-react";

const verticals = [
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-commerce & Retail",
    description:
      "Unify Shopify exports, supplier PDFs, and competitor data into one forecasting dashboard.",
    pain: "Data scattered across 5+ platforms",
    result: "15 hours/week saved on data entry",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    id: "finance",
    icon: Landmark,
    title: "Financial Services",
    description:
      "Extract tables from annual reports, reconcile spreadsheets, detect anomalies automatically.",
    pain: "Manual report extraction takes days",
    result: "$2M discrepancy found in 5 minutes",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    title: "Healthcare & Life Sciences",
    description:
      "Digitize patient forms, insurance docs, and handwritten notes with HIPAA-compliant processing.",
    pain: "Paper-based workflows cause errors",
    result: "100% compliance without IT overhead",
    color: "text-error",
    bg: "bg-error/10",
  },
  {
    id: "manufacturing",
    icon: Factory,
    title: "Manufacturing & Supply Chain",
    description:
      "Process IoT sensor data, supplier invoices, and quality reports in a unified analytics pipeline.",
    pain: "Siloed data across factories",
    result: "30% reduction in supply chain delays",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    id: "marketing",
    icon: Megaphone,
    title: "Marketing & Agencies",
    description:
      "Consolidate analytics from Google, Meta, and CRM exports into one performance dashboard.",
    pain: "Hours spent merging platform exports",
    result: "Real-time cross-channel attribution",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    id: "realestate",
    icon: Building2,
    title: "Real Estate",
    description:
      "Extract data from listings, appraisals, and tax documents to power market analysis.",
    pain: "Market data locked in PDFs",
    result: "3x faster property valuations",
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

const workflowSteps = [
  { icon: Upload, label: "Upload" },
  { icon: ScanSearch, label: "Detect" },
  { icon: Table, label: "Extract" },
  { icon: Sparkles, label: "Clean" },
  { icon: TrendingUp, label: "Predict" },
];

export default function UseCasesPage() {
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const hourlyRate = 50;
  const weeksPerYear = 50;
  const savingsRate = 0.8;
  const annualSavings = Math.round(
    hoursPerWeek * hourlyRate * weeksPerYear * savingsRate
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Built for <span className="gradient-text">your industry</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            Same powerful engine, tailored for your specific data challenges.
          </motion.p>
        </div>
      </section>

      {/* Vertical Selector */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verticals.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={`/use-cases/${v.id}`}>
                <div className="h-full p-6 rounded-2xl border border-border bg-surface/30 hover:bg-surface/50 hover:border-primary/30 transition-all group cursor-pointer">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${v.bg} flex items-center justify-center flex-shrink-0`}
                    >
                      <v.icon className={`w-6 h-6 ${v.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">
                        {v.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {v.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-2 h-2 bg-error rounded-full" />
                      <span className="text-text-muted">{v.pain}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-2 h-2 bg-success rounded-full" />
                      <span className="text-success">{v.result}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Universal Workflow */}
      <section className="py-24 bg-surface/20 border-y border-border/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-3">
              One <span className="gradient-text">Universal Workflow</span>
            </h2>
            <p className="text-text-secondary">
              Every industry follows the same 5-step process.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {workflowSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">
                    {step.label}
                  </span>
                </div>
                {i < workflowSteps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-text-muted hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-3">
              Calculate Your <span className="gradient-text">ROI</span>
            </h2>
            <p className="text-text-secondary">
              How many hours do you spend on data entry weekly?
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-border bg-surface/30">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-text-secondary">
                  Hours per week on data tasks
                </span>
                <span className="text-2xl font-bold text-primary">
                  {hoursPerWeek}h
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-text-muted mt-1">
                <span>1h</span>
                <span>40h</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-success/5 border border-success/20">
                <p className="text-2xl font-bold text-success">
                  {Math.round(hoursPerWeek * 0.8)}h
                </p>
                <p className="text-xs text-text-secondary mt-1">Saved/week</p>
              </div>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-2xl font-bold text-primary">
                  ${annualSavings.toLocaleString()}
                </p>
                <p className="text-xs text-text-secondary mt-1">Saved/year</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20">
                <p className="text-2xl font-bold text-secondary">
                  {Math.round((annualSavings / (39 * 12)) * 100)}%
                </p>
                <p className="text-xs text-text-secondary mt-1">ROI</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
