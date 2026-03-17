import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "SocialPlug Refund and Dispute Guide",
  description:
    "A step-by-step action page for preserving evidence, sending a refund request, and escalating to PayPal or bank disputes after SocialPlug service problems.",
};

const evidenceItems = [
  "Payment record: amount, date, and method",
  "Order page with order number",
  "Screenshots of what the product page promised",
  "Proof of non-delivery, underdelivery, or rapid drop-off",
  "Every support reply, ticket, and chat log",
];

const requestFields = [
  "Purchase date",
  "Amount paid",
  "Service promised",
  "What actually happened",
  "The refund amount you are requesting",
];

const issuerChecklist = [
  "A clean timeline from payment to today",
  "Order confirmation and payment screenshots",
  "The seller’s promise language",
  "Proof the service failed, stalled, or vanished",
  "A recorded refund request sent to the seller",
];

const sourceLinks = [
  {
    label: "PayPal dispute filing timeframes",
    href: "https://www.paypal.com/us/cshelp/article/dispute-filing-timeframes-help1173",
  },
  {
    label: "PayPal dispute lifecycle reference",
    href: "https://developer.paypal.com/docs/disputes/disputes-reference/",
  },
  {
    label: "PayPal disputes, claims, and chargebacks",
    href: "https://www.paypal.com/us/brc/article/customer-disputes-claims-chargebacks-bank-reversals",
  },
  {
    label: "CFPB credit card dispute guidance",
    href: "https://www.consumerfinance.gov/ask-cfpb/how-do-i-dispute-a-charge-on-my-credit-card-bill-en-61/",
  },
];

