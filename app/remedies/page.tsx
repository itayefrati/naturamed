import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import Footer from "@/app/ui/Footer";
import { supabase } from "@/lib/supabase";

// ─────────────────────────────────────────────────────────────────────────────

export default async function RemediesPage() {
  // ── Fetch all remedies with their conditions ────────────────────────────
  const { data: remedies } = await supabase
    .from('remedies')
    .select('id, name, condition_id, prep_time, cautions, is_curated, conditions(name, slug, category)')
    .order('name');

  const allRemedies = (remedies ?? []).map((r) => {
    const condition = r.conditions as unknown as {
      name: string;
      slug: string;
      category: string;
    } | null;

    const caution = r.cautions
      ? Array.isArray(r.cautions)
        ? (r.cautions as string[]).join(", ")
        : String(r.cautions)
      : null;

    return {
      id: String(r.id),
      name: r.name,
      condition: condition?.name ?? "General",
      category: condition?.category ?? "General",
      slug: condition?.slug ?? "",
      prep_time: r.prep_time ?? "",
      caution,
    };
  });

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-primary">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center gap-5">

          {/* Eyebrow */}
          <p
            className="text-[13px] font-medium uppercase tracking-[0.05rem] text-on-primary/70"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            The Library
          </p>

          {/* Headline */}
          <h1 className="font-serif font-bold text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.08] text-on-primary max-w-3xl tracking-tight">
            All Remedies
          </h1>

          {/* Subtitle */}
          <p className="text-[18px] text-on-primary/80 max-w-xl leading-relaxed">
            Browse our complete collection of natural remedies — from ancient
            herbal teas to modern preparations, curated from centuries of
            traditional healing wisdom.
          </p>
        </div>
      </section>

      {/* ── Remedies Grid ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12 bg-surface-low">
        <div className="max-w-[1200px] mx-auto">

          {/* Result count */}
          <p className="text-[14px] text-on-surface-variant mb-8" style={{ fontFamily: "var(--font-work-sans)" }}>
            {allRemedies.length} remedies found
          </p>

          {allRemedies.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[18px] text-on-surface-variant">
                No remedies found. Check back soon as our library grows.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allRemedies.map((remedy) => (
                <div
                  key={remedy.id}
                  className="rounded-xl bg-surface-lowest p-6 flex flex-col gap-4 shadow-ambient hover:shadow-ambient-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  {/* Category badge */}
                  <span
                    className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[12px] font-semibold w-fit"
                    style={{ fontFamily: "var(--font-work-sans)" }}
                  >
                    {remedy.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-semibold text-[18px] text-on-surface leading-snug">
                    {remedy.name}
                  </h3>

                  {/* Footer row */}
                  <div className="flex items-center justify-between pt-2 flex-1 items-end">
                    {remedy.prep_time && (
                      <span className="flex items-center gap-1.5 text-[13px] text-on-surface-variant">
                        <Clock size={13} strokeWidth={2} />
                        {remedy.prep_time}
                      </span>
                    )}
                    {remedy.caution && (
                      <span
                        className="flex items-center gap-1 text-[12px] font-semibold rounded-full px-2.5 py-0.5 bg-tertiary-fixed text-tertiary"
                        style={{ fontFamily: "var(--font-work-sans)" }}
                      >
                        {remedy.caution}
                      </span>
                    )}
                  </div>

                  {/* View Remedy link */}
                  <Link
                    href={`/conditions/${remedy.slug}/remedies/${remedy.id}`}
                    className="text-[14px] text-primary-container font-medium hover:underline flex items-center gap-1 mt-auto pt-1"
                  >
                    View Remedy <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
