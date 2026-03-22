import type { Metadata } from "next";
import Link from "next/link";
import { CaseSpotlightGrid } from "@/components/case-spotlight-grid";
import { SectionHeading } from "@/components/section-heading";
import { getPublicCases, pickCasesBySlug } from "@/lib/cases";

export const metadata: Metadata = {
  title: "SocialPlug Review Experiment",
  description:
    "An experimental SocialPlug review page that renders visible review content together with Review JSON-LD for rich result testing.",
  alternates: {
    canonical: "/socialplug-review-experiment",
  },
};

const ratingBreakdown = [
  {
    label: "Delivery reliability",
    score: "1/5",
    detail: "Archived complaints repeatedly describe no delivery, partial delivery, or delivery that never stabilizes.",
  },
  {
    label: "Refund handling",
    score: "1/5",
    detail: "Public cases repeatedly mention delay, refusal, account-balance substitution, or support loops instead of clean refunds.",
  },
  {
    label: "Support quality",
    score: "1/5",
    detail: "Buyers repeatedly describe canned replies, circular emails, or communication breakdown once money recovery becomes the issue.",
  },
];

const visibleReviewSummary =
  "Based on the complaint archive shown on this site, the editorial review is negative. The repeated pattern is payment first, disputed fulfillment second, and refund conflict or support breakdown after that.";

export default async function SocialPlugReviewExperimentPage() {
  const cases = await getPublicCases();
  const featuredCases = pickCasesBySlug(cases, [
    "trustpilot-md-no-delivery-refund-email-loop",
    "exclusive-email-jia-socialplug-refund-forced-to-account-balance",
    "trustpilot-catalin-account-not-delivered-after-five-minute-promise",
  ]);

  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": "https://socialplugarchive.com/socialplug-review-experiment#review",
    url: "https://socialplugarchive.com/socialplug-review-experiment",
    name: "SocialPlug Review Experiment",
    headline: "SocialPlug Review Experiment",
    author: {
      "@type": "Organization",
      name: "SocialPlug Evidence Archive",
      url: "https://socialplugarchive.com",
    },
    publisher: {
      "@type": "Organization",
      name: "SocialPlug Evidence Archive",
      url: "https://socialplugarchive.com",
    },
    itemReviewed: {
      "@type": "Organization",
      name: "SocialPlug",
      url: "https://www.socialplug.io",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: 1,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: visibleReviewSummary,
  };

  return (
    <div className="section-pad">
      <div className="container-shell space-y-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
        />

        <section className="glass-card rounded-[2.2rem] p-7 md:p-10">
          <p className="eyebrow">Review Schema Experiment</p>
          <h1 className="display-title mt-5 max-w-5xl text-5xl leading-[0.96] font-semibold md:text-6xl">
            SocialPlug review experiment: one standalone page for testing Review JSON-LD
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--muted)]">
            This page exists only as a structured-data experiment. It does not replace your current
            SEO pages. It renders a visible editorial review and pairs it with a single
            <strong> Review </strong>
            JSON-LD block so you can test eligibility separately from the rest of the site.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/socialplug-review" className="accent-button">
              Open the main review page
            </Link>
            <Link href="/cases" className="ghost-button">
              Open the case library
            </Link>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[rgba(195,78,47,0.22)] bg-[rgba(195,78,47,0.08)] p-6 md:p-8">
          <p className="eyebrow">Visible Review</p>
          <h2 className="display-title mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-5xl">
            Editorial rating: 1.0 / 5
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--foreground)]">
            {visibleReviewSummary}
          </p>
        </section>

        <section className="glass-card rounded-[2rem] p-6 md:p-8">
          <SectionHeading
            eyebrow="Rating Breakdown"
            title="The visible review content matches the schema payload"
            description="The point of this page is to keep the structured data aligned with user-visible review text instead of hiding rating signals only inside HTML."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {ratingBreakdown.map((item) => (
              <article
                key={item.label}
                className="rounded-[1.5rem] border border-black/8 bg-white/45 p-5"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                  {item.label}
                </p>
                <p className="display-title mt-3 text-3xl font-semibold">{item.score}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <CaseSpotlightGrid
          eyebrow="Archive Support"
          title="Cases used to support the experimental review page"
          description="These cases are shown so the visible page content and the editorial rating are grounded in the archive instead of being a detached numeric score."
          cases={featuredCases}
        />

        <section className="glass-card rounded-[2rem] p-6 md:p-8">
          <SectionHeading
            eyebrow="Experiment Boundaries"
            title="What this page does and does not change"
            description="This is isolated on purpose so you can test structured data without rewriting earlier SEO work."
          />
          <div className="grid gap-3">
            {[
              "It adds one new URL instead of modifying older landing pages.",
              "It keeps the review rating visible in the page body.",
              "It does not alter any existing title, description, canonical, or FAQ schema on older pages.",
              "It gives you a clean page to validate in Rich Results Test before expanding anything else.",
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
      </div>
    </div>
  );
}