export default function RefundGuidePage() {
  return (
    <div className="section-pad">
      <div className="container-shell space-y-10">
        <section className="glass-card rounded-[2.2rem] p-7 md:p-10">
          <p className="eyebrow">Refund and Dispute Action Page</p>
          <h1 className="display-title mt-5 max-w-5xl text-5xl leading-[0.96] font-semibold md:text-6xl">
            If you already paid and did not receive the service, what you do next may determine
            whether you get your money back.
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--muted)]">
            Many buyers make the same mistake: they keep arguing with support instead of locking
            the evidence first. The result is predictable. Time is lost, records disappear, and
            refund windows get harder to use. This page is not here to explain the problem. It is
            here to move you into action.
          </p>
        </section>

        <section className="rounded-[2rem] border border-[rgba(195,78,47,0.26)] bg-[linear-gradient(135deg,rgba(119,13,13,0.94),rgba(55,14,14,0.94))] px-6 py-7 text-[#fff2ea] shadow-[0_24px_80px_rgba(73,12,12,0.26)] md:px-8 md:py-8">
          <p className="eyebrow !text-[#f3b7aa] before:!bg-[#d26c58]">Do This Now</p>
          <h2 className="display-title mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-5xl">
            Stop waiting for support. Move into the evidence and dispute phase.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#ffd9cf]">
            The longer you stay in endless back-and-forth messages, the more the timeline starts
            working against you. This page is built to shorten that delay.
          </p>
        </section>

        <div className="two-grid">
          <section className="glass-card rounded-[2rem] p-6 md:p-8">
            <SectionHeading
              eyebrow="Step 1"
              title="Freeze every piece of evidence immediately"
              description="If the page changes, the ticket disappears, or the chat thread gets wiped, your best proof goes with it."
            />
            <div className="grid gap-3">
              {evidenceItems.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.3rem] border border-black/8 bg-white/45 px-4 py-3 text-sm leading-7"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <aside className="ink-card rounded-[2rem] p-6 md:p-8">
            <p className="eyebrow !text-[#d8c7ba] before:!bg-[#9d8778]">
              If You Skip This
            </p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[#f2e8de]">
              <p>You risk losing the exact promise that convinced you to pay.</p>
              <p>You risk losing the order trail that proves the transaction happened.</p>
              <p>
                You risk entering a dispute later with a weaker file than the seller’s timeline.
              </p>
            </div>
          </aside>
        </div>

        <div className="two-grid">
          <section className="glass-card rounded-[2rem] p-6 md:p-8">
            <SectionHeading
              eyebrow="Step 2"
              title="Send one clear refund request and leave a record"
              description="Do not send a long emotional message. Send one structured request that can be reused as evidence."
            />
            <div className="grid gap-3">
              {requestFields.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.3rem] border border-black/8 bg-white/45 px-4 py-3 text-sm leading-7"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-black/8 bg-white/60 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                Suggested structure
              </p>
              <pre className="mt-4 overflow-x-auto whitespace-pre-wrap text-sm leading-7 text-[var(--foreground)]">
{`I paid on [date] and spent [amount] for [service].
The page promised [promise], but the actual result was [problem].
I am requesting a full refund of [amount].`}
              </pre>
            </div>
          </section>

          <aside className="glass-card rounded-[2rem] p-6 md:p-8">
            <p className="eyebrow">Step 3</p>
            <h2 className="display-title mt-4 text-4xl font-semibold leading-tight">
              Give the seller a short window, then escalate.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              If the seller keeps delaying, refuses to resolve the issue, or never clearly
              processes the refund, stop treating the situation like a customer-service chat.
              Treat it like a payment dispute.
            </p>
            <div className="mt-6 rounded-[1.5rem] border border-[rgba(195,78,47,0.2)] bg-[rgba(195,78,47,0.08)] p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                Practical timing
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                A short 48-72 hour response window is enough to show that you tried to resolve it
                directly. After that, keep moving.
              </p>
            </div>
          </aside>
        </div>

        <section className="glass-card rounded-[2rem] p-6 md:p-8">
          <SectionHeading
            eyebrow="Escalation Paths"
            title="This is where the money-recovery process actually starts"
            description="Once direct communication fails, the next step is not more waiting. It is third-party review."
          />
          <div className="two-grid">
            <article className="rounded-[1.6rem] border border-black/8 bg-white/45 p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                PayPal
              </p>
              <h2 className="mt-3 text-2xl font-semibold">Open a dispute in the Resolution Center</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                <p>
                  PayPal says an <strong>Item Not Received</strong> dispute must be opened within
                  <strong> 180 days</strong> of the payment date.
                </p>
                <p>
                  PayPal’s dispute lifecycle also gives a roughly <strong>20-day inquiry period</strong>
                  before escalation to a claim.
                </p>
                <p>
                  If it reaches a claim, PayPal reviews the evidence and decides the outcome.
                </p>
              </div>
              <div className="mt-6 rounded-[1.4rem] border border-black/8 bg-white/60 p-4 text-sm leading-7">
                Path: Log in to PayPal {"->"} Resolution Center {"->"} open dispute {"->"} upload
                evidence {"->"} escalate if the seller does not resolve it.
              </div>
            </article>

            <article className="ink-card rounded-[1.6rem] p-6">
              <p className="eyebrow !text-[#d8c7ba] before:!bg-[#9d8778]">Bank or credit card</p>
              <h2 className="mt-4 text-2xl font-semibold text-[#f6eee3]">
                Move to a card or bank dispute quickly
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[#f2e8de]">
                <p>
                  If you paid by card or bank-linked method, contact the issuer directly and ask
                  about their dispute or chargeback process.
                </p>
                <p>
                  Issuer windows vary. The safe move is to act immediately instead of assuming you
                  have unlimited time.
                </p>
                <p>
                  Your evidence file is what decides whether the issuer sees this as a valid
                  dispute rather than a vague complaint.
                </p>
              </div>
            </article>
          </div>
        </section>

        <div className="two-grid">
          <section className="glass-card rounded-[2rem] p-6 md:p-8">
            <SectionHeading
              eyebrow="Minimum File"
              title="Do not enter a dispute without these"
              description="Missing one of these items can weaken the case or slow the process."
            />
            <div className="grid gap-3">
              {issuerChecklist.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.3rem] border border-black/8 bg-white/45 px-4 py-3 text-sm leading-7"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card rounded-[2rem] p-6 md:p-8">
            <SectionHeading
              eyebrow="Why People Lose"
              title="The biggest mistake is not lack of anger. It is lack of usable evidence."
              description="Buyers usually fail for process reasons, not because they did not complain loudly enough."
            />
            <div className="space-y-3 text-sm leading-7 text-[var(--muted)]">
              <p>They never preserved the original promise language.</p>
              <p>They did not create a clean written refund request.</p>
              <p>They let the seller stretch the timeline until the pressure was gone.</p>
              <p>They entered dispute channels with screenshots missing or scattered.</p>
            </div>
          </section>
        </div>

        <section className="rounded-[2rem] border border-black/8 bg-[rgba(31,60,54,0.96)] p-6 text-[#f8f2e8] md:p-8">
          <p className="eyebrow !text-[#c0d2cd] before:!bg-[#7fa39a]">Action Summary</p>
          <pre className="mt-5 overflow-x-auto whitespace-pre-wrap text-sm leading-8 text-[#e0ebe7]">
{`Freeze evidence
-> Send one structured refund request
-> Give a short response window
-> Escalate to PayPal or your bank
-> Submit a clean evidence file
-> Wait for third-party review`}
          </pre>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/submit-report" className="accent-button !bg-[#f7efe4] !text-[#10211d] hover:!bg-[#efc7a8]">
              Submit your evidence here
            </Link>
            <Link href="/cases" className="ghost-button !border-white/15 !bg-white/5 !text-[#f8f2e8]">
              Read the archived cases
            </Link>
          </div>
        </section>

        <section className="glass-card rounded-[2rem] p-6 md:p-8">
          <SectionHeading
            eyebrow="Official Sources"
            title="These are the main references used for the timing and escalation logic"
            description="High-stakes details such as dispute windows should be checked against official guidance, not random forum advice."
          />
          <div className="grid gap-3">
            {sourceLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-[1.3rem] border border-black/8 bg-white/45 px-4 py-3 text-sm leading-7 transition-colors hover:bg-white/65"
              >
                {item.label}
              </a>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[rgba(23,20,17,0.12)] bg-[rgba(255,249,241,0.7)] p-6 md:p-8">
          <p className="eyebrow">Notice</p>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--muted)]">
            This page is not legal advice. It is a practical action workflow built to help users
            preserve leverage after non-delivery, refund conflict, or communication breakdown.
            Final determinations are made by payment providers, banks, regulators, or courts.
          </p>
        </section>
      </div>
    </div>
  );
}
