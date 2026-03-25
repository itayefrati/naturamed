import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, AlertTriangle, BookOpen } from 'lucide-react'

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
    <div className="min-h-screen bg-[#FAFAF8]">
      <header className="bg-[#2D6A4F] px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-1.5 text-white/60 text-sm">
            <Link href="/" className="hover:text-white transition-colors">NaturaMed</Link>
            <ChevronRight size={12} />
            <Link href={`/conditions/${slug}`} className="hover:text-white transition-colors">
              {condition.name}
            </Link>
          </div>
          <div className="flex items-start gap-3 mt-2">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white leading-tight">{remedy.name}</h1>
              {remedy.source && (
                <p className="text-white/65 text-sm mt-1">{remedy.source}</p>
              )}
            </div>
            {!remedy.is_curated && (
              <span className="flex-shrink-0 text-xs px-2.5 py-1 rounded-full bg-white/15 text-white/80">
                AI-generated
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-7">

        {/* Ingredients */}
        {ingredients.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold text-[#6B7165] uppercase tracking-wider mb-3">Ingredients</h2>
            <div className="rounded-xl border border-[#E8E3DC] bg-white overflow-hidden">
              {ingredients.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 px-4 py-3 text-sm text-[#1A1A18] ${
                    i < ingredients.length - 1 ? 'border-b border-[#E8E3DC]' : ''
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] flex-shrink-0 mt-1.5" />
                  {item}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Steps */}
        {steps.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold text-[#6B7165] uppercase tracking-wider mb-3">Preparation</h2>
            <div className="flex flex-col gap-3">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2D6A4F] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-[#1A1A18] leading-relaxed pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Cautions */}
        {cautions.length > 0 && (
          <section className="rounded-xl bg-amber-50 border border-amber-200 px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={14} className="text-amber-600" />
              <h2 className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Cautions & Contraindications</h2>
            </div>
            <ul className="flex flex-col gap-2">
              {cautions.map((c, i) => (
                <li key={i} className="text-sm text-amber-800 leading-relaxed">
                  · {c}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Sources */}
        {sources.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={13} className="text-[#B5CCA9]" />
              <h2 className="text-xs font-semibold text-[#6B7165] uppercase tracking-wider">Sources</h2>
            </div>
            <ul className="flex flex-col gap-1">
              {sources.map((s, i) => (
                <li key={i} className="text-sm text-[#6B7165]">{s}</li>
              ))}
            </ul>
          </section>
        )}

      </main>

      <footer className="py-5 px-4 text-center text-xs text-[#6B7165] border-t border-[#E8E3DC]">
        This remedy is not clinically tested and does not replace professional medical advice.
        Always consult a qualified healthcare provider before starting any new health practice.
      </footer>
    </div>
  )
}
