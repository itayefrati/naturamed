import Link from "next/link"
import { supabaseAdmin } from "@/lib/supabase-admin"
import AdminPageHeader from "@/app/admin/ui/AdminPageHeader"
import AdminTable from "@/app/admin/ui/AdminTable"
import { deleteHerb } from "@/app/admin/actions/herbs"
import { CheckCircle, ExternalLink } from "lucide-react"

export const metadata = { title: "Herbs — NaturaMed Admin" }

export default async function AdminHerbsPage() {
  const { data: herbs } = await supabaseAdmin
    .from("herbs")
    .select("id, name, slug, herb_of_day, created_at")
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
            key: "slug",
            label: "Slug",
            render: (row) => (
              <Link
                href={`/herbs/${row.slug}`}
                target="_blank"
                className="flex items-center gap-1 font-mono text-[12px] text-on-surface-variant hover:text-primary-container transition-colors"
              >
                {row.slug}
                <ExternalLink size={11} strokeWidth={1.5} />
              </Link>
            ),
          },
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
