import Link from "next/link";
import { Clock, ChevronRight, ArrowRight } from "lucide-react";
import SearchBar from "@/app/ui/SearchBar";
import CategoryGrid from "@/app/ui/CategoryGrid";
import Footer from "@/app/ui/Footer";

// ─── Placeholder data (replace with Supabase queries) ────────────────────────

const HERB_OF_DAY = {
  name: "Turmeric",
  property: "Anti-inflammatory · Antioxidant · Digestive aid",
  slug: "turmeric",
};

const HEALTH_TIP =
  "Start your morning with warm lemon water to stimulate digestion, alkalize the body, and gently detox the liver — a practice used for centuries in Ayurvedic tradition.";

const FEATURED_REMEDIES = [
  {
    id: "1",
    name: "Ginger & Honey Tea for Sore Throat",
    condition: "Throat",
    description:
      "A time-tested remedy combining anti-bacterial honey and anti-inflammatory ginger to soothe throat irritation and speed recovery.",
    prep_time: "10 min",
    caution: null,
    slug: "sore-throat",
  },
  {
    id: "2",
    name: "Chamomile & Lavender Sleep Tonic",
    condition: "Sleep",
    description:
      "Calm the nervous system and prepare the body for deep, restorative sleep with this gentle herbal blend used across traditional medicine systems.",
    prep_time: "5 min",
    caution: "Avoid during pregnancy",
    slug: "insomnia",
  },
  {
    id: "3",
    name: "Activated Charcoal Detox Protocol",
    condition: "Digestion & Gut",
    description:
      "Used in traditional and modern herbalism to bind toxins and ease bloating, gas, and digestive distress — particularly after food poisoning.",
    prep_time: "2 min",
    caution: "Do not take with medications",
    slug: "bloating",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Identify Your Concern",
    description:
      "Search any condition, symptom, or herb. Our library covers hundreds of common health concerns backed by ancestral knowledge and traditional wisdom.",
  },
  {
    step: "02",
    title: "Consult the Knowledge",
    description:
      "Understand root causes behind each condition. We believe treating symptoms alone is never enough — knowledge is the beginning of healing.",
  },
  {
    step: "03",
    title: "Integrate Natural Remedies",
    description:
      "Browse curated ancestral remedies with full ingredients, preparation steps, and clear safety information you can trust.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-surface">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center gap-7">

          {/* Eyebrow */}
          <p className="text-[13px] font-medium uppercase tracking-[0.05rem] text-primary-container" style={{ fontFamily: "var(--font-work-sans)" }}>
            Natural &middot; Ancestral &middot; Trustworthy
          </p>

          {/* Headline */}
          <h1 className="font-serif font-bold text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.08] text-on-surface max-w-3xl tracking-tight">
            Healing Knowledge,<br className="hidden sm:block" /> Rediscovered.
          </h1>

          {/* Subtext */}
          <p className="text-[18px] text-on-surface-variant max-w-xl leading-relaxed">
            Search a condition, explore herbs, or browse categories to find
            ancestral remedies rooted in natural tradition.
          </p>

          {/* Search bar */}
          <div className="w-full max-w-2xl mt-2">
            <SearchBar />
          </div>

          {/* Browse link */}
          <Link
            href="#categories"
            className="flex items-center gap-1.5 text-[15px] text-primary-container font-medium hover:underline"
          >
            Browse by Category <ChevronRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      {/* ── Quote + Herb of Day + Health Tip ────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-12 bg-surface-low">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-8">

          {/* Quote Banner */}
          <blockquote className="rounded-xl bg-primary-fixed/30 px-10 py-8 text-center">
            <p className="font-serif italic text-[20px] text-primary leading-relaxed">
              &ldquo;Because there is no disease in this world that God
              hasn&apos;t made a cure for.&rdquo;
            </p>
            <footer className="mt-2 text-[13px] text-on-surface-variant">
              — Traditional wisdom
            </footer>
          </blockquote>

          {/* Two-column cards */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Herb of the Day */}
            <div className="rounded-xl bg-secondary-container/40 p-7 flex flex-col gap-3 shadow-ambient">
              <span className="text-[11px] font-medium uppercase tracking-[0.05rem] text-primary-container" style={{ fontFamily: "var(--font-work-sans)" }}>
                Herb of the Day
              </span>
              <h3 className="font-serif text-[26px] font-semibold text-on-surface">
                {HERB_OF_DAY.name}
              </h3>
              <p className="text-[15px] text-on-surface-variant leading-relaxed">
                {HERB_OF_DAY.property}
              </p>
              <Link
                href={`/herbs/${HERB_OF_DAY.slug}`}
                className="text-[14px] text-primary-container font-medium hover:underline mt-auto pt-2 flex items-center gap-1"
              >
                Learn more <ArrowRight size={14} />
              </Link>
            </div>

            {/* Health Tip of the Day */}
            <div className="rounded-xl bg-surface-lowest p-7 flex flex-col gap-3 shadow-ambient border-l-4 border-primary-container">
              <span className="text-[11px] font-medium uppercase tracking-[0.05rem] text-primary-container" style={{ fontFamily: "var(--font-work-sans)" }}>
                Daily Wellness Tip
              </span>
              <p className="text-[16px] text-on-surface leading-[1.7]">
                {HEALTH_TIP}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Category Grid ──────────────────────────────────────────────────── */}
      <section id="categories" className="py-20 px-6 lg:px-12 bg-surface">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[13px] font-medium uppercase tracking-[0.05rem] text-primary-container mb-3" style={{ fontFamily: "var(--font-work-sans)" }}>
              Browse by Category
            </p>
            <h2 className="font-serif font-semibold text-[28px] md:text-[36px] text-on-surface">
              What are you looking for?
            </h2>
          </div>
          <CategoryGrid />
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12 bg-surface-low">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[13px] font-medium uppercase tracking-[0.05rem] text-primary-container mb-3" style={{ fontFamily: "var(--font-work-sans)" }}>
              Simple Process
            </p>
            <h2 className="font-serif font-semibold text-[28px] md:text-[36px] text-on-surface">
              How NaturaMed Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {HOW_IT_WORKS.map(({ step, title, description }) => (
              <div key={step} className="flex flex-col gap-5">
                <div className="w-12 h-12 rounded-full btn-primary flex items-center justify-center shrink-0">
                  <span className="text-on-primary text-[14px] font-semibold tracking-wide" style={{ fontFamily: "var(--font-work-sans)" }}>
                    {step}
                  </span>
                </div>
                <h3 className="font-semibold text-[18px] text-on-surface">
                  {title}
                </h3>
                <p className="text-[15px] text-on-surface-variant leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Remedies ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12 bg-surface">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[13px] font-medium uppercase tracking-[0.05rem] text-primary-container mb-3" style={{ fontFamily: "var(--font-work-sans)" }}>
              Popular Remedies
            </p>
            <h2 className="font-serif font-semibold text-[28px] md:text-[36px] text-on-surface">
              Featured Preparations
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURED_REMEDIES.map((remedy) => (
              <div
                key={remedy.id}
                className="rounded-xl bg-surface-lowest p-6 flex flex-col gap-4 shadow-ambient hover:shadow-ambient-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Category badge */}
                <span className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[12px] font-semibold w-fit" style={{ fontFamily: "var(--font-work-sans)" }}>
                  {remedy.condition}
                </span>

                {/* Title */}
                <h3 className="font-semibold text-[18px] text-on-surface leading-snug">
                  {remedy.name}
                </h3>

                {/* Description */}
                <p className="text-[14px] text-on-surface-variant leading-relaxed line-clamp-2 flex-1">
                  {remedy.description}
                </p>

                {/* Footer row */}
                <div className="flex items-center justify-between pt-4">
                  <span className="flex items-center gap-1.5 text-[13px] text-on-surface-variant">
                    <Clock size={13} strokeWidth={2} />
                    {remedy.prep_time}
                  </span>
                  {remedy.caution && (
                    <span className="flex items-center gap-1 text-[12px] font-semibold rounded-full px-2.5 py-0.5 bg-tertiary-fixed text-tertiary" style={{ fontFamily: "var(--font-work-sans)" }}>
                      {remedy.caution}
                    </span>
                  )}
                </div>

                <Link
                  href={`/conditions/${remedy.slug}`}
                  className="text-[14px] text-primary-container font-medium hover:underline flex items-center gap-1"
                >
                  View Remedy <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <Footer />

    </div>
  );
}
