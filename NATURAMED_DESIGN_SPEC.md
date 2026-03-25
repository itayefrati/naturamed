# NaturaMed — Design Specification

Project-specific design brief. Use alongside CLAUDE_WEBSITE_BUILDER.md.
Read this file fully before writing any code.

---

## Reference Websites

Study these sites before building. NaturaMed must feel like it belongs
in this family.

| Site | What to take from it |
|------|----------------------|
| globalhealing.com | PRIMARY — color palette, section structure, category grid, serif + sans pairing, premium feel |
| joyoushealth.com | Card grid layout, white space, warm approachable tone |
| earthclinic.com | Content card pattern (image + title + description), browse page density |
| jillshomeremedies.com | Natural, handcrafted warmth, simple scannable layout |

---

## Brand

**Name:** NaturaMed
**Tagline:** Ancestral healing knowledge, brought into the digital age.
**Tone:** Trustworthy. Warm. Knowledgeable. Natural. Not clinical. Not pharmaceutical.
Think: a wise herbalist with a beautiful digital library.

**Homepage quote (display on every homepage):**
> "Because there is no disease in this world that God hasn't made a cure for."
> — Traditional wisdom

---

## Color System

```
Primary green:       #2D6A4F   buttons, nav, headings, interactive elements
Light green:         #D8F3DC   backgrounds, hover fills, subtle sections
Mid green:           #B7E4C7   borders, dividers, quote accents
White:               #FFFFFF   primary background
Off-white:           #F8FAF9   alternating section backgrounds
Text primary:        #1B1B1B   all body text
Text muted:          #555F5A   descriptions, secondary text
Caution amber:       #F4A261   caution badge border (warnings only)
Caution bg:          #FFF3E0   caution badge background
Caution text:        #B45309   caution badge text
```

**Rules:**
- No blue, purple, or pink anywhere
- No dark backgrounds — V1 is light mode only
- White is dominant — green is an accent, not a fill
- Amber is strictly for caution/warning badges only

---

## Typography

**Headline font:** Playfair Display (Google Fonts)
Used for: hero headlines, section titles, page H1s, quote blocks
Weights: 600 (section titles), 700 (hero)

**Body font:** DM Sans (Google Fonts)
Used for: navigation, body text, cards, buttons, labels, everything else
Weights: 400 regular, 500 medium, 600 emphasis

**Google Fonts import:**
```
Playfair Display: wght@600;700
DM Sans: wght@400;500;600
```

**Type scale:**
```
Hero headline:    Playfair Display 700, 56px desktop / 36px mobile
Section title:    Playfair Display 600, 36px desktop / 28px mobile
Card title:       DM Sans 600, 18px
Body:             DM Sans 400, 16px, line-height 1.7
Small/label:      DM Sans 500, 13px, letter-spacing 0.04em
Navigation:       DM Sans 500, 15px
Button:           DM Sans 600, 15px
Quote:            Playfair Display italic, 20px, #2D6A4F
```

---

## Layout & Spacing

```
Max content width:      1200px, centered
Horizontal padding:     24px mobile, 48px desktop
Section padding:        80px vertical desktop / 48px mobile
Card border radius:     12px
Button border radius:   8px
Badge border radius:    4px
Card gap:               24px
Grid border:            1px solid #E8F3EB
```

**Grids:**
- Category tiles: 4 cols desktop → 3 tablet → 2 mobile
- Content cards: 3 cols desktop → 2 tablet → 1 mobile

---

## Tailwind Config Extensions

```js
theme: {
  extend: {
    colors: {
      'green-primary':  '#2D6A4F',
      'green-light':    '#D8F3DC',
      'green-mid':      '#B7E4C7',
      'off-white':      '#F8FAF9',
      'text-primary':   '#1B1B1B',
      'text-muted':     '#555F5A',
      'caution':        '#F4A261',
      'caution-bg':     '#FFF3E0',
      'caution-text':   '#B45309',
    },
    fontFamily: {
      serif: ['Playfair Display', 'Georgia', 'serif'],
      sans:  ['DM Sans', 'system-ui', 'sans-serif'],
    }
  }
}
```

---

## Page Structure — Homepage (top to bottom)

1. Sticky navbar
2. Hero (headline, quote, search bar, "Browse Categories" link)
3. Herb of the Day + Health Tip of the Day (2-column)
4. Category grid — all 19 categories
5. How it works — 3 steps (Search → See Causes → Get Remedies)
6. Featured remedies — 3 cards from DB
7. Global disclaimer banner
8. Footer

---

## Component Specs

### Navbar
- White bg, 1px bottom border #E8F3EB, sticky
- Left: 🌿 NaturaMed — Playfair Display 22px #2D6A4F
- Center: Remedies · Herb Library · Symptom Checker · About
- Right: search icon + "Get Started" (filled green button)
- Mobile: hamburger

