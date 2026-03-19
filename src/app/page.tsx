import { EvidenceSeal } from "@/components/evidence-seal";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { VerdictEmblem } from "@/components/verdict-emblem";
import { getComplaintOverviewStats, getTagMeta } from "@/lib/cases";
import {
  caseStats,
  reportChecklist,
  timelineItems,
} from "@/lib/site";

const complaintModes = [
  {
    id: "01",
    title: "Payment taken, delivery missing",
    body: "Public complaints repeatedly describe the same pattern: money is taken first, promised delivery does not happen on time, and users are left chasing an order that never arrives or arrives far below what was sold.",
  },
  {
    id: "02",
    title: "Numbers appear, then collapse",
    body: "Another recurring complaint is that followers, likes, or views show up quickly, then disappear just as quickly. Users describe this as artificial delivery that does not hold, while support offers excuses instead of a durable fix.",
  },
  {
    id: "03",
    title: "Refunds are delayed or refused",
    body: "Across public complaints, refund requests are often met with repetition, stalling, policy excuses, store credit offers, or outright refusal. The result is the same: users lose time while the seller keeps the money.",
  },
  {
    id: "04",
    title: "Support turns into a dead end",
    body: "Once screenshots, ticket IDs, and order details are provided, many public complainants say the conversation degrades into canned responses, circular replies, or total silence.",
  },
];

const warningSources = [
  {
    name: "Trustpilot public reviews",
    url: "https://www.trustpilot.com/review/panel.socialplug.io",
    note: "Read public user reviews and focus on reports of non-delivery, drop-offs, and refused refunds.",
  },
  {
    name: "BBB Scam Tracker case",
    url: "https://www.bbb.org/scamtracker/lookupscam/918173",
    note: "Review a public BBB Scam Tracker complaint linked to SocialPlug-related service issues.",
  },
  {
    name: "Reddit public discussion",
    url: "https://www.reddit.com/r/SocialMediaPromotion/comments/1f63pap/social_plug_offers_a_great_variety_of_ways_to/",
    note: "Read a public Reddit thread discussing disputes between completed order status and actual visible results.",
  },
];

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

