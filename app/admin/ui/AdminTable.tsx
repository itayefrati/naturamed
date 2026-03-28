import Link from "next/link"
import { Pencil } from "lucide-react"
import DeleteButton from "./DeleteButton"

export interface Column<T> {
  key: string
  label: string
  render?: (row: T) => React.ReactNode
}

interface Props<T extends { id: string }> {
  columns: Column<T>[]
  data: T[]
  editHref: (row: T) => string
  // Pass a bound Server Action: (id: string) => Promise<void>
  deleteAction?: (formData: FormData) => Promise<void>
  emptyMessage?: string
}

export default function AdminTable<T extends { id: string }>({
  columns,
  data,
  editHref,
  deleteAction,
  emptyMessage = "No items yet",
}: Props<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl bg-surface-lowest border border-outline-variant/20 shadow-ambient p-10 text-center">
        <p className="text-[15px] text-on-surface-variant">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-surface-lowest border border-outline-variant/20 shadow-ambient overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-outline-variant/20 bg-surface-low">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.07rem] text-on-surface-variant"
                  style={{ fontFamily: "var(--font-work-sans)" }}
                >
                  {col.label}
                </th>
              ))}
              <th
                className="px-6 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.07rem] text-on-surface-variant w-28"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-low/50 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-3.5 text-[14px] text-on-surface">
                    {col.render
                      ? col.render(row)
                      : String((row as Record<string, unknown>)[col.key] ?? "")}
                  </td>
                ))}
                <td className="px-6 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={editHref(row)}
                      className="inline-flex items-center gap-1 text-[12px] text-primary-container hover:underline font-medium"
                      style={{ fontFamily: "var(--font-work-sans)" }}
                    >
                      <Pencil size={12} />
                      Edit
                    </Link>
                    {deleteAction && (
                      <DeleteButton id={row.id} action={deleteAction} />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
