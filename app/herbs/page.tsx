"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/app/ui/Footer";

// ─── Placeholder herb data (replace with Supabase queries) ──────────────────

const HERBS = [
  {
    slug: "turmeric",
    name: "Turmeric",
    emoji: "\uD83C\uDF3F",
    properties: ["Anti-inflammatory", "Immune Support"],
    description:
      "A golden-hued root revered in Ayurvedic and traditional medicine for its potent anti-inflammatory and antioxidant properties. Curcumin, its active compound, supports joint health, digestion, and immune resilience.",
  },
  {
    slug: "ginger",
    name: "Ginger",
    emoji: "\uD83E\uDDC1",
    properties: ["Digestive", "Warming"],
    description:
      "A pungent, warming rhizome used for millennia to calm nausea, stimulate digestion, and improve circulation. A cornerstone of both Eastern and Western herbal traditions.",
  },
  {
    slug: "lavender",
    name: "Lavender",
    emoji: "\uD83D\uDC9C",
    properties: ["Calming", "Sleep Aid"],
    description:
      "A fragrant Mediterranean herb celebrated for its soothing effects on the nervous system. Used in aromatherapy, teas, and tinctures to ease anxiety and promote restful sleep.",
  },
  {
    slug: "peppermint",
    name: "Peppermint",
    emoji: "\uD83C\uDF3F",
    properties: ["Refreshing", "Focus"],
    description:
      "A crisp, cooling herb prized for its ability to sharpen mental clarity and ease tension headaches. Also widely used to soothe digestive discomfort and freshen the breath.",
  },
  {
    slug: "echinacea",
    name: "Echinacea",
    emoji: "\uD83C\uDF3B",
    properties: ["Immunity", "Viral Defense"],
    description:
      "A North American wildflower long used by indigenous peoples to bolster the body\u2019s natural defenses. Modern herbalism relies on it at the first sign of colds and respiratory infections.",
  },
  {
    slug: "st-johns-wort",
    name: "St. John\u2019s Wort",
    emoji: "\u2600\uFE0F",
    properties: ["Mood Balance", "Restorative"],
    description:
      "A sun-loving flowering plant with centuries of use in European folk medicine for lifting low mood and supporting emotional well-being. Often prepared as a tea or tincture.",
  },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// ─── Alphabet Filter (client component logic) ──────────────────────────────

function AlphabetFilter({
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

// ─── Page ───────────────────────────────────────────────────────────────────

export default function HerbLibraryPage() {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    HERBS.forEach((herb) => letters.add(herb.name[0].toUpperCase()));
    return letters;
  }, []);

  const filteredHerbs = useMemo(() => {
    if (!activeLetter) return HERBS;
    return HERBS.filter(
      (herb) => herb.name[0].toUpperCase() === activeLetter
    );
  }, [activeLetter]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-surface">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center gap-5">
          {/* Eyebrow */}
          <p
            className="text-[13px] font-medium uppercase tracking-[0.05rem] text-primary-container"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            Botanical Compendium
          </p>

          {/* Headline */}
          <h1 className="font-serif font-bold text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.08] text-on-surface tracking-tight">
            Herb Library
          </h1>

          {/* Subtitle */}
          <p className="text-[18px] text-on-surface-variant max-w-xl leading-relaxed">
            A curated compendium of healing botanicals — their traditional uses,
            key properties, and the ancestral wisdom behind each remedy.
          </p>
        </div>
      </section>

      {/* ── Alphabet Filter ──────────────────────────────────────────────── */}
      <section className="py-8 px-6 lg:px-12 bg-surface-low">
        <div className="max-w-[1200px] mx-auto">
          <AlphabetFilter
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
                  {/* Emoji icon */}
                  <div className="w-12 h-12 rounded-xl bg-secondary-container/40 flex items-center justify-center text-[24px]">
                    {herb.emoji}
                  </div>

                  {/* Herb name */}
                  <h3 className="font-semibold text-[18px] text-on-surface leading-snug">
                    {herb.name}
                  </h3>

                  {/* Property badges */}
                  <div className="flex flex-wrap gap-2">
                    {herb.properties.map((prop) => (
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

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
