import Link from "next/link"
import { notFound } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { createRemedy, updateRemedy } from "@/app/admin/actions/remedies"
import FormField from "@/app/admin/ui/FormField"
import TagInput from "@/app/admin/ui/TagInput"
import ConditionSelect from "@/app/admin/ui/ConditionSelect"
import { ChevronLeft } from "lucide-react"

export const metadata = { title: "Edit Remedy — NaturaMed Admin" }

interface Props {
  params: Promise<{ id: string }>
}

export default async function RemedyFormPage({ params }: Props) {
  const { id } = await params
  const isNew = id === "new"

  let remedy: Record<string, unknown> | null = null
  if (!isNew) {
    const { data } = await supabaseAdmin
      .from("remedies")
      .select("*")
      .eq("id", id)
      .single()
    if (!data) notFound()
    remedy = data
  }

  const action = isNew ? createRemedy : updateRemedy

  return (
    <div className="max-w-[720px]">
      <Link
        href="/admin/remedies"
        className="inline-flex items-center gap-1 text-[13px] text-on-surface-variant hover:text-on-surface transition-colors mb-6"
        style={{ fontFamily: "var(--font-work-sans)" }}
      >
        <ChevronLeft size={14} /> Back to Remedies
      </Link>

      <div className="mb-6">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-on-surface-variant mb-1"
          style={{ fontFamily: "var(--font-work-sans)" }}
        >
          Content
        </p>
        <h2 className="font-serif font-semibold text-[28px] text-on-surface">
          {isNew ? "Add Remedy" : "Edit Remedy"}
        </h2>
      </div>

      <form action={action} className="flex flex-col gap-6">
        {!isNew && <input type="hidden" name="id" value={String(remedy!.id)} />}

        <div className="rounded-2xl bg-surface-lowest border border-outline-variant/20 shadow-ambient p-6 flex flex-col gap-5">
          <h3 className="font-serif font-semibold text-[17px] text-on-surface border-b border-outline-variant/20 pb-3">
            Basic Info
          </h3>

          <FormField label="Name" htmlFor="name" required>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={String(remedy?.name ?? "")}
              placeholder="Remedy name"
              className="w-full rounded-xl bg-surface-low border border-ghost px-4 py-3 text-[15px] text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </FormField>

          <FormField label="Condition" description="Which condition does this remedy address?">
            <ConditionSelect
              defaultValue={String(remedy?.condition_id ?? "")}
            />
          </FormField>

          <FormField label="Prep Time" htmlFor="prep_time">
            <input
              id="prep_time"
              name="prep_time"
              type="text"
              defaultValue={String(remedy?.prep_time ?? "")}
              placeholder="e.g. 15 minutes"
              className="w-full rounded-xl bg-surface-low border border-ghost px-4 py-3 text-[15px] text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </FormField>

          <FormField label="Source" htmlFor="source">
            <input
              id="source"
              name="source"
              type="text"
              defaultValue={String(remedy?.source ?? "")}
              placeholder="e.g. Traditional Chinese Medicine"
              className="w-full rounded-xl bg-surface-low border border-ghost px-4 py-3 text-[15px] text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </FormField>

          <div className="flex items-start gap-3">
            <input
              id="is_curated"
              name="is_curated"
              type="checkbox"
              defaultChecked={remedy?.is_curated === true}
              className="mt-0.5 w-4 h-4 rounded accent-primary cursor-pointer"
            />
            <div>
              <label
                htmlFor="is_curated"
                className="text-[14px] font-medium text-on-surface cursor-pointer"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                Curated Remedy
              </label>
              <p className="text-[12px] text-on-surface-variant mt-0.5">
                Curated remedies are featured prominently in the site.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-surface-lowest border border-outline-variant/20 shadow-ambient p-6 flex flex-col gap-5">
          <h3 className="font-serif font-semibold text-[17px] text-on-surface border-b border-outline-variant/20 pb-3">
            Instructions
          </h3>

          <FormField label="Ingredients" description="Add each ingredient separately">
            <TagInput
              name="ingredients"
              defaultValue={remedy?.ingredients as string[] ?? []}
              placeholder="Add ingredient and press Enter"
            />
          </FormField>

          <FormField label="Steps" description="Add each step separately, in order">
            <TagInput
              name="steps"
              defaultValue={remedy?.steps as string[] ?? []}
              placeholder="Add step and press Enter"
            />
          </FormField>

          <FormField label="Cautions" description="Safety notes and warnings">
            <TagInput
              name="cautions"
              defaultValue={remedy?.cautions as string[] ?? []}
              placeholder="Add caution and press Enter"
            />
          </FormField>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="btn-primary px-7 py-3 rounded-full text-[15px] font-semibold">
            {isNew ? "Create Remedy" : "Save Changes"}
          </button>
          <Link href="/admin/remedies" className="text-[14px] text-on-surface-variant hover:text-on-surface transition-colors px-4 py-3">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
