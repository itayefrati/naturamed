import Link from "next/link"
import { notFound } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { createHerb, updateHerb } from "@/app/admin/actions/herbs"
import FormField from "@/app/admin/ui/FormField"
import TagInput from "@/app/admin/ui/TagInput"
import NameWithSlug from "@/app/admin/ui/NameWithSlug"
import { ChevronLeft } from "lucide-react"

export const metadata = { title: "Edit Herb — NaturaMed Admin" }

interface Props {
  params: Promise<{ id: string }>
}

export default async function HerbFormPage({ params }: Props) {
  const { id } = await params
  const isNew = id === "new"

  let herb: Record<string, unknown> | null = null
  if (!isNew) {
    const { data } = await supabaseAdmin
      .from("herbs")
      .select("*")
      .eq("id", id)
      .single()
    if (!data) notFound()
    herb = data
  }

  const action = isNew ? createHerb : updateHerb

  return (
    <div className="max-w-[720px]">
      <Link
        href="/admin/herbs"
        className="inline-flex items-center gap-1 text-[13px] text-on-surface-variant hover:text-on-surface transition-colors mb-6"
        style={{ fontFamily: "var(--font-work-sans)" }}
      >
        <ChevronLeft size={14} /> Back to Herbs
      </Link>

      <div className="mb-6">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-on-surface-variant mb-1"
          style={{ fontFamily: "var(--font-work-sans)" }}
        >
          Content
        </p>
        <h2 className="font-serif font-semibold text-[28px] text-on-surface">
          {isNew ? "Add Herb" : "Edit Herb"}
        </h2>
      </div>

      <form action={action} className="flex flex-col gap-6">
        {!isNew && (
          <input type="hidden" name="id" value={String(herb!.id)} />
        )}

        <div className="rounded-2xl bg-surface-lowest border border-outline-variant/20 shadow-ambient p-6 flex flex-col gap-5">
          <h3 className="font-serif font-semibold text-[17px] text-on-surface border-b border-outline-variant/20 pb-3">
            Basic Info
          </h3>

          <NameWithSlug
            defaultName={String(herb?.name ?? "")}
            defaultSlug={String(herb?.slug ?? "")}
            basePath="/herbs/"
          />

          <FormField label="Latin Name" htmlFor="latin_name">
            <input
              id="latin_name"
              name="latin_name"
              type="text"
              defaultValue={String(herb?.latin_name ?? "")}
              placeholder="e.g. Zingiber officinale"
              className="w-full rounded-xl bg-surface-low border border-ghost px-4 py-3 text-[15px] text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30 transition italic"
            />
          </FormField>

          <FormField label="Family" htmlFor="family">
            <input
              id="family"
              name="family"
              type="text"
              defaultValue={String(herb?.family ?? "")}
              placeholder="e.g. Zingiberaceae"
              className="w-full rounded-xl bg-surface-low border border-ghost px-4 py-3 text-[15px] text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </FormField>

          <FormField label="Description" htmlFor="description" required>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              defaultValue={String(herb?.description ?? "")}
              placeholder="Describe the herb, its history, and traditional uses…"
              className="w-full rounded-xl bg-surface-low border border-ghost px-4 py-3 text-[15px] text-on-surface placeholder-on-surface-variant resize-y focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </FormField>

          <FormField label="Fun Fact" htmlFor="fun_fact">
            <textarea
              id="fun_fact"
              name="fun_fact"
              rows={3}
              defaultValue={String(herb?.fun_fact ?? "")}
              placeholder="An interesting or surprising fact about this herb…"
              className="w-full rounded-xl bg-surface-low border border-ghost px-4 py-3 text-[15px] text-on-surface placeholder-on-surface-variant resize-y focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </FormField>

          <div className="flex items-start gap-3">
            <input
              id="herb_of_day"
              name="herb_of_day"
              type="checkbox"
              defaultChecked={herb?.herb_of_day === true}
              className="mt-0.5 w-4 h-4 rounded accent-primary cursor-pointer"
            />
            <div>
              <label
                htmlFor="herb_of_day"
                className="text-[14px] font-medium text-on-surface cursor-pointer"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                Herb of the Day
              </label>
              <p className="text-[12px] text-on-surface-variant mt-0.5">
                Enabling this will clear the flag from any currently featured herb.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-surface-lowest border border-outline-variant/20 shadow-ambient p-6 flex flex-col gap-5">
          <h3 className="font-serif font-semibold text-[17px] text-on-surface border-b border-outline-variant/20 pb-3">
            Properties & Usage
          </h3>

          <FormField
            label="Medicinal Properties"
            description="e.g. Anti-inflammatory, Digestive aid"
          >
            <TagInput
              name="medicinal_properties"
              defaultValue={herb?.medicinal_properties as string[] ?? []}
              placeholder="Add property and press Enter"
            />
          </FormField>

          <FormField
            label="Usage Methods"
            description="e.g. Tea, Tincture, Capsule"
          >
            <TagInput
              name="usage_methods"
              defaultValue={herb?.usage_methods as string[] ?? []}
              placeholder="Add usage method and press Enter"
            />
          </FormField>

          <FormField
            label="Precautions"
            description="Safety notes and contraindications"
          >
            <TagInput
              name="precautions"
              defaultValue={herb?.precautions as string[] ?? []}
              placeholder="Add precaution and press Enter"
            />
          </FormField>

          <FormField
            label="Sources"
            description="References, studies, or books"
          >
            <TagInput
              name="sources"
              defaultValue={herb?.sources as string[] ?? []}
              placeholder="Add source and press Enter"
            />
          </FormField>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="btn-primary px-7 py-3 rounded-full text-[15px] font-semibold"
          >
            {isNew ? "Create Herb" : "Save Changes"}
          </button>
          <Link
            href="/admin/herbs"
            className="text-[14px] text-on-surface-variant hover:text-on-surface transition-colors px-4 py-3"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
