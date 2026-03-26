export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Header skeleton */}
      <div className="bg-primary py-10 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="h-3 w-24 bg-on-primary/20 rounded mb-4" />
          <div className="h-3 w-16 bg-on-primary/15 rounded mb-3" />
          <div className="h-12 w-full max-w-2xl bg-on-primary/15 rounded-xl" />
        </div>
      </div>

      {/* Results skeleton */}
      <div className="py-14 px-6 lg:px-12 bg-surface-low animate-pulse">
        <div className="max-w-[1200px] mx-auto">
          <div className="h-3 w-36 bg-surface-container rounded mb-6" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-xl bg-surface-lowest p-6 shadow-ambient">
                <div className="h-4 w-36 bg-surface-container rounded mb-3" />
                <div className="h-3 w-full bg-surface-container rounded mb-2" />
                <div className="h-3 w-2/3 bg-surface-container rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
