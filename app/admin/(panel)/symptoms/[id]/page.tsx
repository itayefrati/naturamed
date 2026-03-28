import Link from "next/link"
import { notFound } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { createSymptom, updateSymptom } from "@/app/admin/actions/symptoms"
import FormField from "@/app/admin/ui/FormField"
import { ChevronLeft } from "lucide-react"

export const metadata = { title: "Edit Symptom — NaturaMed Admin" }

interface Props {
  params: Promise<{ id: string }>
}

export default async function SymptomFormPage({ params }: Props) {
  const { id } = await params
  const isNew = id === "new"

  let symptom: { id: string; label: string; description: string | null } | null = null
  if (!isNew) {
    const { data } = await supabaseAdmin
      .from("symptoms")
      .select("id, label, description")
      .eq("id", id)
      .single()
    if (!data) notFound()
    symptom = data
  }

  const action = isNew ? createSymptom : updateSymptom

  return (
    <div className="max-w-[720px]">
      <Link
        href="/admin/symptoms"
        className="inline-flex items-center gap-1 text-[13px] text-on-surface-variant hover:text-on-surface transition-colors mb-6"
        style={{ fontFamily: "var(--font-work-sans)" }}
      >
        <ChevronLeft size={14} /> Back to Symptoms
      </Link>

      <div className="mb-6">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-on-surface-variant mb-1"
          style={{ fontFamily: "var(--font-work-sans)" }}
        >
          Symptom Engine
        </p>
        <h2 className="font-serif font-semibold text-[28px] text-on-surface">
          {isNew ? "Add Symptom" : "Edit Symptom"}
        </h2>
      </div>

      <form action={action} className="flex flex-col gap-6">
        {!isNew && <input type="hidden" name="id" value={symptom!.id} />}

        <div className="rounded-2xl bg-surface-lowest border border-outline-variant/20 shadow-ambient p-6 flex flex-col gap-5">
          <FormField label="Label" htmlFor="label" required>
            <input
              id="label"
              name="label"
              type="text"
              required
              defaultValue={symptom?.label ?? ""}
              placeholder="e.g. Headache"
              className="w-full rounded-xl bg-surface-low border border-ghost px-4 py-3 text-[15px] text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </FormField>

          <FormField label="Description" htmlFor="description">
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={symptom?.description ?? ""}
              placeholder="Brief description of this symptom…"
              className="w-full rounded-xl bg-surface-low border border-ghost px-4 py-3 text-[15px] text-on-surface placeholder-on-surface-variant resize-y focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </FormField>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="btn-primary px-7 py-3 rounded-full text-[15px] font-semibold">
            {isNew ? "Create Symptom" : "Save Changes"}
          </button>
          <Link href="/admin/symptoms" className="text-[14px] text-on-surface-variant hover:text-on-surface transition-colors px-4 py-3">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
