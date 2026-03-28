import Link from "next/link"
import { supabaseAdmin } from "@/lib/supabase-admin"
import AdminPageHeader from "@/app/admin/ui/AdminPageHeader"
import AdminTable from "@/app/admin/ui/AdminTable"
import { deleteCondition } from "@/app/admin/actions/conditions"
import { ExternalLink } from "lucide-react"

export const metadata = { title: "Conditions — NaturaMed Admin" }

export default async function AdminConditionsPage() {
  const { data: conditions } = await supabaseAdmin
    .from("conditions")
    .select("id, name, slug, category")
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
          {
            key: "slug",
            label: "Slug",
            render: (row) => (
              <Link
                href={`/conditions/${row.slug}`}
                target="_blank"
                className="flex items-center gap-1 font-mono text-[12px] text-on-surface-variant hover:text-primary-container transition-colors"
              >
                {row.slug}
                <ExternalLink size={11} strokeWidth={1.5} />
              </Link>
            ),
          },
        ]}
      />
    </div>
  )
}
