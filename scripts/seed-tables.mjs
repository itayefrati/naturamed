import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// 1. Read .env.local manually (no dotenv dependency)
// ---------------------------------------------------------------------------
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env.local");

function loadEnv(filePath) {
  const vars = {};
  const content = readFileSync(filePath, "utf-8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    vars[key] = value;
  }
  return vars;
}

const env = loadEnv(envPath);
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------------------------------------------------------------------------
// 2. Seed data
// ---------------------------------------------------------------------------

const herbs = [
  { name: "Turmeric", slug: "turmeric", description: "A golden rhizome revered for over 4,000 years in Ayurvedic medicine. Its primary bioactive compound, curcumin, is a potent anti-inflammatory and antioxidant.", medicinal_properties: ["Anti-inflammatory", "Antioxidant", "Immune Support", "Digestive Aid", "Neuroprotective"], usage_methods: ["Tea infusion", "Golden milk", "Capsules", "Topical paste"], precautions: ["May interact with blood-thinning medications", "Avoid high supplemental doses during pregnancy", "May aggravate gallbladder issues"], sources: ["Hewlings & Kalman (2017). Curcumin: A Review of Its Effects on Human Health", "Prasad & Aggarwal (2011). Turmeric, the Golden Spice"], fun_fact: "Turmeric has been used as both a spice and medicine in India for over 4,000 years.", herb_of_day: true },
  { name: "Ginger", slug: "ginger", description: "A warming root used across traditional medicine systems for digestive support, nausea relief, and immune boosting. Contains gingerols and shogaols.", medicinal_properties: ["Digestive Aid", "Anti-nausea", "Anti-inflammatory", "Warming", "Immune Support"], usage_methods: ["Tea infusion", "Fresh in cooking", "Capsules", "Compress"], precautions: ["May interact with blood thinners", "Avoid excessive amounts during pregnancy"], sources: ["Mashhadi et al. (2013). Anti-Oxidative and Anti-Inflammatory Effects of Ginger"], fun_fact: "Ginger has been traded as a spice for over 5,000 years.", herb_of_day: false },
  { name: "Lavender", slug: "lavender", description: "A fragrant herb prized for its calming and sleep-promoting properties. Used in aromatherapy, teas, and topical applications across European and Middle Eastern traditions.", medicinal_properties: ["Calming", "Sleep Aid", "Anxiolytic", "Antiseptic", "Pain Relief"], usage_methods: ["Essential oil", "Tea infusion", "Bath soak", "Sachet"], precautions: ["May cause skin irritation in sensitive individuals", "Not recommended for prepubescent boys (topical)"], sources: ["Koulivand et al. (2013). Lavender and the Nervous System"], fun_fact: "Ancient Romans used lavender to scent their baths — the name comes from Latin 'lavare' meaning to wash.", herb_of_day: false },
  { name: "Peppermint", slug: "peppermint", description: "A hybrid mint known for its cooling menthol content. Widely used for digestive relief, headache treatment, and respiratory support.", medicinal_properties: ["Digestive Aid", "Cooling", "Focus Enhancement", "Headache Relief", "Decongestant"], usage_methods: ["Tea infusion", "Essential oil", "Capsules", "Topical"], precautions: ["May worsen GERD symptoms", "Keep essential oil away from infants' faces"], sources: ["McKay & Blumberg (2006). A Review of the Bioactivity and Potential Health Benefits of Peppermint Tea"], fun_fact: "Peppermint is actually a natural hybrid between watermint and spearmint.", herb_of_day: false },
  { name: "Echinacea", slug: "echinacea", description: "A North American wildflower used by Indigenous peoples for centuries. Known for immune-stimulating properties, particularly for cold and flu prevention.", medicinal_properties: ["Immune Support", "Antiviral", "Anti-inflammatory", "Wound Healing"], usage_methods: ["Tincture", "Tea infusion", "Capsules", "Throat spray"], precautions: ["Not recommended for autoimmune conditions", "May cause allergic reactions in daisy-family sensitive individuals"], sources: ["Shah et al. (2007). Evaluation of Echinacea for Prevention and Treatment of the Common Cold"], fun_fact: "Native Americans used echinacea for more ailments than any other plant.", herb_of_day: false },
  { name: "Chamomile", slug: "chamomile", description: "One of the most ancient medicinal herbs known to mankind. Gentle yet effective for sleep, digestion, and skin healing across multiple traditional systems.", medicinal_properties: ["Calming", "Sleep Aid", "Digestive Aid", "Anti-inflammatory", "Skin Healing"], usage_methods: ["Tea infusion", "Compress", "Bath soak", "Tincture"], precautions: ["May cause allergic reactions in ragweed-sensitive individuals", "Avoid with blood-thinning medications"], sources: ["Srivastava et al. (2010). Chamomile: A Herbal Medicine of the Past with Bright Future"], fun_fact: "The word chamomile comes from the Greek for 'earth apple' due to its apple-like scent.", herb_of_day: false },
  { name: "Ashwagandha", slug: "ashwagandha", description: "An adaptogenic herb central to Ayurvedic medicine for over 3,000 years. Known for stress reduction, energy support, and hormonal balance.", medicinal_properties: ["Adaptogenic", "Stress Relief", "Energy Support", "Hormonal Balance", "Immune Support"], usage_methods: ["Powder in milk", "Capsules", "Tincture", "Tea"], precautions: ["Avoid during pregnancy", "May interact with thyroid medications", "May increase testosterone levels"], sources: ["Chandrasekhar et al. (2012). A Prospective Study on Safety and Efficacy of Ashwagandha Root Extract"], fun_fact: "Ashwagandha means 'smell of the horse' in Sanskrit, referring to both its scent and its ability to give you the strength of a stallion.", herb_of_day: false },
  { name: "Elderberry", slug: "elderberry", description: "A dark purple berry with a long history in European folk medicine. Rich in anthocyanins and vitamin C, primarily used for immune defense during cold and flu season.", medicinal_properties: ["Immune Support", "Antiviral", "Antioxidant", "Anti-inflammatory"], usage_methods: ["Syrup", "Tea infusion", "Gummies", "Tincture"], precautions: ["Raw elderberries are toxic — must be cooked", "May overstimulate the immune system in autoimmune conditions"], sources: ["Hawkins et al. (2019). Black Elderberry Supplementation and Respiratory Health"], fun_fact: "Hippocrates called the elder tree his 'medicine chest' due to its wide range of uses.", herb_of_day: false },
  { name: "Fennel", slug: "fennel", description: "An aromatic Mediterranean herb used since ancient times for digestive comfort, bloating relief, and respiratory health. Contains anethole as its key compound.", medicinal_properties: ["Digestive Aid", "Anti-bloating", "Carminative", "Respiratory Support", "Antispasmodic"], usage_methods: ["Tea infusion", "Chewing seeds", "Essential oil", "Culinary"], precautions: ["May affect estrogen levels", "Avoid concentrated forms during pregnancy"], sources: ["Badgujar et al. (2014). Foeniculum vulgare: A Comprehensive Review"], fun_fact: "Roman gladiators mixed fennel with their food believing it gave them strength.", herb_of_day: false },
  { name: "Passionflower", slug: "passionflower", description: "A climbing vine native to the Americas, traditionally used for anxiety, insomnia, and nervous restlessness. Works by increasing GABA levels in the brain.", medicinal_properties: ["Anxiolytic", "Sleep Aid", "Calming", "Muscle Relaxant", "Nerve Tonic"], usage_methods: ["Tea infusion", "Tincture", "Capsules", "Combined with other calming herbs"], precautions: ["May enhance effects of sedative medications", "Avoid during pregnancy"], sources: ["Ngan & Conduit (2011). A Double-Blind, Placebo-Controlled Investigation of Passionflower"], fun_fact: "Spanish missionaries named it 'passionflower' because its structure reminded them of the Passion of Christ.", herb_of_day: false },
  { name: "Tea Tree", slug: "tea-tree", description: "An Australian native plant used by Aboriginal peoples for centuries. Known for powerful antimicrobial and antiseptic properties, primarily used topically.", medicinal_properties: ["Antimicrobial", "Antiseptic", "Antifungal", "Anti-acne", "Wound Healing"], usage_methods: ["Essential oil (diluted)", "Topical spot treatment", "Shampoo additive", "Mouthwash"], precautions: ["Never ingest — toxic if swallowed", "Always dilute before skin application", "May cause contact dermatitis"], sources: ["Carson et al. (2006). Melaleuca alternifolia (Tea Tree) Oil: A Review of Antimicrobial Properties"], fun_fact: "Captain Cook brewed tea tree leaves as a tea substitute, which is how it got its name.", herb_of_day: false },
  { name: "St. John's Wort", slug: "st-johns-wort", description: "A yellow-flowering plant used in European herbal medicine for centuries, primarily for mood support and mild depression. Contains hypericin and hyperforin.", medicinal_properties: ["Mood Balance", "Antidepressant", "Nerve Tonic", "Anti-inflammatory", "Wound Healing"], usage_methods: ["Capsules", "Tincture", "Tea infusion", "Topical oil"], precautions: ["Interacts with many medications (birth control, antidepressants, blood thinners)", "Causes photosensitivity", "Do not combine with SSRIs"], sources: ["Linde et al. (2008). St John's Wort for Major Depression (Cochrane Review)"], fun_fact: "It's named after St. John the Baptist because it typically blooms around his feast day, June 24.", herb_of_day: false },
];

