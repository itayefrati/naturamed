"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, Leaf } from "lucide-react";

const NAV_LINKS = [
  { label: "Remedies", href: "/remedies" },
  { label: "Herb Library", href: "/herbs" },
  { label: "Symptom Checker", href: "/symptoms" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-outline-variant/20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Leaf
            size={20}
            strokeWidth={1.5}
            className="text-primary-container"
          />
          <span className="font-serif text-[20px] text-on-surface font-semibold tracking-tight">
            NaturaMed
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[14px] font-medium text-on-surface-variant hover:text-on-surface transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/search"
            aria-label="Search"
            className="text-on-surface-variant hover:text-on-surface transition-colors duration-150 p-1"
          >
            <Search size={17} strokeWidth={1.5} />
          </Link>
          <Link
            href="/search"
            className="btn-primary px-5 py-2 text-[13px] font-semibold rounded-full"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-on-surface p-1"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-outline-variant/20 px-6 py-5 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[15px] font-medium text-on-surface-variant hover:text-on-surface transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/search"
            className="mt-2 btn-primary px-4 py-2.5 text-[14px] font-semibold rounded-full text-center"
            style={{ fontFamily: "var(--font-work-sans)" }}
            onClick={() => setMobileOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
