import Link from "next/link";
import { ArrowRight, Clock, AlertTriangle, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Footer from "@/app/ui/Footer";
import HeroText from "@/app/ui/motion/HeroText";
import { StaggerContainer, StaggerItem } from "@/app/ui/motion/StaggerContainer";
import CardHover from "@/app/ui/motion/CardHover";
import ScrollReveal from "@/app/ui/motion/ScrollReveal";

function toLines(val: string | string[] | null | undefined): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val.filter(Boolean);
  return val.split("\n").map((s) => s.replace(/^[-•]\s*/, "").trim()).filter(Boolean);
}

export default async function SymptomResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ symptoms?: string }>;
}) {
  const { symptoms: rawSymptoms } = await searchParams;
  const symptomLabels = rawSymptoms
    ? rawSymptoms.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  if (symptomLabels.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-6">
        <p className="text-on-surface-variant text-[16px] mb-4">No symptoms provided.</p>
        <Link href="/symptoms" className="text-primary-container font-medium hover:underline flex items-center gap-1">
          Back to Symptom Checker <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  // ── Look up symptom IDs ────────────────────────────────────────────────────
  const { data: foundSymptoms } = await supabase
    .from("symptoms")
    .select("id, label")
    .in("label", symptomLabels);

  const symptomIds = (foundSymptoms ?? []).map((s) => s.id);

  // ── Fetch matched remedies (via symptom_remedies junction) ─────────────────
  const [{ data: srData }, { data: shData }] = await Promise.all([
    symptomIds.length > 0
      ? supabase
          .from("symptom_remedies")
          .select("remedy_id, symptom_id, remedies(id, name, prep_time, cautions, source, is_curated, condition_id, conditions(name, slug))")
          .in("symptom_id", symptomIds)
      : Promise.resolve({ data: [] }),
    symptomIds.length > 0
      ? supabase
          .from("symptom_herbs")
          .select("herb_id, symptom_id, herbs(id, name, slug, medicinal_properties)")
          .in("symptom_id", symptomIds)
      : Promise.resolve({ data: [] }),
  ]);

  // Deduplicate and score remedies by how many symptoms they match
  const remedyScores: Record<string, { count: number; data: Record<string, unknown> }> = {};
  for (const row of srData ?? []) {
    const r = row.remedies as unknown as Record<string, unknown> | null;
    if (!r) continue;
    const id = String(r.id);
    if (!remedyScores[id]) remedyScores[id] = { count: 0, data: r };
    remedyScores[id].count++;
  }
  const rankedRemedies = Object.values(remedyScores)
    .sort((a, b) => b.count - a.count)
    .map(({ data }) => data);

  // Deduplicate herbs
  const herbSeen = new Set<string>();
  const matchedHerbs: Record<string, unknown>[] = [];
  for (const row of shData ?? []) {
    const h = row.herbs as unknown as Record<string, unknown> | null;
    if (!h) continue;
    const id = String(h.id);
    if (!herbSeen.has(id)) {
      herbSeen.add(id);
      matchedHerbs.push(h);
    }
  }

  const hasResults = rankedRemedies.length > 0 || matchedHerbs.length > 0;

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Results Header ─────────────────────────────────────────────────── */}
      <section className="py-12 px-6 lg:px-12 bg-primary">
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex items-center gap-1.5 text-on-primary/60 text-[13px] mb-4">
            <Link href="/symptoms" className="hover:text-on-primary transition-colors">Symptom Checker</Link>
            <ChevronRight size={12} />
            <span className="text-on-primary">Results</span>
          </nav>

          <HeroText delay={0.05}>
            <p className="text-[12px] font-medium uppercase tracking-[0.05rem] text-on-primary-container mb-3" style={{ fontFamily: "var(--font-work-sans)" }}>
              Botanical Assessment Results
            </p>
            <h1 className="font-serif font-bold text-[28px] md:text-[36px] text-on-primary leading-tight mb-3">
              Remedies for Your Symptoms
            </h1>
          </HeroText>

          {/* Symptom tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {symptomLabels.map((s) => (
              <span key={s} className="px-3 py-1 rounded-full bg-on-primary/15 text-on-primary text-[13px] font-medium" style={{ fontFamily: "var(--font-work-sans)" }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="flex-1">

        {!hasResults && (
          <section className="py-20 px-6 lg:px-12 bg-surface-low">
            <div className="max-w-[1200px] mx-auto text-center">
              <p className="text-on-surface-variant text-[16px] mb-6">
                No specific matches found for your symptoms. Try our general search.
              </p>
              <Link
                href={`/search?q=${encodeURIComponent(symptomLabels.join(" "))}`}
                className="inline-flex items-center gap-2 btn-primary px-7 py-3.5 rounded-xl text-[15px] font-semibold"
              >
                Search the Library <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        )}

        {/* ── Matched Remedies ───────────────────────────────────────────────── */}
        {rankedRemedies.length > 0 && (
          <section className="py-16 px-6 lg:px-12 bg-surface-low">
            <div className="max-w-[1200px] mx-auto">
              <ScrollReveal className="mb-8">
                <p className="text-[12px] font-medium uppercase tracking-[0.05rem] text-primary-container mb-3" style={{ fontFamily: "var(--font-work-sans)" }}>
                  Recommended Preparations
                </p>
                <h2 className="font-serif font-semibold text-[24px] md:text-[30px] text-on-surface">
                  {rankedRemedies.length} Matched {rankedRemedies.length === 1 ? "Remedy" : "Remedies"}
                </h2>
              </ScrollReveal>

              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rankedRemedies.map((remedy) => {
                  const condition = remedy.conditions as { name: string; slug: string } | null;
                  const cautions = toLines(remedy.cautions as string | string[]);
                  return (
                    <StaggerItem key={String(remedy.id)}>
                      <CardHover className="h-full">
                        <div className="rounded-xl bg-surface-lowest p-6 flex flex-col gap-4 shadow-ambient h-full">
                          {condition && (
                            <span className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[12px] font-semibold w-fit" style={{ fontFamily: "var(--font-work-sans)" }}>
                              {condition.name}
                            </span>
                          )}
                          <h3 className="font-semibold text-[16px] text-on-surface leading-snug">
                            {String(remedy.name)}
                          </h3>
                          {!!remedy.source && (
                            <p className="text-[13px] text-primary-fixed-dim italic">{String(remedy.source)}</p>
                          )}
                          <div className="flex items-center justify-between pt-1">
                            {!!remedy.prep_time && (
                              <span className="flex items-center gap-1.5 text-[13px] text-on-surface-variant">
                                <Clock size={13} /> {String(remedy.prep_time)}
                              </span>
                            )}
                            {cautions.length > 0 && (
                              <span className="flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-tertiary font-medium">
                                <AlertTriangle size={10} /> {cautions[0]}
                              </span>
                            )}
                          </div>
                          {condition && (
                            <Link
                              href={`/conditions/${condition.slug}/remedies/${String(remedy.id)}`}
                              className="text-[14px] text-primary-container font-medium hover:underline flex items-center gap-1 mt-auto pt-1"
                            >
                              View Preparation <ArrowRight size={14} />
                            </Link>
                          )}
                        </div>
                      </CardHover>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </section>
        )}

        {/* ── Related Herbs ──────────────────────────────────────────────────── */}
        {matchedHerbs.length > 0 && (
          <section className="py-16 px-6 lg:px-12 bg-surface">
            <div className="max-w-[1200px] mx-auto">
              <ScrollReveal className="mb-8" delay={0.05}>
                <p className="text-[12px] font-medium uppercase tracking-[0.05rem] text-primary-container mb-3" style={{ fontFamily: "var(--font-work-sans)" }}>
                  Botanical Allies
                </p>
                <h2 className="font-serif font-semibold text-[24px] md:text-[30px] text-on-surface">
                  Herbs That May Help
                </h2>
              </ScrollReveal>

              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-5" delay={0.1}>
                {matchedHerbs.map((herb) => {
                  const props = (herb.medicinal_properties as string[]) ?? [];
                  return (
                    <StaggerItem key={String(herb.id)}>
                      <CardHover className="h-full">
                        <Link
                          href={`/herbs/${String(herb.slug)}`}
                          className="group rounded-xl bg-surface-lowest p-5 flex flex-col gap-3 shadow-ambient h-full"
                        >
                          <h3 className="font-semibold text-[16px] text-on-surface group-hover:text-primary-container transition-colors">
                            {String(herb.name)}
                          </h3>
                          <div className="flex flex-wrap gap-1.5">
                            {props.slice(0, 2).map((p) => (
                              <span key={p} className="text-[11px] px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-medium" style={{ fontFamily: "var(--font-work-sans)" }}>
                                {p}
                              </span>
                            ))}
                          </div>
                          <span className="text-[13px] text-primary-container font-medium flex items-center gap-1 mt-auto group-hover:underline">
                            View Herb <ArrowRight size={13} />
                          </span>
                        </Link>
                      </CardHover>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </section>
        )}

        {/* Try different symptoms link */}
        <section className="py-10 px-6 lg:px-12 bg-surface-low">
          <div className="max-w-[1200px] mx-auto flex justify-center">
            <Link
              href="/symptoms"
              className="text-[15px] text-on-surface-variant hover:text-primary-container transition-colors flex items-center gap-1.5"
            >
              ← Try different symptoms
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
