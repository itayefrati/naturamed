import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";
import SearchBar from "@/app/ui/SearchBar";
import CategoryGrid from "@/app/ui/CategoryGrid";

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
    title: "Search a Condition",
    description:
      "Type any condition, symptom, or herb into the search bar. Our library covers hundreds of common health concerns backed by ancestral knowledge.",
  },
  {
    step: "02",
    title: "Understand the Causes",
    description:
      "See the root causes behind each condition — because treating symptoms alone is never enough. Knowledge is the beginning of healing.",
  },
  {
    step: "03",
    title: "Get Natural Remedies",
    description:
      "Browse curated, ancestral remedies with full ingredients, preparation steps, and clear safety information.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center gap-7">

          {/* Eyebrow */}
          <p className="text-[13px] font-medium uppercase tracking-[0.1em] text-green-primary font-sans">
            Natural · Ancestral · Trustworthy
          </p>

          {/* Headline */}
          <h1 className="font-serif font-bold text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.1] text-ink max-w-3xl">
            Healing Knowledge,<br className="hidden sm:block" /> Rediscovered.
          </h1>

          {/* Subtext */}
          <p className="text-[18px] text-muted font-sans max-w-xl leading-relaxed">
            Search a condition, explore herbs, or browse categories to find
            ancestral remedies rooted in natural tradition.
          </p>

          {/* Inline quote */}
          <blockquote className="max-w-xl text-left border-l-2 border-green-mid pl-5 py-1 self-start sm:self-center">
            <p className="font-serif italic text-[18px] text-green-primary leading-relaxed">
              &ldquo;Because there is no disease in this world that God
              hasn&apos;t made a cure for.&rdquo;
            </p>
            <footer className="mt-1 text-[13px] text-muted font-sans">
              — Traditional wisdom
            </footer>
          </blockquote>

          {/* Search bar */}
          <div className="w-full max-w-2xl mt-1">
            <SearchBar />
          </div>

          {/* Browse link */}
          <Link
            href="#categories"
            className="flex items-center gap-1 text-[15px] text-green-primary font-medium hover:underline font-sans"
          >
            Browse by Category <ChevronRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      {/* ── Herb of Day + Health Tip ───────────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-12 bg-off-white">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-6">

          {/* Herb of the Day */}
          <div className="rounded-xl bg-green-light p-6 flex flex-col gap-3">
            <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-green-primary font-sans">
              🌿 Herb of the Day
            </span>
            <h3 className="font-serif text-[24px] font-semibold text-ink">
              {HERB_OF_DAY.name}
            </h3>
            <p className="text-[15px] text-muted font-sans leading-relaxed">
              {HERB_OF_DAY.property}
            </p>
            <Link
              href={`/herbs/${HERB_OF_DAY.slug}`}
              className="text-[14px] text-green-primary font-medium hover:underline font-sans mt-auto pt-2"
            >
              Learn more →
            </Link>
          </div>

          {/* Health Tip of the Day */}
          <div className="rounded-xl bg-white border-l-4 border-green-primary px-6 py-6 flex flex-col gap-3 shadow-sm">
            <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-green-primary font-sans">
              💡 Health Tip
            </span>
            <p className="text-[16px] text-ink font-sans leading-[1.7]">
              {HEALTH_TIP}
            </p>
          </div>

        </div>
      </section>

      {/* ── Homepage Quote Banner ──────────────────────────────────────────── */}
      <section className="py-10 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <blockquote className="rounded-xl bg-green-light px-10 py-8 text-center">
            <p className="font-serif italic text-[20px] text-green-primary leading-relaxed">
              &ldquo;Because there is no disease in this world that God
              hasn&apos;t made a cure for.&rdquo;
            </p>
            <footer className="mt-2 text-[13px] text-muted font-sans">
              — Traditional wisdom
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── Category Grid ──────────────────────────────────────────────────── */}
      <section id="categories" className="py-20 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[13px] font-medium uppercase tracking-[0.1em] text-green-primary font-sans mb-3">
              Browse by Category
            </p>
            <h2 className="font-serif font-semibold text-[28px] md:text-[36px] text-ink">
              What are you looking for?
            </h2>
          </div>
          <CategoryGrid />
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12 bg-off-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[13px] font-medium uppercase tracking-[0.1em] text-green-primary font-sans mb-3">
              Simple Process
            </p>
            <h2 className="font-serif font-semibold text-[28px] md:text-[36px] text-ink">
              How NaturaMed Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {HOW_IT_WORKS.map(({ step, title, description }) => (
              <div key={step} className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-full bg-green-primary flex items-center justify-center shrink-0">
                  <span className="text-white text-[13px] font-semibold font-sans tracking-wide">
                    {step}
                  </span>
                </div>
                <h3 className="font-sans font-semibold text-[18px] text-ink">
                  {title}
                </h3>
                <p className="font-sans text-[15px] text-muted leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Remedies ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[13px] font-medium uppercase tracking-[0.1em] text-green-primary font-sans mb-3">
              From the Library
            </p>
            <h2 className="font-serif font-semibold text-[28px] md:text-[36px] text-ink">
              Featured Remedies
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURED_REMEDIES.map((remedy) => (
              <div
                key={remedy.id}
                className="rounded-xl border border-[#E8F3EB] bg-white p-6 flex flex-col gap-4 hover:border-green-primary hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Category badge */}
                <span className="inline-block px-2.5 py-1 rounded bg-green-light text-green-primary text-[12px] font-semibold font-sans w-fit">
                  {remedy.condition}
                </span>

                {/* Title */}
                <h3 className="font-sans font-semibold text-[18px] text-ink leading-snug">
                  {remedy.name}
                </h3>

                {/* Description */}
                <p className="font-sans text-[14px] text-muted leading-relaxed line-clamp-2 flex-1">
                  {remedy.description}
                </p>

                {/* Footer row */}
                <div className="flex items-center justify-between pt-3 border-t border-[#E8F3EB]">
                  <span className="flex items-center gap-1.5 text-[13px] text-muted font-sans">
                    <Clock size={13} strokeWidth={2} />
                    {remedy.prep_time}
                  </span>
                  {remedy.caution && (
                    <span className="flex items-center gap-1 text-[12px] font-semibold rounded px-2 py-0.5 bg-caution-bg border border-caution text-caution-text font-sans">
                      ⚠ {remedy.caution}
                    </span>
                  )}
                </div>

                <Link
                  href={`/conditions/${remedy.slug}`}
                  className="text-[14px] text-green-primary font-medium hover:underline font-sans"
                >
                  View Remedy →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Global Disclaimer Banner ───────────────────────────────────────── */}
      <section className="py-8 px-6 lg:px-12 bg-off-white border-t border-[#E8F3EB]">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-[13px] text-muted font-sans leading-relaxed max-w-3xl mx-auto">
            <strong className="text-ink font-semibold">Disclaimer:</strong>{" "}
            NaturaMed is for educational purposes only. This content is not
            intended to diagnose, treat, cure, or prevent any disease. Always
            consult a qualified healthcare provider before beginning any natural
            remedy protocol.
          </p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="py-12 px-6 lg:px-12 border-t border-[#E8F3EB]">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-start justify-between gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-2 max-w-xs">
            <span className="font-serif text-[22px] text-green-primary font-semibold">
              🌿 NaturaMed
            </span>
            <p className="text-[14px] text-muted font-sans leading-relaxed">
              Ancestral healing knowledge, brought into the digital age.
            </p>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-10">
            <div>
              <p className="text-[12px] font-semibold text-ink uppercase tracking-widest font-sans mb-4">
                Explore
              </p>
              <div className="flex flex-col gap-2.5">
                {["Remedies", "Herb Library", "Categories", "Symptom Checker"].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="text-[14px] text-muted hover:text-green-primary font-sans transition-colors duration-150"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-ink uppercase tracking-widest font-sans mb-4">
                Company
              </p>
              <div className="flex flex-col gap-2.5">
                {["About", "Contact", "Privacy Policy", "Disclaimer"].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="text-[14px] text-muted hover:text-green-primary font-sans transition-colors duration-150"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="max-w-[1200px] mx-auto mt-10 pt-6 border-t border-[#E8F3EB] text-center">
          <p className="text-[13px] text-muted font-sans">
            © 2026 NaturaMed. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
