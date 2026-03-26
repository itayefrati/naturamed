export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="bg-primary py-12 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="h-3 w-48 bg-on-primary/20 rounded mb-4" />
          <div className="flex items-center gap-4 mt-2">
            <div className="w-10 h-10 rounded-full bg-on-primary/20" />
            <div>
              <div className="h-3 w-20 bg-on-primary/15 rounded mb-2" />
              <div className="h-8 w-40 bg-on-primary/20 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="py-14 px-6 lg:px-12 bg-surface-low animate-pulse">
        <div className="max-w-[1200px] mx-auto">
          <div className="h-3 w-28 bg-surface-container rounded mb-6" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-xl bg-surface-lowest p-6 shadow-ambient">
                <div className="h-4 w-32 bg-surface-container rounded mb-3" />
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
