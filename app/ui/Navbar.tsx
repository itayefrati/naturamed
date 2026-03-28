"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Leaf } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Remedies", href: "/remedies" },
  { label: "Herb Library", href: "/herbs" },
  { label: "Symptom Checker", href: "/symptoms" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 glass border-b border-outline-variant/20 transition-shadow duration-300"
      style={{
        boxShadow: scrolled ? "0 4px 24px 0 rgba(27, 28, 28, 0.08)" : "none",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
            <Leaf size={20} strokeWidth={1.5} className="text-primary-container" />
          </motion.div>
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
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={20} strokeWidth={1.5} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu size={20} strokeWidth={1.5} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu — animated slide-down */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden overflow-hidden"
          >
            <div className="glass border-t border-outline-variant/20 px-6 py-5 flex flex-col gap-4">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.05 }}
                >
                  <Link
                    href={href}
                    className="text-[15px] font-medium text-on-surface-variant hover:text-on-surface transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 + 0.05 }}
              >
                <Link
                  href="/search"
                  className="mt-2 btn-primary px-4 py-2.5 text-[14px] font-semibold rounded-full text-center block"
                  style={{ fontFamily: "var(--font-work-sans)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
