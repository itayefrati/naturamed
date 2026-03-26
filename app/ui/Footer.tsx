import Link from "next/link";

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
      <div className="py-12 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-start justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <Link href="/" className="font-serif text-[22px] text-primary-container font-semibold">
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
              <p className="text-[12px] font-semibold text-on-surface uppercase tracking-[0.05rem] mb-4" style={{ fontFamily: "var(--font-work-sans)" }}>
                Resources
              </p>
              <div className="flex flex-col gap-2.5">
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
              <p className="text-[12px] font-semibold text-on-surface uppercase tracking-[0.05rem] mb-4" style={{ fontFamily: "var(--font-work-sans)" }}>
                Company
              </p>
              <div className="flex flex-col gap-2.5">
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
        <div className="max-w-[1200px] mx-auto mt-10 pt-6 border-t border-outline-variant/20 text-center">
          <p className="text-[13px] text-on-surface-variant">
            &copy; 2026 NaturaMed. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
