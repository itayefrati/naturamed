import Link from "next/link";

export type Category = {
  label: string;
  slug: string;
  description: string;
  emoji: string;
};

export const CATEGORIES: Category[] = [
  { label: "Beauty",               slug: "beauty",               description: "Skin, hair, acne & cosmetic wellness",     emoji: "🌸" },
  { label: "Anti-Aging",           slug: "anti-aging",           description: "Herbs & practices for longevity",           emoji: "🌿" },
  { label: "Brain Health",         slug: "brain-health",         description: "Focus, memory & cognitive function",        emoji: "🧠" },
  { label: "Reproductive Health",  slug: "reproductive-health",  description: "Libido, fertility & hormonal balance",      emoji: "🌺" },
  { label: "Sleep",                slug: "sleep",                description: "Natural sleep aids & bedtime routines",     emoji: "🌙" },
  { label: "Oral Health",          slug: "oral-health",          description: "Bad breath, gums & natural dental care",    emoji: "🦷" },
  { label: "Parasite Cleanse",     slug: "parasite-cleanse",     description: "Herbal protocols for internal cleansing",   emoji: "🍃" },
  { label: "Vitamins",             slug: "vitamins",             description: "Obtain nutrients naturally through food",   emoji: "🌱" },
  { label: "Allergies",            slug: "allergies",            description: "Calming allergic reactions & symptoms",     emoji: "🤧" },
  { label: "Mental Wellness",      slug: "mental-wellness",      description: "Stress, anxiety, mood & relaxation",        emoji: "🧘" },
  { label: "Digestion & Gut",      slug: "digestion-gut-health", description: "Bloating, gut health & digestive comfort",  emoji: "🫶" },
  { label: "Pain & Inflammation",  slug: "pain-inflammation",    description: "Joint pain, arthritis & muscle soreness",   emoji: "💪" },
  { label: "Head",                 slug: "head",                 description: "Headache & migraine remedies",              emoji: "🤕" },
  { label: "Throat",               slug: "throat",               description: "Sore throat, cough & congestion",           emoji: "🗣️" },
  { label: "Skin & Wounds",        slug: "skin-wounds",          description: "Rashes, eczema, psoriasis & wounds",        emoji: "🩹" },
  { label: "Eyes",                 slug: "eyes",                 description: "Eye strain, dryness & irritation",          emoji: "👁️" },
  { label: "Ears",                 slug: "ears",                 description: "Earache, infection & tinnitus",             emoji: "👂" },
  { label: "Fever & Immune",       slug: "fever-immune",         description: "Cold, flu, fever & immune support",         emoji: "🌡️" },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.slug}
          href={`/categories/${cat.slug}`}
          className="flex flex-col items-center text-center gap-3 rounded-xl border border-[#E8F3EB] bg-white px-4 py-6 hover:bg-green-light hover:border-green-primary transition-all duration-200 group"
        >
          <span className="text-3xl leading-none" role="img" aria-label={cat.label}>
            {cat.emoji}
          </span>
          <div>
            <p className="text-[15px] font-semibold text-ink leading-tight">{cat.label}</p>
            <p className="text-[13px] text-muted mt-1 leading-snug">{cat.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
