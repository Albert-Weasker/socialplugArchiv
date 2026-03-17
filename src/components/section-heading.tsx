type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 max-w-3xl space-y-3">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display-title text-4xl font-semibold leading-tight md:text-5xl">
        {title}
      </h2>
      <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
        {description}
      </p>
    </div>
  );
}
