"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Plus,
  Clock,
  ShoppingCart,
  DollarSign,
  HeartPulse,
  Trash2,
  Settings,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

const navItems = [
  { label: "Workspace", icon: LayoutDashboard, href: "/workspace" },
];

const templates = [
  { label: "E-commerce", icon: ShoppingCart },
  { label: "Financial", icon: DollarSign },
  { label: "Healthcare", icon: HeartPulse },
];

const recentProjects = [
  { name: "Q4 Sales Analysis", type: "csv", time: "2h ago" },
  { name: "Invoice Scans", type: "pdf", time: "1d ago" },
  { name: "Product Images", type: "img", time: "3d ago" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 256 }}
      className="h-screen bg-surface border-r border-border flex flex-col shrink-0 overflow-hidden"
    >
      {/* Logo + Collapse */}
      <div className="flex items-center justify-between p-4">
        <Link href="/workspace" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-text-primary whitespace-nowrap">
              DataMorph
            </span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-text-muted hover:text-text-primary transition-colors"
        >
          <ChevronLeft
            className={`w-4 h-4 transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* New Project */}
      <div className="px-3 mb-2">
        <button className="w-full flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-xl transition-colors">
          <Plus className="w-4 h-4 shrink-0" />
          {!collapsed && <span>New Project</span>}
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-light"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Recent Projects */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-3 mt-6"
          >
            <div className="flex items-center gap-2 px-3 mb-2">
              <Clock className="w-3 h-3 text-text-muted" />
              <span className="text-xs text-text-muted uppercase tracking-wider">
                Recent
              </span>
            </div>
            <div className="space-y-1">
              {recentProjects.map((project) => (
                <button
                  key={project.name}
                  className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-light transition-colors text-left"
                >
                  <span className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary uppercase shrink-0">
                    {project.type}
                  </span>
                  <span className="truncate flex-1">{project.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Templates */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-3 mt-6"
          >
            <div className="flex items-center gap-2 px-3 mb-2">
              <Sparkles className="w-3 h-3 text-text-muted" />
              <span className="text-xs text-text-muted uppercase tracking-wider">
                Templates
              </span>
            </div>
            <div className="space-y-1">
              {templates.map((t) => (
                <button
                  key={t.label}
                  className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-light transition-colors text-left"
                >
                  <t.icon className="w-4 h-4 shrink-0" />
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom actions */}
      <div className="px-3 pb-4 space-y-1">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-text-secondary hover:text-text-primary hover:bg-surface-light transition-colors">
          <Trash2 className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Trash</span>}
        </button>
        <Link
          href="/settings"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-text-secondary hover:text-text-primary hover:bg-surface-light transition-colors"
        >
          <Settings className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </motion.aside>
  );
}
