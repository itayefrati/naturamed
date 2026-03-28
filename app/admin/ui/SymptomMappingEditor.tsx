"use client"

import { useState } from "react"
import { saveSymptomRemedyMappings, saveSymptomHerbMappings } from "@/app/admin/actions/mappings"
import { CheckSquare, Square } from "lucide-react"

interface Symptom { id: string; label: string }
interface Remedy  { id: string; name: string }
interface Herb    { id: string; name: string }

interface Props {
  symptoms: Symptom[]
  remedies: Remedy[]
  herbs: Herb[]
  remedyMappings: Record<string, string[]>  // symptom_id -> remedy_id[]
  herbMappings: Record<string, string[]>    // symptom_id -> herb_id[]
}

type Tab = "remedies" | "herbs"

export default function SymptomMappingEditor({
  symptoms,
  remedies,
  herbs,
  remedyMappings,
  herbMappings,
}: Props) {
  const [selectedSymptom, setSelectedSymptom] = useState<string>(symptoms[0]?.id ?? "")
  const [currentRemedyMap, setCurrentRemedyMap] = useState<Record<string, string[]>>(remedyMappings)
  const [currentHerbMap, setCurrentHerbMap] = useState<Record<string, string[]>>(herbMappings)
  const [tab, setTab] = useState<Tab>("remedies")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  function toggleRemedy(remedyId: string) {
    setCurrentRemedyMap((prev) => {
      const current = prev[selectedSymptom] ?? []
      const next = current.includes(remedyId)
        ? current.filter((id) => id !== remedyId)
        : [...current, remedyId]
      return { ...prev, [selectedSymptom]: next }
    })
  }

  function toggleHerb(herbId: string) {
    setCurrentHerbMap((prev) => {
      const current = prev[selectedSymptom] ?? []
      const next = current.includes(herbId)
        ? current.filter((id) => id !== herbId)
        : [...current, herbId]
      return { ...prev, [selectedSymptom]: next }
    })
  }

  async function handleSave() {
    setSaving(true)
    const fd1 = new FormData()
    fd1.append("symptom_id", selectedSymptom)
    fd1.append("remedy_ids", JSON.stringify(currentRemedyMap[selectedSymptom] ?? []))
    await saveSymptomRemedyMappings(fd1)

    const fd2 = new FormData()
    fd2.append("symptom_id", selectedSymptom)
    fd2.append("herb_ids", JSON.stringify(currentHerbMap[selectedSymptom] ?? []))
    await saveSymptomHerbMappings(fd2)

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const selectedRemedies = currentRemedyMap[selectedSymptom] ?? []
  const selectedHerbs = currentHerbMap[selectedSymptom] ?? []

  return (
    <div className="flex gap-6 h-[600px]">
      {/* Left: symptom list */}
      <div className="w-64 shrink-0 rounded-2xl bg-surface-lowest border border-outline-variant/20 shadow-ambient overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b border-outline-variant/20">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.07rem] text-on-surface-variant"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            Symptoms
          </p>
        </div>
        <ul className="flex-1 overflow-y-auto py-1">
          {symptoms.map((s) => {
            const rCount = (currentRemedyMap[s.id] ?? []).length
            const hCount = (currentHerbMap[s.id] ?? []).length
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setSelectedSymptom(s.id)}
                  className={`w-full text-left px-4 py-2.5 text-[14px] transition-colors flex items-center justify-between ${
                    selectedSymptom === s.id
                      ? "bg-primary/10 text-primary-container font-semibold"
                      : "text-on-surface-variant hover:bg-surface-high hover:text-on-surface"
                  }`}
                  style={{ fontFamily: "var(--font-work-sans)" }}
                >
                  <span className="truncate">{s.label}</span>
                  <span className="text-[11px] shrink-0 ml-2 opacity-60">
                    {rCount}R {hCount}H
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Right: mappings */}
      <div className="flex-1 rounded-2xl bg-surface-lowest border border-outline-variant/20 shadow-ambient overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-3 border-b border-outline-variant/20">
          <div className="flex gap-1">
            {(["remedies", "herbs"] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors capitalize ${
                  tab === t
                    ? "bg-primary/10 text-primary-container"
                    : "text-on-surface-variant hover:bg-surface-high"
                }`}
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="btn-primary px-4 py-2 rounded-full text-[13px] font-semibold disabled:opacity-60"
          >
            {saving ? "Saving…" : saved ? "Saved!" : "Save"}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {tab === "remedies"
            ? remedies.map((r) => {
                const checked = selectedRemedies.includes(r.id)
                return (
                  <label
                    key={r.id}
                    className="flex items-center gap-3 px-5 py-2.5 hover:bg-surface-high transition-colors cursor-pointer"
                  >
                    <span className={checked ? "text-primary-container" : "text-on-surface-variant"}>
                      {checked ? <CheckSquare size={16} /> : <Square size={16} />}
                    </span>
                    <span
                      className={`text-[14px] ${checked ? "text-on-surface font-medium" : "text-on-surface-variant"}`}
                    >
                      {r.name}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggleRemedy(r.id)}
                    />
                  </label>
                )
              })
            : herbs.map((h) => {
                const checked = selectedHerbs.includes(h.id)
                return (
                  <label
                    key={h.id}
                    className="flex items-center gap-3 px-5 py-2.5 hover:bg-surface-high transition-colors cursor-pointer"
                  >
                    <span className={checked ? "text-primary-container" : "text-on-surface-variant"}>
                      {checked ? <CheckSquare size={16} /> : <Square size={16} />}
                    </span>
                    <span
                      className={`text-[14px] ${checked ? "text-on-surface font-medium" : "text-on-surface-variant"}`}
                    >
                      {h.name}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggleHerb(h.id)}
                    />
                  </label>
                )
              })}
        </div>
      </div>
    </div>
  )
}
