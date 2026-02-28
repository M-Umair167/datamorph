"use client";

import { Search, Bell, ChevronDown, User } from "lucide-react";
import { useState } from "react";

export default function DashboardHeader() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="h-14 border-b border-border bg-surface/80 backdrop-blur-sm flex items-center justify-between px-4 shrink-0">
      {/* Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
            searchOpen
              ? "border-primary bg-surface-light w-full"
              : "border-border bg-surface/50 w-64"
          }`}
        >
          <Search className="w-4 h-4 text-text-muted shrink-0" />
          <input
            type="text"
            placeholder="Search projects, files…"
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
            className="bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none flex-1"
          />
          <kbd className="hidden sm:inline text-[10px] text-text-muted px-1.5 py-0.5 border border-border rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="relative p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-surface-light">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-surface-light transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-white" />
          </div>
          <ChevronDown className="w-3 h-3 text-text-muted" />
        </button>
      </div>
    </header>
  );
}
