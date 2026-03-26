export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="bg-primary py-12 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="h-3 w-40 bg-on-primary/20 rounded mb-4" />
          <div className="h-3 w-24 bg-on-primary/15 rounded mb-3" />
          <div className="h-9 w-56 bg-on-primary/20 rounded mb-3" />
          <div className="h-4 w-80 bg-on-primary/15 rounded" />
        </div>
      </div>

      {/* Causes skeleton */}
      <div className="py-16 px-6 lg:px-12 bg-surface-low animate-pulse">
        <div className="max-w-[1200px] mx-auto">
          <div className="h-3 w-32 bg-surface-container rounded mb-3" />
          <div className="h-7 w-48 bg-surface-container rounded mb-8" />
          <div className="grid md:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl bg-surface-lowest p-6 shadow-ambient">
                <div className="h-4 w-32 bg-surface-container rounded mb-3" />
                <div className="h-3 w-full bg-surface-container rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Remedies skeleton */}
      <div className="py-16 px-6 lg:px-12 bg-surface animate-pulse">
        <div className="max-w-[1200px] mx-auto">
          <div className="h-3 w-36 bg-surface-container rounded mb-3" />
          <div className="h-7 w-44 bg-surface-container rounded mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl bg-surface-lowest p-6 shadow-ambient">
                <div className="h-4 w-40 bg-surface-container rounded mb-4" />
                <div className="h-3 w-full bg-surface-container rounded mb-2" />
                <div className="h-3 w-3/4 bg-surface-container rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
