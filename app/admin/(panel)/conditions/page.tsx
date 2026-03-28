import { supabaseAdmin } from "@/lib/supabase-admin"
import AdminPageHeader from "@/app/admin/ui/AdminPageHeader"
import AdminTable from "@/app/admin/ui/AdminTable"
import { deleteCondition } from "@/app/admin/actions/conditions"

export const metadata = { title: "Conditions — NaturaMed Admin" }

export default async function AdminConditionsPage() {
  const { data: conditions } = await supabaseAdmin
    .from("conditions")
    .select("id, name, slug, category, causes")
    .order("category")
    .order("name")

  return (
    <div className="flex flex-col gap-6 max-w-[1100px]">
      <AdminPageHeader
        eyebrow="Content"
        title="Conditions"
        cta={{ href: "/admin/conditions/new", label: "Add Condition" }}
      />

      <AdminTable
        data={conditions ?? []}
        editHref={(row) => `/admin/conditions/${row.id}`}
        deleteAction={deleteCondition}
        emptyMessage="No conditions yet."
        columns={[
          { key: "name", label: "Name" },
          { key: "category", label: "Category" },
          { key: "slug", label: "Slug", render: (row) => <span className="font-mono text-[12px]">{row.slug}</span> },
          {
            key: "causes",
            label: "Causes",
            render: (row) => {
              const count = Array.isArray(row.causes) ? row.causes.length : 0
              return <span className="text-on-surface-variant">{count}</span>
            },
          },
        ]}
      />
    </div>
  )
}
