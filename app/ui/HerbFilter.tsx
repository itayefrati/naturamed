"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import CardHover from "@/app/ui/motion/CardHover";

// ─── Types ───────────────────────────────────────────────────────────────────

type Herb = {
  name: string;
  slug: string;
  description: string;
  medicinal_properties: string[];
};

// ─── Confirmed Stitch botanical photos (only slugs with a verified match) ────

const STITCH_PHOTOS: Record<string, string> = {
  "ginger":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB3XQfnBW_0jltiiOPfJXz6abax4aUJhubvkAG2a5NrktmczJBDNjcw_iUiL1Qo1QTUFyS8begvtuTqjYVyXuJ-3uBRZCki-2XsPNy1cwQnOG7HD8C6QFq1hLos2nbhVJ9DCmEnJyN09GZsUMQGk9sn3ySvpvs3aiOUFDc51l2eLK9UtA8woTnGsFq3732NAEc2ckjzVa2E1ONL6ZkxZU5VPkuS1ICZm2Au88lyth3NKuah6fQi0drTR_V_RobakEKjkV292gUWJQ",
  "lavender":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD0FMBMFflRGMRWX9_EZd48ivctzNkYvw_fwDOF-oFp5HoIZDzIrO2WsMOn1F76qQlBKYMUCKgCLUppkyjm37ouo3WGWeD2toos3WB0MckOEhXONROBXkzvTWJtC2kW07S2JBU-3iPEbfTkNoG6wOYBA1uEotuN7yM-dsdTRhGaWJ_jfbPmBtEiujeHydzoN1xZREhBb_dZM-lv5JlTKhtpWLoRPGawc26fryXXV0mAbAUDs-IwBwrAnLQIDZY16MoGYw-TueHV2g",
  "echinacea":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA9Utff1kMBtQiIdhWOniB9xVyINxcf5kvFACGkA1f6ZgPOSVmG0oliFOpoqBQrd0_beyHktynRySlTDCdE-nKwSPbUywKB2DnyyEGi9yaS6IGQoSAkcJMvK3WPC4_7IlHRImsKfVkD41B6eISKw4RPCkaKM9nfjSBwWfooCIG3mgCFUvLCECd7HyHsYwFSVXtz_S5LSNq66evcN3nHTawIBZBngLJUIgP9RVhK0Vlw9GFMxv9FRYZZEMZ_Lh0nrWEq6ikl14tG1w",
  "st-johns-wort":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDGTFRkr1IHD-jU8UnbbOKrLw3DkTIycPVWoBybM3YZ0zNQQe8DptgKCfoeRglRIqFgtk5nt_3eFTlBp3bxSpGyZpFYZ49F8_43TJXKPTqj8CiwOo_nxkpGBemHWjvVrcgcpMbLZ0rnHBLKGEApjUNpoRemoDieUKfiGQ1ZZ8BNUpEbMfxR01ZDjetEln7fW2lkQRaFnPchYRNgwQPPmnrEUFt2M1IwgET-XoFQOvzzp-g9YCiXD8aEUQ7eB5HQueb1UiypKRF6sg",
};

// ─── Constants ────────────────────────────────────────────────────────────────

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const INITIAL_COUNT = 6;

// ─── Alphabet Filter Bar with layoutId sliding pill ──────────────────────────

