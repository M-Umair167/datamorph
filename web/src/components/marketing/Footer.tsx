"use client";

import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "API", href: "#" },
      { label: "Integrations", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Tutorials", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <span className="text-white text-xs font-bold">D</span>
              </div>
              <span className="text-sm font-semibold text-text-primary">DataMorph</span>
            </Link>
            <p className="text-xs text-text-muted leading-relaxed">
              Universal data interpreter.
              <br />
              Drop anything. Know everything.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-text-muted hover:text-text-secondary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} DataMorph. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Built with AI &bull; GDPR &amp; SOC 2 compliant
          </p>
        </div>
      </div>
    </footer>
  );
}
