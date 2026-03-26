import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/app/ui/Footer";
import { supabase } from "@/lib/supabase";

// ─── Fallback Preparation Methods Data ──────────────────────────────────────

const FALLBACK_METHODS = [
  {
    name: "Herbal Tea (Infusion)",
    emoji: "\u{1F375}",
    description:
      "The simplest and most common preparation. Pour boiling water over dried or fresh herbs, steep for 5-15 minutes, strain, and drink.",
    difficulty: "Beginner",
    time: "5-15 min",
  },
  {
    name: "Tincture",
    emoji: "\u{1F9EA}",
    description:
      "A concentrated liquid extract made by soaking herbs in alcohol or glycerin for several weeks. Preserves active compounds for long-term storage.",
    difficulty: "Intermediate",
    time: "4-6 weeks",
  },
  {
    name: "Poultice",
    emoji: "\u{1F33F}",
    description:
      "Fresh or dried herbs are mashed into a paste and applied directly to the skin. Used for localized pain, inflammation, and wounds.",
    difficulty: "Beginner",
    time: "15-30 min",
  },
  {
    name: "Cold-Infused Oil",
    emoji: "\u{1FAD2}",
    description:
      "Herbs are steeped in a carrier oil (olive, coconut, jojoba) for 4-6 weeks in a warm, dark place. Used topically for massage and skin care.",
    difficulty: "Intermediate",
    time: "4-6 weeks",
  },
  {
    name: "Ointment / Salve",
    emoji: "\u{1F9F4}",
    description:
      "An herbal oil thickened with beeswax to create a semi-solid preparation. Applied to skin for healing wounds, rashes, and dry skin.",
    difficulty: "Intermediate",
    time: "1-2 hours",
  },
  {
    name: "Steam Inhalation",
    emoji: "\u2668\uFE0F",
    description:
      "Herbs are added to a bowl of hot water. The steam is inhaled under a towel to deliver volatile compounds directly to the respiratory system.",
    difficulty: "Beginner",
    time: "10-15 min",
  },
  {
    name: "Compress",
    emoji: "\u{1FA79}",
    description:
      "A cloth soaked in herbal tea or decoction, applied warm or cold to the affected area. Effective for muscle pain, headaches, and eye irritation.",
    difficulty: "Beginner",
    time: "15-30 min",
  },
];

// ─── Emoji & Difficulty maps for DB records ─────────────────────────────────

const EMOJI_MAP: Record<string, string> = {
  'Herbal Tea (Infusion)': '\u{1F375}',
  'Tincture': '\u{1F9EA}',
  'Poultice': '\u{1F33F}',
  'Cold-Infused Oil': '\u{1FAD2}',
  'Ointment / Salve': '\u{1F9F4}',
  'Steam Inhalation': '\u2668\uFE0F',
  'Compress': '\u{1FA79}',
};

const DIFFICULTY_MAP: Record<string, string> = {
  'Herbal Tea (Infusion)': 'Beginner',
  'Tincture': 'Intermediate',
  'Poultice': 'Beginner',
  'Cold-Infused Oil': 'Intermediate',
  'Ointment / Salve': 'Intermediate',
  'Steam Inhalation': 'Beginner',
  'Compress': 'Beginner',
};

// ─────────────────────────────────────────────────────────────────────────────

export default async function PreparationsPage() {
  // ── Fetch preparation methods from Supabase ─────────────────────────────
  const { data: methods } = await supabase
    .from('preparation_methods')
    .select('id, name, description, steps, use_cases')
    .order('name');

  const METHODS =
    methods && methods.length > 0
      ? methods.map((m) => ({
          name: m.name,
          emoji: EMOJI_MAP[m.name] ?? '\u{1F33F}',
          description: m.description ?? '',
          difficulty: DIFFICULTY_MAP[m.name] ?? 'Beginner',
          time: '', // DB does not store prep time; kept for badge rendering
        }))
      : FALLBACK_METHODS;

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-surface">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center gap-5">

          {/* Eyebrow */}
          <p
            className="text-[13px] font-medium uppercase tracking-[0.05rem] text-primary-container"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            The Apothecary
          </p>

          {/* Headline */}
          <h1 className="font-serif font-bold text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.08] text-on-surface max-w-3xl tracking-tight">
            Preparation Methods
          </h1>

          {/* Subtitle */}
          <p className="text-[18px] text-on-surface-variant max-w-xl leading-relaxed">
            Discover traditional ways to prepare herbal remedies — from simple
            teas and compresses to tinctures and salves passed down through
            generations of herbalists.
          </p>
        </div>
      </section>

      {/* ── Methods Grid ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12 bg-surface-low">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {METHODS.map((method) => (
              <div
                key={method.name}
                className="rounded-xl bg-surface-lowest p-7 flex flex-col gap-4 shadow-ambient hover:shadow-ambient-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Icon */}
                <span className="text-[40px] leading-none" role="img" aria-label={method.name}>
                  {method.emoji}
                </span>

                {/* Method name */}
                <h2 className="font-serif font-semibold text-[24px] text-on-surface leading-snug">
                  {method.name}
                </h2>

                {/* Description */}
                <p className="text-[15px] text-on-surface-variant leading-relaxed flex-1">
                  {method.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[12px] font-semibold"
                    style={{ fontFamily: "var(--font-work-sans)" }}
                  >
                    {method.difficulty}
                  </span>
                  {method.time && (
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full bg-primary-fixed/30 text-primary text-[12px] font-semibold"
                      style={{ fontFamily: "var(--font-work-sans)" }}
                    >
                      {method.time}
                    </span>
                  )}
                </div>

                {/* Learn More link */}
                <Link
                  href="/herbs"
                  className="text-[14px] text-primary-container font-medium hover:underline flex items-center gap-1 mt-auto pt-1"
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Getting Started Callout ────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12 bg-surface">
        <div className="max-w-[1200px] mx-auto">
          <div className="rounded-xl bg-secondary-container/40 p-10 md:p-14 flex flex-col items-center text-center gap-5 shadow-ambient">
            <p
              className="text-[12px] font-semibold uppercase tracking-[0.05rem] text-primary-container"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              Getting Started
            </p>
            <h2 className="font-serif font-semibold text-[28px] md:text-[36px] text-on-surface leading-tight max-w-lg">
              Ready to explore the herbs?
            </h2>
            <p className="text-[16px] text-on-surface-variant leading-relaxed max-w-lg">
              Browse our comprehensive herb library to find the right plants for
              your preparations. Each herb includes properties, traditional uses,
              and safety information.
            </p>
            <Link
              href="/herbs"
              className="inline-flex items-center gap-2 btn-primary px-7 py-3.5 rounded-full text-[15px] font-semibold mt-2"
            >
              Explore Herb Library <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
