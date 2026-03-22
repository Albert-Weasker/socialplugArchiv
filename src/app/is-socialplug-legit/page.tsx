import type { Metadata } from "next";
import Link from "next/link";
import { CaseSpotlightGrid } from "@/components/case-spotlight-grid";
import { SectionHeading } from "@/components/section-heading";
import { getPublicCases, pickCasesBySlug } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Is SocialPlug Legit",
  description:
    "A decision page for buyers asking whether SocialPlug is legit, combining public company identity, transparency risk, giant counter claims, and trust-signal weaknesses.",
};

const companyProfileLinks = [
  {
    label: "Official About Page",
    href: "https://www.socialplug.io/about-us",
  },
  {
    label: "Estonia Business Register",
    href: "https://ariregister.rik.ee/eng/company/16474680/CB-Solutions-O%C3%9C",
  },
  {
    label: "Qwoted Profile: Mark Voronov",
    href: "https://app.qwoted.com/sources/mark-voronov",
  },
  {
    label: "Trustpilot Reviews",
    href: "https://www.trustpilot.com/review/panel.socialplug.io",
  },
];

const companyFacts = [
  { title: "Operating entity", body: "CB Solutions OÜ" },
  { title: "Jurisdiction", body: "Tallinn, Estonia" },
  { title: "Registered in", body: "2022" },
  { title: "Company form", body: "Private limited company, not publicly listed" },
  { title: "Official domain", body: "socialplug.io" },
  {
    title: "What it sells",
    body: "Followers, likes, views, comments, and similar social-growth services",
  },
  { title: "Registry code", body: "16474680" },
  { title: "Registered address", body: "Hobujaama tn 4, Tallinn, 10151" },
];

const counterWarnings = [
  "No public audit is attached to the giant number claims.",
  "No third-party order ledger is publicly shown.",
  "No public methodology explains how the counters are calculated.",
  "The numbers appear as seller-controlled marketing signals, not independently verified facts.",
];

const giantCounterBreakdown = [
  {
    title: "Official about-page claim",
    body: 'The public about page says the company has "10k+ total clients" and "6.4M+ orders delivered."',
  },
  {
    title: "Why this matters to a buyer",
    body: "If those claims cannot be independently checked, then the feeling of safety they create is marketing pressure, not verified scale.",
  },
  {
    title: "Trustpilot warning",
    body: "Trustpilot explicitly says it removed fake reviews for this company. That does not prove every positive review is fake, but it does weaken broad trust claims built on review reputation alone.",
  },
  {
    title: "Multiple giant counters, same problem",
    body: "The site also promotes other huge counters like people reached and monthly clicks, but the public pages do not show a transparent verification method for those either.",
  },
];

const faqItems = [
  {
    question: "Is this page claiming a final legal conclusion about SocialPlug?",
    answer:
      "No. This page is about payment risk, transparency, and trust signals. Its job is to show what a buyer should verify before sending money, not to issue a court verdict.",
  },
  {
    question: "Why does the company profile matter before payment?",
    answer:
      "Because a polished storefront can make buyers assume they are dealing with a large transparent brand. Public company identity helps show whether that assumption is actually supported.",
  },
  {
    question: "Why do the giant counters matter so much?",
    answer:
      "Because those numbers are meant to lower caution before payment. If they cannot withstand independent verification, then they should not be what makes a buyer feel safe enough to pay.",
  },
];

