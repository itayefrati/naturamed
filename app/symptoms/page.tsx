"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Search } from "lucide-react";
import Footer from "@/app/ui/Footer";

const COMMON_SYMPTOMS = [
  "Headache",
  "Fatigue",
  "Nausea",
  "Insomnia",
  "Joint Pain",
  "Sore Throat",
  "Bloating",
  "Anxiety",
  "Back Pain",
  "Congestion",
  "Dry Skin",
  "Muscle Cramps",
];

const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Add Symptoms",
    description: "Describe what you're experiencing by adding your symptoms to the list.",
  },
  {
    step: "02",
    title: "Get Matched",
    description: "Our system cross-references your symptoms against our botanical knowledge base.",
  },
  {
    step: "03",
    title: "Explore Remedies",
    description: "Browse curated natural remedies tailored to your specific combination of symptoms.",
  },
];

export default function SymptomsPage() {
  const router = useRouter();
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  function addSymptom(symptom: string) {
    const trimmed = symptom.trim();
    if (!trimmed) return;
    // Avoid duplicates (case-insensitive)
    if (symptoms.some((s) => s.toLowerCase() === trimmed.toLowerCase())) return;
    setSymptoms((prev) => [...prev, trimmed]);
    setInputValue("");
  }

  function removeSymptom(index: number) {
    setSymptoms((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (inputValue.trim()) {
      addSymptom(inputValue);
      return;
    }
  }

  function handleFindRemedies() {
    if (symptoms.length === 0) return;
    const query = symptoms.join("+");
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addSymptom(inputValue);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-surface">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center gap-5">
          <p
            className="text-[13px] font-medium uppercase tracking-[0.05rem] text-primary-container"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            Botanical Assessment
          </p>
          <h1 className="font-serif font-bold text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.08] text-on-surface max-w-3xl tracking-tight">
            Symptom Checker
          </h1>
          <p className="text-[18px] text-on-surface-variant max-w-xl leading-relaxed">
            Describe your symptoms and we&apos;ll suggest natural remedies from
            our botanical library.
          </p>
        </div>
      </section>

      {/* ── Symptom Input Card ───────────────────────────────────────────── */}
      <section className="px-6 lg:px-12 -mt-6 relative z-10 pb-16">
        <div className="max-w-[720px] mx-auto rounded-2xl bg-surface-lowest shadow-ambient-lg p-8 md:p-10 flex flex-col gap-6">

          {/* Input row */}
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none"
              />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a symptom…"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface-lowest border-ghost text-on-surface placeholder:text-outline text-[15px] focus:outline-none focus:ring-2 focus:ring-primary-container/20 transition-shadow duration-150"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-3 rounded-lg bg-secondary-container text-on-secondary-container text-[14px] font-semibold hover:bg-secondary-container/70 transition-colors duration-150 cursor-pointer"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              <Plus size={16} strokeWidth={2.5} />
              Add
            </button>
          </form>

          {/* Symptom pills or empty state */}
          <div className="min-h-[48px]">
            {symptoms.length === 0 ? (
              <p className="text-[14px] text-outline leading-relaxed py-2">
                Add symptoms above to get started
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {symptoms.map((symptom, index) => (
                  <span
                    key={`${symptom}-${index}`}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-[14px] font-medium group transition-colors duration-150"
                  >
                    {symptom}
                    <button
                      type="button"
                      onClick={() => removeSymptom(index)}
                      className="rounded-full p-0.5 hover:bg-primary-container/20 transition-colors duration-150 cursor-pointer"
                      aria-label={`Remove ${symptom}`}
                    >
                      <X size={14} strokeWidth={2.5} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Find Remedies CTA */}
          <button
            type="button"
            onClick={handleFindRemedies}
            disabled={symptoms.length === 0}
            className="w-full btn-primary py-3.5 rounded-lg text-[16px] font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer"
          >
            <Search size={18} strokeWidth={2} />
            Find Remedies
          </button>
        </div>
      </section>

      {/* ── Common Symptoms ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12 bg-surface-low">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <p
              className="text-[13px] font-medium uppercase tracking-[0.05rem] text-primary-container mb-3"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              Quick Select
            </p>
            <h2 className="font-serif font-semibold text-[28px] md:text-[36px] text-on-surface">
              Common Symptoms
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {COMMON_SYMPTOMS.map((symptom) => {
              const isActive = symptoms.some(
                (s) => s.toLowerCase() === symptom.toLowerCase()
              );
              return (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => {
                    if (isActive) {
                      setSymptoms((prev) =>
                        prev.filter(
                          (s) => s.toLowerCase() !== symptom.toLowerCase()
                        )
                      );
                    } else {
                      addSymptom(symptom);
                    }
                  }}
                  className={`px-5 py-2.5 rounded-full text-[14px] font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-secondary-container text-on-secondary-container"
                      : "bg-surface-lowest text-on-surface-variant hover:bg-secondary-container/40 shadow-ambient"
                  }`}
                >
                  {symptom}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12 bg-surface">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-[13px] font-medium uppercase tracking-[0.05rem] text-primary-container mb-3"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              Simple Process
            </p>
            <h2 className="font-serif font-semibold text-[28px] md:text-[36px] text-on-surface">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {HOW_IT_WORKS_STEPS.map(({ step, title, description }) => (
              <div key={step} className="flex flex-col items-center text-center gap-5">
                <div className="w-12 h-12 rounded-full btn-primary flex items-center justify-center shrink-0">
                  <span
                    className="text-on-primary text-[14px] font-semibold tracking-wide"
                    style={{ fontFamily: "var(--font-work-sans)" }}
                  >
                    {step}
                  </span>
                </div>
                <h3 className="font-semibold text-[18px] text-on-surface">
                  {title}
                </h3>
                <p className="text-[15px] text-on-surface-variant leading-relaxed max-w-xs">
                  {description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
