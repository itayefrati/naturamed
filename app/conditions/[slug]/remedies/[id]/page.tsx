import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, ShieldAlert, BookOpen, Clock } from 'lucide-react'
import Footer from '@/app/ui/Footer'

function toLines(val: string | string[] | null | undefined): string[] {
  if (!val) return []
  if (Array.isArray(val)) return val.filter(Boolean)
  return val.split('\n').map((s) => s.replace(/^[-•\d.]\s*/, '').trim()).filter(Boolean)
}

export default async function RemedyDetailPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>
}) {
  const { slug, id } = await params

  const [{ data: condition }, { data: remedy }] = await Promise.all([
    supabase.from('conditions').select('id, name, slug').eq('slug', slug).single(),
    supabase.from('remedies').select('*').eq('id', id).single(),
  ])

  if (!condition || !remedy) notFound()

  const ingredients = toLines(remedy.ingredients)
  const steps = toLines(remedy.steps)
  const cautions = toLines(remedy.cautions)
  const sources: string[] = remedy.sources
    ? Array.isArray(remedy.sources) ? remedy.sources : [remedy.sources]
    : remedy.source ? [remedy.source] : []

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Hero / Header ──────────────────────────────────────────────── */}
      <section className="bg-primary py-14 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-on-primary/60 text-[13px] mb-6 flex-wrap">
            <Link href="/" className="hover:text-on-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href={`/conditions/${slug}`} className="hover:text-on-primary transition-colors">
              {condition.name}
            </Link>
            <ChevronRight size={12} />
            <span className="text-on-primary">{remedy.name}</span>
          </nav>

          <p
            className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-on-primary-container mb-3"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            Remedy Preparation
          </p>
          <h1 className="font-serif font-bold text-[36px] md:text-[48px] text-on-primary leading-tight tracking-tight">
            {remedy.name}
          </h1>

          <div className="flex items-center gap-5 mt-4 flex-wrap">
            {remedy.prep_time && (
              <span className="flex items-center gap-1.5 text-on-primary/70 text-[14px]">
                <Clock size={14} strokeWidth={1.5} />
                {remedy.prep_time}
              </span>
            )}
            {remedy.source && (
              <p className="text-on-primary/60 text-[14px] italic">{remedy.source}</p>
            )}
          </div>
        </div>
      </section>

      <main className="flex-1">

        {/* ── Ingredients ───────────────────────────────────────────────── */}
        {ingredients.length > 0 && (
          <section className="py-16 px-6 lg:px-12 bg-surface-low">
            <div className="max-w-[1200px] mx-auto">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-on-surface-variant mb-3"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                What You Need
              </p>
              <h2 className="font-serif font-semibold text-[28px] md:text-[34px] text-on-surface mb-8 tracking-tight">
                Ingredients
              </h2>
              <div className="grid sm:grid-cols-2 gap-3 max-w-3xl">
                {ingredients.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-2xl bg-surface-lowest px-5 py-4 shadow-ambient border border-outline-variant/20"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary-container flex-shrink-0 mt-1.5" />
                    <span className="text-[15px] text-on-surface leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Preparation Steps ─────────────────────────────────────────── */}
        {steps.length > 0 && (
          <section className="py-16 px-6 lg:px-12 bg-surface">
            <div className="max-w-[1200px] mx-auto">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-on-surface-variant mb-3"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                Step by Step
              </p>
              <h2 className="font-serif font-semibold text-[28px] md:text-[34px] text-on-surface mb-10 tracking-tight">
                Preparation
              </h2>
              <div className="flex flex-col gap-6 max-w-2xl">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <span
                      className="flex-shrink-0 w-10 h-10 rounded-full btn-primary flex items-center justify-center text-on-primary text-[13px] font-semibold"
                      style={{ fontFamily: "var(--font-work-sans)" }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="pt-2 flex-1">
                      <p className="text-[15px] text-on-surface leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Cautions ──────────────────────────────────────────────────── */}
        {cautions.length > 0 && (
          <section className="py-16 px-6 lg:px-12 bg-surface-low">
            <div className="max-w-[1200px] mx-auto">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-on-surface-variant mb-3"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                Safety Information
              </p>
              <h2 className="font-serif font-semibold text-[28px] md:text-[34px] text-on-surface mb-8 tracking-tight">
                Cautions & Contraindications
              </h2>
              <div className="rounded-2xl bg-surface-lowest p-8 shadow-ambient border border-outline-variant/30 max-w-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldAlert size={20} strokeWidth={1.5} className="text-primary-container" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="font-semibold text-[15px] text-on-surface">
                      Please note the following before use
                    </p>
                    <ul className="flex flex-col gap-2.5">
                      {cautions.map((c, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-[15px] text-on-surface-variant leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-container flex-shrink-0 mt-2" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Sources ───────────────────────────────────────────────────── */}
        {sources.length > 0 && (
          <section className="py-16 px-6 lg:px-12 bg-surface">
            <div className="max-w-[1200px] mx-auto">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-on-surface-variant mb-3"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                Evidence Base
              </p>
              <h2 className="font-serif font-semibold text-[28px] md:text-[34px] text-on-surface mb-8 tracking-tight">
                References
              </h2>
              <div className="flex flex-col gap-4 max-w-2xl">
                {sources.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-surface-lowest p-6 shadow-ambient border border-outline-variant/20 flex items-start gap-4"
                  >
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <BookOpen size={16} strokeWidth={1.5} className="text-primary-container" />
                    </div>
                    <p className="text-[14px] text-on-surface-variant leading-relaxed">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  )
}