export default async function IsSocialPlugLegitPage() {
  const cases = await getPublicCases();
  const legitimacyCases = pickCasesBySlug(cases, [
    "exclusive-email-jia-socialplug-refund-forced-to-account-balance",
    "trustpilot-catalin-account-not-delivered-after-five-minute-promise",
    "trustpilot-raahul-forty-days-no-delivery",
  ]);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="section-pad">
      <div className="container-shell space-y-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <section className="glass-card rounded-[2.2rem] p-7 md:p-10">
          <p className="eyebrow">Payment Decision Page</p>
          <h1 className="display-title mt-5 max-w-5xl text-5xl leading-[0.96] font-semibold md:text-6xl">
            Is SocialPlug legit? Before you send money, confirm what kind of company you are
            actually dealing with.
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--muted)]">
            Most people mean <strong>socialplug.io</strong> when they say SocialPlug. Public pages
            and Estonia registry records do not point to a large transparent public brand. They
            point to a younger private marketing operation tied to <strong>CB Solutions OÜ</strong>
            in Tallinn. That matters before payment. After a dispute starts, it stops being theory
            and becomes part of your risk file.
          </p>
          <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {companyProfileLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="ghost-button !justify-between"
              >
                {item.label}
                <span>↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[rgba(195,78,47,0.22)] bg-[rgba(195,78,47,0.08)] p-6 md:p-8">
          <p className="eyebrow">TL;DR</p>
          <h2 className="display-title mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-5xl">
            This is not a publicly listed company or a highly transparent enterprise brand.
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--foreground)]">
            It is a private Estonia-based marketing business selling third-party social-growth
            services. If that already gives you pause, stop there before you pay.
          </p>
        </section>

        <section className="glass-card rounded-[2rem] p-6 md:p-8">
          <SectionHeading
            eyebrow="Company Profile"
            title="The company picture is smaller, narrower, and less transparent than the front-end branding suggests"
            description="This section matters because buyers often mistake polished branding, clean packaging, and fast-delivery promises for proof that they are dealing with a large trustworthy operator."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {companyFacts.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-black/8 bg-white/45 p-5"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="two-grid">
          <section className="glass-card rounded-[2rem] p-6 md:p-8">
            <SectionHeading
              eyebrow="Why Extra Caution Is Justified"
              title="This is where the public company picture and the complaint picture start combining"
              description="The risk is not just about one registry record. It is the combination of modest transparency, public complaint repetition, and a business model built around third-party growth services."
            />
            <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">
              <p>
                People often see a polished website, clear package pricing, and fast-delivery
                language and assume they are dealing with a larger, safer brand than they really are.
              </p>
              <p>
                This section exists to cut through that assumption. The public company profile is
                materially narrower than the image projected by the storefront.
              </p>
              <p>
                Public complaints add the second layer of risk: delivery disputes, sudden drop-off,
                refund conflict, and support breakdown.
              </p>
            </div>
          </section>

          <aside className="ink-card rounded-[2rem] p-6 md:p-8">
            <p className="eyebrow !text-[#d8c7ba] before:!bg-[#9d8778]">Founder / CEO Identity</p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[#f2e8de]">
              <p>
                Third-party profiles and interviews publicly describe Mark Voronov as SocialPlug’s
                co-founder or CEO.
              </p>
              <p>
                On the official about page, the directly visible identity is narrower: “Mark V.,
                Communications Manager,” with <strong>mark@socialplug.io</strong>.
              </p>
              <p>
                The point is not that the identity is necessarily false. The point is that repeated
                public mentions are not the same thing as full corporate transparency.
              </p>
            </div>
          </aside>
        </div>

        <section className="glass-card rounded-[2rem] p-6 md:p-8">
          <SectionHeading
            eyebrow="Check This Before Buying"
            title="These are the four questions that should decide whether you keep going"
            description="Do not use design quality as a trust metric. Use company records, public complaints, identity signals, and your own evidence standard."
          />
          <div className="grid gap-3">
            {[
              "Verify the operating company record, not just the marketing brand.",
              "Read public complaint material before you pay.",
              "Ask whether the service itself can survive platform scrutiny.",
              "Decide whether you would still pay if the refund later turned into a dispute.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.3rem] border border-black/8 bg-white/45 px-4 py-3 text-sm leading-7"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <CaseSpotlightGrid
          eyebrow="Cases Cautious Buyers Read"
          title='Public cases that answer the "socialplug legit" question faster than branding does'
          description="These examples matter because they sit on the buyer side of the transaction. They show what happens after money is sent, promises are tested, and the seller is asked to make things right."
          cases={legitimacyCases}
        />

        <section className="rounded-[2rem] border border-[rgba(195,78,47,0.26)] bg-[linear-gradient(135deg,rgba(119,13,13,0.94),rgba(55,14,14,0.94))] px-6 py-7 text-[#fff2ea] shadow-[0_24px_80px_rgba(73,12,12,0.26)] md:px-8 md:py-8">
          <p className="eyebrow !text-[#f3b7aa] before:!bg-[#d26c58]">Do Not Pay Because Of Big Counters</p>
          <h2 className="display-title mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-5xl">
            If giant numbers are what makes you feel safe enough to pay, stop there.
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-[#ffd9cf]">
            SocialPlug publicly markets claims such as 6.4M+ orders delivered, 10k+ clients, 1.5B+
            people reached, and 5M+ monthly clicks. We did not find a public audit, transparent
            methodology, or outside order ledger that verifies those claims. If they cannot be
            independently checked, they should not be what lowers your caution before payment.
          </p>
        </section>

        <section className="glass-card rounded-[2rem] p-6 md:p-8">
          <SectionHeading
            eyebrow="Why The Counters Matter"
            title="These numbers are supposed to lower your guard before payment"
            description="That is why they need to survive verification. If they cannot, then the comfort they create belongs to marketing, not to fact."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-[1.5rem] border border-black/8 bg-white/45 p-5">
              <h2 className="text-lg font-semibold">What is missing</h2>
              <div className="mt-4 grid gap-3">
                {counterWarnings.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.2rem] border border-black/8 bg-white/55 px-4 py-3 text-sm leading-7"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>
            <article className="rounded-[1.5rem] border border-black/8 bg-white/45 p-5">
              <h2 className="text-lg font-semibold">Why it changes the decision</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                If those claims cannot be independently verified, then you are not paying based on
                verified scale. You are paying under the pressure of numbers designed to make the
                company feel larger and safer than what the public evidence can actually confirm.
              </p>
            </article>
          </div>
        </section>

        <section className="glass-card rounded-[2rem] p-6 md:p-8">
          <SectionHeading
            eyebrow="Public Trust Signals Under Stress"
            title="What starts breaking once you look past the sales copy"
            description="The issue is not one isolated inconsistency. The issue is that the trust case gets weaker when you put the public signals side by side."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {giantCounterBreakdown.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-black/8 bg-white/45 p-5"
              >
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="two-grid">
          <section className="glass-card rounded-[2rem] p-6 md:p-8">
            <SectionHeading
              eyebrow="Decision Pressure"
              title="The actual decision point is simple"
              description="If giant counters, polished design, and broad trust language are what made you feel ready to pay, those same things should be strong enough to survive public verification."
            />
            <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">
              <p>
                Buyers should remember one thing: do not let oversized counters talk you into a
                payment decision.
              </p>
              <p>
                If those numbers cannot be independently checked, then what you are relying on is
                not fact. It is marketing leverage.
              </p>
              <p className="font-medium text-[var(--ink)]">
                If you pay on that basis, the risk is yours, not theirs.
              </p>
            </div>
          </section>

          <aside className="glass-card rounded-[2rem] p-6 md:p-8">
            <SectionHeading
              eyebrow="Where To Go Next"
              title="Use evidence, not branding, to finish the decision"
              description="This page should not leave you in abstract doubt. It should move you into the strongest public records available."
            />
            <div className="grid gap-3">
              <Link href="/cases" className="accent-button">
                Open the case library
              </Link>
              <Link href="/socialplug-review" className="ghost-button">
                Open the exposure overview
              </Link>
              <Link href="/socialplug-trustpilot" className="ghost-button">
                Open the Trustpilot signal page
              </Link>
            </div>
          </aside>
        </section>

        <section className="glass-card rounded-[2rem] p-6 md:p-8">
          <SectionHeading
            eyebrow="FAQ"
            title='Quick answers for "is SocialPlug legit"'
            description="These questions exist because most buyers search this phrase at the exact moment when design confidence stops being enough."
          />
          <div className="grid gap-4">
            {faqItems.map((item) => (
              <article
                key={item.question}
                className="rounded-[1.4rem] border border-black/8 bg-white/45 p-5"
              >
                <h2 className="text-lg font-semibold">{item.question}</h2>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
