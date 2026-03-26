import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, AlertTriangle, ArrowRight } from 'lucide-react'
import Footer from '@/app/ui/Footer'

type Cause = { id: string; label: string; description: string }
type Remedy = {
  id: string
  name: string
  ingredients: string | string[]
  steps: string | string[]
  cautions: string | string[]
  source: string
  is_curated: boolean
  prep_time?: string
}

function toLines(val: string | string[] | null | undefined): string[] {
  if (!val) return []
  if (Array.isArray(val)) return val.filter(Boolean)
  return val.split('\n').map((s) => s.replace(/^[-•]\s*/, '').trim()).filter(Boolean)
}

export default async function ConditionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: condition, error } = await supabase
    .from('conditions')
    .select('id, name, slug, category, summary')
    .eq('slug', slug)
    .single()

  if (error || !condition) notFound()

  const [{ data: causes }, { data: remedies }] = await Promise.all([
    supabase.from('causes').select('id, label, description').eq('condition_id', condition.id),
    supabase.from('remedies').select('id, name, ingredients, steps, cautions, source, is_curated, prep_time').eq('condition_id', condition.id),
  ])

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Hero / Header ──────────────────────────────────────────────── */}
      <section className="bg-primary py-12 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-on-primary/60 text-[13px] mb-4">
            <Link href="/" className="hover:text-on-primary transition-colors">Home</Link>
            {condition.category && (
              <>
                <ChevronRight size={12} />
                <Link
                  href={`/categories/${condition.category.toLowerCase().replace(/[\s&]+/g, '-').replace(/-+/g, '-')}`}
                  className="hover:text-on-primary transition-colors"
                >
                  {condition.category}
                </Link>
              </>
            )}
            <ChevronRight size={12} />
            <span className="text-on-primary">{condition.name}</span>
          </nav>

          <p className="text-[12px] font-medium uppercase tracking-[0.05rem] text-on-primary-container mb-3" style={{ fontFamily: "var(--font-work-sans)" }}>
            Condition Guide
          </p>
          <h1 className="font-serif font-bold text-[32px] md:text-[40px] text-on-primary leading-tight">
            {condition.name}
          </h1>
          {condition.summary && (
            <p className="text-on-primary/75 text-[16px] mt-3 max-w-2xl leading-relaxed">
              {condition.summary}
            </p>
          )}
        </div>
      </section>

      <main className="flex-1">

        {/* ── Common Causes ────────────────────────────────────────────── */}
        {causes && causes.length > 0 && (
          <section className="py-16 px-6 lg:px-12 bg-surface-low">
            <div className="max-w-[1200px] mx-auto">
              <p className="text-[12px] font-medium uppercase tracking-[0.05rem] text-primary-container mb-3" style={{ fontFamily: "var(--font-work-sans)" }}>
                Understanding the Root
              </p>
              <h2 className="font-serif font-semibold text-[24px] md:text-[30px] text-on-surface mb-8">
                Common Causes
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                {(causes as Cause[]).map((cause) => (
                  <div key={cause.id} className="rounded-xl bg-surface-lowest p-6 shadow-ambient">
                    <h3 className="font-semibold text-[16px] text-on-surface mb-2">
                      {cause.label}
                    </h3>
                    {cause.description && (
                      <p className="text-[14px] text-on-surface-variant leading-relaxed">
                        {cause.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Natural Remedies ─────────────────────────────────────────── */}
        <section className="py-16 px-6 lg:px-12 bg-surface">
          <div className="max-w-[1200px] mx-auto">
            <p className="text-[12px] font-medium uppercase tracking-[0.05rem] text-primary-container mb-3" style={{ fontFamily: "var(--font-work-sans)" }}>
              Botanical Treatments
            </p>
            <h2 className="font-serif font-semibold text-[24px] md:text-[30px] text-on-surface mb-8">
              Natural Remedies
            </h2>

            {(!remedies || remedies.length === 0) && (
              <p className="text-on-surface-variant text-[15px]">No remedies found for this condition yet.</p>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(remedies as Remedy[] | null)?.map((remedy) => {
                const cautions = toLines(remedy.cautions)
                const ingredients = toLines(remedy.ingredients)
                return (
                  <Link
                    key={remedy.id}
                    href={`/conditions/${slug}/remedies/${remedy.id}`}
                    className="group rounded-xl bg-surface-lowest p-6 flex flex-col gap-4 shadow-ambient hover:shadow-ambient-lg hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-[16px] text-on-surface leading-snug">
                        {remedy.name}
                      </h3>
                      {!remedy.is_curated && (
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-tertiary font-medium" style={{ fontFamily: "var(--font-work-sans)" }}>
                          AI Generated
                        </span>
                      )}
                    </div>

                    {ingredients.length > 0 && (
                      <p className="text-[13px] text-on-surface-variant leading-relaxed">
                        {ingredients.slice(0, 3).join(' · ')}
                        {ingredients.length > 3 && ` +${ingredients.length - 3} more`}
                      </p>
                    )}

                    {remedy.source && (
                      <p className="text-[12px] text-primary-fixed-dim italic">{remedy.source}</p>
                    )}

                    {cautions.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {cautions.slice(0, 2).map((c, i) => (
                          <span
                            key={i}
                            className="flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-tertiary font-medium"
                          >
                            <AlertTriangle size={10} />
                            {c}
                          </span>
                        ))}
                      </div>
                    )}

                    <span className="text-[14px] text-primary-container font-medium flex items-center gap-1 mt-auto pt-2 group-hover:underline">
                      View Remedy <ArrowRight size={14} />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
