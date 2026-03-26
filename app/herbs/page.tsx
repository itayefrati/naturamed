import { supabase } from "@/lib/supabase";
import Footer from "@/app/ui/Footer";
import HerbFilter from "@/app/ui/HerbFilter";

// ─── Fallback data (used when DB is empty or unavailable) ───────────────────

const FALLBACK_HERBS = [
  {
    slug: "turmeric",
    name: "Turmeric",
    medicinal_properties: ["Anti-inflammatory", "Immune Support"],
    description:
      "A golden-hued root revered in Ayurvedic and traditional medicine for its potent anti-inflammatory and antioxidant properties. Curcumin, its active compound, supports joint health, digestion, and immune resilience.",
  },
  {
    slug: "ginger",
    name: "Ginger",
    medicinal_properties: ["Digestive", "Warming"],
    description:
      "A pungent, warming rhizome used for millennia to calm nausea, stimulate digestion, and improve circulation. A cornerstone of both Eastern and Western herbal traditions.",
  },
  {
    slug: "lavender",
    name: "Lavender",
    medicinal_properties: ["Calming", "Sleep Aid"],
    description:
      "A fragrant Mediterranean herb celebrated for its soothing effects on the nervous system. Used in aromatherapy, teas, and tinctures to ease anxiety and promote restful sleep.",
  },
  {
    slug: "peppermint",
    name: "Peppermint",
    medicinal_properties: ["Refreshing", "Focus"],
    description:
      "A crisp, cooling herb prized for its ability to sharpen mental clarity and ease tension headaches. Also widely used to soothe digestive discomfort and freshen the breath.",
  },
  {
    slug: "echinacea",
    name: "Echinacea",
    medicinal_properties: ["Immunity", "Viral Defense"],
    description:
      "A North American wildflower long used by indigenous peoples to bolster the body\u2019s natural defenses. Modern herbalism relies on it at the first sign of colds and respiratory infections.",
  },
  {
    slug: "st-johns-wort",
    name: "St. John\u2019s Wort",
    medicinal_properties: ["Mood Balance", "Restorative"],
    description:
      "A sun-loving flowering plant with centuries of use in European folk medicine for lifting low mood and supporting emotional well-being. Often prepared as a tea or tincture.",
  },
];

// ─── Page (Server Component) ────────────────────────────────────────────────

export default async function HerbLibraryPage() {
  const { data: herbs } = await supabase
    .from("herbs")
    .select("name, slug, description, medicinal_properties")
    .order("name");

  const herbList =
    herbs && herbs.length > 0 ? herbs : FALLBACK_HERBS;

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

      {/* ── Alphabet Filter + Grid (Client Component) ────────────────────── */}
      <HerbFilter herbs={herbList} />

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
