import Link from "next/link";

const footerLinks = [
  { href: "/cases", label: "Case Library" },
  { href: "/socialplug-review", label: "Exposure Overview" },
  { href: "/refund-guide", label: "Refunds and Chargebacks" },
  { href: "/submit-report", label: "Submit Evidence" },
];

const seoLinks = [
  { href: "/socialplug-scam", label: "SocialPlug scam" },
  { href: "/socialplug-review", label: "SocialPlug review" },
  { href: "/socialplug-refund", label: "SocialPlug refund" },
  { href: "/socialplug-not-delivered", label: "SocialPlug not delivered" },
  { href: "/socialplug-complaints", label: "SocialPlug complaints" },
  { href: "/is-socialplug-legit", label: "is SocialPlug legit" },
  { href: "/socialplug-trustpilot", label: "SocialPlug Trustpilot" },
  { href: "/socialplug-chargeback", label: "SocialPlug chargeback" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-black/8 bg-[rgba(20,16,14,0.96)] text-[#f6efe4]">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <p className="eyebrow !text-[#cfbeb0] before:!bg-[#6f6258]">
            Public Interest Project
          </p>
          <h2 className="display-title max-w-xl text-3xl font-semibold leading-tight">
            Let people see the risk and the evidence before they pay SocialPlug.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-[#d9cec4]">
            This site publicly collects and displays order disputes, non-delivery
            cases, refund conflicts, and user evidence related to SocialPlug.
            Every page is built around archived proof, timelines, and risk warnings.
            We do not invent facts. We keep what can be checked.
          </p>
        </div>
        <div className="grid gap-3 text-sm text-[#d9cec4]">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-white/10 px-4 py-3 transition-colors hover:bg-white/4"
            >
              {link.label}
            </Link>
          ))}
          <div className="rounded-2xl border border-white/10 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-[#a99381]">
              Notice
            </p>
            <p className="mt-2 leading-6">
              Content is based on user statements, public screenshots, and archived
              evidence. Final determinations belong to regulators, payment providers,
              or courts.
            </p>
          </div>
        </div>
      </div>
      <div className="container-shell border-t border-white/8 pb-12 pt-8">
        <p className="text-xs uppercase tracking-[0.18em] text-[#a99381]">
          Questions People Check Before Paying
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {seoLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-[#d9cec4] transition-colors hover:bg-white/4"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
