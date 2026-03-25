import { supabase } from '@/lib/supabase'
import { CATEGORY_MAP } from '@/lib/categories'
import { CATEGORIES } from '@/app/ui/CategoryGrid'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category: slug } = await params
  const meta = CATEGORY_MAP[slug]
  if (!meta) notFound()

  const catDef = CATEGORIES.find((c) => c.slug === slug)

  const { data: conditions, error } = await supabase
    .from('conditions')
    .select('id, name, slug, summary')
    .ilike('category', meta.dbValue)
    .order('name')

  return (
    <div className="min-h-screen bg-off-white">
      <header className="bg-green-primary px-6 lg:px-12 py-6">
        <div className="max-w-[1200px] mx-auto">
          <Link href="/" className="text-white/60 text-sm hover:text-white transition-colors font-sans">
            ← NaturaMed
          </Link>
          <div className="flex items-center gap-3 mt-3">
            {catDef?.emoji && (
              <span className="text-3xl" role="img" aria-label={meta.label}>
                {catDef.emoji}
              </span>
            )}
            <div>
              <h1 className="font-serif text-[24px] font-semibold text-white leading-tight">{meta.label}</h1>
              {catDef?.description && (
                <p className="text-white/70 text-[14px] font-sans mt-0.5">{catDef.description}</p>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 lg:px-12 py-10">
        {error && <p className="text-red-600 text-sm font-sans">Failed to load conditions.</p>}

        {!error && conditions?.length === 0 && (
          <p className="text-muted text-center mt-16 font-sans">No conditions found in this category yet.</p>
        )}

        {conditions && conditions.length > 0 && (
          <p className="text-[13px] text-muted font-sans mb-5">
            {conditions.length} condition{conditions.length !== 1 ? 's' : ''}
          </p>
        )}

        <div className="flex flex-col gap-2">
          {conditions?.map((condition) => (
            <Link
              key={condition.id}
              href={`/conditions/${condition.slug}`}
              className="flex items-center justify-between gap-4 rounded-xl border border-[#E8F3EB] bg-white px-5 py-4 hover:border-green-primary hover:shadow-sm transition-all group"
            >
              <div className="min-w-0">
                <p className="font-semibold text-ink text-[15px] font-sans">{condition.name}</p>
                {condition.summary && (
                  <p className="text-[13px] text-muted font-sans mt-0.5 line-clamp-1">{condition.summary}</p>
                )}
              </div>
              <ChevronRight size={16} className="text-green-mid flex-shrink-0 group-hover:text-green-primary transition-colors" />
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
