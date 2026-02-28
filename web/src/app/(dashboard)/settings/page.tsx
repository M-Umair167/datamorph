"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Database,
  Paintbrush,
  Key,
  ChevronRight,
  Save,
} from "lucide-react";

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "data", label: "Data & Storage", icon: Database },
  { id: "appearance", label: "Appearance", icon: Paintbrush },
  { id: "api", label: "API Keys", icon: Key },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Settings</h1>

      <div className="flex gap-6">
        {/* Sidebar nav */}
        <nav className="w-52 shrink-0 space-y-1">
          {settingsSections.map((s) => {
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-light"
                }`}
              >
                <s.icon className="w-4 h-4" />
                <span className="flex-1 text-left">{s.label}</span>
                {isActive && <ChevronRight className="w-3 h-3" />}
              </button>
            );
          })}
        </nav>

        {/* Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          {activeSection === "profile" && (
            <div className="space-y-6">
              <div className="bg-surface border border-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  Profile Information
                </h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <button className="text-sm text-primary hover:text-primary-hover transition-colors">
                    Change avatar
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-text-secondary mb-1.5 block">
                      Full name
                    </label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-3 py-2 rounded-xl border border-border bg-surface/50 text-text-primary text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-text-secondary mb-1.5 block">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="john@company.com"
                      className="w-full px-3 py-2 rounded-xl border border-border bg-surface/50 text-text-primary text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-text-secondary mb-1.5 block">
                      Company
                    </label>
                    <input
                      type="text"
                      defaultValue="Acme Inc."
                      className="w-full px-3 py-2 rounded-xl border border-border bg-surface/50 text-text-primary text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-text-secondary mb-1.5 block">
                      Role
                    </label>
                    <input
                      type="text"
                      defaultValue="Data Analyst"
                      className="w-full px-3 py-2 rounded-xl border border-border bg-surface/50 text-text-primary text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-xl transition-colors">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Project completed", desc: "When a data processing job finishes." },
                  { label: "Team invitations", desc: "When someone invites you to collaborate." },
                  { label: "Weekly digest", desc: "Summary of activity across your projects." },
                  { label: "Product updates", desc: "New features and platform announcements." },
                ].map((n, i) => (
                  <div key={n.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-primary">{n.label}</p>
                      <p className="text-xs text-text-muted">{n.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={i < 2}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-border rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="space-y-6">
              <div className="bg-surface border border-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  Change Password
                </h2>
                <div className="space-y-4 max-w-sm">
                  <div>
                    <label className="text-sm text-text-secondary mb-1.5 block">
                      Current password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 rounded-xl border border-border bg-surface/50 text-text-primary text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-text-secondary mb-1.5 block">
                      New password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 rounded-xl border border-border bg-surface/50 text-text-primary text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-xl transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
              <div className="bg-surface border border-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-text-primary mb-2">
                  Two-Factor Authentication
                </h2>
                <p className="text-sm text-text-muted mb-4">
                  Add an extra layer of security to your account.
                </p>
                <button className="px-4 py-2 border border-primary text-primary hover:bg-primary/10 text-sm font-medium rounded-xl transition-colors">
                  Enable 2FA
                </button>
              </div>
            </div>
          )}

          {["data", "appearance", "api"].includes(activeSection) && (
            <div className="bg-surface border border-border rounded-2xl p-6 flex items-center justify-center h-64">
              <p className="text-sm text-text-muted">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} settings coming soon.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
