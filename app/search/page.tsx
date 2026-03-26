import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Search, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react'
import Footer from '@/app/ui/Footer'

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
    <div className="min-h-screen flex flex-col">

      {/* ── Search Header ──────────────────────────────────────────────── */}
      <section className="bg-primary py-10 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <Link href="/" className="text-on-primary/60 text-[13px] hover:text-on-primary transition-colors mb-4 inline-block">
            &larr; Back to Home
          </Link>

          <p className="text-[12px] font-medium uppercase tracking-[0.05rem] text-on-primary-container mb-3" style={{ fontFamily: "var(--font-work-sans)" }}>
            Search
          </p>

          <form method="GET" action="/search" className="flex gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search conditions, herbs, symptoms..."
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-surface-lowest text-on-surface placeholder-on-surface-variant text-[15px] focus:outline-none focus:ring-2 focus:ring-on-primary/30"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="btn-primary px-6 py-3.5 text-[15px] font-semibold rounded-xl"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <main className="flex-1 py-14 px-6 lg:px-12 bg-surface-low">
        <div className="max-w-[1200px] mx-auto">

          {error && <p className="text-error text-[14px]">Failed to load results.</p>}

          {!query && (
            <div className="text-center py-20">
              <p className="text-on-surface-variant text-[16px]">Enter a condition name to search.</p>
            </div>
          )}

          {/* ── DB Results ─────────────────────────────────────────────── */}
          {hasDbResults && (
            <>
              <p className="text-[13px] text-on-surface-variant mb-6" style={{ fontFamily: "var(--font-work-sans)" }}>
                {conditions.length} result{conditions.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {conditions.map((condition) => (
                  <Link
                    key={condition.id}
                    href={`/conditions/${condition.slug}`}
                    className="group rounded-xl bg-surface-lowest p-6 flex flex-col gap-3 shadow-ambient hover:shadow-ambient-lg hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-semibold text-on-surface text-[16px] group-hover:text-primary-container transition-colors">
                        {condition.name}
                      </h2>
                      {condition.category && (
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-medium" style={{ fontFamily: "var(--font-work-sans)" }}>
                          {condition.category}
                        </span>
                      )}
                    </div>
                    {condition.summary && (
                      <p className="text-[14px] text-on-surface-variant leading-relaxed line-clamp-2">
                        {condition.summary}
                      </p>
                    )}
                    <span className="text-[14px] text-primary-container font-medium flex items-center gap-1 mt-auto pt-1 group-hover:underline">
                      View Condition <ArrowRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* ── AI Fallback ────────────────────────────────────────────── */}
          {query && !hasDbResults && !error && (
            <>
              {aiResult && !aiResult.error ? (
                <div className="max-w-3xl">
                  <div className="flex items-center gap-2.5 mb-8 rounded-xl bg-surface-lowest px-5 py-4 shadow-ambient">
                    <Sparkles size={16} className="text-primary-fixed-dim flex-shrink-0" />
                    <p className="text-[14px] text-on-surface-variant">
                      No curated results for &ldquo;{query}&rdquo; &mdash; showing AI-generated suggestions
                    </p>
                  </div>

                  {aiResult.causes && aiResult.causes.length > 0 && (
                    <section className="mb-10">
                      <p className="text-[12px] font-medium uppercase tracking-[0.05rem] text-primary-container mb-3" style={{ fontFamily: "var(--font-work-sans)" }}>
                        Possible Causes
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {aiResult.causes.map((cause, i) => (
                          <div key={i} className="rounded-xl bg-surface-lowest p-6 shadow-ambient">
                            <h3 className="font-semibold text-on-surface text-[15px] mb-1">{cause.label}</h3>
                            {cause.description && (
                              <p className="text-[14px] text-on-surface-variant leading-relaxed">{cause.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {aiResult.remedies && aiResult.remedies.length > 0 && (
                    <section>
                      <p className="text-[12px] font-medium uppercase tracking-[0.05rem] text-primary-container mb-3" style={{ fontFamily: "var(--font-work-sans)" }}>
                        Suggested Remedies
                      </p>
                      <div className="flex flex-col gap-4">
                        {aiResult.remedies.map((remedy, i) => (
                          <div key={i} className="rounded-xl bg-surface-lowest p-6 shadow-ambient">
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              <h3 className="font-semibold text-on-surface text-[16px]">{remedy.name}</h3>
                              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-tertiary font-medium" style={{ fontFamily: "var(--font-work-sans)" }}>
                                AI Generated
                              </span>
                            </div>
                            {remedy.source && (
                              <p className="text-[13px] text-primary-fixed-dim italic mb-2">{remedy.source}</p>
                            )}
                            {remedy.ingredients?.length > 0 && (
                              <p className="text-[14px] text-on-surface-variant">
                                {remedy.ingredients.slice(0, 4).join(' · ')}
                              </p>
                            )}
                            {remedy.cautions?.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {remedy.cautions.slice(0, 2).map((c, j) => (
                                  <span key={j} className="flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-tertiary font-medium">
                                    <AlertTriangle size={10} /> {c}
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
                <div className="text-center py-20">
                  <p className="text-on-surface-variant text-[16px]">
                    No results found for &ldquo;{query}&rdquo;.
                  </p>
                  <Link href="/" className="text-primary-container font-medium text-[15px] mt-4 inline-flex items-center gap-1 hover:underline">
                    Browse Categories <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}
