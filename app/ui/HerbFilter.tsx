"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

type Herb = {
  name: string;
  slug: string;
  description: string;
  medicinal_properties: string[];
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// ─── Alphabet Filter Bar ────────────────────────────────────────────────────

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
    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
      {/* "All" button */}
      <button
        onClick={() => onSelect(null)}
        className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-150 cursor-pointer ${
          activeLetter === null
            ? "btn-primary text-on-primary"
            : "bg-surface-lowest text-on-surface-variant hover:bg-secondary-container hover:text-on-secondary-container"
        }`}
        style={{ fontFamily: "var(--font-work-sans)" }}
      >
        All
      </button>

      {ALPHABET.map((letter) => {
        const isAvailable = availableLetters.has(letter);
        const isActive = activeLetter === letter;

        return (
          <button
            key={letter}
            onClick={() => isAvailable && onSelect(letter)}
            disabled={!isAvailable}
            className={`w-9 h-9 rounded-full text-[13px] font-medium transition-all duration-150 ${
              isActive
                ? "btn-primary text-on-primary"
                : isAvailable
                  ? "bg-surface-lowest text-on-surface-variant hover:bg-secondary-container hover:text-on-secondary-container cursor-pointer"
                  : "bg-transparent text-outline/40 cursor-default"
            }`}
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}

// ─── HerbFilter (main export) ───────────────────────────────────────────────

export default function HerbFilter({ herbs }: { herbs: Herb[] }) {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    herbs.forEach((herb) => letters.add(herb.name[0].toUpperCase()));
    return letters;
  }, [herbs]);

  const filteredHerbs = useMemo(() => {
    if (!activeLetter) return herbs;
    return herbs.filter(
      (herb) => herb.name[0].toUpperCase() === activeLetter
    );
  }, [activeLetter, herbs]);

  return (
    <>
      {/* ── Alphabet Filter ──────────────────────────────────────────────── */}
      <section className="py-8 px-6 lg:px-12 bg-surface-low">
        <div className="max-w-[1200px] mx-auto">
          <AlphabetFilterBar
            activeLetter={activeLetter}
            onSelect={setActiveLetter}
            availableLetters={availableLetters}
          />
        </div>
      </section>

      {/* ── Herb Card Grid ───────────────────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-12 bg-surface flex-1">
        <div className="max-w-[1200px] mx-auto">
          {/* Active filter indicator */}
          {activeLetter && (
            <p className="text-[14px] text-on-surface-variant mb-6">
              Showing herbs starting with{" "}
              <span className="font-semibold text-on-surface">
                &ldquo;{activeLetter}&rdquo;
              </span>{" "}
              &middot;{" "}
              <button
                onClick={() => setActiveLetter(null)}
                className="text-primary-container font-medium hover:underline cursor-pointer"
              >
                Show all
              </button>
            </p>
          )}

          {filteredHerbs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[18px] text-on-surface-variant">
                No herbs found for &ldquo;{activeLetter}&rdquo;.
              </p>
              <button
                onClick={() => setActiveLetter(null)}
                className="mt-4 text-[14px] text-primary-container font-medium hover:underline cursor-pointer"
              >
                Clear filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHerbs.map((herb) => (
                <div
                  key={herb.slug}
                  className="rounded-xl bg-surface-lowest p-6 flex flex-col gap-4 shadow-ambient hover:shadow-ambient-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  {/* Leaf icon */}
                  <div className="w-12 h-12 rounded-xl bg-secondary-container/40 flex items-center justify-center text-[24px]">
                    {"\uD83C\uDF3F"}
                  </div>

                  {/* Herb name */}
                  <h3 className="font-semibold text-[18px] text-on-surface leading-snug">
                    {herb.name}
                  </h3>

                  {/* Property badges */}
                  <div className="flex flex-wrap gap-2">
                    {herb.medicinal_properties.map((prop) => (
                      <span
                        key={prop}
                        className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[12px] font-semibold"
                        style={{ fontFamily: "var(--font-work-sans)" }}
                      >
                        {prop}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-[14px] text-on-surface-variant leading-relaxed line-clamp-3 flex-1">
                    {herb.description}
                  </p>

                  {/* View Monograph link */}
                  <Link
                    href={`/herbs/${herb.slug}`}
                    className="text-[14px] text-primary-container font-medium hover:underline flex items-center gap-1 mt-auto pt-2"
                  >
                    View Monograph <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
