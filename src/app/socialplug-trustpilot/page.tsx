import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "SocialPlug Trustpilot",
  description:
    "A SocialPlug Trustpilot page focused on repeated complaint patterns, the Trustpilot fake-review warning, and why public reviews become a trust-break signal before payment.",
};

const repeatedPatterns = [
  {
    title: "📭 Delivery complaints keep showing up",
    body: "Public reviews repeatedly describe missing delivery, partial completion, or orders that never meaningfully resolve.",
  },
  {
    title: "📉 Results are described as unstable",
    body: "Some buyers report followers, likes, or views that appear briefly and then fall away fast enough to create a second dispute.",
  },
  {
    title: "🚫 Refund friction becomes part of the story",
    body: "The review trail is not only about delivery. It also reflects delay, refusal, or frustration once money recovery becomes the next issue.",
  },
  {
    title: "👻 Support becomes part of the risk picture",
    body: "Once a buyer reaches public review sites, it often means direct support has already stopped feeling reliable enough on its own.",
  },
];

const faqItems = [
  {
    question: "Why do buyers search SocialPlug Trustpilot right before paying?",
    answer:
      "Because Trustpilot is one of the first outside places where a buyer can check whether public experience matches the confidence projected by the seller’s own marketing.",
  },
  {
    question: "What is the most important thing to look for on Trustpilot?",
    answer:
      "Not the score by itself. The stronger signal is whether the same complaint pattern keeps appearing across delivery, refunds, and support communication.",
  },
  {
    question: "What does the Trustpilot fake-review warning change?",
    answer:
      "It does not prove every positive review is invalid. It does mean buyers should be more careful about treating the public score as a clean trust shortcut.",
  },
];

export default function SocialPlugTrustpilotPage() {
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
          <p className="eyebrow">Trustpilot Signal</p>
          <h1 className="display-title mt-5 max-w-5xl text-5xl leading-[0.96] font-semibold md:text-6xl">
            SocialPlug Trustpilot: people usually land here when trust has already started cracking
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--muted)]">
            Buyers do not usually search Trustpilot first. They search it after doubt starts:
            right before payment, right after a strange order experience, or right after support
            stops feeling believable. At that point, public reviews stop being background noise and
            start becoming a risk screen.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://www.trustpilot.com/review/panel.socialplug.io"
              target="_blank"
              rel="noreferrer"
              className="accent-button"
            >
              Open the Trustpilot page
            </a>
            <Link href="/cases" className="ghost-button">
              Open the case library
            </Link>
          </div>
        </section>

        <section className="two-grid">
          <div className="glass-card rounded-[2rem] p-6 md:p-8">
            <SectionHeading
              eyebrow="Trust Break"
              title="What Trustpilot becomes when the seller’s own story stops being enough"
              description="This page is not here to explain Trustpilot. It is here to show why buyers turn to it when they need an outside signal fast."
            />
            <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">
              <p>
                Trustpilot matters because it is often the first visible place where delivery
                complaints, refund frustration, and support breakdown start piling up in public.
              </p>
              <p>
                That does not make it an audited order ledger. It does make it a place where trust
                starts breaking in public view instead of staying hidden inside private support
                chats.
              </p>
              <p className="font-medium text-[var(--ink)]">
                The score is not the real story. The real story is whether the same complaint shape
                keeps repeating.
              </p>
            </div>
          </div>

          <aside className="ink-card rounded-[2rem] p-6 md:p-8">
            <p className="eyebrow !text-[#d8c7ba] before:!bg-[#9d8778]">
              One Warning That Matters
            </p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[#f2e8de]">
              <p>
                Trustpilot has publicly warned that it removed fake reviews for this company.
              </p>
              <p>
                That does not automatically invalidate every positive review. It does remove the
                comfort buyers often attach to a clean-looking public rating.
              </p>
              <p>
                Once that warning exists, the safer move is to read the complaint content, compare
                it with archived cases, and stop treating the visible score as enough by itself.
              </p>
            </div>
            <a
              href="https://www.trustpilot.com/review/panel.socialplug.io"
              target="_blank"
              rel="noreferrer"
              className="ghost-button mt-6 inline-flex"
            >
              View the Trustpilot warning
            </a>
          </aside>
        </section>

        <section className="glass-card rounded-[2rem] p-6 md:p-8">
          <SectionHeading
            eyebrow="Repeated Review Patterns"
            title="What buyers keep seeing once they open the public review trail"
            description="The point is not that a complaint exists. The point is that the same kinds of complaints keep surfacing around the same parts of the buyer journey."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {repeatedPatterns.map((item) => (
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
          <div className="glass-card rounded-[2rem] p-6 md:p-8">
            <SectionHeading
              eyebrow="What Trustpilot Can Do"
              title="What it can actually help you decide"
              description="Trustpilot is useful when you treat it as a public-warning layer, not as proof of every marketing claim on the seller’s site."
            />
            <div className="grid gap-3">
              {[
                "It can show whether delivery complaints are isolated or repeated.",
                "It can show whether refund frustration is part of the public record.",
                "It can show whether support problems are starting to surface in public.",
                "It can help a buyer decide whether confidence is collapsing before payment.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.3rem] border border-black/8 bg-white/45 px-4 py-3 text-sm leading-7"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-[2rem] p-6 md:p-8">
            <SectionHeading
              eyebrow="What It Cannot Do"
              title="What a Trustpilot page does not prove for the seller"
              description="This is where buyers often make the wrong jump from public reviews to full trust."
            />
            <div className="grid gap-3">
              {[
                "It does not independently verify giant order counters or customer totals.",
                "It does not prove the seller’s internal fulfillment quality.",
                "It does not turn a polished brand story into a transparent one.",
                "It does not remove the need to read archived cases before paying.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.3rem] border border-black/8 bg-white/45 px-4 py-3 text-sm leading-7"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="glass-card rounded-[2rem] p-6 md:p-8">
          <SectionHeading
            eyebrow="If You Landed Here Now"
            title="Do not stop at the public score"
            description="If Trustpilot is the page that made you hesitate, that hesitation should push you into evidence, not back into the seller’s marketing copy."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-[1.5rem] border border-black/8 bg-white/45 p-5">
              <h2 className="text-lg font-semibold">Before payment</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                Go straight to the case library. That is where the fuller record lives, with public
                names, dates, allegations, and archived complaint details.
              </p>
              <Link href="/cases" className="accent-button mt-5 inline-flex">
                Read the case library first
              </Link>
            </article>
            <article className="rounded-[1.5rem] border border-black/8 bg-white/45 p-5">
              <h2 className="text-lg font-semibold">After payment</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                Stop letting the issue live only in chat logs. Preserve the evidence, then move
                into the refund and dispute workflow while the record is still clean.
              </p>
              <Link href="/refund-guide" className="ghost-button mt-5 inline-flex">
                Open the refund action page
              </Link>
            </article>
          </div>
        </section>

        <section className="glass-card rounded-[2rem] p-6 md:p-8">
          <SectionHeading
            eyebrow="FAQ"
            title='Quick answers for "SocialPlug Trustpilot"'
            description="These are the questions buyers are really trying to answer when they stop trusting the seller enough to look for outside confirmation."
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
