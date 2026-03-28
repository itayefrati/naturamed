import Link from "next/link"
import { supabaseAdmin } from "@/lib/supabase-admin"
import AdminPageHeader from "@/app/admin/ui/AdminPageHeader"
import AdminTable from "@/app/admin/ui/AdminTable"
import { deleteHerb } from "@/app/admin/actions/herbs"
import { CheckCircle } from "lucide-react"

export const metadata = { title: "Herbs — NaturaMed Admin" }

export default async function AdminHerbsPage() {
  const { data: herbs } = await supabaseAdmin
    .from("herbs")
    .select("id, name, slug, latin_name, herb_of_day, created_at")
    .order("name")

  return (
    <div className="flex flex-col gap-6 max-w-[1100px]">
      <AdminPageHeader
        eyebrow="Content"
        title="Herbs"
        cta={{ href: "/admin/herbs/new", label: "Add Herb" }}
      />

      <AdminTable
        data={herbs ?? []}
        editHref={(row) => `/admin/herbs/${row.id}`}
        deleteAction={deleteHerb}
        emptyMessage="No herbs yet. Add your first herb to get started."
        columns={[
          { key: "name", label: "Name" },
          {
            key: "latin_name",
            label: "Latin Name",
            render: (row) => (
              <span className="text-on-surface-variant italic">{row.latin_name ?? "—"}</span>
            ),
          },
          { key: "slug", label: "Slug", render: (row) => <span className="font-mono text-[12px]">{row.slug}</span> },
          {
            key: "herb_of_day",
            label: "Herb of Day",
            render: (row) =>
              row.herb_of_day ? (
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
