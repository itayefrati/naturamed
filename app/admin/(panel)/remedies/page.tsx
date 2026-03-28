import Link from "next/link"
import { supabaseAdmin } from "@/lib/supabase-admin"
import AdminPageHeader from "@/app/admin/ui/AdminPageHeader"
import AdminTable from "@/app/admin/ui/AdminTable"
import { deleteRemedy } from "@/app/admin/actions/remedies"
import { CheckCircle, ExternalLink } from "lucide-react"

export const metadata = { title: "Remedies — NaturaMed Admin" }

export default async function AdminRemediesPage() {
  const { data: remedies } = await supabaseAdmin
    .from("remedies")
    .select("id, name, prep_time, is_curated, conditions(name, slug)")
    .order("name")

  type Row = {
    id: string
    name: string
    prep_time: string | null
    is_curated: boolean
    conditions: { name: string; slug: string } | null
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1100px]">
      <AdminPageHeader
        eyebrow="Content"
        title="Remedies"
        cta={{ href: "/admin/remedies/new", label: "Add Remedy" }}
      />

      <AdminTable
        data={(remedies ?? []) as unknown as Row[]}
        editHref={(row) => `/admin/remedies/${row.id}`}
        deleteAction={deleteRemedy}
        emptyMessage="No remedies yet."
        columns={[
          { key: "name", label: "Name" },
          {
            key: "condition",
            label: "Condition",
            render: (row) =>
              row.conditions?.slug ? (
                <Link
                  href={`/conditions/${row.conditions.slug}`}
                  target="_blank"
                  className="flex items-center gap-1 text-on-surface-variant hover:text-primary-container transition-colors"
                >
                  {row.conditions.name}
                  <ExternalLink size={11} strokeWidth={1.5} />
                </Link>
              ) : (
                <span className="text-on-surface-variant">—</span>
              ),
          },
          {
            key: "prep_time",
            label: "Prep Time",
            render: (row) => (
              <span className="text-on-surface-variant">{row.prep_time ?? "—"}</span>
            ),
          },
          {
            key: "is_curated",
            label: "Curated",
            render: (row) =>
              row.is_curated ? (
                <CheckCircle size={16} className="text-primary-container" />
              ) : (
                <span className="text-on-surface-variant">—</span>
              ),
          },
        ]}
      />
    </div>
  )
}
