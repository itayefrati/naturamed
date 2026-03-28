import { Leaf, AlertCircle } from "lucide-react"
import { signInAction } from "@/app/admin/actions/admin-auth"

interface Props {
  searchParams: Promise<{ error?: string }>
}

export default async function AdminLoginPage({ searchParams }: Props) {
  const { error } = await searchParams

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <Leaf size={24} strokeWidth={1.5} className="text-on-primary-container" />
          <span className="font-serif font-bold text-[22px] text-on-primary tracking-tight">
            NaturaMed
          </span>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-surface-lowest shadow-ambient-lg p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-on-surface-variant"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              Admin Panel
            </p>
            <h1 className="font-serif font-bold text-[26px] text-on-surface">
              Sign in
            </h1>
          </div>

          {error && (
            <div className="flex items-center gap-2.5 rounded-xl bg-surface-low border border-outline-variant/30 px-4 py-3">
              <AlertCircle size={16} className="text-primary-container shrink-0" />
              <p className="text-[14px] text-on-surface-variant">
                Invalid email or password. Please try again.
              </p>
            </div>
          )}

          <form action={signInAction} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-[13px] font-medium text-on-surface"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                autoFocus
                className="w-full rounded-xl bg-surface-low border border-ghost px-4 py-3 text-[15px] text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                placeholder="admin@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-[13px] font-medium text-on-surface"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full rounded-xl bg-surface-low border border-ghost px-4 py-3 text-[15px] text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary px-6 py-3.5 rounded-xl text-[15px] font-semibold mt-1"
            >
              Sign in
            </button>
          </form>
        </div>

        <p className="text-center text-[13px] text-on-primary/50 mt-6">
          NaturaMed Admin — authorized access only
        </p>
      </div>
    </div>
  )
}
