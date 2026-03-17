import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { getPublicCases, getTagMeta } from "@/lib/cases";

export const metadata: Metadata = {
  title: "SocialPlug Review",
  description:
    "A SocialPlug review page built from repeated complaint patterns, archived evidence, public sources, and structured issue counts.",
};

const repeatedPath = [
  {
    step: "01",
    title: "Payment comes first",
    body: 'The purchase is usually driven by promises like "fast delivery" or "instant growth."',
  },
  {
    step: "02",
    title: "The result turns unstable",
    body: "The service is missing, only partly delivered, or appears briefly before fading out.",
  },
  {
    step: "03",
    title: "Support takes over the timeline",
    body: "The buyer enters delay loops, repeated replies, or scripted responses instead of resolution.",
  },
  {
    step: "04",
    title: "The case stalls",
    body: "The refund remains incomplete, the fix never stabilizes, or communication stops altogether.",
  },
];

function summarizeYearSpan(dates: string[]) {
  const years = dates
    .map((item) => Number(item.slice(0, 4)))
    .filter((item) => Number.isFinite(item))
    .sort((a, b) => a - b);

  if (!years.length) {
    return "No public year range";
  }

  return `${years[0]} - ${years[years.length - 1]}`;
}

export default async function SocialPlugReviewPage() {
  const cases = await getPublicCases();
  const sources = Array.from(new Set(cases.map((item) => item.sourcePlatform)));
  const yearSpan = summarizeYearSpan(cases.map((item) => item.publishedAt));

  const tagCounts = cases.reduce<Record<string, number>>((acc, item) => {
    item.allegationTags.forEach((tag) => {
      acc[tag] = (acc[tag] ?? 0) + 1;
    });
    return acc;
  }, {});

  const prioritizedTags = [
    "Support Ghosting",
    "Drop-Off",
    "Refund Refused",
    "Refund Delay",
    "Not Delivered",
  ]
    .map((tag) => ({
      tag,
      count: tagCounts[tag] ?? 0,
      meta: getTagMeta(tag),
    }))
    .filter((item) => item.count > 0);

  return (
    <div className="section-pad">
      <div className="container-shell space-y-10">
        <section className="glass-card rounded-[2.2rem] p-7 md:p-10">
          <p className="eyebrow">Exposure Overview</p>
          <h1 className="display-title mt-5 max-w-5xl text-5xl leading-[0.96] font-semibold md:text-6xl">
            SocialPlug Review: when the same user experience keeps repeating, it deserves a second look
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--muted)]">
            This is not a single review page. It is a structured summary built from public sources
            and archived user evidence. When the same issues show up across different users,
            different platforms, and different dates, they stop looking like isolated bad luck.
          </p>
        </section>

        <section className="two-grid">
          <div className="glass-card rounded-[2rem] p-6 md:p-8">
            <SectionHeading
              eyebrow="Overall View"
              title="What the public record suggests at a glance"
              description="This page starts with the conclusion layer first, because buyers should not have to read the entire archive before understanding the basic risk picture."
            />
            <div className="grid gap-4">
              {[
                "Delivery stability is openly disputed in multiple complaints.",
                "Result durability is uncertain in repeated public accounts.",
                "Refund handling is repeatedly described as delayed, denied, or conflicted.",
                "Support communication breaks down in part of the archived record.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.4rem] border border-black/8 bg-white/45 px-4 py-4 text-sm leading-7"
                >
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
              The point is not that someone complained once. The point is that similar issues keep
              surfacing across different sources.
            </p>
          </div>

          <aside className="ink-card rounded-[2rem] p-6 md:p-8">
            <p className="eyebrow !text-[#d8c7ba] before:!bg-[#9d8778]">
              Why This Page Exists
            </p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[#f2e8de]">
              <p>
                Most users arrive here at one of two moments: right before they pay, or after
                something already feels wrong.
              </p>
              <p>
                This page is not here to replace the case library. It is here to compress scattered
                complaints into something a buyer can actually read and act on.
              </p>
              <p>
                The archive makes people believe. This page is meant to make them stop and think.
              </p>
            </div>
          </aside>
        </section>

        <section className="glass-card rounded-[2rem] p-6 md:p-8">
          <SectionHeading
            eyebrow="Repeated Patterns"
            title="Complaint patterns that keep showing up in public sources"
            description={`Source base currently represented here includes ${sources.join(", ")}.`}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "📭 Not delivered or only partly delivered",
                body: "Orders are described as missing, underdelivered, or never meaningfully completed.",
              },
              {
                title: "📉 Short-term delivery followed by fast drop-off",
                body: "Followers, likes, or views appear briefly and then fall away unusually fast.",
              },
              {
                title: "🚫 Refund conflict",
                body: "Public records repeatedly mention refund delay, policy excuses, or outright refusal.",
              },
              {
                title: "👻 Support communication breakdown",
                body: "After evidence is submitted, replies often become repetitive, templated, or silent.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-black/8 bg-white/45 p-5"
              >
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="two-grid">
          <div className="glass-card rounded-[2rem] p-6 md:p-8">
            <SectionHeading
              eyebrow="Time Dimension"
              title="This does not read like a short-lived anomaly"
              description={`Public records currently represented in the archive span ${yearSpan}.`}
            />
            <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">
              <p>
                That matters because the complaint picture is not confined to a single narrow burst
                of time.
              </p>
              <p>
                Non-delivery claims, refund conflicts, and unstable results continue to appear
                across separate dates rather than disappearing after one isolated period.
              </p>
              <p>
                When the same issues survive across years, they start looking less like exceptions
                and more like a pattern buyers need to account for before paying.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-[2rem] p-6 md:p-8">
            <SectionHeading
              eyebrow="Repeated User Path"
              title="The same user path appears again and again"
              description="Different complaints often collapse into a very similar sequence."
            />
            <div className="grid gap-3">
              {repeatedPath.map((item) => (
                <article
                  key={item.step}
                  className="rounded-[1.4rem] border border-black/8 bg-white/45 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                    {item.step}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="glass-card rounded-[2rem] p-6 md:p-8">
          <SectionHeading
            eyebrow="Structured Counts"
            title="High-frequency issue tags"
            description="A single complaint matters less than repeated tag combinations that keep clustering around the same kinds of failure."
          />
          <div className="overflow-hidden rounded-[1.5rem] border border-black/8 bg-white/40">
            <div className="grid grid-cols-[1.6fr_0.4fr] border-b border-black/8 px-5 py-4 text-sm font-semibold">
              <div>Issue type</div>
              <div className="text-right">Count</div>
            </div>
            {prioritizedTags.map((item) => (
              <div
                key={item.tag}
                className="grid grid-cols-[1.6fr_0.4fr] border-b border-black/8 px-5 py-4 text-sm last:border-b-0"
              >
                <div>
                  {item.meta.emoji} {item.meta.label}
                </div>
                <div className="text-right font-semibold">{item.count}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            A repeated tag is not proof by itself. A repeated tag pattern across multiple cases is
            what starts to matter.
          </p>
        </section>

        <section className="two-grid">
          <div className="glass-card rounded-[2rem] p-6 md:p-8">
            <SectionHeading
              eyebrow="What This Means"
              title="What this should mean to a buyer"
              description="The decision point is not whether a brand has any good or bad feedback. It is whether the same risk signals keep returning."
            />
            <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">
              <p>
                If you are still evaluating whether to buy, focus less on isolated praise or
                isolated criticism and more on whether the same problem set keeps repeating across
                users.
              </p>
              <p>
                If you have already paid, the next move is not more optimism. It is evidence
                preservation and a structured refund or dispute path.
              </p>
            </div>
          </div>

          <div className="ink-card rounded-[2rem] p-6 md:p-8">
            <p className="eyebrow !text-[#d8c7ba] before:!bg-[#9d8778]">Next Step</p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[#f2e8de]">
              <p>
                If you are here before paying, open the case library and keep reading.
              </p>
              <p>
                If you are here after a service problem started, preserve your evidence now and
                move to the refund action page before more time is lost.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Link href="/cases" className="accent-button">
                Open the case library
              </Link>
              <Link href="/refund-guide" className="ghost-button !border-white/15 !bg-white/5 !text-[#f8f2e8]">
                Open the refund action page
              </Link>
              <Link href="/submit-report" className="ghost-button !border-white/15 !bg-white/5 !text-[#f8f2e8]">
                Submit evidence
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[rgba(23,20,17,0.12)] bg-[rgba(255,249,241,0.7)] p-6 md:p-8">
          <p className="eyebrow">Notice</p>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--muted)]">
            This page organizes public complaints and archived evidence into repeated patterns and
            risk signals. It is not a legal determination. Final determinations belong to payment
            providers, regulators, or courts.
          </p>
        </section>
      </div>
    </div>
  );
}
