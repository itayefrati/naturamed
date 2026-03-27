import { supabase } from "@/lib/supabase";
import Footer from "@/app/ui/Footer";
import HerbFilter from "@/app/ui/HerbFilter";

// ─── Fallback data ───────────────────────────────────────────────────────────

const FALLBACK_HERBS = [
  {
    slug: "turmeric",
    name: "Turmeric",
    medicinal_properties: ["Anti-inflammatory", "Antioxidant"],
    description:
      "A golden-hued root revered in Ayurvedic and traditional medicine for its potent anti-inflammatory and antioxidant properties.",
  },
  {
    slug: "ginger",
    name: "Ginger",
    medicinal_properties: ["Digestive", "Warming"],
    description:
      "A pungent, warming rhizome used for millennia to calm nausea, stimulate digestion, and improve circulation.",
  },
  {
    slug: "lavender",
    name: "Lavender",
    medicinal_properties: ["Calming", "Sleep Aid"],
    description:
      "A fragrant Mediterranean herb celebrated for its soothing effects on the nervous system and its ability to ease anxiety.",
  },
  {
    slug: "peppermint",
    name: "Peppermint",
    medicinal_properties: ["Refreshing", "Focus"],
    description:
      "A crisp, cooling herb prized for its ability to sharpen mental clarity and ease tension headaches.",
  },
  {
    slug: "echinacea",
    name: "Echinacea",
    medicinal_properties: ["Immunity", "Viral Defense"],
    description:
      "A North American wildflower long used by indigenous peoples to bolster the body's natural defenses against colds.",
  },
  {
    slug: "st-johns-wort",
    name: "St. John's Wort",
    medicinal_properties: ["Mood Balance", "Restorative"],
    description:
      "A sun-loving flowering plant with centuries of use in European folk medicine for lifting low mood and supporting emotional well-being.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function HerbLibraryPage() {
  const { data: herbs } = await supabase
    .from("herbs")
    .select("name, slug, description, medicinal_properties")
    .order("name");

  const herbList = herbs && herbs.length > 0 ? herbs : FALLBACK_HERBS;

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-surface">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center gap-5">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.1rem] text-on-surface-variant"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            Botanical Compendium
          </p>
          <h1 className="font-serif font-bold text-[44px] sm:text-[58px] lg:text-[68px] leading-[1.04] text-on-surface tracking-tight">
            Herb Library
          </h1>
          <p className="text-[17px] text-on-surface-variant max-w-xl leading-relaxed">
            A curated compendium of healing botanicals — their traditional uses,
            key properties, and the ancestral wisdom behind each remedy.
          </p>
        </div>
      </section>

      {/* ── Alphabet Filter + Grid ────────────────────────────────────────── */}
      <HerbFilter herbs={herbList} />

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
