import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/section-heading";
import { getSeoLandingPage, seoLandingPages } from "@/lib/seo-pages";

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  return seoLandingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoLandingPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    keywords: [
      page.title,
      page.slug.replaceAll("-", " "),
      "SocialPlug",
      "SocialPlug complaints",
      "SocialPlug refund",
      "SocialPlug review",
    ],
    alternates: {
      canonical: `/${page.slug}`,
    },
  };
}

export default async function SeoLandingPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const page = getSeoLandingPage(slug);

  if (!page) {
    notFound();
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
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
          <p className="eyebrow">Buyer Intent Page</p>
          <h1 className="display-title mt-5 max-w-5xl text-5xl leading-[0.96] font-semibold md:text-6xl">
            {page.h1}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted)]">
            {page.intro}
          </p>
        </section>

        <div className="two-grid">
          <section className="glass-card rounded-[2rem] p-6 md:p-8">
            <SectionHeading
              eyebrow="What People See When Doubt Starts"
              title={page.bulletTitle}
              description={page.whyItMatters}
            />
            <div className="grid gap-3">
              {page.bullets.map((item) => (
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
              If You Landed Here Now
            </p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[#f2e8de]">
              <p>
                The page should not end at opinion. It should move you into evidence, complaints,
                and the next practical decision.
              </p>
              <p>
                If you found this before payment, go straight into the case library before you
                decide. That is where the fuller archived record lives. If you found this after a
                problem started, move to the refund action page and preserve your evidence immediately.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Link href="/socialplug-review" className="accent-button">
                Open the exposure overview
              </Link>
              <Link href="/cases" className="ghost-button">
                Open the case library
              </Link>
              <Link href="/refund-guide" className="ghost-button">
                Open the refund action page
              </Link>
            </div>
          </aside>
        </div>

        <section className="glass-card rounded-[2rem] p-6 md:p-8">
          <SectionHeading
            eyebrow="FAQ"
            title={`Quick answers for "${page.title}"`}
            description="These answers are designed to meet the exact doubt that brought the reader here, then route them deeper into the archive."
          />
          <div className="grid gap-4">
            {page.faq.map((item) => (
              <article
                key={item.question}
                className="rounded-[1.4rem] border border-black/8 bg-white/45 p-5"
              >
                <h2 className="text-lg font-semibold">{item.question}</h2>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
