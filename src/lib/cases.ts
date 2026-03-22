import { query } from "@/lib/db";

export type PublicCase = {
  slug: string;
  title: string;
  sourcePlatform: string;
  sourceUrl?: string;
  sourceTitle: string;
  sourceAuthor: string;
  publishedAt: string;
  summary: string;
  excerpt: string;
  allegationTags: string[];
  amountText?: string | null;
  amountUsdEstimate?: number | null;
  rating?: number | null;
  statusLabel: string;
};

export type CaseTagMeta = {
  emoji: string;
  label: string;
};

const legacyTagMap: Record<string, string> = {
  未交付: "Not Delivered",
  拒绝退款: "Refund Refused",
  掉量: "Drop-Off",
  交付异常: "Delivery Dispute",
  部分交付: "Partial Delivery",
  工单争议: "Ticket Dispute",
  多次订单: "Repeat Orders",
  客服失联: "Support Ghosting",
  拖延退款: "Refund Delay",
  质量争议: "Quality Dispute",
};

export const caseTagEmojiMap: Record<string, CaseTagMeta> = {
  "Not Delivered": { emoji: "📭", label: "Not Delivered" },
  "Refund Refused": { emoji: "🚫", label: "Refund Refused" },
  "Store Credit Offer": { emoji: "💳", label: "Store Credit Offer" },
  "Drop-Off": { emoji: "📉", label: "Drop-Off" },
  "Delivery Dispute": { emoji: "⚠️", label: "Delivery Dispute" },
  "Partial Delivery": { emoji: "🧩", label: "Partial Delivery" },
  "Ticket Dispute": { emoji: "🧾", label: "Ticket Dispute" },
  "Repeat Orders": { emoji: "🌀", label: "Repeat Orders" },
  "Support Ghosting": { emoji: "👻", label: "Support Ghosting" },
  "Refund Delay": { emoji: "⏳", label: "Refund Delay" },
  "Quality Dispute": { emoji: "💥", label: "Quality Dispute" },
};

export function getTagMeta(tag: string): CaseTagMeta {
  const normalized = legacyTagMap[tag] ?? tag;
  return caseTagEmojiMap[normalized] ?? { emoji: "📌", label: normalized };
}

