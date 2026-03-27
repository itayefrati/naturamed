import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, ArrowRight, Clock } from 'lucide-react'
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
      <section className="bg-primary py-14 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-on-primary/60 text-[13px] mb-6">
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

          <p
            className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-on-primary-container mb-3"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            Condition Guide
          </p>
          <h1 className="font-serif font-bold text-[36px] md:text-[48px] text-on-primary leading-tight tracking-tight">
            {condition.name}
          </h1>
          {condition.summary && (
            <p className="text-on-primary/75 text-[16px] mt-4 max-w-2xl leading-relaxed">
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
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-on-surface-variant mb-3"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                Understanding the Root
              </p>
              <h2 className="font-serif font-semibold text-[28px] md:text-[34px] text-on-surface mb-8 tracking-tight">
                Common Causes
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                {(causes as Cause[]).map((cause) => (
                  <div
                    key={cause.id}
                    className="rounded-2xl bg-surface-lowest p-6 shadow-ambient border border-outline-variant/20"
                  >
                    <h3 className="font-serif font-semibold text-[17px] text-on-surface mb-2">
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
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-on-surface-variant mb-3"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              Botanical Treatments
            </p>
            <h2 className="font-serif font-semibold text-[28px] md:text-[34px] text-on-surface mb-8 tracking-tight">
              Natural Remedies
            </h2>

            {(!remedies || remedies.length === 0) && (
              <p className="text-on-surface-variant text-[15px]">
                No remedies found for this condition yet.
              </p>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(remedies as Remedy[] | null)?.map((remedy) => {
                const ingredients = toLines(remedy.ingredients)
                return (
                  <Link
                    key={remedy.id}
                    href={`/conditions/${slug}/remedies/${remedy.id}`}
                    className="group rounded-2xl bg-surface-lowest p-6 flex flex-col gap-3 shadow-ambient border border-outline-variant/20 hover:shadow-ambient-lg hover:-translate-y-1 transition-all duration-200"
                  >
                    <h3 className="font-serif font-bold text-[20px] text-on-surface leading-snug">
                      {remedy.name}
                    </h3>

                    {ingredients.length > 0 && (
                      <p className="text-[13px] text-on-surface-variant leading-relaxed">
                        {ingredients.slice(0, 3).join(' · ')}
                        {ingredients.length > 3 && ` +${ingredients.length - 3} more`}
                      </p>
                    )}

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
