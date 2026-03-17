import process from "node:process";
import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL or POSTGRES_URL");
}

const cases = [
  {
    slug: "trustpilot-stuart-lunn-never-received-order-refused-refund",
    title: "Order never arrived and refund was refused",
    source_platform: "Trustpilot",
    source_url: "https://www.trustpilot.com/review/panel.socialplug.io",
    source_title: "Panel Socialplug Reviews",
    source_author: "Stuart Lunn",
    published_at: "2025-10-08",
    summary: "A public review says the order was never delivered and the refund request was refused.",
    excerpt: "Never received my order and refused to refund.",
    allegation_tags: ["Not Delivered", "Refund Refused"],
    amount_text: null,
    amount_usd_estimate: null,
    rating: 1,
    status_label: "Public Complaint",
  },
  {
    slug: "trustpilot-zz-followers-dropped-hours-later",
    title: "Followers vanished within hours and no refund followed",
    source_platform: "Trustpilot",
    source_url: "https://www.trustpilot.com/review/panel.socialplug.io",
    source_title: "Panel Socialplug Reviews",
    source_author: "ZZ",
    published_at: "2025-11-06",
    summary: "A public review says purchased followers appeared quickly, then disappeared within hours, and support still did not refund.",
    excerpt:
      "Purchased 1000 X followers... lost them all hours later... they can't refund me.",
    allegation_tags: ["Drop-Off", "Refund Refused"],
    amount_text: null,
    amount_usd_estimate: null,
    rating: 1,
    status_label: "Public Complaint",
  },
  {
    slug: "trustpilot-lena-likes-removed-months-later",
    title: "Multiple orders were removed months later and refunds were still denied",
    source_platform: "Trustpilot",
    source_url: "https://www.trustpilot.com/review/panel.socialplug.io",
    source_title: "Panel Socialplug Reviews",
    source_author: "Lena",
    published_at: "2026-01-13",
    summary:
      "A public review says several TikTok like orders were initially delivered, then removed months later, and refunds were denied even after evidence was submitted.",
    excerpt:
      "The likes were initially delivered... months later they were completely removed.",
    allegation_tags: ["Drop-Off", "Refund Refused", "Repeat Orders"],
    amount_text: null,
    amount_usd_estimate: null,
    rating: 1,
    status_label: "Public Complaint",
  },
  {
    slug: "trustpilot-mila-views-never-landed-in-insights",
    title: "Multiple fulfillment attempts still did not produce the promised result",
    source_platform: "Trustpilot",
    source_url: "https://www.trustpilot.com/review/panel.socialplug.io",
    source_title: "Panel Socialplug Reviews",
    source_author: "Mila Ortiz",
    published_at: "2026-01-12",
    summary:
      "A public review says the platform tried three times to complete a TikTok views order, but the result never appeared in account insights.",
    excerpt: "They tried three times to fulfill this order but never did.",
    allegation_tags: ["Not Delivered", "Delivery Dispute"],
    amount_text: null,
    amount_usd_estimate: null,
    rating: 1,
    status_label: "Public Complaint",
  },
  {
    slug: "bbb-report-partial-delivery-seventeen-dollars",
    title: "BBB complaint says only part of the service arrived and the issue was denied",
    source_platform: "BBB Scam Tracker",
    source_url: "https://www.bbb.org/scamtracker/lookupscam/918173",
    source_title: "BBB Scam Tracker report 918173",
    source_author: "Anonymous report",
    published_at: "2024-12-05",
    summary:
      "A BBB Scam Tracker report says a user paid $17 for views, received only a small fraction, and was told the order was complete with no refund.",
    excerpt:
      "I paid for 50 views... only received 5 views... refused to acknowledge the problem.",
    allegation_tags: ["Partial Delivery", "Refund Refused"],
    amount_text: "$17",
    amount_usd_estimate: 17,
    rating: null,
    status_label: "Public Complaint",
  },
  {
    slug: "reddit-socialmediapromotion-order-marked-complete-without-delivery",
    title: "Reddit post says the order was marked complete but the account showed no result",
    source_platform: "Reddit",
    source_url:
      "https://www.reddit.com/r/SocialMediaPromotion/comments/1f63pap/social_plug_offers_a_great_variety_of_ways_to/",
    source_title: "r/SocialMediaPromotion thread about SocialPlug",
    source_author: "Reddit user post",
    published_at: "2024-08-31",
    summary:
      "In a public Reddit thread, a user says support marked the order as completed while the account or video showed no matching result.",
    excerpt:
      "The orders had already been completed on their side... I don't see the services reflected.",
    allegation_tags: ["Not Delivered", "Ticket Dispute"],
    amount_text: null,
    amount_usd_estimate: null,
    rating: null,
    status_label: "Public Post",
  },
];

const pool = new Pool({
  connectionString,
  ssl: connectionString.includes("sslmode=require")
    ? { rejectUnauthorized: false }
    : undefined,
});

const schemaSql = `
  create table if not exists public_cases (
    id bigserial primary key,
    slug text not null unique,
    title text not null,
    source_platform text not null,
    source_url text not null,
    source_title text not null,
    source_author text not null,
    published_at date not null,
    summary text not null,
    excerpt text not null,
    allegation_tags text[] not null default '{}',
    amount_text text,
    amount_usd_estimate numeric(12, 2),
    rating integer,
    status_label text not null default 'Public Complaint',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  );

  create unique index if not exists public_cases_source_url_idx
    on public_cases (source_url, source_author, published_at);
`;

async function main() {
  await pool.query(schemaSql);

  for (const item of cases) {
    await pool.query(
      `
        insert into public_cases (
          slug,
          title,
          source_platform,
          source_url,
          source_title,
          source_author,
          published_at,
          summary,
          excerpt,
          allegation_tags,
          amount_text,
          amount_usd_estimate,
          rating,
          status_label
        )
        values (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
        )
        on conflict (slug) do update
        set
          title = excluded.title,
          source_platform = excluded.source_platform,
          source_url = excluded.source_url,
          source_title = excluded.source_title,
          source_author = excluded.source_author,
          published_at = excluded.published_at,
          summary = excluded.summary,
          excerpt = excluded.excerpt,
          allegation_tags = excluded.allegation_tags,
          amount_text = excluded.amount_text,
          amount_usd_estimate = excluded.amount_usd_estimate,
          rating = excluded.rating,
          status_label = excluded.status_label,
          updated_at = now()
      `,
      [
        item.slug,
        item.title,
        item.source_platform,
        item.source_url,
        item.source_title,
        item.source_author,
        item.published_at,
        item.summary,
        item.excerpt,
        item.allegation_tags,
        item.amount_text,
        item.amount_usd_estimate,
        item.rating,
        item.status_label,
      ],
    );
  }

  const result = await pool.query("select count(*)::int as count from public_cases");
  console.log(`Synced ${cases.length} records. Total rows: ${result.rows[0].count}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
