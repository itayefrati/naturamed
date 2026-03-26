export default function Loading() {
  return (
    <div className="min-h-screen bg-surface animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="px-6 lg:px-12 pt-6 pb-2">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-10 bg-surface-high rounded" />
            <div className="h-3.5 w-3 bg-surface-high rounded" />
            <div className="h-3.5 w-20 bg-surface-high rounded" />
            <div className="h-3.5 w-3 bg-surface-high rounded" />
            <div className="h-3.5 w-16 bg-surface-high rounded" />
          </div>
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="px-6 lg:px-12 pt-8 pb-16">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="aspect-[4/5] rounded-2xl bg-surface-low" />
          <div className="flex flex-col gap-5">
            <div className="h-3 w-32 bg-surface-high rounded" />
            <div className="h-12 w-64 bg-surface-high rounded" />
            <div className="h-5 w-40 bg-surface-high rounded" />
            <div className="h-4 w-28 bg-surface-high rounded" />
            <div className="space-y-2 max-w-lg">
              <div className="h-4 w-full bg-surface-high rounded" />
              <div className="h-4 w-full bg-surface-high rounded" />
              <div className="h-4 w-3/4 bg-surface-high rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Apothecary Lore skeleton */}
      <div className="px-6 lg:px-12 py-16 bg-surface-low">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-5">
            <div className="h-3 w-28 bg-surface-high rounded" />
            <div className="h-8 w-56 bg-surface-high rounded" />
            <div className="space-y-2 w-full">
              <div className="h-4 w-full bg-surface-high rounded" />
              <div className="h-4 w-full bg-surface-high rounded" />
              <div className="h-4 w-5/6 bg-surface-high rounded mx-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Overview skeleton */}
      <div className="px-6 lg:px-12 py-16">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-10">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-surface-lowest p-8 shadow-ambient"
            >
              <div className="h-3 w-36 bg-surface-high rounded mb-5" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-surface-high rounded" />
                <div className="h-4 w-full bg-surface-high rounded" />
                <div className="h-4 w-2/3 bg-surface-high rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Properties skeleton */}
      <div className="px-6 lg:px-12 py-16 bg-surface-low">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center gap-5 mb-10">
            <div className="h-3 w-28 bg-surface-high rounded" />
            <div className="h-8 w-48 bg-surface-high rounded" />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-10 rounded-full bg-surface-high"
                style={{ width: `${80 + i * 16}px` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Preparation methods skeleton */}
      <div className="px-6 lg:px-12 py-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center gap-5 mb-10">
            <div className="h-3 w-32 bg-surface-high rounded" />
            <div className="h-8 w-52 bg-surface-high rounded" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl bg-surface-lowest p-7 shadow-ambient"
              >
                <div className="w-10 h-10 bg-surface-high rounded-lg mb-4" />
                <div className="h-5 w-20 bg-surface-high rounded mb-3" />
                <div className="space-y-2">
                  <div className="h-3.5 w-full bg-surface-high rounded" />
                  <div className="h-3.5 w-full bg-surface-high rounded" />
                  <div className="h-3.5 w-3/4 bg-surface-high rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety skeleton */}
      <div className="px-6 lg:px-12 py-16 bg-surface-low">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center gap-5 mb-10">
            <div className="h-3 w-28 bg-surface-high rounded" />
            <div className="h-8 w-64 bg-surface-high rounded" />
          </div>
          <div className="max-w-2xl mx-auto rounded-2xl bg-tertiary-fixed/10 p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-tertiary-fixed/30 shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-48 bg-tertiary-fixed/30 rounded" />
                <div className="h-3.5 w-full bg-tertiary-fixed/20 rounded" />
                <div className="h-3.5 w-full bg-tertiary-fixed/20 rounded" />
                <div className="h-3.5 w-3/4 bg-tertiary-fixed/20 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sources skeleton */}
      <div className="px-6 lg:px-12 py-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center gap-5 mb-10">
            <div className="h-3 w-24 bg-surface-high rounded" />
            <div className="h-8 w-48 bg-surface-high rounded" />
          </div>
          <div className="max-w-2xl mx-auto flex flex-col gap-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="rounded-2xl bg-surface-lowest p-6 shadow-ambient flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-full bg-surface-high shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-full bg-surface-high rounded" />
                  <div className="h-3.5 w-2/3 bg-surface-high rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related remedies skeleton */}
      <div className="px-6 lg:px-12 py-16 bg-surface-low">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center gap-5 mb-10">
            <div className="h-3 w-28 bg-surface-high rounded" />
            <div className="h-8 w-48 bg-surface-high rounded" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl bg-surface-lowest p-7 shadow-ambient"
              >
                <div className="h-6 w-24 bg-surface-high rounded-full mb-4" />
                <div className="h-5 w-40 bg-surface-high rounded mb-3" />
                <div className="h-4 w-28 bg-surface-high rounded mt-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