function AlphabetFilterBar({
  activeLetter,
  onSelect,
  availableLetters,
}: {
  activeLetter: string | null;
  onSelect: (letter: string | null) => void;
  availableLetters: Set<string>;
}) {
  return (
    <div className="flex items-center justify-center flex-wrap gap-1.5">
      {/* "All" pill */}
      <button
        onClick={() => onSelect(null)}
        className="relative px-4 h-10 flex items-center justify-center rounded-full font-serif text-[15px] border border-outline-variant transition-colors duration-150 cursor-pointer overflow-hidden"
        style={{
          color: activeLetter === null ? "var(--color-on-primary)" : "var(--color-on-surface-variant)",
          borderColor: activeLetter === null ? "transparent" : undefined,
        }}
      >
        {activeLetter === null && (
          <motion.span
            layoutId="letter-active-bg"
            className="absolute inset-0 rounded-full bg-primary"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
        )}
        <span className="relative z-10">All</span>
      </button>

      {/* All 26 letters */}
      {ALPHABET.map((letter) => {
        const isAvailable = availableLetters.has(letter);
        const isActive = activeLetter === letter;
        return (
          <button
            key={letter}
            onClick={() => isAvailable && onSelect(letter)}
            disabled={!isAvailable}
            className="relative w-10 h-10 flex items-center justify-center rounded-full font-serif text-[16px] border transition-colors duration-150 overflow-hidden"
            style={{
              color: isActive
                ? "var(--color-on-primary)"
                : isAvailable
                  ? "var(--color-on-surface-variant)"
                  : "rgba(64,73,67,0.4)",
              borderColor: isActive
                ? "transparent"
                : isAvailable
                  ? "var(--color-outline-variant)"
                  : "rgba(191,201,193,0.4)",
              cursor: isAvailable ? "pointer" : "default",
            }}
          >
            {isActive && (
              <motion.span
                layoutId="letter-active-bg"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10">{letter}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── HerbFilter ───────────────────────────────────────────────────────────────

export default function HerbFilter({ herbs }: { herbs: Herb[] }) {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    herbs.forEach((h) => letters.add(h.name[0].toUpperCase()));
    return letters;
  }, [herbs]);

  const filteredHerbs = useMemo(() => {
    if (!activeLetter) return herbs;
    return herbs.filter((h) => h.name[0].toUpperCase() === activeLetter);
  }, [activeLetter, herbs]);

  const visibleHerbs =
    showAll || activeLetter ? filteredHerbs : filteredHerbs.slice(0, INITIAL_COUNT);
  const hasMore =
    !activeLetter && !showAll && filteredHerbs.length > INITIAL_COUNT;

  return (
    <>
      {/* ── Alphabet Filter ──────────────────────────────────────────────── */}
      <section className="py-8 px-6 lg:px-12 bg-surface border-b border-outline-variant/15">
        <div className="max-w-[1200px] mx-auto">
          <AlphabetFilterBar
            activeLetter={activeLetter}
            onSelect={(l) => {
              setActiveLetter(l);
              setShowAll(false);
            }}
            availableLetters={availableLetters}
          />
        </div>
      </section>

      {/* ── Herb Grid ────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-12 bg-surface flex-1">
        <div className="max-w-[1200px] mx-auto">

          <AnimatePresence mode="wait">
            {activeLetter && (
              <motion.p
                key="filter-label"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="text-[13px] text-on-surface-variant mb-8"
              >
                Showing herbs starting with{" "}
                <span className="font-semibold text-on-surface">
                  &ldquo;{activeLetter}&rdquo;
                </span>
                {" · "}
                <button
                  onClick={() => {
                    setActiveLetter(null);
                    setShowAll(false);
                  }}
                  className="text-primary-container font-medium hover:underline cursor-pointer"
                >
                  Show all
                </button>
              </motion.p>
            )}
          </AnimatePresence>

          {filteredHerbs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-[17px] text-on-surface-variant">
                No herbs found for &ldquo;{activeLetter}&rdquo;.
              </p>
              <button
                onClick={() => setActiveLetter(null)}
                className="mt-4 text-[14px] text-primary-container font-medium hover:underline cursor-pointer"
              >
                Clear filter
              </button>
            </motion.div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLetter ?? "all"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {visibleHerbs.map((herb, i) => {
                    const photo = STITCH_PHOTOS[herb.slug];
                    return (
                      <motion.div
                        key={herb.slug}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <CardHover className="h-full">
                          <Link
                            href={`/herbs/${herb.slug}`}
                            className="group rounded-2xl bg-surface-lowest overflow-hidden flex flex-col shadow-ambient h-full"
                          >
                            {/* Photo */}
                            {photo && (
                              <div className="relative h-52 overflow-hidden">
                                <img
                                  src={photo}
                                  alt={herb.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  loading="lazy"
                                />
                              </div>
                            )}

                            <div className="p-6 flex flex-col gap-3 flex-1">
                              <h3 className="font-serif font-bold text-[22px] text-on-surface leading-snug group-hover:text-primary-container transition-colors duration-200">
                                {herb.name}
                              </h3>

                              <p className="text-[14px] text-on-surface-variant leading-relaxed line-clamp-3 flex-1">
                                {herb.description}
                              </p>

                              {herb.medicinal_properties.length > 0 && (
                                <p
                                  className="text-[12px] text-on-surface-variant pt-1"
                                  style={{ fontFamily: "var(--font-work-sans)" }}
                                >
                                  {herb.medicinal_properties.slice(0, 4).join(" · ")}
                                </p>
                              )}

                              <span className="flex items-center gap-1 text-[13px] font-semibold text-primary-container mt-1 group-hover:underline">
                                View Monograph <ArrowRight size={13} />
                              </span>
                            </div>
                          </Link>
                        </CardHover>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              {/* Load More */}
              {hasMore && (
                <div className="flex justify-center mt-14">
                  <button
                    onClick={() => setShowAll(true)}
                    className="btn-primary px-8 py-3.5 rounded-full text-[14px] font-semibold"
                    style={{ fontFamily: "var(--font-work-sans)" }}
                  >
                    Load more guides
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
