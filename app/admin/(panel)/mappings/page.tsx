import { supabaseAdmin } from "@/lib/supabase-admin"
import AdminPageHeader from "@/app/admin/ui/AdminPageHeader"
import SymptomMappingEditor from "@/app/admin/ui/SymptomMappingEditor"

export const metadata = { title: "Symptom Mappings — NaturaMed Admin" }

export default async function AdminMappingsPage() {
  const [symptoms, remedies, herbs, symptomRemedies, symptomHerbs] = await Promise.all([
    supabaseAdmin.from("symptoms").select("id, label").order("label"),
    supabaseAdmin.from("remedies").select("id, name").order("name"),
    supabaseAdmin.from("herbs").select("id, name").order("name"),
    supabaseAdmin.from("symptom_remedies").select("symptom_id, remedy_id"),
    supabaseAdmin.from("symptom_herbs").select("symptom_id, herb_id"),
  ])

  // Build lookup maps
  const remedyMappings: Record<string, string[]> = {}
  for (const r of symptomRemedies.data ?? []) {
    if (!remedyMappings[r.symptom_id]) remedyMappings[r.symptom_id] = []
    remedyMappings[r.symptom_id].push(r.remedy_id)
  }

  const herbMappings: Record<string, string[]> = {}
  for (const h of symptomHerbs.data ?? []) {
    if (!herbMappings[h.symptom_id]) herbMappings[h.symptom_id] = []
    herbMappings[h.symptom_id].push(h.herb_id)
  }

  if (!symptoms.data?.length) {
    return (
      <div className="flex flex-col gap-6 max-w-[1100px]">
        <AdminPageHeader eyebrow="Symptom Engine" title="Mappings" />
        <div className="rounded-2xl bg-surface-lowest border border-outline-variant/20 shadow-ambient p-10 text-center">
          <p className="text-[15px] text-on-surface-variant mb-4">
            No symptoms found. Add some symptoms first.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1200px]">
      <AdminPageHeader eyebrow="Symptom Engine" title="Symptom Mappings" />
      <p className="text-[14px] text-on-surface-variant -mt-3">
        Select a symptom on the left, then check the remedies and herbs that address it.
        Click Save after each symptom.
      </p>

      <SymptomMappingEditor
        symptoms={symptoms.data}
        remedies={remedies.data ?? []}
        herbs={herbs.data ?? []}
        remedyMappings={remedyMappings}
        herbMappings={herbMappings}
      />
    </div>
  )
}
