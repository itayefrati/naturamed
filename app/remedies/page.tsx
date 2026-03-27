import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import Footer from "@/app/ui/Footer";
import { supabase } from "@/lib/supabase";

// ─────────────────────────────────────────────────────────────────────────────

export default async function RemediesPage() {
  const { data: remedies } = await supabase
    .from("remedies")
    .select("id, name, condition_id, prep_time, is_curated, conditions(name, slug, category)")
    .order("name");

  const allRemedies = (remedies ?? []).map((r) => {
    const condition = r.conditions as unknown as {
      name: string;
      slug: string;
      category: string;
    } | null;

    return {
      id: String(r.id),
      name: r.name,
      condition: condition?.name ?? "General",
      category: condition?.category ?? "General",
      slug: condition?.slug ?? "",
      prep_time: r.prep_time ?? "",
      is_curated: r.is_curated,
    };
  });

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-surface">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center gap-5">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.1rem] text-on-surface-variant"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            The Library
          </p>
          <h1 className="font-serif font-bold text-[44px] sm:text-[58px] lg:text-[68px] leading-[1.04] text-on-surface tracking-tight">
            All Remedies
          </h1>
          <p className="text-[17px] text-on-surface-variant max-w-xl leading-relaxed">
            Browse our complete collection of natural remedies — from ancient
            herbal teas to modern preparations, curated from centuries of
            traditional healing wisdom.
          </p>
        </div>
      </section>

      {/* ── Remedies Grid ─────────────────────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-12 bg-surface-low flex-1">
        <div className="max-w-[1200px] mx-auto">

          <p
            className="text-[13px] text-on-surface-variant mb-8"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            {allRemedies.length} remedies found
          </p>

          {allRemedies.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[17px] text-on-surface-variant">
                No remedies found. Check back soon as our library grows.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allRemedies.map((remedy) => (
                <Link
                  key={remedy.id}
                  href={`/conditions/${remedy.slug}/remedies/${remedy.id}`}
                  className="group rounded-2xl bg-surface-lowest p-6 flex flex-col gap-3 shadow-ambient border border-outline-variant/20 hover:shadow-ambient-lg hover:-translate-y-1 transition-all duration-200"
                >
                  {/* Category label */}
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.06rem] text-primary-container"
                    style={{ fontFamily: "var(--font-work-sans)" }}
                  >
                    {remedy.category}
                  </p>

                  {/* Title */}
                  <h3 className="font-serif font-bold text-[20px] text-on-surface leading-snug">
                    {remedy.name}
                  </h3>

                  {/* Condition */}
                  <p className="text-[13px] text-on-surface-variant">
                    {remedy.condition}
                  </p>

                  {/* Footer row */}
                  <div className="flex items-center justify-between mt-auto pt-3">
                    {remedy.prep_time ? (
                      <span className="flex items-center gap-1.5 text-[13px] text-on-surface-variant">
                        <Clock size={13} strokeWidth={1.5} />
                        {remedy.prep_time}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="flex items-center gap-1 text-[13px] font-semibold text-primary-container group-hover:underline">
                      View Remedy <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
