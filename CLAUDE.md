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
- Fonts: **Noto Serif** (primary serif), Playfair Display (fallback serif), DM Sans (sans), Work Sans (labels/eyebrows) — all loaded in `app/layout.tsx`

## Architecture

### Next.js 16 async params
All dynamic route pages must `await params`:
```tsx
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
```

### Data pattern
Server components fetch from Supabase directly and fall back to hardcoded constants when the DB returns empty. Client components receive data as props. The only client components are those that need state/interaction: `Navbar`, `EntryModal`, `HerbFilter`, `SearchBar`, `SymptomsPage`, `NewsletterForm`.

### Design system
All color/shadow/typography utilities come from CSS variables defined in `app/globals.css`. Key custom classes:
- `.glass` — glazed navbar background (80% opacity + backdrop-blur)
- `.btn-primary` — gradient green CTA button (primary → primary-container at 135deg)
- `.shadow-ambient` / `.shadow-ambient-lg` — soft organic shadows
- `.border-ghost` — 20%-opacity border for form inputs

The surface layer hierarchy is: `bg-surface-lowest` (#ffffff, white cards) → `bg-surface-low` → `bg-surface` (#fbf9f8, page default) → `bg-surface-high` (footer). Section alternation follows this order. Cards always use `bg-surface-lowest` for contrast against the page background.

### Card style convention
All content cards follow this pattern:
```tsx
className="rounded-2xl bg-surface-lowest p-6 shadow-ambient border border-outline-variant/20"
```
Hover cards (links) add: `hover:shadow-ambient-lg hover:-translate-y-1 transition-all duration-200`

### Section header convention
Every content section uses a 3-level header pattern:
```tsx
<p className="text-[11px] font-semibold uppercase tracking-[0.08rem] text-on-surface-variant" style={{ fontFamily: "var(--font-work-sans)" }}>
  Eyebrow Label
</p>
<h2 className="font-serif font-semibold text-[28px] md:text-[34px] text-on-surface tracking-tight">
  Section Title
</h2>
```

### Hero sections (dark green)
Pages that use a `bg-primary` hero (conditions, remedy detail, category pages) follow this pattern:
- Breadcrumb: `text-on-primary/60`, hover `text-on-primary`
- Eyebrow: `text-on-primary-container`, Work Sans, uppercase
- Headline: `font-serif font-bold text-[36px] md:text-[48px] text-on-primary`
- Subtitle: `text-on-primary/75`

### Hero sections (white/surface)
Pages that use a `bg-surface` hero (home, herb library, remedies, herbs) follow this pattern:
- Eyebrow: `text-[11px] font-semibold uppercase tracking-[0.1rem] text-on-surface-variant`
- Headline: `font-serif font-bold text-[44px] sm:text-[58px] lg:text-[68px] text-on-surface tracking-tight`
- Subtitle: `text-[17px] text-on-surface-variant max-w-xl leading-relaxed`

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

## Design Rules

- **Never use emojis** anywhere in the codebase — not in UI components, pages, or data. Use lucide-react SVG icons or plain text instead. This applies to icon fields in data objects too.
- **No orange/amber colors** — never use `tertiary`, `tertiary-fixed`, `tertiary-fixed-dim`, `caution`, or `caution-bg` color tokens anywhere. The palette is strictly dark green + white/near-white surfaces.
- **No colored badge/pill backgrounds** for cautions or warnings — use a white `bg-surface-lowest` card with a `ShieldAlert` lucide icon in `text-primary-container` and green bullet dots.
- **No colored badge/pill backgrounds** for category labels — use plain uppercase text `text-primary-container` with Work Sans, no background color.
- **Real photography only** — card image areas use real `<img>` tags pointing to confirmed Stitch (`lh3.googleusercontent.com/aida-public/`) or Unsplash CDN URLs. Never use emoji, CSS gradient, or unverified image URLs as placeholders. If no confirmed photo exists for a herb, render nothing (no placeholder image).
- **No decorative emoji overlays** — hero sections and backgrounds use CSS only.
- **Fonts**: Headlines and card titles use `font-serif` (Noto Serif). Body/description text uses the default sans. Labels, eyebrows, badges, and buttons use Work Sans via `style={{ fontFamily: "var(--font-work-sans)" }}`.
- **Borders for contrast** — white cards on a near-white surface need `border border-outline-variant/20` to be distinguishable. Use `border-outline-variant/30` for caution/safety cards.
- **Caution text must never be a badge** — caution strings are full sentences and overflow a pill/badge. Always render them as a list inside a white card with a `ShieldAlert` icon.

## Confirmed Stitch Botanical Photos

These are the only verified herb photos from the Stitch design project. Use these slugs and URLs:

```ts
const STITCH_PHOTOS: Record<string, string> = {
  "ginger": "https://lh3.googleusercontent.com/aida-public/AB6AXuB3XQfnBW_0jltiiOPfJXz6abax4aUJhubvkAG2a5NrktmczJBDNjcw_iUiL1Qo1QTUFyS8begvtuTqjYVyXuJ-3uBRZCki-2XsPNy1cwQnOG7HD8C6QFq1hLos2nbhVJ9DCmEnJyN09GZsUMQGk9sn3ySvpvs3aiOUFDc51l2eLK9UtA8woTnGsFq3732NAEc2ckjzVa2E1ONL6ZkxZU5VPkuS1ICZm2Au88lyth3NKuah6fQi0drTR_V_RobakEKjkV292gUWJQ",
  "lavender": "https://lh3.googleusercontent.com/aida-public/AB6AXuD0FMBMFflRGMRWX9_EZd48ivctzNkYvw_fwDOF-oFp5HoIZDzIrO2WsMOn1F76qQlBKYMUCKgCLUppkyjm37ouo3WGWeD2toos3WB0MckOEhXONROBXkzvTWJtC2kW07S2JBU-3iPEbfTkNoG6wOYBA1uEotuN7yM-dsdTRhGaWJ_jfbPmBtEiujeHydzoN1xZREhBb_dZM-lv5JlTKhtpWLoRPGawc26fryXXV0mAbAUDs-IwBwrAnLQIDZY16MoGYw-TueHV2g",
  "echinacea": "https://lh3.googleusercontent.com/aida-public/AB6AXuA9Utff1kMBtQiIdhWOniB9xVyINxcf5kvFACGkA1f6ZgPOSVmG0oliFOpoqBQrd0_beyHktynRySlTDCdE-nKwSPbUywKB2DnyyEGi9yaS6IGQoSAkcJMvK3WPC4_7IlHRImsKfVkD41B6eISKw4RPCkaKM9nfjSBwWfooCIG3mgCFUvLCECd7HyHsYwFSVXtz_S5LSNq66evcN3nHTawIBZBngLJUIgP9RVhK0Vlw9GFMxv9FRYZZEMZ_Lh0nrWEq6ikl14tG1w",
  "st-johns-wort": "https://lh3.googleusercontent.com/aida-public/AB6AXuDGTFRkr1IHD-jU8UnbbOKrLw3DkTIycPVWoBybM3YZ0zNQQe8DptgKCfoeRglRIqFgtk5nt_3eFTlBp3bxSpGyZpFYZ49F8_43TJXKPTqj8CiwOo_nxkpGBemHWjvVrcgcpMbLZ0rnHBLKGEApjUNpoRemoDieUKfiGQ1ZZ8BNUpEbMfxR01ZDjetEln7fW2lkQRaFnPchYRNgwQPPmnrEUFt2M1IwgET-XoFQOvzzp-g9YCiXD8aEUQ7eB5HQueb1UiypKRF6sg",
};
```

Do not add new entries to this map without visually confirming the photo matches the herb.

## Navbar

- Logo: lucide `Leaf` icon (`size={20} strokeWidth={1.5} className="text-primary-container"`) + `font-serif` "NaturaMed" text
- Desktop links: Work Sans 14px, `text-on-surface-variant`
- CTA button: `btn-primary rounded-full px-5 py-2 text-[13px] font-semibold`
- Background: `.glass` (80% opacity + backdrop-blur)
