"use client"

import { useState, useEffect } from "react"

function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

interface Props {
  defaultName?: string
  defaultSlug?: string
  basePath?: string // e.g. "/herbs/" to show preview URL
}

export default function SlugInput({ defaultName = "", defaultSlug = "", basePath }: Props) {
  const [slug, setSlug] = useState(defaultSlug || nameToSlug(defaultName))
  const [edited, setEdited] = useState(!!defaultSlug)

  // Exposed for the name field to call
  useEffect(() => {
    const handler = (e: CustomEvent<string>) => {
      if (!edited) {
        setSlug(nameToSlug(e.detail))
      }
    }
    window.addEventListener("naturamed:namechange", handler as EventListener)
    return () => window.removeEventListener("naturamed:namechange", handler as EventListener)
  }, [edited])

  return (
    <div className="flex flex-col gap-1.5">
      <input
        type="text"
        name="slug"
        value={slug}
        onChange={(e) => {
          setEdited(true)
          setSlug(nameToSlug(e.target.value) || e.target.value)
        }}
        className="w-full rounded-xl bg-surface-low border border-ghost px-4 py-3 text-[15px] text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30 transition font-mono"
        placeholder="url-slug"
        required
      />
      {basePath && slug && (
        <p
          className="text-[11px] text-on-surface-variant"
          style={{ fontFamily: "var(--font-work-sans)" }}
        >
          Preview: {basePath}{slug}
        </p>
      )}
    </div>
  )
}
