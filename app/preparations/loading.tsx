export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero skeleton */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-surface">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-5 animate-pulse">
          <div className="h-4 w-32 bg-surface-high rounded" />
          <div className="h-12 w-80 bg-surface-high rounded" />
          <div className="h-5 w-96 max-w-full bg-surface-high rounded" />
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="py-20 px-6 lg:px-12 bg-surface-low">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8 animate-pulse">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl bg-surface-lowest p-7 flex flex-col gap-4 shadow-ambient"
              >
                <div className="h-10 w-10 bg-surface-high rounded-lg" />
                <div className="h-7 w-48 bg-surface-high rounded" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-surface-high rounded" />
                  <div className="h-4 w-5/6 bg-surface-high rounded" />
                  <div className="h-4 w-2/3 bg-surface-high rounded" />
                </div>
                <div className="flex gap-2.5 pt-1">
                  <div className="h-6 w-20 bg-surface-high rounded-full" />
                  <div className="h-6 w-20 bg-surface-high rounded-full" />
                </div>
                <div className="h-4 w-24 bg-surface-high rounded mt-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Callout skeleton */}
      <section className="py-20 px-6 lg:px-12 bg-surface">
        <div className="max-w-[1200px] mx-auto animate-pulse">
          <div className="rounded-xl bg-surface-low p-10 md:p-14 flex flex-col items-center gap-5">
            <div className="h-4 w-28 bg-surface-high rounded" />
            <div className="h-10 w-72 bg-surface-high rounded" />
            <div className="h-5 w-96 max-w-full bg-surface-high rounded" />
            <div className="h-12 w-48 bg-surface-high rounded-full mt-2" />
          </div>
        </div>
      </section>
    </div>
  );
}
