import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Search, ChevronRight, AlertTriangle, Sparkles } from 'lucide-react'

type AiRemedy = {
  name: string
  ingredients: string[]
  steps: string[]
  cautions: string[]
  source: string
}

type AiResult = {
  causes?: { label: string; description: string }[]
  remedies?: AiRemedy[]
  ai_generated: true
  error?: string
}

async function getAiResults(query: string): Promise<AiResult | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey || apiKey === 'your_anthropic_api_key') return null
  try {
    const base = `http://localhost:${process.env.PORT ?? 3000}`
    const res = await fetch(`${base}/api/ai-healer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ condition: query }),
      cache: 'no-store',
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = q?.trim() ?? ''

  const { data: conditions, error } = query
    ? await supabase
        .from('conditions')
        .select('id, name, slug, category, summary')
        .ilike('name', `%${query}%`)
        .order('name')
    : { data: [], error: null }

  const hasDbResults = !!conditions && conditions.length > 0
  const aiResult = query && !hasDbResults ? await getAiResults(query) : null

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Search header */}
      <header className="bg-[#2D6A4F] py-5 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-white/60 text-sm hover:text-white transition-colors mb-3 inline-block">
            ← NaturaMed
          </Link>
          <form method="GET" action="/search" className="flex gap-2">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7165] pointer-events-none" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search conditions…"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white text-[#1A1A18] placeholder-[#6B7165] text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#40916C] text-white text-sm font-semibold rounded-lg hover:bg-[#2D6A4F] transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {error && <p className="text-red-600 text-sm">Failed to load results.</p>}

        {!query && (
          <p className="text-[#6B7165] text-center mt-16 text-sm">Enter a condition name to search.</p>
        )}

        {/* DB results */}
        {hasDbResults && (
          <>
            <p className="text-xs text-[#6B7165] mb-5">
              {conditions.length} result{conditions.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>
            <div className="flex flex-col gap-2">
              {conditions.map((condition) => (
                <Link
                  key={condition.id}
                  href={`/conditions/${condition.slug}`}
                  className="flex items-center justify-between gap-4 rounded-xl border border-[#E8E3DC] bg-white px-5 py-4 hover:border-[#2D6A4F] hover:shadow-sm transition-all group"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-semibold text-[#1A1A18] text-sm">{condition.name}</h2>
                      {condition.category && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#D8F3DC] text-[#1B4332] font-medium">
                          {condition.category}
                        </span>
                      )}
                    </div>
                    {condition.summary && (
                      <p className="text-xs text-[#6B7165] mt-1 line-clamp-1">{condition.summary}</p>
                    )}
                  </div>
                  <ChevronRight size={15} className="text-[#B5CCA9] flex-shrink-0 group-hover:text-[#2D6A4F] transition-colors" />
                </Link>
              ))}
            </div>
          </>
        )}

        {/* AI fallback */}
        {query && !hasDbResults && !error && (
          <>
            {aiResult && !aiResult.error ? (
              <div>
                <div className="flex items-center gap-2 mb-6 px-4 py-3 rounded-xl bg-white border border-[#E8E3DC]">
                  <Sparkles size={14} className="text-[#B5CCA9] flex-shrink-0" />
                  <p className="text-xs text-[#6B7165]">
                    No curated results for &ldquo;{query}&rdquo; &mdash; showing AI-generated suggestions
                  </p>
                </div>

                {aiResult.causes && aiResult.causes.length > 0 && (
                  <section className="mb-6">
                    <h2 className="text-xs font-semibold text-[#6B7165] uppercase tracking-wider mb-3">Possible causes</h2>
                    <div className="flex flex-col gap-2">
                      {aiResult.causes.map((cause, i) => (
                        <div key={i} className="rounded-xl bg-[#F5F0E8] border border-[#E8E3DC] px-4 py-3.5">
                          <p className="font-semibold text-[#1B4332] text-sm">{cause.label}</p>
                          {cause.description && (
                            <p className="text-[#6B7165] text-sm mt-0.5">{cause.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {aiResult.remedies && aiResult.remedies.length > 0 && (
                  <section>
                    <h2 className="text-xs font-semibold text-[#6B7165] uppercase tracking-wider mb-3">Suggested remedies</h2>
                    <div className="flex flex-col gap-3">
                      {aiResult.remedies.map((remedy, i) => (
                        <div key={i} className="rounded-xl border border-[#E8E3DC] bg-white px-5 py-4">
                          <p className="font-semibold text-[#1A1A18] text-sm">{remedy.name}</p>
                          {remedy.source && (
                            <p className="text-xs text-[#B5CCA9] mt-0.5">{remedy.source}</p>
                          )}
                          {remedy.ingredients?.length > 0 && (
                            <p className="text-xs text-[#6B7165] mt-2">
                              {remedy.ingredients.slice(0, 3).join(' · ')}
                            </p>
                          )}
                          {remedy.cautions?.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {remedy.cautions.slice(0, 2).map((c, j) => (
                                <span key={j} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                                  <AlertTriangle size={9} /> {c}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            ) : (
              <p className="text-[#6B7165] text-sm text-center mt-16">
                No results found for &ldquo;{query}&rdquo;.
              </p>
            )}
          </>
        )}
      </main>
    </div>
  )
}
