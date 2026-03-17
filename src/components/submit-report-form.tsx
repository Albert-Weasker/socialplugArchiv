"use client";

import { useState } from "react";

type FormState = {
  publicName: string;
  contactInfo: string;
  purchaseDate: string;
  amountText: string;
  servicePurchased: string;
  orderNumber: string;
  disputeSummary: string;
  evidenceDetails: string;
  evidenceLinks: string;
  refundRequested: boolean;
};

const initialState: FormState = {
  publicName: "",
  contactInfo: "",
  purchaseDate: "",
  amountText: "",
  servicePurchased: "",
  orderNumber: "",
  disputeSummary: "",
  evidenceDetails: "",
  evidenceLinks: "",
  refundRequested: false,
};

const fieldClassName =
  "w-full rounded-[1rem] border border-black/10 bg-white/70 px-4 py-3 text-sm outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]";

export function SubmitReportForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as {
        error?: string;
        details?: string[];
        message?: string;
      };

      if (!response.ok) {
        const message = data.details?.join(" ") || data.error || "Submission failed.";
        setStatus({ type: "error", message });
        return;
      }

      setForm(initialState);
      setStatus({
        type: "success",
        message:
          data.message || "Evidence submitted successfully. Your report is now in review.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span>Name or anonymous alias</span>
          <input
            className={fieldClassName}
            value={form.publicName}
            onChange={(event) =>
              setForm((current) => ({ ...current, publicName: event.target.value }))
            }
            placeholder="Anonymous Witness"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span>Contact information</span>
          <input
            className={fieldClassName}
            value={form.contactInfo}
            onChange={(event) =>
              setForm((current) => ({ ...current, contactInfo: event.target.value }))
            }
            placeholder="email, Telegram, or another contact"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span>Purchase date</span>
          <input
            className={fieldClassName}
            type="date"
            value={form.purchaseDate}
            onChange={(event) =>
              setForm((current) => ({ ...current, purchaseDate: event.target.value }))
            }
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span>Amount and currency</span>
          <input
            className={fieldClassName}
            value={form.amountText}
            onChange={(event) =>
              setForm((current) => ({ ...current, amountText: event.target.value }))
            }
            placeholder="$200 USD"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span>Service purchased</span>
          <input
            className={fieldClassName}
            value={form.servicePurchased}
            onChange={(event) =>
              setForm((current) => ({ ...current, servicePurchased: event.target.value }))
            }
            placeholder="TikTok followers / YouTube subscribers / Reddit upvotes"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span>Order number</span>
          <input
            className={fieldClassName}
            value={form.orderNumber}
            onChange={(event) =>
              setForm((current) => ({ ...current, orderNumber: event.target.value }))
            }
            placeholder="Order ID or transaction reference"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm">
        <span>Dispute summary</span>
        <textarea
          className={`${fieldClassName} min-h-32`}
          value={form.disputeSummary}
          onChange={(event) =>
            setForm((current) => ({ ...current, disputeSummary: event.target.value }))
          }
          placeholder="Describe what was promised, what happened, and how the dispute developed."
        />
      </label>

      <label className="grid gap-2 text-sm">
        <span>Evidence details</span>
        <textarea
          className={`${fieldClassName} min-h-32`}
          value={form.evidenceDetails}
          onChange={(event) =>
            setForm((current) => ({ ...current, evidenceDetails: event.target.value }))
          }
          placeholder="List the proof you have: payment screenshot, product page, chat logs, non-delivery proof, drop-off proof, refund refusal, etc."
        />
      </label>

      <label className="grid gap-2 text-sm">
        <span>Evidence links</span>
        <textarea
          className={`${fieldClassName} min-h-24`}
          value={form.evidenceLinks}
          onChange={(event) =>
            setForm((current) => ({ ...current, evidenceLinks: event.target.value }))
          }
          placeholder="Paste Google Drive, Dropbox, image, or document links if available."
        />
      </label>

      <label className="flex items-center gap-3 rounded-[1rem] border border-black/8 bg-white/55 px-4 py-3 text-sm">
        <input
          type="checkbox"
          checked={form.refundRequested}
          onChange={(event) =>
            setForm((current) => ({ ...current, refundRequested: event.target.checked }))
          }
        />
        <span>I already requested a refund or opened a payment dispute.</span>
      </label>

      {status.type !== "idle" ? (
        <div
          className={`rounded-[1rem] px-4 py-3 text-sm ${
            status.type === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border border-red-200 bg-red-50 text-red-900"
          }`}
        >
          {status.message}
        </div>
      ) : null}

      <button type="submit" disabled={submitting} className="accent-button disabled:cursor-not-allowed disabled:opacity-60">
        {submitting ? "Submitting..." : "Submit evidence"}
      </button>
    </form>
  );
}
