import { supabaseAdmin } from "@/lib/supabase-admin"

interface Props {
  defaultValue?: string
  name?: string
  required?: boolean
}

const CATEGORIES = [
  "Digestive Health",
  "Respiratory Health",
  "Mental & Emotional Health",
  "Sleep & Relaxation",
  "Pain & Inflammation",
  "Skin Health",
  "Immune Support",
  "Hormonal Health",
  "Cardiovascular Health",
  "Metabolic Health",
  "Urinary Health",
  "Eye Health",
  "Oral Health",
  "Men's Health",
  "Women's Health",
  "Children's Health",
  "General Wellness",
  "Detox & Cleansing",
]

export default async function ConditionSelect({
  defaultValue,
  name = "condition_id",
  required = false,
}: Props) {
  const { data: conditions } = await supabaseAdmin
    .from("conditions")
    .select("id, name, category")
    .order("category")
    .order("name")

  // Group by category
  const grouped: Record<string, { id: string; name: string }[]> = {}
  for (const c of conditions ?? []) {
    if (!grouped[c.category]) grouped[c.category] = []
    grouped[c.category].push({ id: c.id, name: c.name })
  }

  return (
    <select
      name={name}
      defaultValue={defaultValue ?? ""}
      required={required}
      className="w-full rounded-xl bg-surface-low border border-ghost px-4 py-3 text-[15px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
    >
      <option value="" disabled>
        Select a condition…
      </option>
      {CATEGORIES.filter((cat) => grouped[cat]).map((cat) => (
        <optgroup key={cat} label={cat}>
          {grouped[cat].map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </optgroup>
      ))}
      {/* Uncategorized */}
      {Object.keys(grouped)
        .filter((cat) => !CATEGORIES.includes(cat))
        .map((cat) => (
          <optgroup key={cat} label={cat}>
            {grouped[cat].map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </optgroup>
        ))}
    </select>
  )
}
