import Link from "next/link";
import { Leaf } from "lucide-react";
import NewsletterForm from "@/app/ui/NewsletterForm";

const EXPLORE_LINKS = [
  { label: "Remedies", href: "/remedies" },
  { label: "Herb Library", href: "/herbs" },
  { label: "Symptom Checker", href: "/symptoms" },
  { label: "Preparation Methods", href: "/preparations" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Disclaimer", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-high">
      {/* Newsletter CTA */}
      <div className="py-16 px-6 lg:px-12 bg-surface-container">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex flex-col gap-2 max-w-md">
            <div className="flex items-center gap-2 text-primary-container mb-1">
              <Leaf size={18} />
              <span className="text-[12px] font-semibold uppercase tracking-[0.06rem]" style={{ fontFamily: "var(--font-work-sans)" }}>
                Daily Wisdom
              </span>
            </div>
            <h3 className="font-serif font-bold text-[24px] text-on-surface leading-snug">
              Receive ancestral health wisdom, weekly.
            </h3>
            <p className="text-[14px] text-on-surface-variant leading-relaxed">
              Herb profiles, seasonal remedies, and wellness rituals — delivered to your inbox.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="py-8 px-6 lg:px-12 bg-surface-low">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-[13px] text-on-surface-variant leading-relaxed max-w-3xl mx-auto">
            <strong className="text-on-surface font-semibold">Disclaimer:</strong>{" "}
            NaturaMed is for educational purposes only. This content is not
            intended to diagnose, treat, cure, or prevent any disease. Always
            consult a qualified healthcare provider before beginning any natural
            remedy protocol.
          </p>
        </div>
      </div>

      {/* Main footer */}
      <div className="py-14 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-start justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <Link href="/" className="font-serif text-[24px] text-primary-container font-bold tracking-tight">
              NaturaMed
            </Link>
            <p className="text-[14px] text-on-surface-variant leading-relaxed">
              Ancestral healing knowledge, brought into the digital age.
              Bridging ancient botanical wisdom with modern wellness.
            </p>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-12">
            <div>
              <p className="text-[11px] font-semibold text-on-surface uppercase tracking-[0.06rem] mb-5" style={{ fontFamily: "var(--font-work-sans)" }}>
                Resources
              </p>
              <div className="flex flex-col gap-3">
                {EXPLORE_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-[14px] text-on-surface-variant hover:text-primary-container transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-on-surface uppercase tracking-[0.06rem] mb-5" style={{ fontFamily: "var(--font-work-sans)" }}>
                Company
              </p>
              <div className="flex flex-col gap-3">
                {COMPANY_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-[14px] text-on-surface-variant hover:text-primary-container transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-[1200px] mx-auto mt-12 pt-6 border-t border-outline-variant/20 text-center">
          <p className="text-[13px] text-on-surface-variant">
            &copy; 2026 NaturaMed. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
