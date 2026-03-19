import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { getPublicCases, getTagMeta } from "@/lib/cases";

export const metadata: Metadata = {
  title: "SocialPlug Case Library",
  description:
    "A library of SocialPlug complaints, refund disputes, non-delivery reports, and drop-off cases collected from public platforms.",
};

export default async function CasesPage() {
  const cases = await getPublicCases();
  const storeCreditCases = cases.filter((item) =>
    item.allegationTags.includes("Store Credit Offer"),
  ).length;

  return (
    <div className="section-pad">
      <div className="container-shell space-y-10">
        <section className="glass-card rounded-[2.2rem] p-7 md:p-10">
          <SectionHeading
            eyebrow="Public Case Library"
            title="A SocialPlug case library built from public sources"
            description="These entries are based on public complaints, public reviews, and public posts. The site shows structured summaries, tags, and source links for archiving, search visibility, and later escalation."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="rounded-[1.8rem] border border-[rgba(195,78,47,0.22)] bg-[rgba(195,78,47,0.08)] p-6">
              <p className="eyebrow">Archived Scam Tactic</p>
              <h2 className="mt-4 text-2xl font-semibold">
                Store credit is offered instead of a real refund
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                A newer tactic now archived in this library is support trying to convert a refund
                demand into account balance or store credit. That keeps the buyer&apos;s money inside
                the seller&apos;s own system instead of returning it to the original payment method.
              </p>
              <p className="mt-4 text-sm font-semibold text-[var(--foreground)]">
                Cases currently tagged with this tactic: {storeCreditCases}
              </p>
            </article>

            <article className="rounded-[1.8rem] border border-black/8 bg-white/50 p-6">
              <p className="eyebrow">What The Tags Mean</p>
              <div className="mt-4 grid gap-3 text-sm leading-7 text-[var(--muted)]">
                <p>`📭 Not Delivered` means the order did not start or never produced the promised result.</p>
                <p>`💳 Store Credit Offer` means support tried to replace a refund with internal balance.</p>
                <p>`🚫 Refund Refused` means the request for money back was blocked, denied, or rerouted.</p>
                <p>`🧾 Ticket Dispute` means the conflict is visible in ticket replies or dashboard communications.</p>
              </div>
            </article>
          </div>
          <div className="mt-8 grid gap-4">
            {cases.map((item) => (
              <article
                key={item.slug}
                className="glass-card rounded-[1.8rem] border border-black/8 bg-white/50 p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                      <span>{item.sourcePlatform}</span>
                      <span>{item.publishedAt}</span>
                      <span>{item.statusLabel}</span>
                    </div>
                    <h2 className="display-title text-3xl font-semibold">
                      {item.title}
                    </h2>
                    <div className="rounded-[1.2rem] border border-black/8 bg-white/55 px-4 py-3 text-sm text-[var(--foreground)]">
                      <span className="font-semibold">Public victim / username:</span>
                      {item.sourceAuthor}
                      <span className="mx-2 text-[var(--muted)]">|</span>
                      <span className="font-semibold">Public date:</span>
                      {item.publishedAt}
                    </div>
                    <p className="max-w-3xl text-sm leading-7 text-[var(--muted)]">
                      {item.summary}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.allegationTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-black/10 bg-white/65 px-3 py-1 text-xs"
                        >
                          {getTagMeta(tag).emoji} {getTagMeta(tag).label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 md:min-w-[220px] md:items-end">
                    <Link href={`/cases/${item.slug}`} className="accent-button">
                      View case details
                    </Link>
                    {item.sourceUrl ? (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="ghost-button"
                      >
                        Open original source
                      </a>
                    ) : (
                      <div className="rounded-full border border-dashed border-black/10 px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                        Direct archive submission
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
