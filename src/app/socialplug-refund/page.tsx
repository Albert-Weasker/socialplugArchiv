import type { Metadata } from "next";
import Link from "next/link";
import { CaseSpotlightGrid } from "@/components/case-spotlight-grid";
import { SectionHeading } from "@/components/section-heading";
import { getPublicCases, pickCasesBySlug } from "@/lib/cases";

export const metadata: Metadata = {
  title: "SocialPlug Refund",
  description:
    "A SocialPlug refund action page for buyers who already paid, did not get the service they expected, and need to move quickly into the refund workflow.",
};

const problemSignals = [
  {
    title: "⏳ Refund requests keep getting delayed",
    body: "Instead of a clear refund outcome, the buyer gets more waiting, more replies, and less progress.",
  },
  {
    title: "🌀 Support loops replace real resolution",
    body: "The conversation continues, but the payment problem does not actually move toward closure.",
  },
  {
    title: "📉 Buyers escalate too late",
    body: "People often reach PayPal, bank, or card disputes only after their evidence file has already weakened.",
  },
  {
    title: "📭 Public complaints keep tying refunds back to non-delivery",
    body: "Refund trouble often appears after missing delivery, unstable results, or service that never matched what was sold.",
  },
];

const faqItems = [
  {
    question: "What should a buyer do before asking for a refund?",
    answer:
      "Preserve the payment proof, order details, promise screenshots, proof of missing or unstable service, and the full support record before more time is lost.",
  },
  {
    question: "When should support stop being the main path?",
    answer:
      "Once the seller is delaying, refusing, or failing to resolve the issue clearly, the next step is no longer endless messaging. It is the structured refund and dispute path.",
  },
];

export default async function SocialPlugRefundPage() {
  const cases = await getPublicCases();
  const refundCases = pickCasesBySlug(cases, [
    "exclusive-email-jia-socialplug-refund-forced-to-account-balance",
    "trustpilot-md-no-delivery-refund-email-loop",
    "trustpilot-keyxe-hidden-policies-no-refund",
    "trustpilot-captain-bangsaen-subreddit-banned-no-refund",
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
          <p className="eyebrow">Refund Action Page</p>
          <h1 className="display-title mt-5 max-w-5xl text-5xl leading-[0.96] font-semibold md:text-6xl">
            SocialPlug refund: unfortunately, you already paid and did not get the service you were
            supposed to get
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--muted)]">
            If that is why you are here, do not keep this trapped inside support chat. We already
            prepared a refund guide for this exact stage so you can move from frustration into a
            usable evidence and dispute process before more time is lost.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/refund-guide" className="accent-button">
              Open the refund guide now
            </Link>
            <Link href="/cases" className="ghost-button">
              Compare with archived cases
            </Link>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[rgba(195,78,47,0.26)] bg-[linear-gradient(135deg,rgba(119,13,13,0.94),rgba(55,14,14,0.94))] px-6 py-7 text-[#fff2ea] shadow-[0_24px_80px_rgba(73,12,12,0.26)] md:px-8 md:py-8">
          <p className="eyebrow !text-[#f3b7aa] before:!bg-[#d26c58]">Start Here</p>
          <h2 className="display-title mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-5xl">
            Your next move is not more patience. Your next move is the refund workflow.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#ffd9cf]">
            The guide already exists. Use it before delay turns a recoverable dispute into a weaker
            one.
          </p>
        </section>

        <div className="two-grid">
          <section className="glass-card rounded-[2rem] p-6 md:p-8">
            <SectionHeading
              eyebrow="What Usually Happens"
              title="What tends to go wrong before money is recovered"
              description="This is the stage where buyers often lose leverage without realizing it."
            />
            <div className="grid gap-4">
              {problemSignals.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.4rem] border border-black/8 bg-white/45 p-5"
                >
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <aside className="ink-card rounded-[2rem] p-6 md:p-8">
            <p className="eyebrow !text-[#d8c7ba] before:!bg-[#9d8778]">If You Landed Here Now</p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[#f2e8de]">
              <p>
                Before payment, the smarter move is to stop and read the case library before you
                decide.
              </p>
              <p>
                After payment, the smarter move is to stop waiting, preserve your evidence, and
                learn the refund path immediately.
              </p>
              <p>
                This page should push you into action, not leave you sitting in another support
                loop.
              </p>
            </div>
          </aside>
        </div>

        <CaseSpotlightGrid
          eyebrow="Refund Cases In The Archive"
          title='Cases showing why "SocialPlug refund" searches usually start after the seller stops fixing the problem'
          description="These archived entries are the practical reason this page exists. They show refund requests getting trapped in repeated emails, denied outright, redirected into balance logic, or rejected after visible downstream harm."
          cases={refundCases}
        />

        <section className="glass-card rounded-[2rem] p-6 md:p-8">
          <SectionHeading
            eyebrow="Use The Guide"
            title="We already prepared the refund guide for the step you are in now"
            description="Do not stop at this page. Go into the operational guide and use the exact workflow for evidence, refund requests, and escalation."
          />
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-[1.5rem] border border-black/8 bg-white/45 p-5">
              <h2 className="text-lg font-semibold">Learn the refund workflow</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                Use the full action page for evidence order, request structure, and escalation timing.
              </p>
              <Link href="/refund-guide" className="accent-button mt-5 inline-flex">
                Go to refund guide
              </Link>
            </article>
            <article className="rounded-[1.5rem] border border-black/8 bg-white/45 p-5">
              <h2 className="text-lg font-semibold">Check whether your pattern is already public</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                Compare your experience with archived cases before you let the seller control the story.
              </p>
              <Link href="/cases" className="ghost-button mt-5 inline-flex">
                Open case library
              </Link>
            </article>
            <article className="rounded-[1.5rem] border border-black/8 bg-white/45 p-5">
              <h2 className="text-lg font-semibold">Preserve your own record</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                Submit your evidence so the dispute does not remain invisible inside private messages.
              </p>
              <Link href="/submit-report" className="ghost-button mt-5 inline-flex">
                Submit evidence
              </Link>
            </article>
          </div>
        </section>

        <section className="glass-card rounded-[2rem] p-6 md:p-8">
          <SectionHeading
            eyebrow="FAQ"
            title='Quick answers for "SocialPlug refund"'
            description="These are the questions buyers are really asking once they have already paid and the seller is no longer solving the problem."
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
