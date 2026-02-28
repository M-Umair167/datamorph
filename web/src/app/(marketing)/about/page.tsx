"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Target,
  Shield,
  Rocket,
  Users,
  Linkedin,
  Twitter,
  MapPin,
  Calendar,
  ArrowRight,
} from "lucide-react";

const milestones = [
  { year: "2024", title: "Founded", description: "DataMorph started as a research project tackling multi-modal data ingestion." },
  { year: "2024", title: "First 1,000 Users", description: "Beta launch drove rapid adoption among e-commerce analysts." },
  { year: "2025", title: "Series A", description: "$12M raised to build the prediction engine and scale infrastructure." },
  { year: "2025", title: "50M Files Processed", description: "Crossed the 50 million file milestone with 99.7% accuracy." },
  { year: "2026", title: "Enterprise Launch", description: "On-premise deployment and SOC 2 Type II certification." },
];

const team = [
  { name: "Alex Chen", role: "CEO & Co-founder", funFact: "Former Stripe engineer. Makes croissants on weekends." },
  { name: "Priya Sharma", role: "CTO & Co-founder", funFact: "PhD in Computer Vision. 15 published papers on OCR." },
  { name: "Marcus Johnson", role: "Head of AI", funFact: "Ex-Google Brain. Runs ultramarathons for fun." },
  { name: "Elena Rodriguez", role: "Head of Product", funFact: "Designed Notion's first mobile app. Cat person." },
  { name: "David Kim", role: "Head of Engineering", funFact: "Wrote Python at age 12. Still writes Python." },
  { name: "Sarah Williams", role: "Head of Growth", funFact: "Grew 3 startups from 0 to 100K users." },
];

const values = [
  { icon: Lightbulb, title: "Simplicity", description: "Making complex data accessible to everyone, not just engineers." },
  { icon: Target, title: "Accuracy", description: "Precision in every extraction. We validate at every step." },
  { icon: Shield, title: "Privacy", description: "Your data, your control. Zero-knowledge processing by default." },
  { icon: Rocket, title: "Innovation", description: "Pushing boundaries of what's possible with AI and data." },
];

const openRoles = [
  { title: "Senior Frontend Engineer", department: "Engineering", location: "Remote" },
  { title: "ML Engineer — Computer Vision", department: "AI/ML", location: "San Francisco" },
  { title: "DevOps / Platform Engineer", department: "Engineering", location: "Remote" },
  { title: "Product Designer", department: "Design", location: "New York" },
  { title: "Account Executive — Enterprise", department: "Sales", location: "Remote" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Mission Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary mb-6"
          >
            <Users className="w-4 h-4" />
            Our Story
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Making data work for{" "}
            <span className="gradient-text">everyone</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            We believe data intelligence shouldn&apos;t require a PhD or a team of
            engineers. DataMorph exists to democratize data analysis — one upload at a time.
          </motion.p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-surface/20 border-y border-border/50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            Our <span className="gradient-text">Journey</span>
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-16"
                >
                  <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-primary border-4 border-bg-dark" />
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-text-muted" />
                    <span className="text-sm text-text-muted">{m.year}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {m.title}
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">
                    {m.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-3">
              The <span className="gradient-text">Team</span>
            </h2>
            <p className="text-text-secondary">
              World-class engineers, researchers, and builders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl border border-border bg-surface/30 hover:bg-surface/50 transition-colors group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {member.name}
                </h3>
                <p className="text-sm text-primary mb-3">{member.role}</p>
                <p className="text-sm text-text-muted italic opacity-0 group-hover:opacity-100 transition-opacity">
                  {member.funFact}
                </p>
                <div className="flex gap-2 mt-3">
                  <button className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-text-muted hover:text-text-primary transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-text-muted hover:text-text-primary transition-colors">
                    <Twitter className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-surface/20 border-y border-border/50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            What We <span className="gradient-text">Stand For</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl border border-border bg-surface/30"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <v.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="careers" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-3">
              Join the <span className="gradient-text">Mission</span>
            </h2>
            <p className="text-text-secondary">
              Help us make data work for everyone.
            </p>
          </div>

          <div className="space-y-4">
            {openRoles.map((role) => (
              <div
                key={role.title}
                className="flex items-center justify-between p-5 rounded-xl border border-border bg-surface/30 hover:bg-surface/50 transition-colors cursor-pointer group"
              >
                <div>
                  <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                    {role.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-text-muted">
                      {role.department}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <MapPin className="w-3 h-3" />
                      {role.location}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
