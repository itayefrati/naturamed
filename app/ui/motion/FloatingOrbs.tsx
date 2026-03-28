export default function FloatingOrbs({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Orb 1 — primary green, top-left */}
      <div
        className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl animate-float-slow ${
          dark ? "bg-on-primary/5" : "bg-primary/6"
        }`}
        style={{ animationDelay: "0s" }}
      />
      {/* Orb 2 — secondary sage, center-right */}
      <div
        className={`absolute top-1/3 -right-16 w-72 h-72 rounded-full blur-3xl animate-float-drift ${
          dark ? "bg-on-primary/4" : "bg-secondary/8"
        }`}
        style={{ animationDelay: "2s" }}
      />
      {/* Orb 3 — amber, bottom-left */}
      <div
        className={`absolute -bottom-16 left-1/4 w-56 h-56 rounded-full blur-3xl animate-float-slow ${
          dark ? "bg-primary-fixed/5" : "bg-tertiary/5"
        }`}
        style={{ animationDelay: "4s" }}
      />
      {/* Orb 4 — large pulse glow, center */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl animate-pulse-glow ${
          dark ? "bg-on-primary/3" : "bg-primary/4"
        }`}
      />
    </div>
  )
}
