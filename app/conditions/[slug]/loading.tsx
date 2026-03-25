export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#2D6A4F] px-4 py-5">
        <div className="max-w-3xl mx-auto">
          <div className="h-4 w-20 bg-white/20 rounded mb-3" />
          <div className="h-7 w-48 bg-white/20 rounded mb-2" />
          <div className="h-4 w-72 bg-white/15 rounded" />
        </div>
      </div>
      <main className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-8 animate-pulse">
        <div>
          <div className="h-5 w-48 bg-gray-200 rounded mb-4" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl bg-[#D8F3DC]/50 px-5 py-4 mb-3">
              <div className="h-4 w-32 bg-[#2D6A4F]/20 rounded mb-2" />
              <div className="h-3 w-full bg-[#2D6A4F]/10 rounded" />
            </div>
          ))}
        </div>
        <div>
          <div className="h-5 w-36 bg-gray-200 rounded mb-4" />
          {[1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-gray-100 p-5 mb-4">
              <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-64 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