export const publicCaseSeeds: PublicCase[] = [
  {
    slug: "exclusive-email-jia-socialplug-refund-forced-to-account-balance",
    title: "Exclusive evidence: SocialPlug support said the refund would not go back to the original payment method",
    sourcePlatform: "Exclusive Evidence",
    sourceTitle: "Archived email from Jia at SocialPlug",
    sourceAuthor: "Tim",
    publishedAt: "2026-03-19",
    summary:
      "An archived support email says the refund for the order was issued to the SocialPlug account balance instead of the original payment method, and explicitly says canceled or unfulfilled orders are refunded to account balance under SocialPlug's policy.",
    excerpt:
      "The refund for Order has already been processed and issued to your SocialPlug account balance... refunds for canceled or unfulfilled orders are issued to the account balance.",
    allegationTags: [
      "Refund Refused",
      "Refund Delay",
      "Store Credit Offer",
      "Ticket Dispute",
    ],
    statusLabel: "Submitted Evidence",
    amountText: "$200.00",
    amountUsdEstimate: 200,
  },
  {
    slug: "submission-github-stars-never-started-store-credit-offered",
    title: "GitHub stars order never started and support pushed store credit instead of a refund",
    sourcePlatform: "User Submission",
    sourceTitle: "Direct archive submission",
    sourceAuthor: "Herchejane",
    publishedAt: "2026-03-19",
    summary:
      "A direct submission says a $200.60 GitHub Stars order never started, and support tried to replace the requested refund with account store credit instead of sending money back to the original payment method.",
    excerpt:
      "The order showed Created on March 16, but Started and Completed stayed blank. Support said the amount should reflect on the SocialPlug account balance. The buyer rejected store credit and asked for a refund to the original payment method within 24 hours.",
    allegationTags: [
      "Not Delivered",
      "Refund Refused",
      "Refund Delay",
      "Store Credit Offer",
      "Ticket Dispute",
    ],
    statusLabel: "Submitted Evidence",
    amountText: "$200.60",
    amountUsdEstimate: 200.6,
  },
  {
    slug: "trustpilot-stuart-lunn-never-received-order-refused-refund",
    title: "Order never arrived and refund was refused",
    sourcePlatform: "Trustpilot",
    sourceUrl: "https://www.trustpilot.com/review/panel.socialplug.io",
    sourceTitle: "Panel Socialplug Reviews",
    sourceAuthor: "Stuart Lunn",
    publishedAt: "2025-10-08",
    summary:
      "A public review says the order was never delivered and the refund request was refused.",
    excerpt: "Never received my order and refused to refund.",
    allegationTags: ["Not Delivered", "Refund Refused"],
    statusLabel: "Public Complaint",
    rating: 1,
  },
  {
    slug: "trustpilot-zz-followers-dropped-hours-later",
    title: "Followers vanished within hours and no refund followed",
    sourcePlatform: "Trustpilot",
    sourceUrl: "https://www.trustpilot.com/review/panel.socialplug.io",
    sourceTitle: "Panel Socialplug Reviews",
    sourceAuthor: "ZZ",
    publishedAt: "2025-11-06",
    summary:
      "A public review says purchased followers appeared quickly, then disappeared within hours, and support still did not refund.",
    excerpt:
      "Purchased 1000 X followers... lost them all hours later... they can't refund me.",
    allegationTags: ["Drop-Off", "Refund Refused"],
    statusLabel: "Public Complaint",
    rating: 1,
  },
  {
    slug: "trustpilot-lena-likes-removed-months-later",
    title: "Multiple orders were removed months later and refunds were still denied",
    sourcePlatform: "Trustpilot",
    sourceUrl: "https://www.trustpilot.com/review/panel.socialplug.io",
    sourceTitle: "Panel Socialplug Reviews",
    sourceAuthor: "Lena",
    publishedAt: "2026-01-13",
    summary:
      "A public review says several TikTok like orders were initially delivered, then removed months later, and refunds were denied even after evidence was submitted.",
    excerpt:
      "The likes were initially delivered... months later they were completely removed.",
    allegationTags: ["Drop-Off", "Refund Refused", "Repeat Orders"],
    statusLabel: "Public Complaint",
    rating: 1,
  },
  {
    slug: "trustpilot-md-no-delivery-refund-email-loop",
    title: "Review says payment was taken, delivery never happened, and refund emails kept looping",
    sourcePlatform: "Trustpilot",
    sourceUrl: "https://www.trustpilot.com/review/panel.socialplug.io",
    sourceTitle: "Panel Socialplug Reviews",
    sourceAuthor: "M D",
    publishedAt: "2026-02-20",
    summary:
      "A public review says the service was never delivered and refund requests were met with repetitive email replies instead of a real resolution.",
    excerpt:
      "They take your money and will never deliver the service... when you request a refund, they keep writing the same email message over and over again.",
    allegationTags: ["Not Delivered", "Refund Delay", "Ticket Dispute"],
    statusLabel: "Public Complaint",
    rating: 1,
  },
  {
    slug: "trustpilot-keyxe-hidden-policies-no-refund",
    title: "Refund was denied after the buyer says extra steps and hidden policies appeared after purchase",
    sourcePlatform: "Trustpilot",
    sourceUrl: "https://www.trustpilot.com/review/panel.socialplug.io",
    sourceTitle: "Panel Socialplug Reviews",
    sourceAuthor: "Keyxe US",
    publishedAt: "2026-02-20",
    summary:
      "A public review says the buyer ran into unclear instructions, extra requirements that were not obvious at checkout, and no refund when they objected.",
    excerpt:
      "Wouldnt issue a refund... instructions werent clear and required extra unnecessary steps... wasnt specifically provided at time of purchase.",
    allegationTags: ["Refund Refused", "Ticket Dispute", "Quality Dispute"],
    statusLabel: "Public Complaint",
    rating: 1,
  },
  {
    slug: "trustpilot-antiwoke-youtube-followers-readded-then-removed",
    title: "YouTube followers were repeatedly re-added and repeatedly removed",
    sourcePlatform: "Trustpilot",
    sourceUrl: "https://www.trustpilot.com/review/panel.socialplug.io",
    sourceTitle: "Panel Socialplug Reviews",
    sourceAuthor: "AntiWoke MMA",
    publishedAt: "2026-01-01",
    summary:
      "A public review says YouTube followers were added, removed, added again after complaints, and then removed again until the buyer gave up.",
    excerpt:
      "They were added, then immediately removed... followers were re-added, then immediately removed again.",
    allegationTags: ["Drop-Off", "Delivery Dispute", "Repeat Orders"],
    statusLabel: "Public Complaint",
    rating: 1,
  },
  {
    slug: "trustpilot-tom-jones-followers-gone-after-ten-hours",
    title: "A full follower order disappeared roughly ten hours after delivery",
    sourcePlatform: "Trustpilot",
    sourceUrl: "https://www.trustpilot.com/review/panel.socialplug.io",
    sourceTitle: "Panel Socialplug Reviews",
    sourceAuthor: "Tom Jones",
    publishedAt: "2026-01-23",
    summary:
      "A public review says a 1,000-follower order appeared at first and then vanished within about ten hours.",
    excerpt:
      "Paid for 1000 followers... got 1000 followers for 10 hours then all 1000 were removed.",
    allegationTags: ["Drop-Off", "Delivery Dispute"],
    statusLabel: "Public Complaint",
    rating: 1,
  },
  {
    slug: "trustpilot-mohammadali-no-delivery-no-money-back",
    title: "Review says nothing was delivered and no money came back",
    sourcePlatform: "Trustpilot",
    sourceUrl: "https://www.trustpilot.com/review/panel.socialplug.io",
    sourceTitle: "Panel Socialplug Reviews",
    sourceAuthor: "mohammadali ghods",
    publishedAt: "2026-01-10",
    summary:
      "A public review says the buyer received nothing and still did not get their money returned.",
    excerpt:
      "They didn’t deliver anything... they did’t return back any money.",
    allegationTags: ["Not Delivered", "Refund Refused"],
    statusLabel: "Public Complaint",
    rating: 1,
  },
  {
    slug: "trustpilot-captain-bangsaen-subreddit-banned-no-refund",
    title: "Subreddit upvote order was followed by a ban, and the buyer says responsibility was rejected",
    sourcePlatform: "Trustpilot",
    sourceUrl: "https://www.trustpilot.com/review/panel.socialplug.io",
    sourceTitle: "Panel Socialplug Reviews",
    sourceAuthor: "Captain Bangsaen",
    publishedAt: "2025-12-29",
    summary:
      "A public review says a subreddit upvote order was followed by a subreddit ban, and the seller refused to take responsibility or refund the purchase.",
    excerpt:
      "A few hours later, my subreddit got banned... the answer was no! and no refund as well.",
    allegationTags: ["Quality Dispute", "Refund Refused", "Delivery Dispute"],
    statusLabel: "Public Complaint",
    rating: 1,
  },
  {
    slug: "trustpilot-catalin-account-not-delivered-after-five-minute-promise",
    title: "An order advertised with a five-minute promise still had not arrived two days later",
    sourcePlatform: "Trustpilot",
    sourceUrl: "https://www.trustpilot.com/review/panel.socialplug.io",
    sourceTitle: "Panel Socialplug Reviews",
    sourceAuthor: "Catalin Zorzini",
    publishedAt: "2025-12-23",
    summary:
      "A public review says an account order was still missing two days later despite a site claim that delivery would happen within five minutes of payment.",
    excerpt:
      "Two days later still didn't get anything, even though on their site they claim it will be sent in 5 minutes from payment.",
    allegationTags: ["Not Delivered", "Delivery Dispute"],
    statusLabel: "Public Complaint",
    rating: 1,
  },
  {
    slug: "trustpilot-raahul-forty-days-no-delivery",
    title: "A buyer says forty days passed with no delivery",
    sourcePlatform: "Trustpilot",
    sourceUrl: "https://www.trustpilot.com/review/panel.socialplug.io",
    sourceTitle: "Panel Socialplug Reviews",
    sourceAuthor: "raahul dutta",
    publishedAt: "2025-12-16",
    summary:
      "A public review says an order remained undelivered for about forty days after purchase.",
    excerpt:
      "I placed the order, and it has been 40 days with no delivery.",
    allegationTags: ["Not Delivered", "Refund Delay"],
    statusLabel: "Public Complaint",
    rating: 1,
  },
  {
    slug: "trustpilot-mila-views-never-landed-in-insights",
    title: "Multiple fulfillment attempts still did not produce the promised result",
    sourcePlatform: "Trustpilot",
    sourceUrl: "https://www.trustpilot.com/review/panel.socialplug.io",
    sourceTitle: "Panel Socialplug Reviews",
    sourceAuthor: "Mila Ortiz",
    publishedAt: "2026-01-12",
    summary:
      "A public review says the platform tried three times to complete a TikTok views order, but the result never appeared in account insights.",
    excerpt:
      "They tried three times to fulfill this order but never did.",
    allegationTags: ["Not Delivered", "Delivery Dispute"],
    statusLabel: "Public Complaint",
    rating: 1,
  },
  {
    slug: "bbb-report-partial-delivery-seventeen-dollars",
    title: "BBB complaint says only part of the service arrived and the issue was denied",
    sourcePlatform: "BBB Scam Tracker",
    sourceUrl: "https://www.bbb.org/scamtracker/lookupscam/918173",
    sourceTitle: "BBB Scam Tracker report 918173",
    sourceAuthor: "Anonymous report",
    publishedAt: "2024-12-05",
    summary:
      "A BBB Scam Tracker report says a user paid $17 for views, received only a small fraction, and was told the order was complete with no refund.",
    excerpt:
      "I paid for 50 views... only received 5 views... refused to acknowledge the problem.",
    allegationTags: ["Partial Delivery", "Refund Refused"],
    statusLabel: "Public Complaint",
    amountText: "$17",
    amountUsdEstimate: 17,
  },
  {
    slug: "reddit-socialmediapromotion-order-marked-complete-without-delivery",
    title: "Reddit post says the order was marked complete but the account showed no result",
    sourcePlatform: "Reddit",
    sourceUrl:
      "https://www.reddit.com/r/SocialMediaPromotion/comments/1f63pap/social_plug_offers_a_great_variety_of_ways_to/",
    sourceTitle: "r/SocialMediaPromotion thread about SocialPlug",
    sourceAuthor: "Reddit user post",
    publishedAt: "2024-08-31",
    summary:
      "In a public Reddit thread, a user says support marked the order as completed while the account or video showed no matching result.",
    excerpt:
      "The orders had already been completed on their side... I don't see the services reflected.",
    allegationTags: ["Not Delivered", "Ticket Dispute"],
    statusLabel: "Public Post",
  },
];

