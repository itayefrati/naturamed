import Link from "next/link";
import Footer from "@/app/ui/Footer";
import FloatingOrbs from "@/app/ui/motion/FloatingOrbs";
import HeroText from "@/app/ui/motion/HeroText";
import ScrollReveal from "@/app/ui/motion/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/app/ui/motion/StaggerContainer";
import CardHover from "@/app/ui/motion/CardHover";

// ─────────────────────────────────────────────────────────────────────────────

const PHILOSOPHY_CARDS = [
  {
    icon: "\u{1F30D}",
    title: "Ancestral Wisdom",
    description:
      "We honor the traditional medicine systems that have sustained human health for millennia — from Ayurveda and Traditional Chinese Medicine to Indigenous herbalism and folk remedies passed through generations.",
  },
  {
    icon: "\u{1F52C}",
    title: "Evidence-Informed",
    description:
      "While rooted in tradition, we respect and reference modern scientific research. Every remedy is presented with transparency, including known interactions, contraindications, and areas where evidence is still emerging.",
  },
  {
    icon: "\u{1F91D}",
    title: "Accessible to All",
    description:
      "Natural health knowledge should be free and open. NaturaMed is built as a public resource — no paywalls, no subscriptions. Everyone deserves access to the healing wisdom of the natural world.",
  },
];

const COVERAGE_ITEMS = [
  { label: "Health Categories", description: "Organized by body system and concern" },
  { label: "Conditions & Symptoms", description: "Detailed profiles with natural approaches" },
  { label: "Herbal Library", description: "Comprehensive herb profiles with safety data" },
  { label: "Preparation Methods", description: "Step-by-step guides from teas to tinctures" },
  { label: "Curated Remedies", description: "Traditional recipes with clear instructions" },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 px-6 lg:px-12 bg-primary overflow-hidden">
        <FloatingOrbs dark />
        <div className="relative max-w-[1200px] mx-auto flex flex-col items-center text-center gap-5">
          <HeroText delay={0.05}>
            <p
              className="text-[13px] font-medium uppercase tracking-[0.05rem] text-on-primary/70"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              Our Mission
            </p>
          </HeroText>
          <HeroText delay={0.15}>
            <h1 className="font-serif font-bold text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.08] text-on-primary max-w-3xl tracking-tight">
              About NaturaMed
            </h1>
          </HeroText>
          <HeroText delay={0.25}>
            <p className="text-[18px] text-on-primary/80 max-w-xl leading-relaxed">
              Bridging ancient botanical wisdom with modern wellness — a free,
              open resource for anyone seeking natural approaches to health and
              well-being.
            </p>
          </HeroText>
        </div>
      </section>

      {/* ── Our Philosophy ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12 bg-surface-low">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p
              className="text-[13px] font-medium uppercase tracking-[0.05rem] text-primary-container mb-3"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              What We Believe
            </p>
            <h2 className="font-serif font-semibold text-[28px] md:text-[36px] text-on-surface">
              Our Philosophy
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {PHILOSOPHY_CARDS.map((card) => (
              <StaggerItem key={card.title}>
                <CardHover className="h-full">
                  <div className="rounded-xl bg-surface-lowest p-7 flex flex-col gap-4 shadow-ambient h-full">
                    <span className="text-[40px] leading-none" role="img" aria-label={card.title}>
                      {card.icon}
                    </span>
                    <h3 className="font-serif font-semibold text-[22px] text-on-surface leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-[15px] text-on-surface-variant leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </CardHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── What We Cover ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12 bg-surface">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p
              className="text-[13px] font-medium uppercase tracking-[0.05rem] text-primary-container mb-3"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              Our Scope
            </p>
            <h2 className="font-serif font-semibold text-[28px] md:text-[36px] text-on-surface">
              What We Cover
            </h2>
            <p className="text-[16px] text-on-surface-variant mt-4 max-w-2xl mx-auto leading-relaxed">
              NaturaMed is a comprehensive natural health encyclopedia. We
              organize traditional healing knowledge into an accessible,
              searchable library that anyone can explore.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COVERAGE_ITEMS.map((item) => (
              <StaggerItem key={item.label}>
                <div className="rounded-xl bg-secondary-container/40 p-6 flex flex-col gap-2 h-full">
                  <h3 className="font-semibold text-[16px] text-on-surface">
                    {item.label}
                  </h3>
                  <p className="text-[14px] text-on-surface-variant leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Important Disclaimer ───────────────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-12 bg-tertiary-fixed/30">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="rounded-xl bg-surface-lowest p-10 md:p-14 flex flex-col gap-5 shadow-ambient">
              <p
                className="text-[12px] font-semibold uppercase tracking-[0.05rem] text-tertiary"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                Important Disclaimer
              </p>
              <h2 className="font-serif font-semibold text-[24px] md:text-[28px] text-on-surface leading-tight">
                This is not medical advice
              </h2>
              <div className="flex flex-col gap-4 text-[15px] text-on-surface-variant leading-relaxed max-w-3xl">
                <p>
                  NaturaMed is an educational resource designed to preserve and
                  share traditional healing knowledge. The information provided on
                  this site is not intended to diagnose, treat, cure, or prevent
                  any disease.
                </p>
                <p>
                  Always consult a qualified healthcare professional before
                  starting any herbal remedy, especially if you are pregnant,
                  nursing, taking medications, or have a pre-existing medical
                  condition. Natural does not always mean safe — many herbs have
                  significant interactions and contraindications.
                </p>
                <p>
                  The remedies presented here are drawn from traditional use and
                  should not replace professional medical care. Use this
                  information responsibly and at your own discretion.
                </p>
              </div>
              <Link
                href="/remedies"
                className="inline-flex items-center gap-2 text-[14px] text-primary-container font-medium hover:underline mt-2"
              >
                Browse Remedies with Full Safety Info <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
