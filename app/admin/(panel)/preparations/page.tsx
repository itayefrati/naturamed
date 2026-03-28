import { supabaseAdmin } from "@/lib/supabase-admin"
import AdminPageHeader from "@/app/admin/ui/AdminPageHeader"
import AdminTable from "@/app/admin/ui/AdminTable"
import { deletePreparationMethod } from "@/app/admin/actions/preparations"

export const metadata = { title: "Preparation Methods — NaturaMed Admin" }

export default async function AdminPreparationsPage() {
  const { data: methods } = await supabaseAdmin
    .from("preparation_methods")
    .select("id, name, description, steps")
    .order("name")

  type Row = {
    id: string
    name: string
    description: string | null
    steps: string[] | null
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1100px]">
      <AdminPageHeader
        eyebrow="Reference"
        title="Preparation Methods"
        cta={{ href: "/admin/preparations/new", label: "Add Method" }}
      />

      <AdminTable
        data={(methods ?? []) as Row[]}
        editHref={(row) => `/admin/preparations/${row.id}`}
        deleteAction={deletePreparationMethod}
        emptyMessage="No preparation methods yet."
        columns={[
          { key: "name", label: "Name" },
          {
            key: "description",
            label: "Description",
            render: (row) => (
              <span className="text-on-surface-variant line-clamp-1 max-w-[400px]">
                {row.description ?? "—"}
              </span>
            ),
          },
          {
            key: "steps",
            label: "Steps",
            render: (row) => (
              <span className="text-on-surface-variant">
                {Array.isArray(row.steps) ? row.steps.length : 0}
              </span>
            ),
          },
        ]}
      />
    </div>
  )
}
