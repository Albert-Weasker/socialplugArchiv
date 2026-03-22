import Link from "next/link";
import { getTagMeta, type PublicCase } from "@/lib/cases";
import { SectionHeading } from "@/components/section-heading";

type CaseSpotlightGridProps = {
  eyebrow: string;
  title: string;
  description: string;
  cases: PublicCase[];
};

export function CaseSpotlightGrid({
  eyebrow,
  title,
  description,
  cases,
}: CaseSpotlightGridProps) {
  if (!cases.length) {
    return null;
  }

  return (
    <section className="glass-card rounded-[2rem] p-6 md:p-8">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cases.map((item) => (
          <article
            key={item.slug}
            className="rounded-[1.6rem] border border-black/8 bg-white/50 p-5"
          >
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
              <span>{item.sourcePlatform}</span>
              <span>{item.publishedAt}</span>
              <span>{item.statusLabel}</span>
            </div>
            <h2 className="mt-3 text-2xl font-semibold leading-snug">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              {item.summary}
            </p>
            <div className="mt-4 rounded-[1.2rem] border border-black/8 bg-white/65 px-4 py-3 text-sm leading-7 text-[var(--foreground)]">
              <strong>Public source name:</strong> {item.sourceAuthor}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.allegationTags.map((tag) => (
                <span
                  key={`${item.slug}-${tag}`}
                  className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs"
                >
                  {getTagMeta(tag).emoji} {getTagMeta(tag).label}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <Link href={`/cases/${item.slug}`} className="accent-button">
                Open archived case
              </Link>
              {item.sourceUrl ? (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ghost-button"
                >
                  Open original source
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