const dailyTips = [
  { content: "Start your morning with warm lemon water to stimulate digestion, alkalize the body, and gently detox the liver — a practice used for centuries in Ayurvedic tradition.", category: "digestion" },
  { content: "Spend 10-15 minutes in morning sunlight to regulate your circadian rhythm and boost vitamin D production naturally.", category: "wellness" },
  { content: "Add a pinch of black pepper to turmeric dishes — piperine increases curcumin absorption by up to 2,000%.", category: "nutrition" },
  { content: "Practice 4-7-8 breathing before bed: inhale for 4 seconds, hold for 7, exhale for 8. This activates the parasympathetic nervous system.", category: "sleep" },
  { content: "Keep a small pot of peppermint on your desk — the scent alone has been shown to improve focus and reduce mental fatigue.", category: "focus" },
  { content: "Soak in an Epsom salt bath for 20 minutes to absorb magnesium through the skin and relieve muscle tension.", category: "relaxation" },
  { content: "Chew fennel seeds after meals to reduce bloating and support digestion — a tradition practiced across the Mediterranean and India.", category: "digestion" },
  { content: "Ground yourself by walking barefoot on grass or soil for 15 minutes — earthing has been shown to reduce inflammation markers.", category: "wellness" },
  { content: "Replace your afternoon coffee with green tea — L-theanine provides calm focus without the cortisol spike.", category: "focus" },
  { content: "Apply diluted lavender essential oil to your temples before sleep — it's been clinically shown to improve sleep quality.", category: "sleep" },
];