function mergeCases(cases: PublicCase[]) {
  const bySlug = new Map<string, PublicCase>();

  cases.forEach((item) => {
    bySlug.set(item.slug, item);
  });

  return Array.from(bySlug.values()).sort((a, b) => {
    const dateCompare = b.publishedAt.localeCompare(a.publishedAt);
    if (dateCompare !== 0) {
      return dateCompare;
    }

    return a.slug.localeCompare(b.slug);
  });
}

type CaseRow = {
  slug: string;
  title: string;
  source_platform: string;
  source_url: string;
  source_title: string;
  source_author: string;
  published_at: string;
  summary: string;
  excerpt: string;
  allegation_tags: string[];
  amount_text: string | null;
  amount_usd_estimate: number | null;
  rating: number | null;
  status_label: string;
};

function mapRow(row: CaseRow): PublicCase {
  const normalizedTags = row.allegation_tags.map((tag) => legacyTagMap[tag] ?? tag);
  const normalizedStatus =
    row.status_label === "公开投诉"
      ? "Public Complaint"
      : row.status_label === "公开贴文"
        ? "Public Post"
        : row.status_label === "用户投稿"
          ? "Submitted Evidence"
        : row.status_label;

  return {
    slug: row.slug,
    title: row.title,
    sourcePlatform:
      row.source_platform === "用户投稿" ? "User Submission" : row.source_platform,
    sourceUrl: row.source_url || undefined,
    sourceTitle: row.source_title,
    sourceAuthor: row.source_author,
    publishedAt: row.published_at,
    summary: row.summary
      .replace(/^Trustpilot 公开评价标题为/u, 'A public Trustpilot review titled "')
      .replace(/”，评论内容提到：/u, '" says: ')
      .replace(/^BBB Scam Tracker 上的公开投诉称，/u, "A public BBB Scam Tracker complaint says ")
      .replace(/^Reddit 公开贴文与评论中，/u, "In a public Reddit post and comments, ")
      .replace(/^公开评价称/u, "A public review says "),
    excerpt: row.excerpt,
    allegationTags: normalizedTags,
    amountText: row.amount_text,
    amountUsdEstimate: row.amount_usd_estimate,
    rating: row.rating,
    statusLabel: normalizedStatus,
  };
}

