export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#2D6A4F] py-5 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="h-4 w-24 bg-white/20 rounded mb-3" />
          <div className="h-10 bg-white/20 rounded-lg" />
        </div>
      </div>
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="h-4 w-40 bg-gray-200 rounded mb-5 animate-pulse" />
        <div className="grid gap-3 sm:grid-cols-2 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-100 p-5">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-100 rounded w-1/3" />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
