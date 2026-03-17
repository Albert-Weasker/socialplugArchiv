import type { Metadata } from "next";
import { SubmitReportForm } from "@/components/submit-report-form";
import { SectionHeading } from "@/components/section-heading";
import { reportChecklist } from "@/lib/site";

export const metadata: Metadata = {
  title: "Submit a SocialPlug Report",
  description:
    "Submit order disputes, non-delivery reports, refund conflicts, and screenshots to the SocialPlug Evidence Archive.",
};

export default function SubmitReportPage() {
  return (
    <div className="section-pad">
      <div className="container-shell space-y-10">
        <section className="glass-card rounded-[2.2rem] p-7 md:p-10">
          <p className="eyebrow">Victim Intake</p>
          <h1 className="display-title mt-5 max-w-4xl text-5xl leading-[0.96] font-semibold md:text-6xl">
            You are not the only person this happened to.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted)]">
            If you paid and then ran into non-delivery, disappearing results, refund delays,
            or support that suddenly stopped replying, do not leave that experience buried in
            a private chat thread. Your record can become the next visible piece of evidence.
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {[
              "Non-delivery after payment",
              "Results that disappear unusually fast",
              "Refund requests delayed or refused",
              "Support replies that turn into silence",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.25rem] border border-black/8 bg-white/50 px-4 py-3 text-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <div className="two-grid">
          <section className="glass-card rounded-[2rem] p-6 md:p-8">
            <SectionHeading
              eyebrow="Evidence Intake"
              title="Submit a structured case record"
              description="This is not a comment box. It is an evidence intake. The clearer your report is, the easier it becomes to review, connect with similar cases, and publish as part of the archive."
            />
            <div className="mb-6 grid gap-3">
              {[
                "Your case can be turned into a timeline.",
                "Your evidence can help connect repeated complaint patterns.",
                "Your submission can become part of a public archived case after review.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.2rem] border border-black/8 bg-white/55 px-4 py-3 text-sm leading-7"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <SubmitReportForm />
            </div>
          </section>

          <aside className="ink-card rounded-[2rem] p-6 md:p-8">
            <p className="eyebrow !text-[#d8c7ba] before:!bg-[#9d8778]">
              What To Prepare
            </p>
            <div className="mt-6 space-y-5 text-sm leading-7 text-[#f2e8de]">
              <p>
                We only want one kind of submission: a real record that can be checked and
                traced later.
              </p>
              <p>
                Do not try to sound dramatic. Facts are stronger than emotion here. The best
                submissions clearly show what was promised, what actually happened, and what
                evidence you still hold.
              </p>
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[#aa9382]">
                Required Attachments
              </p>
              <div className="mt-3 grid gap-3">
                {reportChecklist.map((item) => (
                  <div key={item} className="rounded-[1rem] border border-white/8 px-3 py-2">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[#aa9382]">
                Why Submit
              </p>
              <div className="mt-3 grid gap-3 text-sm leading-7 text-[#f2e8de]">
                <p>Single complaints are easy to ignore. Connected records are much harder to dismiss.</p>
                <p>Your submission can help later buyers avoid the same mistake.</p>
                <p>Your evidence can strengthen refund, dispute, or reporting efforts.</p>
              </div>
            </div>
          </aside>
        </div>

        <section className="rounded-[2rem] border border-black/8 bg-[rgba(255,249,241,0.72)] p-6 md:p-8">
          <p className="eyebrow">What Happens After Submission</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "1. Intake review",
                body: "The record enters an internal review queue. Incomplete or unverifiable material should not be published.",
              },
              {
                title: "2. Evidence sorting",
                body: "Usable reports are organized into a timeline: payment, promise, failure point, refund attempt, and current status.",
              },
              {
                title: "3. Public archive potential",
                body: "Stronger submissions may become public evidence pages that help show the repeated pattern to future buyers.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[1.4rem] border border-black/8 bg-white/55 p-5"
              >
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