export async function getPublicCases(): Promise<PublicCase[]> {
  try {
    const result = await query<CaseRow>(
      `
        select
          slug,
          title,
          source_platform,
          source_url,
          source_title,
          source_author,
          to_char(published_at, 'YYYY-MM-DD') as published_at,
          summary,
          excerpt,
          allegation_tags,
          amount_text,
          amount_usd_estimate,
          rating,
          status_label
        from public_cases
        order by published_at desc, created_at desc
      `,
    );

    if (result.rows.length > 0) {
      return mergeCases([...result.rows.map(mapRow), ...publicCaseSeeds]);
    }
  } catch {
    return mergeCases(publicCaseSeeds);
  }

  return mergeCases(publicCaseSeeds);
}

export async function getPublicCaseBySlug(
  slug: string,
): Promise<PublicCase | null> {
  try {
    const result = await query<CaseRow>(
      `
        select
          slug,
          title,
          source_platform,
          source_url,
          source_title,
          source_author,
          to_char(published_at, 'YYYY-MM-DD') as published_at,
          summary,
          excerpt,
          allegation_tags,
          amount_text,
          amount_usd_estimate,
          rating,
          status_label
        from public_cases
        where slug = $1
        limit 1
      `,
      [slug],
    );

    if (result.rows[0]) {
      return mapRow(result.rows[0]);
    }
  } catch {
    return publicCaseSeeds.find((item) => item.slug === slug) ?? null;
  }

  return publicCaseSeeds.find((item) => item.slug === slug) ?? null;
}

