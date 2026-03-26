export default function Loading() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero skeleton */}
      <section className="py-20 md:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-5">
          <div className="h-4 w-48 bg-surface-high rounded animate-pulse" />
          <div className="h-12 w-72 bg-surface-high rounded animate-pulse" />
          <div className="h-5 w-96 max-w-full bg-surface-high rounded animate-pulse" />
        </div>
      </section>

      {/* Alphabet filter skeleton */}
      <section className="py-8 px-6 lg:px-12 bg-surface-low">
        <div className="max-w-[1200px] mx-auto flex flex-wrap justify-center gap-2">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="w-9 h-9 bg-surface-high rounded-full animate-pulse"
            />
          ))}
        </div>
      </section>

      {/* Card grid skeleton */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl bg-surface-lowest p-6 flex flex-col gap-4 shadow-ambient animate-pulse"
            >
              {/* Emoji placeholder */}
              <div className="w-12 h-12 bg-surface-high rounded-xl" />
              {/* Title */}
              <div className="h-5 bg-surface-high rounded w-2/3" />
              {/* Badges */}
              <div className="flex gap-2">
                <div className="h-6 w-24 bg-surface-high rounded-full" />
                <div className="h-6 w-20 bg-surface-high rounded-full" />
              </div>
              {/* Description lines */}
              <div className="flex flex-col gap-2 flex-1">
                <div className="h-4 bg-surface-high rounded w-full" />
                <div className="h-4 bg-surface-high rounded w-5/6" />
                <div className="h-4 bg-surface-high rounded w-3/4" />
              </div>
              {/* Link placeholder */}
              <div className="h-4 bg-surface-high rounded w-32 mt-2" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
