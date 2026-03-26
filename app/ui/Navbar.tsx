"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";

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
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
        >
          <span className="text-primary-container text-xl" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c2.5 0 4-1.2 4-3.5V12h2v4.5c0 2.3 1.5 3.5 4 3.5a4.49 4.49 0 0 0 1.29-.19L20.29 22l1.89-.66C20.1 16.17 17.9 10 9 8" fill="currentColor" opacity="0.3"/>
              <path d="M12 2C6.5 2 2 6.5 2 12c0 .7.07 1.38.2 2.04C3.3 10.5 6.7 8 12 8s8.7 2.5 9.8 6.04c.13-.66.2-1.34.2-2.04 0-5.5-4.5-10-10-10z" fill="currentColor"/>
            </svg>
          </span>
          <span className="font-serif text-[22px] text-primary-container font-semibold tracking-tight">
            NaturaMed
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[15px] font-medium text-on-surface hover:text-primary-container transition-colors duration-150"
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
            className="text-on-surface-variant hover:text-primary-container transition-colors duration-150"
          >
            <Search size={18} strokeWidth={2} />
          </Link>
          <Link
            href="/search"
            className="btn-primary px-5 py-2 text-[15px] font-semibold rounded-lg"
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
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-outline-variant/20 px-6 py-5 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[15px] font-medium text-on-surface hover:text-primary-container transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/search"
            className="mt-2 btn-primary px-4 py-2.5 text-[15px] font-semibold rounded-lg text-center"
            onClick={() => setMobileOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
