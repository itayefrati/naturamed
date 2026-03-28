"use client"

import { useState, KeyboardEvent } from "react"
import { X } from "lucide-react"

interface Props {
  name: string
  defaultValue?: string[]
  placeholder?: string
}

export default function TagInput({ name, defaultValue = [], placeholder = "Type and press Enter" }: Props) {
  const [tags, setTags] = useState<string[]>(defaultValue)
  const [input, setInput] = useState("")

  function addTag(value: string) {
    const trimmed = value.trim()
    if (!trimmed || tags.includes(trimmed)) return
    setTags((prev) => [...prev, trimmed])
    setInput("")
  }

  function removeTag(index: number) {
    setTags((prev) => prev.filter((_, i) => i !== index))
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(input)
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Hidden input for Server Action submission */}
      <input type="hidden" name={name} value={JSON.stringify(tags)} />

      {/* Tag display + text input */}
      <div className="min-h-[44px] w-full rounded-xl bg-surface-low border border-ghost px-3 py-2 flex flex-wrap gap-1.5 focus-within:ring-2 focus-within:ring-primary/30 transition">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary-container text-[13px] font-medium"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(i)}
              className="text-primary-container/60 hover:text-primary-container transition-colors"
              aria-label={`Remove ${tag}`}
            >
              <X size={11} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(input)}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[140px] bg-transparent text-[14px] text-on-surface placeholder-on-surface-variant focus:outline-none"
        />
      </div>
      <p
        className="text-[11px] text-on-surface-variant"
        style={{ fontFamily: "var(--font-work-sans)" }}
      >
        Press Enter or comma to add each item
      </p>
    </div>
  )
}
