"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex">
      {/* Left: Product Art */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#1a0533] via-bg-dark to-[#0c1445] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-md text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-8"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-text-primary mb-4"
          >
            Welcome back
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary leading-relaxed"
          >
            Your data insights are waiting. Sign in to continue
            transforming raw data into actionable intelligence.
          </motion.p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-bg-dark">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-bold text-text-primary">
              DataMorph
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Sign in to your account
          </h1>
          <p className="text-text-secondary mb-8">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:text-primary-hover transition-colors">
              Sign up free
            </Link>
          </p>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            {[
              { name: "Google", icon: "G" },
              { name: "Microsoft", icon: "M" },
              { name: "GitHub", icon: "GH" },
            ].map((provider) => (
              <button
                key={provider.name}
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-border bg-surface/50 hover:bg-surface text-text-primary text-sm font-medium transition-colors"
              >
                <span className="w-5 h-5 rounded bg-text-muted/20 flex items-center justify-center text-xs font-bold">
                  {provider.icon}
                </span>
                Continue with {provider.name}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-text-muted uppercase">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Email Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-sm text-text-secondary mb-1.5 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface/50 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm text-text-secondary">Password</label>
                <button
                  type="button"
                  className="text-xs text-primary hover:text-primary-hover transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-surface/50 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-xl transition-colors"
            >
              Sign In
            </button>
          </form>

          {/* Enterprise SSO */}
          <div className="mt-6 text-center">
            <button className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Enterprise SSO Login →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
