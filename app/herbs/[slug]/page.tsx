import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  AlertTriangle,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import Footer from "@/app/ui/Footer";
import { supabase } from "@/lib/supabase";

// ─── Types ──────────────────────────────────────────────────────────────────

type Preparation = {
  method: string;
  icon: string;
  description: string;
};

type RelatedRemedy = {
  name: string;
  condition: string;
  slug: string;
};

type HerbData = {
  name: string;
  latinName: string;
  family: string;
  emoji: string;
  history: string;
  overview: string;
  properties: string[];
  preparations: Preparation[];
  cautions: string[];
  sources: string[];
  funFact: string | null;
  relatedRemedies: RelatedRemedy[];
};

// ─── Fallback data ──────────────────────────────────────────────────────────

const FALLBACK_HERBS: Record<string, HerbData> = {
  turmeric: {
    name: "Turmeric",
    latinName: "Curcuma longa",
    family: "Zingiberaceae",
    emoji: "\u{1F33F}",
    history:
      "Revered for over 4,000 years in Ayurvedic medicine, turmeric has been called the \u2018Golden Spice\u2019 for its profound healing properties. Ancient texts describe it as a purifier of the body and a bridge between the physical and spiritual realms. From the temples of India to the apothecaries of the Middle East, turmeric has traveled the Silk Road, leaving its golden mark on every civilization it touched.",
    overview:
      "A rhizomatous herbaceous perennial plant of the ginger family. Its primary bioactive compound, curcumin, is responsible for most of its therapeutic effects. Curcumin exhibits strong anti-inflammatory and antioxidant activity, modulating multiple molecular targets involved in chronic disease pathways.",
    properties: [
      "Anti-inflammatory",
      "Antioxidant",
      "Immune Support",
      "Digestive Aid",
      "Neuroprotective",
    ],
    preparations: [
      {
        method: "Tea",
        icon: "\u{1F375}",
        description:
          "Steep 1 tsp ground turmeric in hot water for 10 minutes. Add honey and black pepper to enhance absorption.",
      },
      {
        method: "Tincture",
        icon: "\u{1F9EA}",
        description:
          "Take 30\u201360 drops of turmeric tincture in water, 2\u20133 times daily. Best taken with meals.",
      },
      {
        method: "Culinary",
        icon: "\u{1F373}",
        description:
          "Add to curries, golden milk, soups, and smoothies. Always pair with black pepper for bioavailability.",
      },
      {
        method: "Topical",
        icon: "\u2728",
        description:
          "Mix with coconut oil for a paste. Apply to skin for inflammation and wounds. Patch test first.",
      },
    ],
    cautions: [
      "May interact with blood-thinning medications",
      "Avoid high supplemental doses during pregnancy",
      "May aggravate gallbladder issues",
    ],
    sources: [
      "Hewlings, S.J. & Kalman, D.S. (2017). Curcumin: A Review of Its Effects on Human Health. Foods, 6(10), 92.",
      "Prasad, S. & Aggarwal, B.B. (2011). Turmeric, the Golden Spice. Herbal Medicine: Biomolecular and Clinical Aspects, 2nd edition.",
    ],
    funFact: null,
    relatedRemedies: [
      {
        name: "Golden Milk Latte",
        condition: "Inflammation",
        slug: "pain-inflammation",
      },
      {
        name: "Turmeric Ginger Tea",
        condition: "Digestion",
        slug: "bloating",
      },
      {
        name: "Anti-Inflammatory Paste",
        condition: "Joint Pain",
        slug: "pain-inflammation",
      },
    ],
  },
};

// ─── Generic icons for usage methods ────────────────────────────────────────

const METHOD_ICONS: Record<string, string> = {
  tea: "\u{1F375}",
  tincture: "\u{1F9EA}",
  culinary: "\u{1F373}",
  topical: "\u2728",
  capsule: "\u{1F48A}",
  poultice: "\u{1FA79}",
  oil: "\u{1F9F4}",
  bath: "\u{1F6C1}",
  compress: "\u{1FA79}",
  inhalation: "\u{1F4A8}",
  powder: "\u2728",
  decoction: "\u{1F375}",
  infusion: "\u{1F375}",
  salve: "\u{1F9F4}",
  syrup: "\u{1F36F}",
  smoothie: "\u{1F964}",
};