export default async function Home() {
  const overview = await getComplaintOverviewStats();
  const topIssue = overview.mostRepeatedIssue
    ? getTagMeta(overview.mostRepeatedIssue.tag)
    : null;

  return (
    <>
      <section className="section-pad pb-10 pt-8 md:pt-12">
        <div className="container-shell story-grid items-start">
          <div className="space-y-7">
            <p className="eyebrow">Report SocialPlug. Archive the Evidence.</p>
            <div className="space-y-5">
              <h1 className="display-title max-w-4xl text-5xl leading-[0.94] font-semibold md:text-7xl">
                <span className="hero-lightning-wrap">
                  <span className="hero-lightning-strike" aria-hidden="true" />
                  SocialPlug Evidence Archive.
                </span>
                <span className="mt-2 block text-[var(--accent)]">
                  This is not a review page. It is a record of what victims say happened.
                </span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
                If you are searching for SocialPlug, there is a good chance you are
                already dealing with one of these problems: no delivery after payment,
                sudden drop-offs, refund stalling, or support disappearing entirely.
                You are not the only one. This site exists to make those experiences visible,
                centralize them, and preserve the evidence.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "No delivery after payment",
                "Sudden metric drops",
                "Refunds stalled by support",
                "Support disappeared completely",
              ].map((item) => (
                <div
                  key={item}
                  className="glass-card rounded-[1.25rem] px-4 py-3 text-sm font-medium"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/submit-report" className="accent-button">
                Submit a report now
              </Link>
              <Link href="/socialplug-review" className="ghost-button">
                View archived cases
              </Link>
            </div>
            <div className="rounded-[1.8rem] border border-[rgba(195,78,47,0.18)] bg-[rgba(255,250,244,0.78)] p-5 shadow-[0_18px_50px_rgba(31,23,18,0.06)]">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="eyebrow">Complaint Archive Snapshot</p>
                  <h2 className="display-title mt-3 text-3xl font-semibold leading-tight">
                    The archive shows the current complaint volume and the issue type that appears the most.
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-7 text-[var(--muted)]">
                  These figures are calculated from the currently archived public cases and linked complaint records.
                </p>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {[
                  { label: "Total Complaints Archived", value: overview.totalComplaints },
                  {
                    label: "Most Repeated Issue",
                    value: topIssue ? `${topIssue.emoji} ${topIssue.label}` : "N/A",
                  },
                  {
                    label: "Years Covered",
                    value:
                      overview.yearly.length > 0
                        ? `${overview.yearly[0]?.year} -> ${overview.yearly.at(-1)?.year}`
                        : "N/A",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.4rem] border border-black/8 bg-white/60 px-4 py-4"
                  >
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                      {item.label}
                    </p>
                    <p className="display-title mt-2 text-3xl font-semibold md:text-4xl">
                      {item.value}
                    </p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {item.label === "Total Complaints Archived"
                        ? "current archive volume"
                        : item.label === "Most Repeated Issue"
                          ? "highest-frequency complaint tag"
                          : "public record span in the archive"}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {overview.yearly.map((item) => (
                  <div
                    key={item.year}
                    className="rounded-[1.2rem] border border-black/8 bg-white/55 px-4 py-3"
                  >
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                      {item.year}
                    </p>
                    <p className="display-title mt-2 text-3xl font-semibold">
                      {item.count}
                    </p>
                    <p className="mt-1 text-sm text-[var(--muted)]">archived complaints</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="stat-grid">
              {caseStats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-[1.75rem] p-5"
                >
                  <p className="display-title text-3xl font-semibold">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="ink-card rounded-[2rem] p-6 md:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#aa9382]">
                  Real Case Archived
                </p>
                <h2 className="display-title mt-2 text-3xl font-semibold">
                  This is not an isolated case
                </h2>
              </div>
              <span className="rounded-full border border-white/14 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#d8c8ba]">
                SocialPlug
              </span>
            </div>
            <div className="relative mt-5 flex items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(195,78,47,0.34),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] px-4 py-6">
              <VerdictEmblem />
            </div>
            <div className="space-y-5 pt-5">
              <div className="rounded-[1.5rem] bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-[#aa9382]">
                  Case Summary
                </p>
                <p className="mt-3 text-sm leading-7 text-[#f3e7db]">
                  Payment is made. Delivery never happens. A refund is requested. Support offers
                  store credit instead of returning the money, then stalls. This is no longer a
                  loose complaint pattern. It is a repeated one.
                </p>
              </div>
              <div className="grid gap-3">
                {[
                  "Payment and order confirmation",
                  "Screenshots of service promises",
                  "Records of non-delivery",
                  "Full communication and ghosting timeline",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 px-4 py-3"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-soft)]" />
                    <p className="text-sm text-[#f3e7db]">{item}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-[1.5rem] border border-dashed border-white/14 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.14em] text-[#aa9382]">
                  Why You Are Seeing This
                </p>
                <p className="mt-3 text-sm leading-7 text-[#f3e7db]">
                  Many people only land here when they start doubting whether SocialPlug
                  is trustworthy, when they urgently need a refund path, or when they
                  already believe they were scammed. This page exists so those scattered
                  accounts stop disappearing and start accumulating as visible evidence.
                </p>
              </div>
              <div className="flex justify-end pt-1">
                <EvidenceSeal />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-shell">
          <div className="rounded-[2.2rem] border border-[rgba(23,20,17,0.12)] bg-[rgba(255,249,241,0.78)] p-6 shadow-[0_28px_80px_rgba(31,23,18,0.08)] md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
                <p className="eyebrow">Public Company Profile</p>
                <h2 className="display-title mt-4 text-4xl font-semibold leading-tight md:text-5xl">
                  Before you send money to SocialPlug, confirm what kind of company you are actually dealing with.
                </h2>
                <p className="mt-4 text-base leading-8 text-[var(--muted)]">
                  Most people mean <strong>socialplug.io</strong> when they say SocialPlug.
                  Public pages and Estonia registry records do not point to a large transparent
                  public brand. They point to a younger private marketing operation tied to
                  <strong> CB Solutions OÜ</strong> in Tallinn. That matters before payment,
                  not after a dispute starts.
                </p>
              </div>
              <div className="grid min-w-[260px] gap-3">
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
            </div>

            <div className="mt-8 rounded-[1.6rem] border border-[rgba(195,78,47,0.22)] bg-[rgba(195,78,47,0.08)] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                TL;DR
              </p>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-[var(--foreground)]">
                This is not a listed company or a highly transparent enterprise brand. It is a
                private Estonia-based marketing business selling third-party social-growth
                services. If that already makes you hesitate, stop there before you pay.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: "Operating entity",
                  body: "CB Solutions OÜ",
                },
                {
                  title: "Jurisdiction",
                  body: "Tallinn, Estonia",
                },
                {
                  title: "Registered in",
                  body: "2022",
                },
                {
                  title: "Company form",
                  body: "Private limited company, not a public company",
                },
                {
                  title: "Official domain",
                  body: "socialplug.io",
                },
                {
                  title: "What it sells",
                  body: "Followers, likes, views, comments, and similar social-growth services",
                },
                {
                  title: "Registry code",
                  body: "16474680",
                },
                {
                  title: "Registered address",
                  body: "Hobujaama tn 4, Tallinn, 10151",
                },
              ].map((item) => (
                <div key={item.title} className="glass-card rounded-[1.6rem] p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 two-grid">
              <div className="glass-card rounded-[1.6rem] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                  Why extra caution is justified
                </p>
                <div className="mt-4 grid gap-3 text-sm leading-7 text-[var(--foreground)]">
                  <p>
                    People often see a polished site, clear packages, and fast-delivery claims,
                    then assume they are dealing with a trustworthy large brand.
                  </p>
                  <p>
                    That is exactly why this section exists. The corporate profile is smaller,
                    narrower, and less transparent than the front-end presentation suggests.
                  </p>
                  <p>
                    Public complaints then add another layer of risk: delivery disputes, sudden
                    drop-offs, refund conflict, and support breakdowns.
                  </p>
                </div>
              </div>

              <div className="glass-card rounded-[1.6rem] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                  Check this before buying
                </p>
                <div className="mt-4 grid gap-3 text-sm leading-7 text-[var(--foreground)]">
                  {[
                    "Verify the company record, not just the marketing brand.",
                    "Read public complaint sources before making any payment.",
                    "Ask whether the service itself would survive platform scrutiny.",
                    "Decide whether you would still pay if a refund became disputed.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[1rem] border border-black/8 bg-white/55 px-4 py-3"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-[1.6rem] border border-[rgba(195,78,47,0.22)] bg-[rgba(195,78,47,0.08)] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                Founder / CEO identity
              </p>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-[var(--foreground)]">
                Third-party profiles and interviews publicly describe Mark Voronov as SocialPlug’s
                co-founder or CEO. The official About page I could directly verify names only
                &quot;Mark V., Communications Manager&quot; and lists <code>mark@socialplug.io</code>.
                The practical takeaway is not that the identity trail is fake. It is that repeated
                public mentions are not the same thing as full corporate transparency.
              </p>
            </div>

            <div className="mt-8 rounded-[1.6rem] border border-[rgba(195,78,47,0.22)] bg-[rgba(195,78,47,0.08)] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                Decision pressure
              </p>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-[var(--foreground)]">
                Do not use design quality as a proxy for trust. Use company records, public
                complaints, identity references, and your own evidence standard. If the deeper
                you look, the less certain you feel, that uncertainty is already a warning sign.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-shell">
          <div className="rounded-[2.2rem] border border-[rgba(195,78,47,0.26)] bg-[linear-gradient(135deg,rgba(119,13,13,0.94),rgba(55,14,14,0.94))] px-6 py-7 text-[#fff2ea] shadow-[0_24px_80px_rgba(73,12,12,0.26)] md:px-8 md:py-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
                <p className="eyebrow !text-[#f3b7aa] before:!bg-[#d26c58]">
                  If You Are Paying Because Of The Big Numbers, Stop Here
                </p>
                <h2 className="display-title mt-4 text-4xl font-semibold leading-tight md:text-5xl">
                  You should not make a payment decision based on SocialPlug&apos;s giant counters.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#ffd9cf]">
                  The company publicly markets figures such as <strong>6.4M+ orders delivered</strong>,
                  <strong> 10k+ total clients</strong>, <strong>1.5B+ people reached</strong>,
                  and <strong>5M+ monthly clicks</strong>. Those numbers are designed to lower your
                  guard before payment. We did not find an independent public audit, a transparent
                  methodology, or an external order ledger proving those claims.
                </p>
              </div>
              <div className="grid min-w-[260px] gap-3">
                {[
                  "No public audit attached to the claims",
                  "No third-party order ledger visible",
                  "No public methodology for how the counters are calculated",
                  "The numbers appear as self-published marketing signals",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.2rem] border border-white/12 bg-white/6 px-4 py-3 text-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: "Official About page claim",
                  body: "The About page says 10k+ total clients and 6.4M+ orders delivered.",
                },
                {
                  title: "Why that matters to a buyer",
                  body: "If the claims cannot be independently checked, you are not buying based on verified scale. You are buying based on marketing pressure.",
                },
                {
                  title: "Traffic does not prove fulfilled orders",
                  body: "A traffic snapshot may estimate visits, but visits do not prove paid orders, completed delivery, or successful outcomes.",
                },
                {
                  title: "Trustpilot warning",
                  body: "Trustpilot explicitly says it removed a number of fake reviews for this company. That does not prove every positive review is fake, but it does weaken the credibility of broad trust claims built around review reputation.",
                },
                {
                  title: "Complaint volume cuts the other way",
                  body: "Public review pages and complaint threads can show repeated delivery and refund problems, but they do not independently verify million-scale success claims.",
                },
                {
                  title: "Multiple giant counters, same problem",
                  body: "The homepage also markets 1.5B+ people reached and 5M+ monthly clicks. These are large persuasive claims shown without a public verification method.",
                },
                {
                  title: "Trust styling is not proof",
                  body: "Some pages also show high review-style scores such as 4.8/5 from 1000+ reviews without clearly presenting the underlying source right next to the claim.",
                },
                {
                  title: "Small inconsistencies matter",
                  body: "Even basic public business signals are not presented with the level of precision you would expect from a fully transparent large-scale operator.",
                },
                {
                  title: "Practical decision point",
                  body: "If the million-scale numbers are what make you feel safe enough to pay, then those same numbers should be strong enough to withstand verification. Here, they are not.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-white/12 bg-white/6 p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#f3b7aa]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#ffe2da]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.6rem] border border-white/12 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[#f3b7aa]">
                What buyers should take away
              </p>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-[#fff2ea]">
                Do not let giant counters talk you into a payment decision. If those numbers cannot
                be independently checked, then you are not relying on evidence. You are relying on
                marketing. Established businesses are supposed to withstand open scrutiny with
                transparent signals, not ask buyers to trust oversized counters that are impossible
                to verify from public evidence. If you pay on that basis, the risk is yours, not theirs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell">
          <div className="mb-10 rounded-[2.2rem] border border-[rgba(195,78,47,0.26)] bg-[linear-gradient(135deg,rgba(119,13,13,0.94),rgba(55,14,14,0.94))] px-6 py-7 text-[#fff2ea] shadow-[0_24px_80px_rgba(73,12,12,0.26)] md:px-8 md:py-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow !text-[#f3b7aa] before:!bg-[#d26c58]">
                  Before You Pay SocialPlug
                </p>
                <h2 className="display-title mt-4 text-4xl font-semibold leading-tight md:text-5xl">
                  Before you pay, read these public complaint sources first.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#ffd9cf]">
                  If you have not paid yet, read the public reviews, public complaints,
                  and public discussions first. That single step may stop you from walking
                  straight into the same pattern.
                </p>
              </div>
              <Link
                href="/cases"
                className="ghost-button !border-white/18 !bg-white/8 !text-[#fff2ea]"
              >
                Enter the full case library
              </Link>
            </div>
            <div className="mt-7 grid gap-3 md:grid-cols-3">
              {warningSources.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.5rem] border border-white/12 bg-white/6 p-5 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/10"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-[#f0b5a7]">
                    Public Source
                  </p>
                  <h3 className="mt-3 text-lg font-semibold">{source.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#ffe2da]">
                    {source.note}
                  </p>
                  <p className="mt-4 text-sm font-medium text-[#fff2ea]">
                    Read now →
                  </p>
                </a>
              ))}
            </div>
          </div>

          <SectionHeading
            eyebrow="Why This Site Exists"
            title="Bring all victim evidence into one place."
            description="Most of the relevant information is scattered, fragmented, or quickly buried. This platform is not here to observe the brand. It is here to collect reports, organize proof, and expose repeated patterns."
          />
          <div className="three-grid">
            {[
              {
                title: "Make reports public",
                body: "Pull scattered experiences out of inboxes and private chats and turn them into visible, indexable evidence pages.",
              },
              {
                title: "Connect victims",
                body: "Show later victims they are not alone and let more cases connect into a clearer pattern of harm.",
              },
              {
                title: "Build a lasting proof base",
                body: "Create reusable material for refunds, chargebacks, complaints, and later collective action instead of forcing each person to start from zero.",
              },
            ].map((card) => (
              <article key={card.title} className="glass-card rounded-[1.8rem] p-6">
                <h3 className="display-title text-3xl font-semibold">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell two-grid">
          <div className="glass-card rounded-[2rem] p-6 md:p-8">
            <p className="eyebrow">Repeated Complaint Pattern</p>
            <div className="mt-6 space-y-5">
              {complaintModes.map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-black/8 bg-white/40 p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                    {item.id}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card rounded-[2rem] p-6 md:p-8">
            <p className="eyebrow">How The Pattern Usually Plays Out</p>
            <div className="timeline mt-6">
              {timelineItems.map((item) => (
                <div key={item.title} className="timeline-item">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                    {item.date}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-shell rounded-[2.2rem] border border-black/8 bg-[rgba(31,60,54,0.96)] px-6 py-8 text-[#f8f2e8] md:px-8 md:py-10">
          <div className="two-grid items-start">
            <div>
              <p className="eyebrow !text-[#c0d2cd] before:!bg-[#7fa39a]">
                Submit Your Report
              </p>
              <h2 className="display-title mt-4 max-w-xl text-4xl font-semibold leading-tight">
                One voice can be ignored. A body of evidence cannot.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#d8e4e0]">
                This site depends on victims building the record together. You can submit
                payment screenshots, order details, promise pages, chat logs, and proof
                of non-delivery. Every piece gets organized and archived.
              </p>
              <div className="mt-6">
                <Link href="/submit-report" className="accent-button !bg-[#f7efe4] !text-[#10211d] hover:!bg-[#efc7a8]">
                  Submit my report
                </Link>
              </div>
            </div>
            <div className="grid gap-3">
              {reportChecklist.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