### Hero
- White bg, centered content
- Eyebrow: "Natural · Ancestral · Trustworthy" — DM Sans 13px uppercase #2D6A4F letter-spacing 0.1em
- Headline: Playfair Display 700 56px — "Healing Knowledge, Rediscovered."
- Subtext: DM Sans 18px muted
- Quote block: Playfair Display italic 18px #2D6A4F, 2px left border #B7E4C7
- Search bar: pill shape, large, prominent, green search button on right
  placeholder: "Search a condition, herb, or symptom..."
- Below search: "Browse by Category →" text link #2D6A4F

### Homepage Quote Block
- Light green bg #D8F3DC, 12px radius, 40px padding, full width
- Playfair Display italic centered 20px #2D6A4F
- Attribution: DM Sans 13px muted below

### Category Tiles
- White bg, 12px radius, 1px border #E8F3EB
- Emoji/icon top center
- Name: DM Sans 600 15px #1B1B1B
- Scope: DM Sans 13px muted
- Hover: bg #D8F3DC, border #2D6A4F
- Click → /category/[slug]

### Herb of the Day
- Bg #D8F3DC, 12px radius
- Label: "HERB OF THE DAY" — DM Sans 11px uppercase letter-spacing 0.1em #2D6A4F
- Name: Playfair Display 24px
- Property: DM Sans 15px muted
- "Learn more →" link #2D6A4F

### Health Tip of the Day
- White bg, 4px left border #2D6A4F, 12px radius
- Label: "HEALTH TIP" — same as herb label
- Tip: DM Sans 16px line-height 1.7
- Same height as Herb of the Day widget

### Remedy Card
- White bg, 12px radius, 1px border #E8F3EB
- Hover: border #2D6A4F, translateY(-2px), transition 200ms
- Category badge: #D8F3DC bg, #2D6A4F text, 4px radius
- Title: DM Sans 600 18px
- Description: DM Sans 14px muted, 2-line clamp
- Footer: prep time left / caution badge right (if present)
- "View Remedy →" #2D6A4F

### Caution Badge
- Bg #FFF3E0, border 1px #F4A261, text #B45309
- DM Sans 12px 600, 4px radius
- Prefix: ⚠
- Always visible — never buried

### Remedy Detail Page
- Two-column desktop: 65% main / 35% sidebar
- Sidebar: causes list, related remedies
- Ingredients: numbered list with measurements
- Steps: numbered, each step in its own visual block
- Contraindications: amber-tinted box #FFF3E0, prominent
- Sources: small muted at bottom
- Disclaimer footer: light gray box, every remedy page

### AI Fallback Badge
- Shown when is_curated = false
- Amber bg, amber border
- Text: "AI Generated"
- Tooltip: "Generated by our AI holistic healer — not yet manually verified."
- Never silently mix AI and curated content

### Conversational Entry Prompt
- Modal overlay, every session open
- White card centered, max-width 560px
- Headline: "What are you looking for today?" — Playfair Display 28px
- Subtext: DM Sans 15px muted
- Large textarea, green focus border
- "Find Remedies →" filled green button, full width
- "Skip for now" small muted link below
- Dismissible, reappears next session

---

## DB Schema

```
conditions          { id, name, slug, category, summary }
remedies            { id, condition_id, name, ingredients[], steps[],
                      cautions[], source, sources[], prep_time, is_curated }
causes              { id, condition_id, label, description }
herbs               { id, name, slug, description, medicinal_properties[],
                      usage_methods[], precautions[], sources[],
                      fun_fact, herb_of_day }
symptoms            { id, label, description }
symptom_remedies    { symptom_id, remedy_id }
symptom_herbs       { symptom_id, herb_id }
preparation_methods { id, name, description, steps[], use_cases[] }
daily_tips          { id, content, category, date_shown }
```

**Key queries:**
```ts
// Search conditions
supabase.from('conditions')
  .select('*, causes(*), remedies(*)')
  .ilike('name', `%${query}%`)

// Herb of the day
supabase.from('herbs')
  .select('*')
  .eq('herb_of_day', true)
  .limit(1)

// Condition with causes + remedies
supabase.from('conditions')
  .select('*, causes(*), remedies(*)')
  .eq('slug', slug)
  .single()
```

---

## Tech Stack

```
Framework:  Next.js 14+ (App Router)
Styling:    Tailwind CSS
Database:   Supabase (PostgreSQL)
AI:         Anthropic Claude API (claude-haiku-4-5 for fallback)
Fonts:      Google Fonts (Playfair Display + DM Sans)
Hosting:    Vercel
```

---

## What to Avoid

- Generic AI aesthetics (Inter everywhere, purple gradients)
- Clinical sterility — this is warm and natural
- Too much green — white dominates, green accents
- Burying caution information
- Mixing AI and curated content without labeling
- Dark backgrounds
- Cramped spacing — when in doubt, add more air

---

*NaturaMed Design Spec v1.0 — March 2026*
