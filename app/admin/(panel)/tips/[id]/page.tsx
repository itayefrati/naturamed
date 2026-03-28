import Link from "next/link"
import { notFound } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { createTip, updateTip } from "@/app/admin/actions/tips"
import FormField from "@/app/admin/ui/FormField"
import { ChevronLeft } from "lucide-react"

export const metadata = { title: "Edit Tip — NaturaMed Admin" }

interface Props {
  params: Promise<{ id: string }>
}

const CATEGORIES = [
  "digestion",
  "wellness",
  "nutrition",
  "sleep",
  "focus",
  "relaxation",
]

export default async function TipFormPage({ params }: Props) {
  const { id } = await params
  const isNew = id === "new"

  let tip: { id: string; content: string; category: string | null } | null = null
  if (!isNew) {
    const { data } = await supabaseAdmin
      .from("daily_tips")
      .select("id, content, category")
      .eq("id", id)
      .single()
    if (!data) notFound()
    tip = data
  }

  const action = isNew ? createTip : updateTip

  return (
    <div className="max-w-[720px]">
      <Link
        href="/admin/tips"
        className="inline-flex items-center gap-1 text-[13px] text-on-surface-variant hover:text-on-surface transition-colors mb-6"
        style={{ fontFamily: "var(--font-work-sans)" }}
      >
        <ChevronLeft size={14} /> Back to Daily Tips
      </Link>

      <div className="mb-6">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-on-surface-variant mb-1"
          style={{ fontFamily: "var(--font-work-sans)" }}
        >
          Reference
        </p>
        <h2 className="font-serif font-semibold text-[28px] text-on-surface">
          {isNew ? "Add Daily Tip" : "Edit Daily Tip"}
        </h2>
      </div>

      <form action={action} className="flex flex-col gap-6">
        {!isNew && <input type="hidden" name="id" value={tip!.id} />}

        <div className="rounded-2xl bg-surface-lowest border border-outline-variant/20 shadow-ambient p-6 flex flex-col gap-5">
          <FormField label="Content" htmlFor="content" required>
            <textarea
              id="content"
              name="content"
              required
              rows={5}
              defaultValue={tip?.content ?? ""}
              placeholder="Write a helpful health tip…"
              className="w-full rounded-xl bg-surface-low border border-ghost px-4 py-3 text-[15px] text-on-surface placeholder-on-surface-variant resize-y focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </FormField>

          <FormField label="Category" htmlFor="category">
            <select
              id="category"
              name="category"
              defaultValue={tip?.category ?? ""}
              className="w-full rounded-xl bg-surface-low border border-ghost px-4 py-3 text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            >
              <option value="">No category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="btn-primary px-7 py-3 rounded-full text-[15px] font-semibold">
            {isNew ? "Create Tip" : "Save Changes"}
          </button>
          <Link href="/admin/tips" className="text-[14px] text-on-surface-variant hover:text-on-surface transition-colors px-4 py-3">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
