export type SeoLandingPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  whyItMatters: string;
  bulletTitle: string;
  bullets: string[];
  faq: Array<{ question: string; answer: string }>;
};

export const seoLandingPages: SeoLandingPage[] = [
  {
    slug: "socialplug-scam",
    title: "SocialPlug Scam",
    description:
      "A SocialPlug scam landing page covering repeated public complaint patterns, unverified trust claims, and archived victim evidence.",
    h1: "SocialPlug: when buyers start suspecting something is wrong, these are the signals they keep finding",
    intro:
      "People usually search this phrase at one of two moments: in the last few minutes before paying, or after delivery, refund, or trust problems have already started. This page exists to make those repeated warning signals visible in one place.",
    whyItMatters:
      "This page is not here to explain a keyword. It is here to show whether the same risk signals keep appearing across public complaints, refund stories, and archived evidence.",
    bulletTitle: "The signals people keep running into",
    bullets: [
      "Payment is taken first, then delivery is described as delayed, partial, or missing.",
      "Some users describe results that appear briefly and then collapse.",
      "Refund requests are publicly described as delayed, denied, or left unresolved.",
      "Large marketing counters are displayed without independent public verification.",
    ],
    faq: [
      {
        question: "Why do people search SocialPlug scam?",
        answer:
          "Usually because they are trying to decide whether the risk signals they are seeing are isolated problems or part of a repeated pattern.",
      },
      {
        question: "Does this page claim a legal conclusion?",
        answer:
          "No. It summarizes public complaints, archived evidence, and visible risk signals. Final legal conclusions belong to regulators, payment providers, or courts.",
      },
    ],
  },
  {
    slug: "socialplug-not-delivered",
    title: "SocialPlug Not Delivered",
    description:
      "A page built for SocialPlug not delivered searches, focused on public reports of missing orders, underdelivery, and evidence preservation.",
    h1: "SocialPlug not delivered: what buyers keep reporting after payment",
    intro:
      "This keyword appears when buyers feel they paid for a result that never actually arrived, arrived late, or arrived far below what was sold.",
    whyItMatters:
      "Non-delivery is one of the clearest complaint categories because it directly links payment, promise language, and missing outcome.",
    bulletTitle: "What this usually looks like in practice",
    bullets: [
      "Zero delivery after payment despite short turnaround promises.",
      "Partial delivery that still gets marked as completed.",
      "Support asking users to wait while the order remains unresolved.",
      "Public complaints showing the same sequence across multiple dates.",
    ],
    faq: [
      {
        question: "What counts as not delivered?",
        answer:
          "No result at all, only part of the promised result, or a claimed completion that never shows up in any meaningful way.",
      },
      {
        question: "Why should buyers save screenshots immediately?",
        answer:
          "Because the seller’s promise language and the missing outcome are the core of any later complaint, refund request, or payment dispute.",
      },
    ],
  },
  {
    slug: "socialplug-complaints",
    title: "SocialPlug Complaints",
    description:
      "A SocialPlug complaints page compressing public complaint patterns, issue types, and source links into one readable overview.",
    h1: "SocialPlug complaints: when the same problems start repeating, they stop looking random",
    intro:
      "Most people do not search for complaints by accident. They usually arrive here because an order was not delivered as promised, the numbers dropped away, a refund stalled, or support stopped being useful. This page exists to collect those repeated problem types in one place.",
    whyItMatters:
      "The real question is not whether somebody complained once. The real question is whether the same problems keep surfacing across independent sources, different users, and different dates.",
    bulletTitle: "The complaint types that keep coming back",
    bullets: [
      "Orders described as not delivered or only partly completed.",
      "Followers, likes, or views that appear briefly and then fade away.",
      "Refund requests described as delayed, refused, or dragged out.",
      "Support communication that turns repetitive, templated, or silent.",
    ],
    faq: [
      {
        question: "Why should buyers look at complaints before paying?",
        answer:
          "Because complaints are where repeated risk patterns become visible. A polished sales page shows promises. A complaint archive shows what buyers say happened after payment.",
      },
      {
        question: "What should a buyer do after landing here?",
        answer:
          "Before paying, open the case library and read the archived cases in detail. If you already paid and something is going wrong, preserve your evidence and move to the refund action page immediately.",
      },
    ],
  },
];

export function getSeoLandingPage(slug: string) {
  return seoLandingPages.find((page) => page.slug === slug) ?? null;
}
