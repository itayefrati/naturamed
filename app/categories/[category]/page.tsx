import { supabase } from '@/lib/supabase'
import { CATEGORY_MAP } from '@/lib/categories'
import { CATEGORIES } from '@/app/ui/CategoryGrid'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, ArrowRight } from 'lucide-react'
import Footer from '@/app/ui/Footer'

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
    <div className="min-h-screen flex flex-col">

      {/* ── Hero / Header ──────────────────────────────────────────────── */}
      <section className="bg-primary py-12 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-on-primary/60 text-[13px] mb-4">
            <Link href="/" className="hover:text-on-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/#categories" className="hover:text-on-primary transition-colors">Categories</Link>
            <ChevronRight size={12} />
            <span className="text-on-primary">{meta.label}</span>
          </nav>

          <div className="flex items-center gap-4 mt-2">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.05rem] text-on-primary-container mb-1" style={{ fontFamily: "var(--font-work-sans)" }}>
                Category
              </p>
              <h1 className="font-serif font-bold text-[28px] md:text-[36px] text-on-primary leading-tight">
                {meta.label}
              </h1>
              {catDef?.description && (
                <p className="text-on-primary/70 text-[15px] mt-1">{catDef.description}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 py-14 px-6 lg:px-12 bg-surface-low">
        <div className="max-w-[1200px] mx-auto">
          {error && <p className="text-error text-[14px]">Failed to load conditions.</p>}

          {!error && conditions?.length === 0 && (
            <div className="text-center py-20">
              <p className="text-on-surface-variant text-[16px]">No conditions found in this category yet.</p>
              <Link href="/" className="text-primary-container font-medium text-[15px] mt-4 inline-flex items-center gap-1 hover:underline">
                Back to Home <ArrowRight size={14} />
              </Link>
            </div>
          )}

          {conditions && conditions.length > 0 && (
            <>
              <p className="text-[13px] text-on-surface-variant mb-6" style={{ fontFamily: "var(--font-work-sans)" }}>
                {conditions.length} condition{conditions.length !== 1 ? 's' : ''} found
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {conditions.map((condition) => (
                  <Link
                    key={condition.id}
                    href={`/conditions/${condition.slug}`}
                    className="group rounded-xl bg-surface-lowest p-6 flex flex-col gap-3 shadow-ambient hover:shadow-ambient-lg hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <h3 className="font-semibold text-[16px] text-on-surface group-hover:text-primary-container transition-colors">
                      {condition.name}
                    </h3>
                    {condition.summary && (
                      <p className="text-[14px] text-on-surface-variant leading-relaxed line-clamp-2">
                        {condition.summary}
                      </p>
                    )}
                    <span className="text-[14px] text-primary-container font-medium flex items-center gap-1 mt-auto pt-1 group-hover:underline">
                      Explore <ArrowRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
