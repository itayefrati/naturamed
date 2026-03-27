import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import SearchBar from "@/app/ui/SearchBar";
import CategoryGrid from "@/app/ui/CategoryGrid";
import Footer from "@/app/ui/Footer";
import { supabase } from "@/lib/supabase";

// ─── Fallback data ────────────────────────────────────────────────────────────

const FALLBACK_HERB_OF_DAY = {
  name: "Turmeric",
  latinName: "Curcuma longa",
  property: "Anti-inflammatory · Antioxidant · Digestive aid",
  slug: "turmeric",
};

const FALLBACK_HEALTH_TIP =
  "Start your morning with warm lemon water to stimulate digestion, alkalize the body, and gently detox the liver — a practice used for centuries in Ayurvedic tradition.";

const FALLBACK_FEATURED_REMEDIES = [
  {
    id: "1",
    name: "Ginger & Honey Tea",
    condition: "Sore Throat",
    description:
      "A time-tested remedy combining anti-bacterial honey and anti-inflammatory ginger to soothe throat irritation and speed recovery.",
    prep_time: "10 min",
    slug: "sore-throat",
    photo: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80&fit=crop",
  },
  {
    id: "2",
    name: "Chamomile & Lavender Sleep Tonic",
    condition: "Insomnia",
    description:
      "Calm the nervous system and prepare the body for deep, restorative sleep with this gentle herbal blend used across traditional medicine systems.",
    prep_time: "5 min",
    slug: "insomnia",
    photo: "https://images.unsplash.com/photo-1471943311424-646960669fbc?w=800&q=80&fit=crop",
  },
  {
    id: "3",
    name: "Elderberry Immune Syrup",
    condition: "Fever & Immune",
    description:
      "A concentrated elderberry preparation rich in anthocyanins and antioxidants — used for centuries to shorten the duration of colds and boost immune resilience.",
    prep_time: "20 min",
    slug: "fever-immune",
    photo: "https://images.unsplash.com/photo-1559181567-c3190bdc3bcc?w=800&q=80&fit=crop",
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

export default async function Home() {
  const { data: herbOfDay } = await supabase
    .from("herbs")
    .select("name, slug, medicinal_properties, latin_name")
    .eq("herb_of_day", true)
    .limit(1)
    .single();

  const HERB_OF_DAY = herbOfDay
    ? {
        name: herbOfDay.name,
        latinName: (herbOfDay as Record<string, unknown>).latin_name as string || "",
        property: (herbOfDay.medicinal_properties as string[]).join(" · "),
        slug: herbOfDay.slug,
      }
    : FALLBACK_HERB_OF_DAY;

  const { data: dailyTip } = await supabase
    .from("daily_tips")
    .select("content")
    .limit(1)
    .single();

  const HEALTH_TIP = dailyTip?.content || FALLBACK_HEALTH_TIP;

  const { data: featuredRemedies } = await supabase
    .from("remedies")
    .select("id, name, condition_id, prep_time, is_curated, conditions(name, slug)")
    .eq("is_curated", true)
    .limit(3);

  const FEATURED_REMEDIES =
    featuredRemedies && featuredRemedies.length > 0
      ? featuredRemedies.map((r, i) => {
          const condition = r.conditions as unknown as { name: string; slug: string } | null;
          return {
            id: String(r.id),
            name: r.name,
            condition: condition?.name ?? "General",
            description: FALLBACK_FEATURED_REMEDIES[i]?.description ?? "",
            prep_time: r.prep_time ?? "",
            slug: condition?.slug ?? "",
            photo: FALLBACK_FEATURED_REMEDIES[i]?.photo ?? FALLBACK_FEATURED_REMEDIES[0].photo,
          };
        })
      : FALLBACK_FEATURED_REMEDIES;

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-12 bg-surface">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center gap-8">

          <p
            className="text-[11px] font-semibold uppercase tracking-[0.1rem] text-on-surface-variant"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            Natural &middot; Ancestral &middot; Trustworthy
          </p>

          <h1 className="font-serif font-bold text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.04] text-on-surface max-w-4xl tracking-tight">
            Healing Knowledge,<br /> Rediscovered.
          </h1>

          <p className="font-serif italic text-[19px] md:text-[22px] text-on-surface-variant max-w-2xl leading-relaxed">
            &ldquo;Because there is no disease in this world that God
            hasn&apos;t made a cure for.&rdquo;
          </p>

          <div className="w-full max-w-2xl">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* ── Herb of the Day + Daily Tip ──────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-12 bg-surface-low">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-6">

          {/* Herb of the Day */}
          <div className="rounded-2xl bg-surface-lowest p-8 flex flex-col gap-4 shadow-ambient border border-outline-variant/30">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-primary-container"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              Herb of the Day
            </p>
            <div>
              <h3 className="font-serif font-bold text-[32px] text-on-surface leading-tight">
                {HERB_OF_DAY.name}
              </h3>
              {HERB_OF_DAY.latinName && (
                <p className="font-serif italic text-[15px] text-on-surface-variant mt-1">
                  {HERB_OF_DAY.latinName}
                </p>
              )}
            </div>
            <p className="text-[15px] text-on-surface-variant leading-relaxed flex-1">
              {HERB_OF_DAY.property}
            </p>
            <Link
              href={`/herbs/${HERB_OF_DAY.slug}`}
              className="flex items-center gap-1.5 text-[14px] font-semibold text-primary-container hover:underline mt-2"
            >
              View monograph <ArrowRight size={14} />
            </Link>
          </div>

          {/* Daily Wellness Tip */}
          <div className="rounded-2xl bg-surface-lowest p-8 flex flex-col gap-4 shadow-ambient border border-outline-variant/30">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-primary-container"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              Daily Wellness Tip
            </p>
            <p className="font-serif text-[19px] text-on-surface leading-[1.65] flex-1">
              {HEALTH_TIP}
            </p>
          </div>

        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────────────────── */}
      <section id="categories" className="py-20 px-6 lg:px-12 bg-surface">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-on-surface-variant mb-3"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              Browse by Category
            </p>
            <h2 className="font-serif font-bold text-[32px] md:text-[42px] text-on-surface tracking-tight">
              What are you looking for?
            </h2>
          </div>
          <CategoryGrid />
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12 bg-surface-low">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-14">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-on-surface-variant mb-3"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              Simple Process
            </p>
            <h2 className="font-serif font-bold text-[32px] md:text-[42px] text-on-surface tracking-tight">
              Ancestral Wisdom, Modern Access
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {HOW_IT_WORKS.map(({ step, title, description }) => (
              <div key={step} className="flex flex-col gap-5">
                <div className="w-12 h-12 rounded-full btn-primary flex items-center justify-center shrink-0">
                  <span
                    className="text-on-primary text-[14px] font-semibold"
                    style={{ fontFamily: "var(--font-work-sans)" }}
                  >
                    {step}
                  </span>
                </div>
                <h3 className="font-serif font-semibold text-[20px] text-on-surface">
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

      {/* ── Popular Remedies ─────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12 bg-surface">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-on-surface-variant mb-3"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              Popular Remedies
            </p>
            <h2 className="font-serif font-bold text-[32px] md:text-[42px] text-on-surface tracking-tight">
              Featured Preparations
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURED_REMEDIES.map((remedy) => (
              <div
                key={remedy.id}
                className="rounded-2xl bg-surface-lowest overflow-hidden flex flex-col shadow-ambient hover:shadow-ambient-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Botanical photograph */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={remedy.photo}
                    alt={remedy.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="p-6 flex flex-col gap-3 flex-1">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.06rem] text-primary-container"
                    style={{ fontFamily: "var(--font-work-sans)" }}
                  >
                    {remedy.condition}
                  </span>

                  <h3 className="font-serif font-bold text-[21px] text-on-surface leading-snug">
                    {remedy.name}
                  </h3>

                  <p className="text-[14px] text-on-surface-variant leading-relaxed line-clamp-3 flex-1">
                    {remedy.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 mt-auto">
                    <span className="flex items-center gap-1.5 text-[13px] text-on-surface-variant">
                      <Clock size={13} strokeWidth={2} />
                      {remedy.prep_time}
                    </span>
                    <Link
                      href={`/conditions/${remedy.slug}`}
                      className="flex items-center gap-1 text-[13px] font-semibold text-primary-container hover:underline"
                    >
                      Read Protocol <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <Footer />

    </div>
  );
}
