"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "naturamed_entry_dismissed";

export default function EntryModal() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");

  // Only show once per session (reappears next session)
  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      // Slight delay so the page renders first
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    dismiss();
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-on-surface/40 backdrop-blur-sm"
            aria-hidden="true"
            onClick={dismiss}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Modal card */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="entry-modal-title"
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <motion.div
              className="relative w-full max-w-[560px] rounded-2xl bg-surface-lowest shadow-ambient-lg p-8 md:p-10 flex flex-col gap-6"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              {/* Close button */}
              <button
                onClick={dismiss}
                aria-label="Close"
                className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <X size={20} />
              </button>

              {/* Eyebrow */}
              <p
                className="text-[12px] font-medium uppercase tracking-[0.05rem] text-primary-container"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                Welcome to NaturaMed
              </p>

              {/* Headline */}
              <h2
                id="entry-modal-title"
                className="font-serif font-bold text-[26px] md:text-[30px] text-on-surface leading-tight -mt-2"
              >
                What are you looking for today?
              </h2>

              {/* Subtitle */}
              <p className="text-[15px] text-on-surface-variant leading-relaxed -mt-3">
                Describe your condition, symptom, or the herb you&apos;re curious about.
                We&apos;ll find the right natural approaches for you.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. I have a headache and trouble sleeping..."
                  rows={3}
                  className="w-full rounded-xl bg-surface-low px-4 py-3 text-[15px] text-on-surface placeholder-on-surface-variant resize-none focus:outline-none focus:ring-2 focus:ring-primary-container/30 transition"
                  autoFocus
                />

                <button
                  type="submit"
                  disabled={!query.trim()}
                  className="w-full btn-primary px-6 py-4 rounded-xl text-[16px] font-semibold disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Find Remedies →
                </button>
              </form>

              {/* Skip */}
              <button
                onClick={dismiss}
                className="text-[13px] text-on-surface-variant hover:text-on-surface transition-colors text-center -mt-2"
              >
                Skip for now
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
