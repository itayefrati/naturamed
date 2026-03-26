export default function Loading() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Results header skeleton */}
      <section className="py-12 px-6 lg:px-12 bg-primary">
        <div className="max-w-[1200px] mx-auto">
          <div className="h-3 w-40 bg-on-primary/20 rounded animate-pulse mb-4" />
          <div className="h-4 w-28 bg-on-primary/20 rounded animate-pulse mb-3" />
          <div className="h-10 w-72 bg-on-primary/20 rounded animate-pulse mb-4" />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-7 w-20 rounded-full bg-on-primary/20 animate-pulse" />
            ))}
          </div>
        </div>
      </section>

      {/* Remedies skeleton */}
      <section className="py-16 px-6 lg:px-12 bg-surface-low">
        <div className="max-w-[1200px] mx-auto">
          <div className="h-4 w-36 bg-surface-high rounded animate-pulse mb-3" />
          <div className="h-8 w-52 bg-surface-high rounded animate-pulse mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-surface-lowest p-6 flex flex-col gap-4 shadow-ambient animate-pulse">
                <div className="h-6 w-24 rounded-full bg-surface-high" />
                <div className="h-5 bg-surface-high rounded w-3/4" />
                <div className="h-4 bg-surface-high rounded w-1/2" />
                <div className="flex items-center justify-between pt-1">
                  <div className="h-4 w-16 bg-surface-high rounded" />
                  <div className="h-5 w-28 rounded-full bg-surface-high" />
                </div>
                <div className="h-4 w-28 bg-surface-high rounded mt-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Herbs skeleton */}
      <section className="py-16 px-6 lg:px-12 bg-surface">
        <div className="max-w-[1200px] mx-auto">
          <div className="h-4 w-28 bg-surface-high rounded animate-pulse mb-3" />
          <div className="h-8 w-48 bg-surface-high rounded animate-pulse mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-surface-lowest p-5 flex flex-col gap-3 shadow-ambient animate-pulse">
                <div className="h-5 bg-surface-high rounded w-3/4" />
                <div className="flex gap-1.5">
                  <div className="h-5 w-16 rounded-full bg-surface-high" />
                  <div className="h-5 w-20 rounded-full bg-surface-high" />
                </div>
                <div className="h-4 w-20 bg-surface-high rounded mt-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
