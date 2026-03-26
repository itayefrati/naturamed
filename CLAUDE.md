# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Next.js Turbopack)
npm run build      # Production build + TypeScript check
npm run lint       # ESLint

# Seed the database (run once, or to reset)
node scripts/seed-tables.mjs      # herbs, daily_tips, preparation_methods
node scripts/seed-symptoms.mjs    # symptoms, symptom_remedies, symptom_herbs
```

No test suite exists yet.

## Stack

- **Next.js 16.2.1** App Router — React 19, TypeScript
- **Tailwind CSS v4** — tokens live in `app/globals.css` under `@theme {}`, NOT in `tailwind.config.js` (there is none)
- **Supabase** — single client exported from `lib/supabase.ts`; used directly in server components
- **Anthropic SDK** — AI fallback at `app/api/ai-healer/route.ts` (POST, returns JSON)
- Fonts: Playfair Display (serif), DM Sans (sans), Work Sans (labels/eyebrows) — loaded in `app/layout.tsx`

## Architecture

### Next.js 16 async params
All dynamic route pages must `await params`:
```tsx
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
```

### Data pattern
Server components fetch from Supabase directly and fall back to hardcoded constants when the DB returns empty. Client components receive data as props. The only client components are those that need state/interaction: `Navbar`, `EntryModal`, `HerbFilter`, `SearchBar`, `SymptomsPage`.

### Design system
All color/shadow/typography utilities come from CSS variables defined in `app/globals.css`. Key custom classes:
- `.glass` — glazed navbar background (80% opacity + backdrop-blur)
- `.btn-primary` — gradient green CTA button
- `.shadow-ambient` / `.shadow-ambient-lg` — soft organic shadows
- `.border-ghost` — 20%-opacity border for form inputs

The surface layer hierarchy is: `bg-surface-lowest` (white cards) → `bg-surface-low` → `bg-surface` (page default) → `bg-surface-high` (footer). Section alternation follows this order.

### `toLines()` helper
Used in condition and symptom-results pages to normalize Supabase fields that may be stored as either a newline-delimited string or a JSON array:
```ts
function toLines(val: string | string[] | null | undefined): string[]
```

### Symptom engine
`/symptoms` (client) → redirects to `/symptoms/results?symptoms=Headache,Anxiety` (server).
The results page queries `symptom_remedies` and `symptom_herbs` junction tables, scores remedies by how many of the user's symptoms they match, and ranks them descending.

### Supabase schema (key tables)
- `herbs` — `slug`, `name`, `medicinal_properties` (text[]), `herb_of_day` (bool)
- `conditions` — `slug`, `name`, `category`, `causes` (jsonb)
- `remedies` — `condition_id` FK, `is_curated`, `prep_time`, `cautions`, `ingredients`, `steps`
- `symptoms` — `label`, `description`
- `symptom_remedies` — junction: `symptom_id` + `remedy_id`
- `symptom_herbs` — junction: `symptom_id` + `herb_id`
- `preparation_methods` — `name`, `description`, `steps` (text[])
- `daily_tips` — `content`

### Supabase type-casting
When selecting joined relations (e.g., `.select("remedies(id, name, ...)")`), cast the result with `as unknown as TargetType` — a single `as` cast fails TypeScript because the inferred array type doesn't overlap with `Record<string, unknown>`.

### Seed scripts
The seed scripts parse `.env.local` manually with `fs.readFileSync` (no dotenv dependency). They clear tables with `.delete().neq("id", "00000000-...")` before inserting, since Supabase requires a real constraint for `upsert` conflict resolution.
