import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, AlertTriangle } from 'lucide-react'

type Cause = { id: string; label: string; description: string }
type Remedy = {
  id: string
  name: string
  ingredients: string | string[]
  steps: string | string[]
  cautions: string | string[]
  source: string
  is_curated: boolean
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
    supabase.from('remedies').select('id, name, ingredients, steps, cautions, source, is_curated').eq('condition_id', condition.id),
  ])

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <header className="bg-[#2D6A4F] px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-1.5 text-white/60 text-sm">
            <Link href="/" className="hover:text-white transition-colors">NaturaMed</Link>
            {condition.category && (
              <>
                <ChevronRight size={12} />
                <Link
                  href={`/categories/${condition.category.toLowerCase().replace(/[\s&]+/g, '-').replace(/-+/g, '-')}`}
                  className="hover:text-white transition-colors"
                >
                  {condition.category}
                </Link>
              </>
            )}
          </div>
          <h1 className="text-2xl font-bold text-white mt-2">{condition.name}</h1>
          {condition.summary && (
            <p className="text-white/75 text-sm mt-1.5 max-w-lg leading-relaxed">{condition.summary}</p>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-8">

        {/* Causes */}
        {causes && causes.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-[#6B7165] uppercase tracking-wider mb-3">
              Possible causes
            </h2>
            <div className="flex flex-col gap-2">
              {(causes as Cause[]).map((cause) => (
                <div key={cause.id} className="rounded-xl bg-[#F5F0E8] border border-[#E8E3DC] px-4 py-3.5">
                  <p className="font-semibold text-[#1B4332] text-sm">{cause.label}</p>
                  {cause.description && (
                    <p className="text-[#6B7165] text-sm mt-0.5 leading-relaxed">{cause.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Remedies */}
        <section>
          <h2 className="text-sm font-semibold text-[#6B7165] uppercase tracking-wider mb-3">
            Natural remedies
          </h2>

          {(!remedies || remedies.length === 0) && (
            <p className="text-[#6B7165] text-sm">No remedies found for this condition yet.</p>
          )}

          <div className="flex flex-col gap-3">
            {(remedies as Remedy[] | null)?.map((remedy) => {
              const cautions = toLines(remedy.cautions)
              const ingredients = toLines(remedy.ingredients)
              return (
                <Link
                  key={remedy.id}
                  href={`/conditions/${slug}/remedies/${remedy.id}`}
                  className="block rounded-xl border border-[#E8E3DC] bg-white px-5 py-4 hover:border-[#2D6A4F] hover:shadow-sm transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-[#1A1A18] text-sm">{remedy.name}</h3>
                        {!remedy.is_curated && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[#FAFAF8] border border-[#E8E3DC] text-[#6B7165]">
                            AI-generated
                          </span>
                        )}
                      </div>
                      {ingredients.length > 0 && (
                        <p className="text-xs text-[#6B7165] mt-1">
                          {ingredients.slice(0, 3).join(' · ')}
                          {ingredients.length > 3 && ` +${ingredients.length - 3} more`}
                        </p>
                      )}
                      {remedy.source && (
                        <p className="text-xs text-[#B5CCA9] mt-1">{remedy.source}</p>
                      )}
                    </div>
                    <ChevronRight size={16} className="text-[#B5CCA9] flex-shrink-0 mt-0.5 group-hover:text-[#2D6A4F] transition-colors" />
                  </div>

                  {cautions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {cautions.slice(0, 2).map((c, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200"
                        >
                          <AlertTriangle size={10} />
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        </section>

      </main>

      <footer className="py-5 px-4 text-center text-xs text-[#6B7165] border-t border-[#E8E3DC]">
        Natural remedies are not clinically tested and do not replace medical advice.
        Always consult a qualified healthcare provider.
      </footer>
    </div>
  )
}