export function pickCasesBySlug(cases: PublicCase[], slugs: string[]) {
  const bySlug = new Map(cases.map((item) => [item.slug, item]));

  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((item): item is PublicCase => Boolean(item));
}

function startOfDay(date: Date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function startOfWeek(date: Date) {
  const copy = startOfDay(date);
  const day = copy.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diff);
  return copy;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export async function getComplaintVelocity() {
  const cases = await getPublicCases();
  const now = new Date();
  const dayStart = startOfDay(now);
  const weekStart = startOfWeek(now);
  const monthStart = startOfMonth(now);

  const counts = cases.reduce(
    (acc, item) => {
      const published = new Date(`${item.publishedAt}T00:00:00`);

      if (published >= dayStart) {
        acc.today += 1;
      }

      if (published >= weekStart) {
        acc.thisWeek += 1;
      }

      if (published >= monthStart) {
        acc.thisMonth += 1;
      }

      return acc;
    },
    { today: 0, thisWeek: 0, thisMonth: 0 },
  );

  return counts;
}

export async function getComplaintOverviewStats() {
  const cases = await getPublicCases();

  const tagCounts = cases.reduce<Record<string, number>>((acc, item) => {
    item.allegationTags.forEach((tag) => {
      acc[tag] = (acc[tag] ?? 0) + 1;
    });

    return acc;
  }, {});

  const yearCounts = cases.reduce<Record<string, number>>((acc, item) => {
    const year = item.publishedAt.slice(0, 4);
    acc[year] = (acc[year] ?? 0) + 1;
    return acc;
  }, {});

  const mostRepeatedIssue =
    Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0] ?? null;

  const yearly = Object.entries(yearCounts)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([year, count]) => ({ year, count }));

  return {
    totalComplaints: cases.length,
    mostRepeatedIssue: mostRepeatedIssue
      ? { tag: mostRepeatedIssue[0], count: mostRepeatedIssue[1] }
      : null,
    yearly,
  };
}