function getMethodIcon(method: string): string {
  const key = method.toLowerCase().trim();
  return METHOD_ICONS[key] || "\u{1F33F}";
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function HerbDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // ── Try Supabase first ──────────────────────────────────────────────────
  const { data: dbHerb, error } = await supabase
    .from("herbs")
    .select("*")
    .eq("slug", slug)
    .single();

  // ── Query related remedies ──────────────────────────────────────────────
  const { data: relatedRemedies } = await supabase
    .from("remedies")
    .select("id, name, condition_id, conditions(name, slug)")
    .limit(3);

  // ── Build the herb object ───────────────────────────────────────────────
  let herb: HerbData;

  if (!error && dbHerb) {
    // Map DB columns to our template shape
    const usageMethods: string[] = dbHerb.usage_methods || [];
    const preparations: Preparation[] = usageMethods.map((method: string) => ({
      method,
      icon: getMethodIcon(method),
      description: `Prepared as ${method.toLowerCase()} — follow traditional preparation guidelines for best results.`,
    }));

    const remedyLinks: RelatedRemedy[] = (relatedRemedies || []).map(
      (r: Record<string, unknown>) => {
        const condition = r.conditions as
          | { name: string; slug: string }
          | null;
        return {
          name: r.name as string,
          condition: condition?.name || "General Wellness",
          slug: condition?.slug || "wellness",
        };
      }
    );

    herb = {
      name: dbHerb.name,
      latinName: dbHerb.latin_name || "",
      family: dbHerb.family || "",
      emoji: "\u{1F33F}",
      history: dbHerb.fun_fact || "",
      overview: dbHerb.description || "",
      properties: dbHerb.medicinal_properties || [],
      preparations,
      cautions: dbHerb.precautions || [],
      sources: dbHerb.sources || [],
      funFact: dbHerb.fun_fact || null,
      relatedRemedies: remedyLinks,
    };
  } else {
    // Fall back to hardcoded data
    const fallback = FALLBACK_HERBS[slug];
    if (!fallback) notFound();
    herb = fallback;
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
      <nav className="px-6 lg:px-12 pt-6 pb-2 bg-surface">
        <div className="max-w-[1200px] mx-auto">
          <ol className="flex items-center gap-1.5 text-[13px] text-on-surface-variant">
            <li>
              <Link
                href="/"
                className="hover:text-primary-container transition-colors duration-150"
              >
                Home
              </Link>
            </li>
            <li>
              <ChevronRight size={12} className="text-outline" />
            </li>
            <li>
              <Link
                href="/herbs"
                className="hover:text-primary-container transition-colors duration-150"
              >
                Herb Library
              </Link>
            </li>
            <li>
              <ChevronRight size={12} className="text-outline" />
            </li>
            <li className="text-on-surface font-medium">{herb.name}</li>
          </ol>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-12 pt-8 pb-16 bg-surface">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Botanical image placeholder */}
          <div className="aspect-[4/5] rounded-2xl bg-primary-fixed/30 flex items-center justify-center">
            <span className="text-[120px] leading-none">{herb.emoji}</span>
          </div>

          {/* Herb identity */}
          <div className="flex flex-col gap-5">
            <p
              className="text-[12px] font-semibold uppercase tracking-[0.06rem] text-primary-container"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              Botanical Monograph
            </p>
            <h1 className="font-serif font-bold text-[40px] sm:text-[48px] leading-[1.08] text-on-surface tracking-tight">
              {herb.name}
            </h1>
            {herb.latinName && (
              <p className="font-serif italic text-[20px] text-on-surface-variant">
                {herb.latinName}
              </p>
            )}
            {herb.family && (
              <p className="text-[15px] text-on-surface-variant leading-relaxed">
                Family:{" "}
                <span className="font-medium text-on-surface">
                  {herb.family}
                </span>
              </p>
            )}
            <p className="text-[16px] text-on-surface-variant leading-[1.7] max-w-lg">
              {herb.overview}
            </p>
          </div>
        </div>
      </section>

      {/* ── Apothecary Lore ─────────────────────────────────────────────── */}
      {herb.history && (
        <section className="px-6 lg:px-12 py-16 bg-surface-low">
          <div className="max-w-[1200px] mx-auto">
            <div className="max-w-3xl mx-auto text-center flex flex-col gap-5">
              <p
                className="text-[12px] font-semibold uppercase tracking-[0.06rem] text-primary-container"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                Apothecary Lore
              </p>
              <h2 className="font-serif font-semibold text-[28px] md:text-[34px] text-on-surface">
                A Heritage of Healing
              </h2>
              <p className="text-[17px] text-on-surface-variant leading-[1.8]">
                {herb.history}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── Overview — Botanical Classification & Bioactive Compounds ──── */}
      <section className="px-6 lg:px-12 py-16 bg-surface">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Classification card */}
            <div className="rounded-2xl bg-surface-lowest p-8 shadow-ambient flex flex-col gap-4">
              <p
                className="text-[12px] font-semibold uppercase tracking-[0.06rem] text-primary-container"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                Botanical Classification
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Common Name", value: herb.name },
                  { label: "Latin Name", value: herb.latinName },
                  { label: "Family", value: herb.family },
                ]
                  .filter((item) => item.value)
                  .map((item) => (
                    <div key={item.label} className="flex items-baseline gap-3">
                      <span className="text-[13px] text-on-surface-variant w-32 shrink-0">
                        {item.label}
                      </span>
                      <span className="text-[15px] font-medium text-on-surface">
                        {item.value}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Bioactive compounds card */}
            <div className="rounded-2xl bg-surface-lowest p-8 shadow-ambient flex flex-col gap-4">
              <p
                className="text-[12px] font-semibold uppercase tracking-[0.06rem] text-primary-container"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                Key Bioactive Compounds
              </p>
              <p className="text-[15px] text-on-surface-variant leading-relaxed">
                {herb.overview}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Medicinal Properties ────────────────────────────────────────── */}
      {herb.properties.length > 0 && (
        <section className="px-6 lg:px-12 py-16 bg-surface-low">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10">
              <p
                className="text-[12px] font-semibold uppercase tracking-[0.06rem] text-primary-container mb-3"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                Therapeutic Profile
              </p>
              <h2 className="font-serif font-semibold text-[28px] md:text-[34px] text-on-surface">
                Medicinal Properties
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {herb.properties.map((property) => (
                <span
                  key={property}
                  className="inline-flex items-center px-5 py-2.5 rounded-full bg-secondary-container text-on-secondary-container text-[14px] font-semibold"
                  style={{ fontFamily: "var(--font-work-sans)" }}
                >
                  {property}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Clinical Application — Preparation Methods ──────────────────── */}
      {herb.preparations.length > 0 && (
        <section className="px-6 lg:px-12 py-16 bg-surface">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10">
              <p
                className="text-[12px] font-semibold uppercase tracking-[0.06rem] text-primary-container mb-3"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                Clinical Application
              </p>
              <h2 className="font-serif font-semibold text-[28px] md:text-[34px] text-on-surface">
                Preparation Methods
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {herb.preparations.map((prep) => (
                <div
                  key={prep.method}
                  className="rounded-2xl bg-surface-lowest p-7 shadow-ambient hover:shadow-ambient-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-4"
                >
                  <span className="text-[40px] leading-none">{prep.icon}</span>
                  <h3 className="font-semibold text-[18px] text-on-surface">
                    {prep.method}
                  </h3>
                  <p className="text-[14px] text-on-surface-variant leading-relaxed flex-1">
                    {prep.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Safety & Contraindications ──────────────────────────────────── */}
      {herb.cautions.length > 0 && (
        <section className="px-6 lg:px-12 py-16 bg-surface-low">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10">
              <p
                className="text-[12px] font-semibold uppercase tracking-[0.06rem] text-tertiary mb-3"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                Safety Information
              </p>
              <h2 className="font-serif font-semibold text-[28px] md:text-[34px] text-on-surface">
                Contraindications & Cautions
              </h2>
            </div>
            <div className="max-w-2xl mx-auto rounded-2xl bg-tertiary-fixed/30 p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle size={20} className="text-tertiary" />
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-semibold text-[16px] text-tertiary">
                    Please note the following before use
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {herb.cautions.map((caution, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-[15px] text-on-surface leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary mt-2 shrink-0" />
                        {caution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Scientific Standards ─────────────────────────────────────────── */}
      {herb.sources.length > 0 && (
        <section className="px-6 lg:px-12 py-16 bg-surface">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10">
              <p
                className="text-[12px] font-semibold uppercase tracking-[0.06rem] text-primary-container mb-3"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                Evidence Base
              </p>
              <h2 className="font-serif font-semibold text-[28px] md:text-[34px] text-on-surface">
                Scientific Standards
              </h2>
            </div>
            <div className="max-w-2xl mx-auto flex flex-col gap-4">
              {herb.sources.map((source, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-surface-lowest p-6 shadow-ambient flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-full bg-primary-fixed/40 flex items-center justify-center shrink-0">
                    <BookOpen size={16} className="text-primary-container" />
                  </div>
                  <p className="text-[14px] text-on-surface-variant leading-relaxed">
                    {source}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Related Preparations ─────────────────────────────────────────── */}
      {herb.relatedRemedies.length > 0 && (
        <section className="px-6 lg:px-12 py-16 bg-surface-low">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10">
              <p
                className="text-[12px] font-semibold uppercase tracking-[0.06rem] text-primary-container mb-3"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                Continue Exploring
              </p>
              <h2 className="font-serif font-semibold text-[28px] md:text-[34px] text-on-surface">
                Related Preparations
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {herb.relatedRemedies.map((remedy) => (
                <Link
                  key={remedy.name}
                  href={`/conditions/${remedy.slug}`}
                  className="group rounded-2xl bg-surface-lowest p-7 shadow-ambient hover:shadow-ambient-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-3"
                >
                  <span
                    className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[12px] font-semibold w-fit"
                    style={{ fontFamily: "var(--font-work-sans)" }}
                  >
                    {remedy.condition}
                  </span>
                  <h3 className="font-semibold text-[18px] text-on-surface leading-snug">
                    {remedy.name}
                  </h3>
                  <span className="flex items-center gap-1.5 text-[14px] text-primary-container font-medium mt-auto pt-2 group-hover:underline">
                    View Remedy <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
