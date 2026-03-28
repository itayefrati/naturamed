import Link from "next/link"
import { Plus } from "lucide-react"

interface Props {
  eyebrow: string
  title: string
  cta?: { href: string; label: string }
}

export default function AdminPageHeader({ eyebrow, title, cta }: Props) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-on-surface-variant mb-1"
          style={{ fontFamily: "var(--font-work-sans)" }}
        >
          {eyebrow}
        </p>
        <h2 className="font-serif font-semibold text-[28px] text-on-surface">
          {title}
        </h2>
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="inline-flex items-center gap-2 btn-primary px-5 py-2.5 rounded-full text-[14px] font-semibold"
        >
          <Plus size={14} strokeWidth={2.5} />
          {cta.label}
        </Link>
      )}
    </div>
  )
}
