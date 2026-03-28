"use client"

import { useState } from "react"
import SlugInput from "./SlugInput"

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
  basePath?: string
  namePlaceholder?: string
}

export default function NameWithSlug({
  defaultName = "",
  defaultSlug = "",
  basePath,
  namePlaceholder = "Enter name",
}: Props) {
  const [slug, setSlug] = useState(defaultSlug || nameToSlug(defaultName))
  const [slugEdited, setSlugEdited] = useState(!!defaultSlug)

  return (
    <>
      {/* Name field */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="name"
          className="text-[13px] font-medium text-on-surface"
          style={{ fontFamily: "var(--font-work-sans)" }}
        >
          Name <span className="text-primary-container">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={defaultName}
          placeholder={namePlaceholder}
          onChange={(e) => {
            if (!slugEdited) setSlug(nameToSlug(e.target.value))
          }}
          className="w-full rounded-xl bg-surface-low border border-ghost px-4 py-3 text-[15px] text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
        />
      </div>

      {/* Slug field */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="slug"
          className="text-[13px] font-medium text-on-surface"
          style={{ fontFamily: "var(--font-work-sans)" }}
        >
          URL Slug <span className="text-primary-container">*</span>
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          required
          value={slug}
          onChange={(e) => {
            setSlugEdited(true)
            setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))
          }}
          className="w-full rounded-xl bg-surface-low border border-ghost px-4 py-3 text-[15px] text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30 transition font-mono"
          placeholder="url-slug"
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
    </>
  )
}
