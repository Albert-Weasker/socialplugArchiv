import process from "node:process";
import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL or POSTGRES_URL");
}

const pool = new Pool({
  connectionString,
  ssl: connectionString.includes("sslmode=require")
    ? { rejectUnauthorized: false }
    : undefined,
});

async function main() {
  await pool.query(`
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

  const result = await pool.query(
    "select count(*)::int as count from report_submissions",
  );

  console.log(`report_submissions ready. Current rows: ${result.rows[0].count}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
