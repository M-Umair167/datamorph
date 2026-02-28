"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Settings,
  Share2,
  Download,
  FileSpreadsheet,
  FolderTree,
  Clock,
  ChevronRight,
  Sparkles,
  BarChart3,
  Brain,
  MessageSquare,
  Image,
  FileText,
  Send,
} from "lucide-react";
import Link from "next/link";

const tabs = [
  { id: "clean", label: "Clean", icon: Sparkles },
  { id: "visualize", label: "Visualize", icon: BarChart3 },
  { id: "predict", label: "Predict", icon: Brain },
];

const fileTree = [
  { name: "Original", children: ["sales_q4.csv", "returns.csv"] },
  { name: "Cleaned", children: ["sales_q4_clean.csv"] },
  { name: "Tables", children: ["summary_by_region", "monthly_trend"] },
];

const insights = [
  "Revenue peaked in November at $2.3M, up 18% from October.",
  '15% of rows had missing "region" field — auto-filled using ZIP code lookup.',
  "Predicted 12% growth in Q1 based on current trends.",
];

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const [activeTab, setActiveTab] = useState("clean");
  const [question, setQuestion] = useState("");

  // unwrap params (Next.js 15+ async params)
  // For the UI demo, we use a placeholder project name
  void params;

  return (
    <div className="h-full flex flex-col -m-6">
      {/* Project Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface/40">
        <div className="flex items-center gap-3">
          <Link
            href="/workspace"
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-sm font-semibold text-text-primary">
              Q4 Sales Analysis
            </h1>
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <span>14,520 rows</span>
              <span>·</span>
              <span>Last saved 2 min ago</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface-light transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface-light transition-colors">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface-light transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3-Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel — Data Navigator */}
        <div className="w-56 border-r border-border bg-surface/30 p-3 overflow-y-auto shrink-0 hidden md:block">
          <div className="flex items-center gap-2 text-xs text-text-muted uppercase tracking-wider mb-3">
            <FolderTree className="w-3 h-3" />
            Files
          </div>
          {fileTree.map((group) => (
            <div key={group.name} className="mb-3">
              <div className="text-xs font-semibold text-text-secondary mb-1 flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />
                {group.name}
              </div>
              {group.children.map((file) => (
                <button
                  key={file}
                  className="w-full text-left flex items-center gap-2 py-1 px-4 text-xs text-text-muted hover:text-text-primary rounded transition-colors"
                >
                  <FileSpreadsheet className="w-3 h-3" />
                  {file}
                </button>
              ))}
            </div>
          ))}

          <div className="border-t border-border mt-4 pt-3">
            <div className="flex items-center gap-2 text-xs text-text-muted uppercase tracking-wider mb-2">
              <Clock className="w-3 h-3" />
              Versions
            </div>
            {["v3 — Cleaned", "v2 — Columns fixed", "v1 — Original"].map(
              (v, i) => (
                <div
                  key={v}
                  className={`text-xs py-1 px-3 rounded ${
                    i === 0
                      ? "text-primary bg-primary/10"
                      : "text-text-muted hover:text-text-secondary cursor-pointer"
                  }`}
                >
                  {v}
                </div>
              )
            )}
          </div>

          <div className="border-t border-border mt-4 pt-3">
            <div className="text-xs text-text-muted uppercase tracking-wider mb-2">
              Metadata
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-text-muted">Rows</span>
                <span className="text-text-primary">14,520</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Columns</span>
                <span className="text-text-primary">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Quality</span>
                <span className="text-success">94%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel — Canvas */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center gap-1 px-4 pt-3 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "text-primary border-primary"
                    : "text-text-muted border-transparent hover:text-text-primary"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto p-4">
            {activeTab === "clean" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Mock spreadsheet */}
                <div className="rounded-xl border border-border overflow-hidden">
                  <div className="bg-surface/60 px-4 py-2 border-b border-border flex items-center gap-2 text-xs text-text-muted">
                    <span className="text-error">● 12 errors</span>
                    <span className="text-warning">● 48 warnings</span>
                    <span className="text-primary">● 3 suggestions</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                      <thead>
                        <tr className="bg-surface/40">
                          {["#", "Date", "Region", "Product", "Revenue", "Units", "Status"].map(
                            (h) => (
                              <th
                                key={h}
                                className="px-4 py-2 text-left text-text-muted font-medium border-b border-border"
                              >
                                {h}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["1", "2024-10-01", "North", "Widget A", "$12,340", "145", "OK"],
                          ["2", "2024-10-02", "", "Widget B", "$8,920", "98", "Missing"],
                          ["3", "2024-10-03", "South", "Widget A", "$-500", "12", "Error"],
                          ["4", "2024-10-04", "West", "Widget C", "$15,600", "203", "OK"],
                          ["5", "2024-10-05", "East", "Widget B", "$9,100", "abc", "Warning"],
                        ].map((row) => (
                          <tr key={row[0]} className="border-b border-border hover:bg-surface/20">
                            {row.map((cell, ci) => (
                              <td
                                key={ci}
                                className={`px-4 py-2 ${
                                  cell === ""
                                    ? "bg-warning/10 text-warning"
                                    : cell.startsWith("$-")
                                    ? "bg-error/10 text-error"
                                    : cell === "abc"
                                    ? "bg-warning/10 text-warning"
                                    : "text-text-primary"
                                }`}
                              >
                                {cell || "—"}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "visualize" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-full"
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <BarChart3 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    Chart Builder
                  </h3>
                  <p className="text-sm text-text-secondary max-w-sm">
                    Drag columns onto the canvas to create charts.
                    Choose from bar, line, scatter, pie, and more.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "predict" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-full"
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
                    <Brain className="w-10 h-10 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    Prediction Studio
                  </h3>
                  <p className="text-sm text-text-secondary max-w-sm">
                    Select a target column and let DataMorph build
                    a predictive model with one click.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Panel — Insights */}
        <div className="w-64 border-l border-border bg-surface/30 p-4 overflow-y-auto shrink-0 hidden lg:flex flex-col">
          <h3 className="text-xs text-text-muted uppercase tracking-wider mb-3">
            AI Insights
          </h3>
          <div className="space-y-3 mb-6">
            {insights.map((text, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-bg-dark border border-border text-xs text-text-secondary leading-relaxed"
              >
                {text}
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4 mt-auto">
            <h3 className="text-xs text-text-muted uppercase tracking-wider mb-2">
              <MessageSquare className="w-3 h-3 inline mr-1" />
              Ask a Question
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. What drove Q4 growth?"
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-border bg-bg-dark text-text-primary placeholder:text-text-muted outline-none focus:border-primary transition-colors"
              />
              <button className="p-1.5 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors">
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="border-t border-border pt-4 mt-4">
            <h3 className="text-xs text-text-muted uppercase tracking-wider mb-2">
              Export
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "PNG", icon: Image },
                { label: "PDF", icon: FileText },
                { label: "PPTX", icon: FileText },
                { label: "API", icon: FileSpreadsheet },
              ].map((exp) => (
                <button
                  key={exp.label}
                  className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-text-secondary hover:text-text-primary rounded-lg border border-border hover:border-primary/30 transition-colors"
                >
                  <exp.icon className="w-3 h-3" />
                  {exp.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
