import Link from "next/link"
import { notFound } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { createCondition, updateCondition } from "@/app/admin/actions/conditions"
import FormField from "@/app/admin/ui/FormField"
import NameWithSlug from "@/app/admin/ui/NameWithSlug"
import CausesEditor from "@/app/admin/ui/CausesEditor"
import { ChevronLeft } from "lucide-react"

export const metadata = { title: "Edit Condition — NaturaMed Admin" }

interface Props {
  params: Promise<{ id: string }>
}

const CATEGORIES = [
  "Digestive Health",
  "Respiratory Health",
  "Mental & Emotional Health",
  "Sleep & Relaxation",
  "Pain & Inflammation",
  "Skin Health",
  "Immune Support",
  "Hormonal Health",
  "Cardiovascular Health",
  "Metabolic Health",
  "Urinary Health",
  "Eye Health",
  "Oral Health",
  "Men's Health",
  "Women's Health",
  "Children's Health",
  "General Wellness",
  "Detox & Cleansing",
]

export default async function ConditionFormPage({ params }: Props) {
  const { id } = await params
  const isNew = id === "new"

  let condition: Record<string, unknown> | null = null
  let existingCauses: { label: string; description: string }[] = []
  if (!isNew) {
    const { data } = await supabaseAdmin
      .from("conditions")
      .select("id, name, slug, category, summary")
      .eq("id", id)
      .single()
    if (!data) notFound()
    condition = data

    const { data: causesData } = await supabaseAdmin
      .from("causes")
      .select("label, description")
      .eq("condition_id", id)
      .order("id")
    existingCauses = causesData ?? []
  }

  const action = isNew ? createCondition : updateCondition

  return (
    <div className="max-w-[720px]">
      <Link
        href="/admin/conditions"
        className="inline-flex items-center gap-1 text-[13px] text-on-surface-variant hover:text-on-surface transition-colors mb-6"
        style={{ fontFamily: "var(--font-work-sans)" }}
      >
        <ChevronLeft size={14} /> Back to Conditions
      </Link>

      <div className="mb-6">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-on-surface-variant mb-1"
          style={{ fontFamily: "var(--font-work-sans)" }}
        >
          Content
        </p>
        <h2 className="font-serif font-semibold text-[28px] text-on-surface">
          {isNew ? "Add Condition" : "Edit Condition"}
        </h2>
      </div>

      <form action={action} className="flex flex-col gap-6">
        {!isNew && <input type="hidden" name="id" value={String(condition!.id)} />}

        <div className="rounded-2xl bg-surface-lowest border border-outline-variant/20 shadow-ambient p-6 flex flex-col gap-5">
          <h3 className="font-serif font-semibold text-[17px] text-on-surface border-b border-outline-variant/20 pb-3">
            Basic Info
          </h3>

          <NameWithSlug
            defaultName={String(condition?.name ?? "")}
            defaultSlug={String(condition?.slug ?? "")}
            basePath="/conditions/"
          />

          <FormField label="Category" htmlFor="category" required>
            <select
              id="category"
              name="category"
              required
              defaultValue={String(condition?.category ?? "")}
              className="w-full rounded-xl bg-surface-low border border-ghost px-4 py-3 text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            >
              <option value="" disabled>Select a category…</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Summary" htmlFor="summary">
            <textarea
              id="summary"
              name="summary"
              rows={4}
              defaultValue={String(condition?.summary ?? "")}
              placeholder="Brief overview of the condition…"
              className="w-full rounded-xl bg-surface-low border border-ghost px-4 py-3 text-[15px] text-on-surface placeholder-on-surface-variant resize-y focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </FormField>
        </div>

        <div className="rounded-2xl bg-surface-lowest border border-outline-variant/20 shadow-ambient p-6 flex flex-col gap-5">
          <h3 className="font-serif font-semibold text-[17px] text-on-surface border-b border-outline-variant/20 pb-3">
            Causes
          </h3>
          <CausesEditor defaultValue={existingCauses} />
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="btn-primary px-7 py-3 rounded-full text-[15px] font-semibold">
            {isNew ? "Create Condition" : "Save Changes"}
          </button>
          <Link href="/admin/conditions" className="text-[14px] text-on-surface-variant hover:text-on-surface transition-colors px-4 py-3">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
