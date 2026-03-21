import Link from "next/link";

type Highlight = {
  label: string;
  title: string;
  body: string;
  href: string;
  cta: string;
};

type Feedback = {
  category: string;
  summary: string;
  result: string;
};

const outcomeHighlights: Highlight[] = [
  {
    label: "Before Paying",
    title: "Visitors are backing out before any money is lost.",
    body:
      "People who searched first, checked the company profile, and compared the complaint pattern said they closed the tab instead of sending payment.",
    href: "/is-socialplug-legit",
    cta: "Check the company profile",
  },
  {
    label: "Escalation",
    title: "Some readers moved straight to formal complaints.",
    body:
      "One of the clearest outcomes reported to us: after reading the registered-company details here, visitors stopped arguing with support and sent structured emails to the relevant office tied to the seller's jurisdiction.",
    href: "/socialplug-review",
    cta: "Open the evidence overview",
  },
  {
    label: "After Drop-Off",
    title: "Readers are preserving proof before the trail disappears.",
    body:
      "Users who saw stars, followers, or views collapse said the site helped them capture screenshots, keep the timeline clean, and start a dispute with evidence instead of panic.",
    href: "/refund-guide",
    cta: "Open the refund guide",
  },
];

const feedbackLaneOne: Feedback[] = [
  {
    category: "Search-first prevention",
    summary:
      "A visitor reached the archive before checkout, compared the public complaint trail with the company profile, and decided not to place the order at all.",
    result: "Outcome: payment avoided before purchase.",
  },
  {
    category: "Government-side escalation",
    summary:
      "After support stalled, a reader used the registered-company details collected on this site to draft a formal email to the relevant office in the seller's jurisdiction.",
    result: "Outcome: the case moved beyond support chat loops.",
  },
  {
    category: "Stars dropped after delivery",
    summary:
      "A buyer whose stars fell after delivery said the page flow helped them save proof immediately, organize timestamps, and prepare a proper complaint file.",
    result: "Outcome: evidence preserved while it still existed.",
  },
];

const feedbackLaneTwo: Feedback[] = [
  {
    category: "Refund runaround",
    summary:
      "One reader found the site only after the refund excuses started, then used the guidance to replace scattered screenshots with one clean chronology for a bank or payment dispute.",
    result: "Outcome: recovery steps became structured and usable.",
  },
  {
    category: "Privacy-safe reporting",
    summary:
      "A visitor said the archive made them realize they could remove names, order numbers, and personal contact details while still reporting the case publicly and clearly.",
    result: "Outcome: they acted without exposing private data.",
  },
  {
    category: "Buy-first doubts confirmed",
    summary:
      "Someone who arrived only to check whether SocialPlug looked legitimate said the company information and repeated complaint pattern here were enough to stop the purchase decision.",
    result: "Outcome: the warning worked before the loss happened.",
  },
];

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: Feedback[];
  reverse?: boolean;
}) {
  return (
    <div className="impact-marquee__viewport">
      <div
        className={`impact-marquee__track${
          reverse ? " impact-marquee__track--reverse" : ""
        }`}
      >
        {[0, 1].map((copyIndex) => (
          <div
            key={copyIndex}
            className="impact-marquee__group"
            aria-hidden={copyIndex === 1}
          >
            {items.map((item) => (
              <article key={`${copyIndex}-${item.category}`} className="impact-card">
                <p className="impact-card__category">{item.category}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                  {item.summary}
                </p>
                <p className="mt-4 text-sm font-medium text-[var(--accent)]">
                  {item.result}
                </p>
              </article>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReaderImpactMarquee() {
  return (
    <section className="section-pad pt-0">
      <div className="container-shell">
        <div className="impact-shell rounded-[2.2rem] px-6 py-7 shadow-[0_28px_90px_rgba(32,20,16,0.12)] md:px-8 md:py-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow">Anonymous Reader Outcomes</p>
              <h2 className="display-title mt-4 text-4xl font-semibold leading-tight md:text-5xl">
                People are using this archive to stop payment, escalate complaints, and act faster.
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--muted)]">
                These cards are anonymized, condensed summaries of what visitors told us happened
                after they used the site. They are here to show outcomes, not expose people.
              </p>
            </div>
            <div className="impact-privacy-badge">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                Privacy protected
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                Names, order IDs, email addresses, exact dates, and identifiable locations are
                removed. The summaries below are not verbatim quotes.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {outcomeHighlights.map((item) => (
              <div key={item.title} className="impact-highlight">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                  {item.label}
                </p>
                <h3 className="display-title mt-3 text-2xl font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                  {item.body}
                </p>
                <Link href={item.href} className="impact-inline-link mt-5 inline-flex">
                  {item.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 impact-marquee" aria-label="Anonymized reader outcomes">
            <MarqueeRow items={feedbackLaneOne} />
            <MarqueeRow items={feedbackLaneTwo} reverse />
          </div>
        </div>
      </div>
    </section>
  );
}
