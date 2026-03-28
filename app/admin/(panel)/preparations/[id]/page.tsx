import Link from "next/link"
import { notFound } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase-admin"
import {
  createPreparationMethod,
  updatePreparationMethod,
} from "@/app/admin/actions/preparations"
import FormField from "@/app/admin/ui/FormField"
import TagInput from "@/app/admin/ui/TagInput"
import { ChevronLeft } from "lucide-react"

export const metadata = { title: "Edit Preparation Method — NaturaMed Admin" }

interface Props {
  params: Promise<{ id: string }>
}

export default async function PreparationFormPage({ params }: Props) {
  const { id } = await params
  const isNew = id === "new"

  let method: Record<string, unknown> | null = null
  if (!isNew) {
    const { data } = await supabaseAdmin
      .from("preparation_methods")
      .select("*")
      .eq("id", id)
      .single()
    if (!data) notFound()
    method = data
  }

  const action = isNew ? createPreparationMethod : updatePreparationMethod

  return (
    <div className="max-w-[720px]">
      <Link
        href="/admin/preparations"
        className="inline-flex items-center gap-1 text-[13px] text-on-surface-variant hover:text-on-surface transition-colors mb-6"
        style={{ fontFamily: "var(--font-work-sans)" }}
      >
        <ChevronLeft size={14} /> Back to Preparation Methods
      </Link>

      <div className="mb-6">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-on-surface-variant mb-1"
          style={{ fontFamily: "var(--font-work-sans)" }}
        >
          Reference
        </p>
        <h2 className="font-serif font-semibold text-[28px] text-on-surface">
          {isNew ? "Add Preparation Method" : "Edit Preparation Method"}
        </h2>
      </div>

      <form action={action} className="flex flex-col gap-6">
        {!isNew && <input type="hidden" name="id" value={String(method!.id)} />}

        <div className="rounded-2xl bg-surface-lowest border border-outline-variant/20 shadow-ambient p-6 flex flex-col gap-5">
          <FormField label="Name" htmlFor="name" required>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={String(method?.name ?? "")}
              placeholder="e.g. Herbal Tea (Infusion)"
              className="w-full rounded-xl bg-surface-low border border-ghost px-4 py-3 text-[15px] text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </FormField>

          <FormField label="Description" htmlFor="description">
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={String(method?.description ?? "")}
              placeholder="Describe this preparation method…"
              className="w-full rounded-xl bg-surface-low border border-ghost px-4 py-3 text-[15px] text-on-surface placeholder-on-surface-variant resize-y focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </FormField>

          <FormField label="Steps" description="Add each step separately, in order">
            <TagInput
              name="steps"
              defaultValue={method?.steps as string[] ?? []}
              placeholder="Add step and press Enter"
            />
          </FormField>

          <FormField label="Use Cases" description="When is this method typically used?">
            <TagInput
              name="use_cases"
              defaultValue={method?.use_cases as string[] ?? []}
              placeholder="Add use case and press Enter"
            />
          </FormField>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="btn-primary px-7 py-3 rounded-full text-[15px] font-semibold">
            {isNew ? "Create Method" : "Save Changes"}
          </button>
          <Link href="/admin/preparations" className="text-[14px] text-on-surface-variant hover:text-on-surface transition-colors px-4 py-3">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
