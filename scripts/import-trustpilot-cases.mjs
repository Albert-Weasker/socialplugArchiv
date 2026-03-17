import process from "node:process";
import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL or POSTGRES_URL");
}

const MIN_CASES = Number(process.env.MIN_CASES || 100);
const BASE_URL = "https://www.trustpilot.com/review/panel.socialplug.io";

const pool = new Pool({
  connectionString,
  ssl: connectionString.includes("sslmode=require")
    ? { rejectUnauthorized: false }
    : undefined,
});

function parseNextData(html) {
  const marker = '__NEXT_DATA__" type="application/json">';
  const start = html.indexOf(marker);

  if (start === -1) {
    throw new Error("Unable to find __NEXT_DATA__ payload");
  }

  const jsonStart = start + marker.length;
  const jsonEnd = html.indexOf("</script>", jsonStart);
  return JSON.parse(html.slice(jsonStart, jsonEnd));
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function truncate(text, max = 220) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) {
    return clean;
  }
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

function inferTags(title, text) {
  const value = `${title} ${text}`.toLowerCase();
  const tags = new Set();

  if (
    /never received|didn'?t receive|not delivered|never arrived|did not arrive|no delivery|not get|never got|didn'?t get/.test(
      value,
    )
  ) {
    tags.add("Not Delivered");
  }

  if (/refund|money back|chargeback/.test(value)) {
    if (/refused|won't|wouldn't|cant refund|can't refund|no refund/.test(value)) {
      tags.add("Refund Refused");
    } else {
      tags.add("Refund Delay");
    }
  }

  if (
    /drop|dropped|disappear|disappeared|removed|vanish|gone|lost them all/.test(
      value,
    )
  ) {
    tags.add("Drop-Off");
  }

  if (/partial|only received|half|some of|5 views|few views/.test(value)) {
    tags.add("Partial Delivery");
  }

  if (/support|customer service|reply|response|respond|ghost|ignore|ignored/.test(value)) {
    tags.add("Support Ghosting");
  }

  if (/complete|completed|fulfilled|insight|analytics|did nothing|fake/.test(value)) {
    tags.add("Delivery Dispute");
  }

  if (/again|third time|multiple|another order|several/.test(value)) {
    tags.add("Repeat Orders");
  }

  if (/ticket|order status|order marked/.test(value)) {
    tags.add("Ticket Dispute");
  }

  if (/scam|fake|terrible|awful|waste|fraud/.test(value)) {
    tags.add("Quality Dispute");
  }

  if (tags.size === 0) {
    tags.add("Delivery Dispute");
  }

  return Array.from(tags).slice(0, 4);
}

function buildSummary(title, text) {
  const shortText = truncate(text, 180);
  return truncate(`A public Trustpilot review titled "${title}" says: ${shortText}`, 200);
}

function isComplaintReview(review) {
  return (review.rating || 0) <= 2;
}

async function ensureSchema() {
  await pool.query(`
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

    drop index if exists public_cases_source_url_idx;
  `);
}

async function fetchReviews(page) {
  const url = `${BASE_URL}?page=${page}`;
  const response = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      accept: "text/html,application/xhtml+xml",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch page ${page}: ${response.status}`);
  }

  const html = await response.text();
  const data = parseNextData(html);
  const pageProps = data.props.pageProps;

  return {
    total: pageProps.businessUnit.numberOfReviews,
    reviews: pageProps.reviews,
  };
}

async function upsertCase(item) {
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

async function main() {
  await ensureSchema();
  await pool.query(`delete from public_cases where source_platform = 'Trustpilot'`);

  const imported = [];
  let totalReviews = 0;
  let page = 1;

  while (imported.length < MIN_CASES) {
    const { total, reviews } = await fetchReviews(page);
    totalReviews = total;

    if (!reviews.length) {
      break;
    }

    for (const review of reviews) {
      if (!isComplaintReview(review)) {
        continue;
      }

      const title = truncate(review.title || review.text || "Untitled review", 96);
      const text = truncate(review.text || review.title || "", 240);
      const author = review.consumer?.displayName || "Trustpilot user";
      const publishedAt = review.dates?.publishedDate?.slice(0, 10) || "2025-01-01";
      const slug = `trustpilot-${publishedAt}-${slugify(author)}-${review.id.slice(0, 8)}`;

      imported.push({
        slug,
        title,
        source_platform: "Trustpilot",
        source_url: BASE_URL,
        source_title: "Panel Socialplug Reviews",
        source_author: author,
        published_at: publishedAt,
        summary: buildSummary(title, review.text || ""),
        excerpt: text,
        allegation_tags: inferTags(title, review.text || ""),
        amount_text: null,
        amount_usd_estimate: null,
        rating: review.rating || null,
        status_label: "Public Complaint",
      });
    }

    if (imported.length >= totalReviews) {
      break;
    }

    page += 1;
  }

  const selected = imported.slice(0, Math.max(MIN_CASES, 100));

  for (const item of selected) {
    await upsertCase(item);
  }

  const result = await pool.query(
    `select count(*)::int as count from public_cases where source_platform = 'Trustpilot'`,
  );

  console.log(
    `Imported ${selected.length} Trustpilot cases. Trustpilot rows in DB: ${result.rows[0].count}`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
