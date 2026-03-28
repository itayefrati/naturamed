// ── Category list (used by CategoryGrid and server pages) ────────────────────
export type Category = {
  label: string
  slug: string
  description: string
}

export const CATEGORIES: Category[] = [
  { label: "Beauty",               slug: "beauty",               description: "Skin, hair & cosmetic wellness"         },
  { label: "Anti-Aging",           slug: "anti-aging",           description: "Herbs & practices for longevity"        },
  { label: "Brain Health",         slug: "brain-health",         description: "Focus, memory & cognition"              },
  { label: "Reproductive Health",  slug: "reproductive-health",  description: "Fertility & hormonal balance"           },
  { label: "Sleep",                slug: "sleep",                description: "Natural sleep aids & routines"          },
  { label: "Oral Health",          slug: "oral-health",          description: "Gums, breath & dental care"             },
  { label: "Parasite Cleanse",     slug: "parasite-cleanse",     description: "Internal cleansing protocols"           },
  { label: "Vitamins",             slug: "vitamins",             description: "Nutrients naturally through food"       },
  { label: "Allergies",            slug: "allergies",            description: "Calming allergic reactions"             },
  { label: "Mental Wellness",      slug: "mental-wellness",      description: "Stress, anxiety & relaxation"           },
  { label: "Digestion & Gut",      slug: "digestion-gut-health", description: "Bloating & digestive comfort"           },
  { label: "Pain & Inflammation",  slug: "pain-inflammation",    description: "Joint pain & muscle soreness"           },
  { label: "Head",                 slug: "head",                 description: "Headache & migraine remedies"           },
  { label: "Throat",               slug: "throat",               description: "Sore throat, cough & congestion"        },
  { label: "Skin & Wounds",        slug: "skin-wounds",          description: "Rashes, eczema & psoriasis"             },
  { label: "Eyes",                 slug: "eyes",                 description: "Eye strain, dryness & irritation"       },
  { label: "Ears",                 slug: "ears",                 description: "Earache, infection & tinnitus"          },
  { label: "Fever & Immune",       slug: "fever-immune",         description: "Cold, flu, fever & immunity"            },
]

// ── Maps URL slugs to DB category values and display labels ──────────────────
export const CATEGORY_MAP: Record<string, { label: string; dbValue: string; emoji: string }> = {
  'beauty':               { label: 'Beauty',                 dbValue: 'Beauty',                emoji: '🌸' },
  'anti-aging':           { label: 'Anti-Aging',             dbValue: 'Anti-Aging',             emoji: '🌿' },
  'brain-health':         { label: 'Brain Health',           dbValue: 'Brain Health',           emoji: '🧠' },
  'reproductive-health':  { label: 'Reproductive Health',    dbValue: 'Reproductive Health',    emoji: '🌺' },
  'sleep':                { label: 'Sleep',                  dbValue: 'Sleep',                  emoji: '🌙' },
  'oral-health':          { label: 'Oral Health',            dbValue: 'Oral Health',            emoji: '🦷' },
  'parasite-cleanse':     { label: 'Parasite Cleanse',       dbValue: 'Parasite Cleanse',       emoji: '🍃' },
  'vitamins':             { label: 'Vitamins',               dbValue: 'Vitamins',               emoji: '🌱' },
  'allergies':            { label: 'Allergies',              dbValue: 'Allergies',              emoji: '🤧' },
  'mental-wellness':      { label: 'Mental Wellness',        dbValue: 'Mental Wellness',        emoji: '🧘' },
  'digestion-gut-health': { label: 'Digestion & Gut Health', dbValue: 'Digestion & Gut Health', emoji: '🫶' },
  'pain-inflammation':    { label: 'Pain & Inflammation',    dbValue: 'Pain & Inflammation',    emoji: '💪' },
  'head':                 { label: 'Head',                   dbValue: 'Head',                   emoji: '🤕' },
  'throat':               { label: 'Throat',                 dbValue: 'Throat',                 emoji: '🗣️' },
  'skin-wounds':          { label: 'Skin & Wounds',          dbValue: 'Skin & Wounds',          emoji: '🩹' },
  'eyes':                 { label: 'Eyes',                   dbValue: 'Eyes',                   emoji: '👁️' },
  'ears':                 { label: 'Ears',                   dbValue: 'Ears',                   emoji: '👂' },
  'fever-immune':         { label: 'Fever & Immune',         dbValue: 'Fever & Immune',         emoji: '🌡️' },
}
