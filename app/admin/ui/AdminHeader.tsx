import { LogOut } from "lucide-react"
import { signOutAction } from "@/app/admin/actions/admin-auth"

interface Props {
  title: string
  userEmail?: string
}

export default function AdminHeader({ title, userEmail }: Props) {
  return (
    <header className="h-16 shrink-0 flex items-center justify-between px-8 bg-surface-lowest border-b border-outline-variant/20">
      <h1 className="font-serif font-semibold text-[20px] text-on-surface">
        {title}
      </h1>

      <div className="flex items-center gap-4">
        {userEmail && (
          <span
            className="text-[13px] text-on-surface-variant hidden sm:block"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            {userEmail}
          </span>
        )}
        <form action={signOutAction}>
          <button
            type="submit"
            className="flex items-center gap-1.5 text-[13px] text-on-surface-variant hover:text-on-surface transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-high"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            <LogOut size={14} strokeWidth={1.5} />
            Sign out
          </button>
        </form>
      </div>
    </header>
  )
}
