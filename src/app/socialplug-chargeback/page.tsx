import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "SocialPlug Chargeback",
  description:
    "A SocialPlug chargeback action page focused on evidence, timing pressure, and when to stop waiting and move into PayPal or bank disputes.",
};

const evidenceChecklist = [
  "Payment proof with amount, date, and method",
  "Order details or transaction reference",
  "Screenshots of the promise that convinced you to pay",
  "Proof the service was not delivered, partly delivered, or dropped away",
  "Full support conversation and ticket history",
  "A clear refund request record sent to the seller",
];

const failurePatterns = [
  {
    title: "⏳ Endless waiting",
    body: 'Buyers keep hearing "please wait" while nothing actually moves toward a refund.',
  },
  {
    title: "🧩 Evidence stays scattered",
    body: "The record is split across screenshots, inboxes, and chat logs instead of one clean file.",
  },
  {
    title: "📉 The dispute window keeps shrinking",
    body: "While support keeps the buyer occupied, the time available to escalate starts disappearing.",
  },
];

const faqItems = [
  {
    question: "Why should a buyer stop arguing with support at some point?",
    answer:
      "Because once the seller is stalling, repeating itself, or going silent, the issue is no longer a customer-service problem. It becomes a payment dispute problem.",
  },
  {
    question: "What is the goal of a chargeback file?",
    answer:
      "Not to prove you are upset. The goal is to give PayPal, a card issuer, or a bank a clean, chronological evidence file that shows payment, promise, failure, and refund attempt.",
  },
  {
    question: "When is the right time to escalate?",
    answer:
      "As soon as the seller is not clearly resolving the issue. Waiting longer usually improves the seller’s position, not yours.",
  },
];

export default function SocialPlugChargebackPage() {
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
          <p className="eyebrow">Chargeback Action Page</p>
          <h1 className="display-title mt-5 max-w-5xl text-5xl leading-[0.96] font-semibold md:text-6xl">
            SocialPlug chargeback: the longer you let this drag, the harder it becomes to get your
            money back
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--muted)]">
            People search this page after the order is already going bad. The delivery is missing,
            the numbers have fallen away, or support keeps asking for more patience. At this stage,
            the question is no longer whether the seller will suddenly fix everything. The question
            is whether you are moving fast enough to protect your refund path.
          </p>
        </section>

        <section className="rounded-[2rem] border border-[rgba(195,78,47,0.26)] bg-[linear-gradient(135deg,rgba(119,13,13,0.94),rgba(55,14,14,0.94))] px-6 py-7 text-[#fff2ea] shadow-[0_24px_80px_rgba(73,12,12,0.26)] md:px-8 md:py-8">
          <p className="eyebrow !text-[#f3b7aa] before:!bg-[#d26c58]">Critical Point</p>
          <h2 className="display-title mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-5xl">
            Delay helps the seller. Clean evidence and fast escalation help you.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#ffd9cf]">
            If you are still trapped in circular support replies, you are already losing time that
            should be going into your dispute file.
          </p>
        </section>

        <div className="two-grid">
          <section className="glass-card rounded-[2rem] p-6 md:p-8">
            <SectionHeading
              eyebrow="What Goes Wrong"
              title="How buyers miss the recovery window"
              description="The money usually stops being recoverable for process reasons, not because the complaint was weak in theory."
            />
            <div className="grid gap-4">
              {failurePatterns.map((item) => (
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
            <p className="eyebrow !text-[#d8c7ba] before:!bg-[#9d8778]">What To Stop Doing</p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[#f2e8de]">
              <p>Stop treating repeated support replies as progress.</p>
              <p>Stop waiting for a refund that is not clearly being processed.</p>
              <p>Stop assuming you can always escalate later without losing leverage.</p>
            </div>
          </aside>
        </div>

        <section className="glass-card rounded-[2rem] p-6 md:p-8">
          <SectionHeading
            eyebrow="Core Evidence"
            title="What your dispute file needs before you escalate"
            description="The goal is not to convince the seller anymore. The goal is to convince the payment system."
          />
          <div className="grid gap-3 md:grid-cols-2">
            {evidenceChecklist.map((item) => (
              <div
                key={item}
                className="rounded-[1.3rem] border border-black/8 bg-white/45 px-4 py-3 text-sm leading-7"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="two-grid">
          <div className="glass-card rounded-[2rem] p-6 md:p-8">
            <SectionHeading
              eyebrow="Action Path"
              title="What to do next, in order"
              description="The sequence matters because a clean dispute file is stronger than scattered frustration."
            />
            <div className="grid gap-3">
              {[
                "1. Stop the endless support loop and preserve the full record.",
                "2. Put the evidence into one timeline from payment to today.",
                "3. Send one clear refund request if you have not already done it.",
                "4. Move into PayPal, bank, or card dispute channels without dragging it out.",
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
              eyebrow="Why Timing Matters"
              title="You are no longer trying to improve the service"
              description="Once buyers search for chargeback or refund recovery, they are already in the loss-control phase."
            />
            <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">
              <p>
                Evidence quality declines when promise pages change, chat threads vanish, or memory
                replaces screenshots.
              </p>
              <p>
                Payment platforms and issuers work on rules and time windows. They do not care how
                many extra days you spent hoping support would suddenly become useful.
              </p>
              <p className="font-medium text-[var(--ink)]">
                If you are already searching for chargeback help, the real issue is not whether the
                service might recover. The real issue is whether your refund path is still strong.
              </p>
            </div>
          </div>
        </section>

        <section className="glass-card rounded-[2rem] p-6 md:p-8">
          <SectionHeading
            eyebrow="Move Now"
            title="Choose the next page by where your money is stuck"
            description="This page is the action trigger. The detailed workflow lives one click deeper."
          />
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-[1.5rem] border border-black/8 bg-white/45 p-5">
              <h2 className="text-lg font-semibold">Need the full dispute workflow?</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                Use the refund guide for evidence order, request language, and escalation timing.
              </p>
              <Link href="/refund-guide" className="accent-button mt-5 inline-flex">
                Open refund guide
              </Link>
            </article>
            <article className="rounded-[1.5rem] border border-black/8 bg-white/45 p-5">
              <h2 className="text-lg font-semibold">Need proof that this is not just your case?</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                Go to the case library and compare your timeline with public archived complaints.
              </p>
              <Link href="/cases" className="ghost-button mt-5 inline-flex">
                Open case library
              </Link>
            </article>
            <article className="rounded-[1.5rem] border border-black/8 bg-white/45 p-5">
              <h2 className="text-lg font-semibold">Need to lock in your own record?</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                Submit your evidence so the complaint does not stay trapped in private messages.
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
            title='Quick answers for "SocialPlug chargeback"'
            description="These are the questions people ask after doubt turns into a money-recovery problem."
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
