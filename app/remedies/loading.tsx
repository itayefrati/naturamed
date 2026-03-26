export default function Loading() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero skeleton */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-primary">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-5">
          <div className="h-4 w-32 bg-on-primary/20 rounded animate-pulse" />
          <div className="h-12 w-64 bg-on-primary/20 rounded animate-pulse" />
          <div className="h-5 w-96 max-w-full bg-on-primary/20 rounded animate-pulse" />
        </div>
      </section>

      {/* Card grid skeleton */}
      <section className="py-20 px-6 lg:px-12 bg-surface-low">
        <div className="max-w-[1200px] mx-auto">
          {/* Count skeleton */}
          <div className="h-4 w-36 bg-surface-high rounded animate-pulse mb-8" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl bg-surface-lowest p-6 flex flex-col gap-4 shadow-ambient animate-pulse"
              >
                {/* Category badge */}
                <div className="h-6 w-24 bg-surface-high rounded-full" />
                {/* Title */}
                <div className="h-5 bg-surface-high rounded w-3/4" />
                {/* Footer row */}
                <div className="flex items-center justify-between pt-2 flex-1">
                  <div className="h-4 w-16 bg-surface-high rounded" />
                  <div className="h-5 w-32 bg-surface-high rounded-full" />
                </div>
                {/* Link placeholder */}
                <div className="h-4 bg-surface-high rounded w-28 mt-2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