const preparationMethods = [
  { name: "Herbal Tea (Infusion)", description: "The simplest and most common preparation. Pour boiling water over dried or fresh herbs, steep for 5-15 minutes, strain, and drink. Best for leaves, flowers, and light plant material.", steps: ["Boil fresh filtered water", "Place 1-2 tsp of dried herb (or 1 tbsp fresh) in a cup or infuser", "Pour boiling water over herbs", "Cover and steep for 5-15 minutes", "Strain and serve — add honey or lemon if desired"], use_cases: ["Daily wellness", "Digestive support", "Relaxation", "Immune boosting"] },
  { name: "Tincture", description: "A concentrated liquid extract made by soaking herbs in alcohol or glycerin for several weeks. Tinctures preserve active compounds for long-term storage and allow precise dosing.", steps: ["Fill a clean jar 1/3 to 1/2 with dried herbs", "Cover completely with 80-proof vodka or vegetable glycerin", "Seal tightly and store in a cool, dark place", "Shake daily for 4-6 weeks", "Strain through cheesecloth and store in dark dropper bottles"], use_cases: ["Concentrated dosing", "Long-term storage", "Travel-friendly", "Sublingual absorption"] },
  { name: "Poultice", description: "Fresh or dried herbs are mashed into a paste and applied directly to the skin. Used for localized pain, inflammation, wounds, and skin conditions.", steps: ["Crush or blend fresh herbs into a paste (or moisten dried herbs with hot water)", "Spread the paste onto clean muslin cloth or gauze", "Apply directly to the affected area", "Secure with a bandage or wrap", "Leave on for 20-60 minutes, then remove and clean the area"], use_cases: ["Localized pain", "Wound healing", "Skin inflammation", "Insect bites"] },
  { name: "Cold-Infused Oil", description: "Herbs are steeped in a carrier oil (olive, coconut, jojoba) for 4-6 weeks in a warm, dark place. The oil extracts fat-soluble compounds for topical use.", steps: ["Fill a clean, dry jar halfway with dried herbs", "Cover completely with carrier oil of choice", "Seal and place in a warm spot away from direct sunlight", "Shake gently every few days for 4-6 weeks", "Strain through cheesecloth and store in dark bottles"], use_cases: ["Massage oils", "Skin moisturizing", "Hair treatments", "Salve base"] },
  { name: "Ointment / Salve", description: "An herbal oil thickened with beeswax to create a semi-solid preparation. Applied to skin for healing wounds, rashes, dry skin, and sore muscles.", steps: ["Prepare an herbal-infused oil as base", "Gently warm the infused oil in a double boiler", "Add grated beeswax (ratio: 1 oz beeswax per 4 oz oil)", "Stir until beeswax melts completely", "Pour into tins or jars and let cool undisturbed"], use_cases: ["Wound healing", "Dry skin", "Diaper rash", "Muscle soreness"] },
  { name: "Steam Inhalation", description: "Herbs are added to a bowl of hot water. The steam is inhaled under a towel to deliver volatile compounds directly to the respiratory system.", steps: ["Boil 4-6 cups of water and pour into a large bowl", "Add 2-3 tbsp of dried herbs or 5-10 drops essential oil", "Drape a towel over your head and the bowl", "Breathe deeply through your nose for 10-15 minutes", "Take breaks if the steam feels too intense"], use_cases: ["Congestion relief", "Sinus support", "Respiratory infections", "Facial cleansing"] },
  { name: "Compress", description: "A cloth soaked in strong herbal tea or decoction, applied warm or cold to the affected area. Effective for muscle pain, headaches, eye irritation, and localized inflammation.", steps: ["Brew a strong herbal tea using double the normal amount of herbs", "Steep for 15-20 minutes, then strain", "Soak a clean cloth in the warm (or cooled) tea", "Wring out excess liquid", "Apply to affected area for 15-30 minutes — re-soak as needed"], use_cases: ["Muscle pain", "Headache relief", "Eye irritation", "Skin conditions"] },
];

