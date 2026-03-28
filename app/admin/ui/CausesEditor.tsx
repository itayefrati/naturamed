"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

interface Cause {
  label: string
  description: string
}

interface Props {
  defaultValue?: Cause[]
}

export default function CausesEditor({ defaultValue = [] }: Props) {
  const [causes, setCauses] = useState<Cause[]>(
    defaultValue.length > 0 ? defaultValue : [{ label: "", description: "" }]
  )

  function addCause() {
    setCauses((prev) => [...prev, { label: "", description: "" }])
  }

  function removeCause(index: number) {
    setCauses((prev) => prev.filter((_, i) => i !== index))
  }

  function updateCause(index: number, field: keyof Cause, value: string) {
    setCauses((prev) =>
      prev.map((cause, i) => (i === index ? { ...cause, [field]: value } : cause))
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Hidden serialized value */}
      <input
        type="hidden"
        name="causes"
        value={JSON.stringify(causes.filter((c) => c.label.trim()))}
      />

      {causes.map((cause, i) => (
        <div
          key={i}
          className="rounded-xl border border-outline-variant/30 bg-surface-low p-4 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.06rem] text-on-surface-variant"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              Cause {i + 1}
            </span>
            {causes.length > 1 && (
              <button
                type="button"
                onClick={() => removeCause(i)}
                className="text-on-surface-variant hover:text-on-surface transition-colors"
                aria-label="Remove cause"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
          <input
            type="text"
            value={cause.label}
            onChange={(e) => updateCause(i, "label", e.target.value)}
            placeholder="Cause label (e.g. Poor Diet)"
            className="w-full rounded-lg bg-surface-lowest border border-ghost px-3 py-2.5 text-[14px] text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
          />
          <textarea
            value={cause.description}
            onChange={(e) => updateCause(i, "description", e.target.value)}
            placeholder="Brief description of this cause…"
            rows={2}
            className="w-full rounded-lg bg-surface-lowest border border-ghost px-3 py-2.5 text-[14px] text-on-surface placeholder-on-surface-variant resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addCause}
        className="flex items-center gap-2 text-[13px] text-primary-container hover:underline font-medium self-start"
        style={{ fontFamily: "var(--font-work-sans)" }}
      >
        <Plus size={14} />
        Add cause
      </button>
    </div>
  )
}
