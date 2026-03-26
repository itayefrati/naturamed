import Link from "next/link";

export type Category = {
  label: string;
  slug: string;
  description: string;
  emoji: string;
};

export const CATEGORIES: Category[] = [
  { label: "Beauty",               slug: "beauty",               description: "Skin, hair, acne & cosmetic wellness",     emoji: "\u{1F338}" },
  { label: "Anti-Aging",           slug: "anti-aging",           description: "Herbs & practices for longevity",           emoji: "\u{1F33F}" },
  { label: "Brain Health",         slug: "brain-health",         description: "Focus, memory & cognitive function",        emoji: "\u{1F9E0}" },
  { label: "Reproductive Health",  slug: "reproductive-health",  description: "Libido, fertility & hormonal balance",      emoji: "\u{1F33A}" },
  { label: "Sleep",                slug: "sleep",                description: "Natural sleep aids & bedtime routines",     emoji: "\u{1F319}" },
  { label: "Oral Health",          slug: "oral-health",          description: "Bad breath, gums & natural dental care",    emoji: "\u{1F9B7}" },
  { label: "Parasite Cleanse",     slug: "parasite-cleanse",     description: "Herbal protocols for internal cleansing",   emoji: "\u{1F343}" },
  { label: "Vitamins",             slug: "vitamins",             description: "Obtain nutrients naturally through food",   emoji: "\u{1F331}" },
  { label: "Allergies",            slug: "allergies",            description: "Calming allergic reactions & symptoms",     emoji: "\u{1F927}" },
  { label: "Mental Wellness",      slug: "mental-wellness",      description: "Stress, anxiety, mood & relaxation",        emoji: "\u{1F9D8}" },
  { label: "Digestion & Gut",      slug: "digestion-gut-health", description: "Bloating, gut health & digestive comfort",  emoji: "\u{1FAF6}" },
  { label: "Pain & Inflammation",  slug: "pain-inflammation",    description: "Joint pain, arthritis & muscle soreness",   emoji: "\u{1F4AA}" },
  { label: "Head",                 slug: "head",                 description: "Headache & migraine remedies",              emoji: "\u{1F915}" },
  { label: "Throat",               slug: "throat",               description: "Sore throat, cough & congestion",           emoji: "\u{1F5E3}" },
  { label: "Skin & Wounds",        slug: "skin-wounds",          description: "Rashes, eczema, psoriasis & wounds",        emoji: "\u{1FA79}" },
  { label: "Eyes",                 slug: "eyes",                 description: "Eye strain, dryness & irritation",          emoji: "\u{1F441}" },
  { label: "Ears",                 slug: "ears",                 description: "Earache, infection & tinnitus",             emoji: "\u{1F442}" },
  { label: "Fever & Immune",       slug: "fever-immune",         description: "Cold, flu, fever & immune support",         emoji: "\u{1F321}" },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.slug}
          href={`/categories/${cat.slug}`}
          className="group flex flex-col items-center text-center gap-3 rounded-xl bg-surface-lowest px-4 py-6 hover:bg-primary-fixed/30 transition-all duration-200 shadow-ambient"
        >
          <span className="text-3xl leading-none" role="img" aria-label={cat.label}>
            {cat.emoji}
          </span>
          <div>
            <p className="text-[15px] font-semibold text-on-surface leading-tight group-hover:text-primary-container transition-colors">
              {cat.label}
            </p>
            <p className="text-[13px] text-on-surface-variant mt-1 leading-snug">
              {cat.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
