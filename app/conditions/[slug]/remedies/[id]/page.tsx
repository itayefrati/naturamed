import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, AlertTriangle, BookOpen, Clock } from 'lucide-react'
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
      <section className="bg-primary py-12 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-on-primary/60 text-[13px] mb-4 flex-wrap">
            <Link href="/" className="hover:text-on-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href={`/conditions/${slug}`} className="hover:text-on-primary transition-colors">
              {condition.name}
            </Link>
            <ChevronRight size={12} />
            <span className="text-on-primary">{remedy.name}</span>
          </nav>

          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.05rem] text-on-primary-container mb-3" style={{ fontFamily: "var(--font-work-sans)" }}>
                Remedy Preparation
              </p>
              <h1 className="font-serif font-bold text-[28px] md:text-[36px] text-on-primary leading-tight">
                {remedy.name}
              </h1>
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                {remedy.source && (
                  <p className="text-on-primary/65 text-[14px]">{remedy.source}</p>
                )}
                {remedy.prep_time && (
                  <span className="flex items-center gap-1.5 text-on-primary-container text-[13px]">
                    <Clock size={13} /> {remedy.prep_time}
                  </span>
                )}
              </div>
            </div>
            {!remedy.is_curated && (
              <span className="flex-shrink-0 text-[11px] px-3 py-1 rounded-full bg-on-primary/15 text-on-primary/80 font-medium" style={{ fontFamily: "var(--font-work-sans)" }}>
                AI Generated
              </span>
            )}
          </div>
        </div>
      </section>

      <main className="flex-1">

        {/* ── Ingredients ───────────────────────────────────────────────── */}
        {ingredients.length > 0 && (
          <section className="py-14 px-6 lg:px-12 bg-surface-low">
            <div className="max-w-[1200px] mx-auto">
              <p className="text-[12px] font-medium uppercase tracking-[0.05rem] text-primary-container mb-3" style={{ fontFamily: "var(--font-work-sans)" }}>
                What You Need
              </p>
              <h2 className="font-serif font-semibold text-[24px] text-on-surface mb-6">
                Ingredients
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {ingredients.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl bg-surface-lowest px-5 py-4 shadow-ambient"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary-container flex-shrink-0" />
                    <span className="text-[15px] text-on-surface">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Preparation Steps ─────────────────────────────────────────── */}
        {steps.length > 0 && (
          <section className="py-14 px-6 lg:px-12 bg-surface">
            <div className="max-w-[1200px] mx-auto">
              <p className="text-[12px] font-medium uppercase tracking-[0.05rem] text-primary-container mb-3" style={{ fontFamily: "var(--font-work-sans)" }}>
                Step by Step
              </p>
              <h2 className="font-serif font-semibold text-[24px] text-on-surface mb-6">
                Preparation
              </h2>
              <div className="flex flex-col gap-5 max-w-2xl">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full btn-primary flex items-center justify-center text-on-primary text-[14px] font-semibold" style={{ fontFamily: "var(--font-work-sans)" }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[15px] text-on-surface leading-relaxed pt-2">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Cautions ──────────────────────────────────────────────────── */}
        {cautions.length > 0 && (
          <section className="py-14 px-6 lg:px-12 bg-surface-low">
            <div className="max-w-[1200px] mx-auto">
              <div className="rounded-xl bg-tertiary-fixed/30 p-8 max-w-2xl">
                <div className="flex items-center gap-2.5 mb-4">
                  <AlertTriangle size={18} className="text-tertiary" />
                  <h2 className="text-[14px] font-semibold text-tertiary uppercase tracking-[0.05rem]" style={{ fontFamily: "var(--font-work-sans)" }}>
                    Cautions & Contraindications
                  </h2>
                </div>
                <ul className="flex flex-col gap-3">
                  {cautions.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[15px] text-tertiary-container leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary flex-shrink-0 mt-2" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ── Sources ───────────────────────────────────────────────────── */}
        {sources.length > 0 && (
          <section className="py-14 px-6 lg:px-12 bg-surface">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex items-center gap-2.5 mb-4">
                <BookOpen size={16} className="text-primary-fixed-dim" />
                <p className="text-[12px] font-medium uppercase tracking-[0.05rem] text-primary-container" style={{ fontFamily: "var(--font-work-sans)" }}>
                  References
                </p>
              </div>
              <ul className="flex flex-col gap-2 max-w-2xl">
                {sources.map((s, i) => (
                  <li key={i} className="text-[14px] text-on-surface-variant leading-relaxed">{s}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  )
}
