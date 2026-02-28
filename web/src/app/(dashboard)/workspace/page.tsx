"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  FileSpreadsheet,
  FileText,
  Image,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  BarChart3,
  Brain,
  Plus,
} from "lucide-react";

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  cleaned: { label: "Cleaned", color: "text-success bg-success/10", icon: CheckCircle2 },
  analyzed: { label: "Analyzed", color: "text-primary bg-primary/10", icon: BarChart3 },
  predicted: { label: "Predicted", color: "text-secondary bg-secondary/10", icon: Brain },
};

const typeIcons: Record<string, React.ElementType> = {
  csv: FileSpreadsheet,
  pdf: FileText,
  img: Image,
};

interface Project {
  id: string;
  name: string;
  type: string;
  status: string;
  lastEdited: string;
  rows: number;
}

const demoProjects: Project[] = [
  { id: "1", name: "Q4 Sales Analysis", type: "csv", status: "analyzed", lastEdited: "2 hours ago", rows: 14520 },
  { id: "2", name: "Invoice Scans — Nov", type: "pdf", status: "cleaned", lastEdited: "1 day ago", rows: 340 },
  { id: "3", name: "Product Photography", type: "img", status: "predicted", lastEdited: "3 days ago", rows: 0 },
  { id: "4", name: "Customer Churn Data", type: "csv", status: "cleaned", lastEdited: "5 days ago", rows: 8700 },
  { id: "5", name: "Market Research PDF", type: "pdf", status: "analyzed", lastEdited: "1 week ago", rows: 1200 },
];

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex items-center justify-center"
    >
      <div className="text-center max-w-md">
        <div className="relative w-48 h-48 mx-auto mb-8">
          <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-border flex items-center justify-center bg-surface/30">
            <Upload className="w-12 h-12 text-text-muted" />
          </div>
          {[FileSpreadsheet, FileText, Image].map((Icon, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -8, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="absolute w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center"
              style={{
                top: i === 0 ? "-8px" : i === 1 ? "20px" : "60px",
                [i === 0 ? "left" : i === 1 ? "right" : "left"]: "-12px",
              }}
            >
              <Icon className="w-5 h-5 text-primary" />
            </motion.div>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Drop anything here
        </h2>
        <p className="text-text-secondary mb-6">
          CSV, PDF, images, databases — DataMorph understands them all.
          Start by uploading your data.
        </p>
        <button className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-xl transition-colors">
          Upload Files
        </button>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const Icon = typeIcons[project.type] || FileText;
  const status = statusConfig[project.status];
  const StatusIcon = status.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-surface border border-border rounded-2xl p-4 hover:border-primary/30 transition-colors group cursor-pointer"
    >
      {/* Thumbnail placeholder */}
      <div className="h-28 rounded-xl bg-bg-dark mb-3 flex items-center justify-center border border-border">
        <Icon className="w-8 h-8 text-text-muted" />
      </div>

      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors truncate flex-1 mr-2">
          {project.name}
        </h3>
        <button className="text-text-muted hover:text-text-primary opacity-0 group-hover:opacity-100 transition-all">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          <Clock className="w-3 h-3" />
          {project.lastEdited}
        </div>
        <div className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${status.color}`}>
          <StatusIcon className="w-3 h-3" />
          {status.label}
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkspacePage() {
  const [projects] = useState<Project[]>(demoProjects);
  const showEmpty = false; // toggle for demo

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Workspace</h1>
          <p className="text-sm text-text-secondary">
            {projects.length} projects
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-xl transition-colors">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {showEmpty ? (
        <EmptyState />
      ) : (
        <>
          {/* Upload Zone (compact) */}
          <div className="border-2 border-dashed border-border rounded-2xl p-6 mb-6 flex items-center justify-center gap-4 hover:border-primary/30 transition-colors cursor-pointer bg-surface/20">
            <Upload className="w-5 h-5 text-text-muted" />
            <span className="text-sm text-text-secondary">
              Drag & drop files here or{" "}
              <span className="text-primary font-medium">browse</span>
            </span>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
