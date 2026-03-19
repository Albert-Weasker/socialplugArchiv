import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPublicCaseBySlug,
  getTagMeta,
  publicCaseSeeds,
} from "@/lib/cases";

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  return publicCaseSeeds.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublicCaseBySlug(slug);

  if (!item) {
    return {};
  }

  return {
    title: `${item.title} | SocialPlug Public Case`,
    description: item.summary,
  };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const item = await getPublicCaseBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="section-pad">
      <div className="container-shell">
        <article className="glass-card rounded-[2.2rem] p-7 md:p-10">
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
            <span>{item.sourcePlatform}</span>
            <span>{item.publishedAt}</span>
            <span>{item.statusLabel}</span>
          </div>
          <h1 className="display-title mt-5 max-w-4xl text-5xl font-semibold leading-[0.96] md:text-6xl">
            {item.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted)]">
            {item.summary}
          </p>
          <div className="mt-6 rounded-[1.4rem] border border-black/8 bg-white/55 px-5 py-4 text-sm leading-7">
            <p>
              <strong>Public victim / username:</strong>
              {item.sourceAuthor}
            </p>
            <p>
              <strong>Public date:</strong>
              {item.publishedAt}
            </p>
          </div>

          <div className="mt-8 two-grid">
            <section className="rounded-[1.8rem] border border-black/8 bg-white/50 p-6">
              <p className="eyebrow">Case Snapshot</p>
              <div className="mt-5 grid gap-3 text-sm leading-7">
                <p>
                  <strong>Source platform:</strong>
                  {item.sourcePlatform}
                </p>
                <p>
                  <strong>Source author:</strong>
                  {item.sourceAuthor}
                </p>
                <p>
                  <strong>Source title:</strong>
                  {item.sourceTitle}
                </p>
                <p>
                  <strong>Date:</strong>
                  {item.publishedAt}
                </p>
                {item.amountText ? (
                  <p>
                    <strong>Public amount mentioned:</strong>
                    {item.amountText}
                  </p>
                ) : null}
                {item.rating ? (
                  <p>
                    <strong>Rating:</strong>
                    {item.rating} / 5
                  </p>
                ) : null}
              </div>
            </section>

            <section className="ink-card rounded-[1.8rem] p-6">
              <p className="eyebrow !text-[#d8c7ba] before:!bg-[#9d8778]">
                Archived Excerpt
              </p>
              <p className="mt-5 text-sm leading-7 text-[#f2e8de]">
                {item.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {item.allegationTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#f2e8de]"
                  >
                    {getTagMeta(tag).emoji} {getTagMeta(tag).label}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-8 rounded-[1.8rem] border border-black/8 bg-white/45 p-6">
            <p className="eyebrow">Source Handling</p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)]">
              This page shows a summary organized from public sources. It is not a final
              finding by a court, regulator, or payment provider. If you had the same
              experience, submit your own evidence to strengthen the timeline.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {item.sourceUrl ? (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="accent-button"
                >
                  View original source
                </a>
              ) : (
                <div className="rounded-full border border-black/10 bg-white/60 px-4 py-3 text-sm text-[var(--muted)]">
                  This case was submitted directly to the archive and has no public outbound source
                  link.
                </div>
              )}
              <Link href="/submit-report" className="ghost-button">
                Submit my evidence
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
