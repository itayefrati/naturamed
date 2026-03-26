export default function Loading() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero skeleton */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-primary">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-5">
          <div className="h-4 w-32 bg-on-primary/20 rounded animate-pulse" />
          <div className="h-12 w-80 bg-on-primary/20 rounded animate-pulse" />
          <div className="h-5 w-96 max-w-full bg-on-primary/20 rounded animate-pulse" />
        </div>
      </section>

      {/* Philosophy cards skeleton */}
      <section className="py-20 px-6 lg:px-12 bg-surface-low">
        <div className="max-w-[1200px] mx-auto">
          <div className="h-4 w-28 bg-surface-high rounded animate-pulse mb-3" />
          <div className="h-9 w-48 bg-surface-high rounded animate-pulse mb-12" />
          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-surface-lowest p-8 flex flex-col gap-4 shadow-ambient animate-pulse">
                <div className="h-10 w-10 rounded-full bg-surface-high" />
                <div className="h-6 w-32 bg-surface-high rounded" />
                <div className="space-y-2">
                  <div className="h-4 bg-surface-high rounded w-full" />
                  <div className="h-4 bg-surface-high rounded w-5/6" />
                  <div className="h-4 bg-surface-high rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
