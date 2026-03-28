"use client"

import { Trash2 } from "lucide-react"

interface Props {
  id: string
  action: (formData: FormData) => Promise<void>
}

export default function DeleteButton({ id, action }: Props) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!confirm("Delete this item? This cannot be undone.")) {
      e.preventDefault()
    }
  }

  return (
    <form action={action} onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex items-center gap-1 text-[12px] text-on-surface-variant hover:text-on-surface transition-colors"
        style={{ fontFamily: "var(--font-work-sans)" }}
      >
        <Trash2 size={12} />
        Delete
      </button>
    </form>
  )
}