// ---------------------------------------------------------------------------
// 3. Seed functions
// ---------------------------------------------------------------------------

async function seedHerbs() {
  console.log("Seeding herbs...");
  const { data, error } = await supabase
    .from("herbs")
    .upsert(herbs, { onConflict: "slug" })
    .select();

  if (error) {
    console.error("  ERROR seeding herbs:", error.message);
    return false;
  }
  console.log(`  SUCCESS: ${data.length} herbs upserted.`);
  return true;
}

async function seedDailyTips() {
  console.log("Seeding daily_tips...");
  const { data, error } = await supabase
    .from("daily_tips")
    .insert(dailyTips)
    .select();

  if (error) {
    console.error("  ERROR seeding daily_tips:", error.message);
    return false;
  }
  console.log(`  SUCCESS: ${data.length} daily tips inserted.`);
  return true;
}

async function seedPreparationMethods() {
  console.log("Seeding preparation_methods...");
  const { data, error } = await supabase
    .from("preparation_methods")
    .upsert(preparationMethods, { onConflict: "name" })
    .select();

  if (error) {
    console.error("  ERROR seeding preparation_methods:", error.message);
    return false;
  }
  console.log(`  SUCCESS: ${data.length} preparation methods upserted.`);
  return true;
}

// ---------------------------------------------------------------------------
// 4. Run
// ---------------------------------------------------------------------------

async function main() {
  console.log("=== NaturaMed Seed Script ===\n");
  console.log(`Supabase URL: ${SUPABASE_URL}\n`);

  const results = await Promise.all([
    seedHerbs(),
    seedDailyTips(),
    seedPreparationMethods(),
  ]);

  console.log("\n=== Seed Complete ===");

  if (results.every(Boolean)) {
    console.log("All tables seeded successfully!");
  } else {
    console.error("Some tables failed to seed. Check errors above.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
