export default function Loading() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero skeleton */}
      <section className="py-20 md:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center gap-5 animate-pulse">
          <div className="h-4 w-48 bg-surface-container rounded" />
          <div className="h-12 w-80 bg-surface-container rounded" />
          <div className="h-5 w-96 max-w-full bg-surface-container rounded" />
        </div>
      </section>

      {/* Input card skeleton */}
      <section className="px-6 lg:px-12 -mt-6 pb-16">
        <div className="max-w-[720px] mx-auto rounded-2xl bg-surface-lowest shadow-ambient-lg p-8 md:p-10 flex flex-col gap-6 animate-pulse">
          <div className="flex gap-3">
            <div className="flex-1 h-12 bg-surface-container rounded-lg" />
            <div className="h-12 w-20 bg-surface-container rounded-lg" />
          </div>
          <div className="h-5 w-56 bg-surface-container rounded" />
          <div className="h-12 w-full bg-surface-container rounded-lg" />
        </div>
      </section>

      {/* Common symptoms skeleton */}
      <section className="py-20 px-6 lg:px-12 bg-surface-low">
        <div className="max-w-[1200px] mx-auto animate-pulse">
          <div className="flex flex-col items-center gap-3 mb-10">
            <div className="h-4 w-28 bg-surface-container rounded" />
            <div className="h-9 w-64 bg-surface-container rounded" />
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-10 rounded-full bg-surface-container"
                style={{ width: `${80 + (i % 3) * 30}px` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it works skeleton */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto animate-pulse">
          <div className="flex flex-col items-center gap-3 mb-14">
            <div className="h-4 w-32 bg-surface-container rounded" />
            <div className="h-9 w-48 bg-surface-container rounded" />
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-surface-container" />
                <div className="h-5 w-32 bg-surface-container rounded" />
                <div className="h-4 w-48 bg-surface-container rounded" />
                <div className="h-4 w-40 bg-surface-container rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
