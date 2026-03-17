import { query } from "@/lib/db";

export type SubmissionInput = {
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

let submissionsSchemaEnsured = false;

export async function ensureSubmissionsTable() {
  if (submissionsSchemaEnsured) {
    return;
  }

  await query(`
    create table if not exists report_submissions (
      id bigserial primary key,
      public_name text not null,
      contact_info text not null,
      purchase_date date not null,
      amount_text text not null,
      service_purchased text not null,
      order_number text not null,
      dispute_summary text not null,
      evidence_details text not null,
      evidence_links text not null default '',
      refund_requested boolean not null default false,
      review_status text not null default 'new',
      created_at timestamptz not null default now()
    );
  `);

  submissionsSchemaEnsured = true;
}

export function validateSubmission(input: SubmissionInput) {
  const errors: string[] = [];

  if (input.publicName.trim().length < 2) {
    errors.push("Name or alias is required.");
  }

  if (input.contactInfo.trim().length < 5) {
    errors.push("Contact information is required.");
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.purchaseDate)) {
    errors.push("Purchase date must use YYYY-MM-DD.");
  }

  if (input.amountText.trim().length < 1) {
    errors.push("Amount is required.");
  }

  if (input.servicePurchased.trim().length < 2) {
    errors.push("Service purchased is required.");
  }

  if (input.orderNumber.trim().length < 2) {
    errors.push("Order number is required.");
  }

  if (input.disputeSummary.trim().length < 20) {
    errors.push("Dispute summary must be at least 20 characters.");
  }

  if (input.evidenceDetails.trim().length < 20) {
    errors.push("Evidence details must be at least 20 characters.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export async function createSubmission(input: SubmissionInput) {
  await ensureSubmissionsTable();

  const result = await query<{ id: number }>(
    `
      insert into report_submissions (
        public_name,
        contact_info,
        purchase_date,
        amount_text,
        service_purchased,
        order_number,
        dispute_summary,
        evidence_details,
        evidence_links,
        refund_requested
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      returning id
    `,
    [
      input.publicName.trim(),
      input.contactInfo.trim(),
      input.purchaseDate,
      input.amountText.trim(),
      input.servicePurchased.trim(),
      input.orderNumber.trim(),
      input.disputeSummary.trim(),
      input.evidenceDetails.trim(),
      input.evidenceLinks.trim(),
      input.refundRequested,
    ],
  );

  return result.rows[0];
}
