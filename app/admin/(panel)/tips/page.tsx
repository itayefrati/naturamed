import { supabaseAdmin } from "@/lib/supabase-admin"
import AdminPageHeader from "@/app/admin/ui/AdminPageHeader"
import AdminTable from "@/app/admin/ui/AdminTable"
import { deleteTip } from "@/app/admin/actions/tips"

export const metadata = { title: "Daily Tips — NaturaMed Admin" }

export default async function AdminTipsPage() {
  const { data: tips } = await supabaseAdmin
    .from("daily_tips")
    .select("id, content, category, created_at")
    .order("created_at", { ascending: false })

  type Row = {
    id: string
    content: string
    category: string | null
    created_at: string
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1100px]">
      <AdminPageHeader
        eyebrow="Reference"
        title="Daily Tips"
        cta={{ href: "/admin/tips/new", label: "Add Tip" }}
      />

      <AdminTable
        data={(tips ?? []) as Row[]}
        editHref={(row) => `/admin/tips/${row.id}`}
        deleteAction={deleteTip}
        emptyMessage="No daily tips yet."
        columns={[
          {
            key: "content",
            label: "Content",
            render: (row) => (
              <span className="line-clamp-2 max-w-[500px] text-on-surface">
                {row.content.slice(0, 100)}{row.content.length > 100 ? "…" : ""}
              </span>
            ),
          },
          {
            key: "category",
            label: "Category",
            render: (row) => (
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.05rem] text-on-surface-variant"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                {row.category ?? "—"}
              </span>
            ),
          },
          {
            key: "created_at",
            label: "Added",
            render: (row) => (
              <span className="text-on-surface-variant text-[13px]">
                {new Date(row.created_at).toLocaleDateString()}
              </span>
            ),
          },
        ]}
      />
    </div>
  )
}
