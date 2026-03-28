import { supabaseAdmin } from "@/lib/supabase-admin"
import AdminPageHeader from "@/app/admin/ui/AdminPageHeader"
import AdminTable from "@/app/admin/ui/AdminTable"
import { deleteSymptom } from "@/app/admin/actions/symptoms"

export const metadata = { title: "Symptoms — NaturaMed Admin" }

export default async function AdminSymptomsPage() {
  const { data: symptoms } = await supabaseAdmin
    .from("symptoms")
    .select("id, label, description")
    .order("label")

  // Get mapping counts
  const [remedyMappings, herbMappings] = await Promise.all([
    supabaseAdmin.from("symptom_remedies").select("symptom_id"),
    supabaseAdmin.from("symptom_herbs").select("symptom_id"),
  ])

  const remedyCounts: Record<string, number> = {}
  const herbCounts: Record<string, number> = {}
  for (const r of remedyMappings.data ?? []) {
    remedyCounts[r.symptom_id] = (remedyCounts[r.symptom_id] ?? 0) + 1
  }
  for (const h of herbMappings.data ?? []) {
    herbCounts[h.symptom_id] = (herbCounts[h.symptom_id] ?? 0) + 1
  }

  type Row = { id: string; label: string; description: string | null; remedyCount: number; herbCount: number }
  const rows: Row[] = (symptoms ?? []).map((s) => ({
    id: s.id,
    label: s.label,
    description: s.description,
    remedyCount: remedyCounts[s.id] ?? 0,
    herbCount: herbCounts[s.id] ?? 0,
  }))

  return (
    <div className="flex flex-col gap-6 max-w-[1100px]">
      <AdminPageHeader
        eyebrow="Symptom Engine"
        title="Symptoms"
        cta={{ href: "/admin/symptoms/new", label: "Add Symptom" }}
      />

      <AdminTable
        data={rows}
        editHref={(row) => `/admin/symptoms/${row.id}`}
        deleteAction={deleteSymptom}
        emptyMessage="No symptoms yet."
        columns={[
          { key: "label", label: "Label" },
          {
            key: "description",
            label: "Description",
            render: (row) => (
              <span className="text-on-surface-variant line-clamp-1 max-w-[320px]">
                {row.description ?? "—"}
              </span>
            ),
          },
          {
            key: "remedyCount",
            label: "Remedies",
            render: (row) => <span className="text-on-surface-variant">{row.remedyCount}</span>,
          },
          {
            key: "herbCount",
            label: "Herbs",
            render: (row) => <span className="text-on-surface-variant">{row.herbCount}</span>,
          },
        ]}
      />
    </div>
  )
}
