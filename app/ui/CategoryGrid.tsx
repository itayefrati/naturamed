import Link from "next/link";

export type Category = {
  label: string;
  slug: string;
  description: string;
};

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
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.slug}
          href={`/categories/${cat.slug}`}
          className="group flex flex-col gap-2 rounded-xl bg-surface-lowest px-4 py-5 hover:bg-secondary-container/30 transition-all duration-200 shadow-ambient hover:-translate-y-0.5"
        >
          <p className="font-semibold text-[13px] text-on-surface group-hover:text-primary-container transition-colors leading-snug">
            {cat.label}
          </p>
          <p className="text-[11px] text-on-surface-variant leading-snug hidden sm:block">
            {cat.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
