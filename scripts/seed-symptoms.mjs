// Seed symptoms + symptom_remedies + symptom_herbs
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const env = readFileSync(".env.local", "utf8");
const vars = {};
env.split("\n").forEach((l) => {
  const [k, ...v] = l.split("=");
  if (k) vars[k.trim()] = v.join("=").trim();
});

// Use service role key so seed scripts bypass RLS
const supabase = createClient(
  vars.NEXT_PUBLIC_SUPABASE_URL,
  vars.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// ── Remedy ID Map ────────────────────────────────────────────────────────────
const REMEDY = {
  peppermintRub:   "e34ad727-61dc-4f46-ab6f-8b4c8bda6fea",
  gingerLemon:     "def25b09-357e-4c81-98d1-800ae4716566",
  honeyGargle:     "01c7ef67-b077-4be5-8a3c-98218d65a6ec",
  goldenMilk:      "145430ad-30b2-416a-8232-dd055550dcb5",
  chamomileTea:    "b95afc67-e808-4624-9c54-bba779d750d8",
  magnesiumWater:  "9cf8fe88-3bb6-4a24-bd6c-6d81b8084dd2",
  fennelTea:       "fc65e1c7-65df-4ca2-841b-9d9eeb046007",
  lemonWater:      "66feb2b1-cf87-46b9-a1bd-c311bd02c8eb",
  teaTreeSpot:     "98a0cf61-dc00-43a7-904c-30438f0fea27",
  greenTeaToner:   "e4c18cb4-0be1-4095-811d-4251b41e5f98",
  ashwagandha:     "f1d512b3-53be-4821-b17f-9a6f70217714",
  lavenderPassion: "2facb10d-c867-45d2-94b7-ef55095d6193",
  turmericPaste:   "80f008db-6f60-4816-b78d-3aee47420be5",
  gingerCayenne:   "ff8848b1-89a6-4b85-8ad3-8d0c443571d1",
  elderberry:      "1da586f9-9380-4fc8-b007-d6cad2f046c6",
  garlicHoney:     "4883fe7a-b0f2-4074-90d6-660fc4b53f88",
  coconutMask:     "450bba1f-e220-46f2-a61e-7ddfa8ffb39e",
  oatBath:         "0ac33f6e-30e0-49e5-ad2e-5e4a03872696",
  chamomileEye:    "dc0c88f8-ed07-4313-92a1-12f05da5c1db",
  roseWater:       "0e481021-b76f-4da1-b9d0-21acf91a092d",
};

// ── Herb ID Map ──────────────────────────────────────────────────────────────
const HERB = {
  ashwagandha:  "4039683a-f88f-40f2-8365-23c953a8c5c1",
  chamomile:    "3aab5089-9d3e-4ac4-8353-00ccbb950fd7",
  echinacea:    "b85ab190-acea-4b2a-9186-eff350ea5c43",
  elderberry:   "3a69b27d-84ed-466d-a810-3dc196397c50",
  fennel:       "aad96a5a-e887-4ff1-88d2-1fefa1a4ea6c",
  ginger:       "bdac4be3-84f3-41c2-b4cf-31d097d2f0bf",
  // These will be fetched below
};

async function getHerbIds() {
  const { data } = await supabase.from("herbs").select("id, name");
  const map = {};
  (data || []).forEach((h) => { map[h.name.toLowerCase().replace(/[\s.']/g, "_")] = h.id; });
  return map;
}

async function main() {
  console.log("=== Seeding Symptoms ===\n");

  const herbMap = await getHerbIds();
  console.log("Herb map:", Object.keys(herbMap).join(", "));

  // ── 1. Clear old data ──────────────────────────────────────────────────────
  await supabase.from("symptom_remedies").delete().neq("symptom_id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("symptom_herbs").delete().neq("symptom_id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("symptoms").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  // ── 2. Insert symptoms ─────────────────────────────────────────────────────
  const symptoms = [
    { label: "Headache", description: "Pain or discomfort in the head, scalp, or neck" },
    { label: "Fatigue", description: "Persistent tiredness or lack of energy" },
    { label: "Nausea", description: "Feeling of sickness with an inclination to vomit" },
    { label: "Insomnia", description: "Difficulty falling or staying asleep" },
    { label: "Joint Pain", description: "Discomfort, aches, or soreness in any of the body's joints" },
    { label: "Sore Throat", description: "Pain, scratchiness or irritation in the throat" },
    { label: "Bloating", description: "Feeling of fullness or swelling in the abdomen" },
    { label: "Anxiety", description: "Feelings of worry, nervousness, or unease" },
    { label: "Back Pain", description: "Pain felt in the back from muscles, nerves, or spine" },
    { label: "Congestion", description: "Blockage or stuffiness in the nasal passages" },
    { label: "Dry Skin", description: "Skin that lacks moisture and feels rough or itchy" },
    { label: "Muscle Cramps", description: "Sudden, involuntary contractions of a muscle" },
    { label: "Eye Strain", description: "Tired, itching or burning eyes from extended screen use" },
    { label: "Acne", description: "Skin condition with pimples, blackheads, and blemishes" },
    { label: "Stress", description: "Mental or emotional strain from demanding circumstances" },
  ];

  const { data: insertedSymptoms, error: symErr } = await supabase
    .from("symptoms")
    .insert(symptoms)
    .select("id, label");

  if (symErr) { console.error("ERROR inserting symptoms:", symErr.message); return; }
  console.log(`Inserted ${insertedSymptoms.length} symptoms`);

  const symMap = {};
  insertedSymptoms.forEach((s) => { symMap[s.label] = s.id; });

  // ── 3. Symptom → Remedy mappings ──────────────────────────────────────────
  const symptomRemedies = [
    { symptom: "Headache",     remedy: REMEDY.peppermintRub },
    { symptom: "Headache",     remedy: REMEDY.magnesiumWater },
    { symptom: "Headache",     remedy: REMEDY.gingerCayenne },
    { symptom: "Nausea",       remedy: REMEDY.gingerLemon },
    { symptom: "Nausea",       remedy: REMEDY.fennelTea },
    { symptom: "Nausea",       remedy: REMEDY.lemonWater },
    { symptom: "Sore Throat",  remedy: REMEDY.honeyGargle },
    { symptom: "Sore Throat",  remedy: REMEDY.gingerLemon },
    { symptom: "Sore Throat",  remedy: REMEDY.elderberry },
    { symptom: "Joint Pain",   remedy: REMEDY.goldenMilk },
    { symptom: "Joint Pain",   remedy: REMEDY.turmericPaste },
    { symptom: "Joint Pain",   remedy: REMEDY.gingerCayenne },
    { symptom: "Insomnia",     remedy: REMEDY.chamomileTea },
    { symptom: "Insomnia",     remedy: REMEDY.lavenderPassion },
    { symptom: "Insomnia",     remedy: REMEDY.ashwagandha },
    { symptom: "Bloating",     remedy: REMEDY.fennelTea },
    { symptom: "Bloating",     remedy: REMEDY.lemonWater },
    { symptom: "Bloating",     remedy: REMEDY.gingerLemon },
    { symptom: "Anxiety",      remedy: REMEDY.chamomileTea },
    { symptom: "Anxiety",      remedy: REMEDY.ashwagandha },
    { symptom: "Anxiety",      remedy: REMEDY.lavenderPassion },
    { symptom: "Fatigue",      remedy: REMEDY.goldenMilk },
    { symptom: "Fatigue",      remedy: REMEDY.ashwagandha },
    { symptom: "Fatigue",      remedy: REMEDY.lemonWater },
    { symptom: "Congestion",   remedy: REMEDY.elderberry },
    { symptom: "Congestion",   remedy: REMEDY.garlicHoney },
    { symptom: "Congestion",   remedy: REMEDY.honeyGargle },
    { symptom: "Dry Skin",     remedy: REMEDY.coconutMask },
    { symptom: "Dry Skin",     remedy: REMEDY.oatBath },
    { symptom: "Acne",         remedy: REMEDY.teaTreeSpot },
    { symptom: "Acne",         remedy: REMEDY.greenTeaToner },
    { symptom: "Eye Strain",   remedy: REMEDY.chamomileEye },
    { symptom: "Eye Strain",   remedy: REMEDY.roseWater },
    { symptom: "Stress",       remedy: REMEDY.ashwagandha },
    { symptom: "Stress",       remedy: REMEDY.chamomileTea },
    { symptom: "Stress",       remedy: REMEDY.lavenderPassion },
    { symptom: "Back Pain",    remedy: REMEDY.turmericPaste },
    { symptom: "Back Pain",    remedy: REMEDY.gingerCayenne },
    { symptom: "Muscle Cramps", remedy: REMEDY.magnesiumWater },
    { symptom: "Muscle Cramps", remedy: REMEDY.turmericPaste },
  ].map((row) => ({ symptom_id: symMap[row.symptom], remedy_id: row.remedy }))
   .filter((r) => r.symptom_id && r.remedy_id);

  const { error: srErr } = await supabase.from("symptom_remedies").insert(symptomRemedies);
  if (srErr) console.error("ERROR inserting symptom_remedies:", srErr.message);
  else console.log(`Inserted ${symptomRemedies.length} symptom-remedy mappings`);

  // ── 4. Symptom → Herb mappings ────────────────────────────────────────────
  const symptomHerbs = [
    { symptom: "Headache",     herb: herbMap["peppermint"] },
    { symptom: "Headache",     herb: herbMap["turmeric"] },
    { symptom: "Nausea",       herb: herbMap["ginger"] },
    { symptom: "Nausea",       herb: herbMap["fennel"] },
    { symptom: "Nausea",       herb: herbMap["peppermint"] },
    { symptom: "Sore Throat",  herb: herbMap["echinacea"] },
    { symptom: "Sore Throat",  herb: herbMap["ginger"] },
    { symptom: "Joint Pain",   herb: herbMap["turmeric"] },
    { symptom: "Joint Pain",   herb: herbMap["ginger"] },
    { symptom: "Insomnia",     herb: herbMap["chamomile"] },
    { symptom: "Insomnia",     herb: herbMap["lavender"] },
    { symptom: "Insomnia",     herb: herbMap["passionflower"] },
    { symptom: "Bloating",     herb: herbMap["fennel"] },
    { symptom: "Bloating",     herb: herbMap["ginger"] },
    { symptom: "Anxiety",      herb: herbMap["ashwagandha"] },
    { symptom: "Anxiety",      herb: herbMap["chamomile"] },
    { symptom: "Anxiety",      herb: herbMap["passionflower"] },
    { symptom: "Fatigue",      herb: herbMap["ashwagandha"] },
    { symptom: "Congestion",   herb: herbMap["echinacea"] },
    { symptom: "Congestion",   herb: herbMap["elderberry"] },
    { symptom: "Acne",         herb: herbMap["tea_tree"] },
    { symptom: "Stress",       herb: herbMap["ashwagandha"] },
    { symptom: "Stress",       herb: herbMap["chamomile"] },
    { symptom: "Eye Strain",   herb: herbMap["chamomile"] },
  ].map((row) => ({ symptom_id: symMap[row.symptom], herb_id: row.herb }))
   .filter((r) => r.symptom_id && r.herb_id);

  const { error: shErr } = await supabase.from("symptom_herbs").insert(symptomHerbs);
  if (shErr) console.error("ERROR inserting symptom_herbs:", shErr.message);
  else console.log(`Inserted ${symptomHerbs.length} symptom-herb mappings`);

  console.log("\n=== Done ===");
}

main();
