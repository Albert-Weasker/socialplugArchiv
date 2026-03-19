import Image from "next/image";
import Link from "next/link";

function GitHubMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.74-1.33-1.74-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.21 1.83 1.21 1.06 1.8 2.78 1.28 3.46.98.11-.76.42-1.28.76-1.58-2.67-.3-5.48-1.31-5.48-5.86 0-1.3.47-2.36 1.22-3.2-.12-.3-.53-1.52.12-3.16 0 0 1-.31 3.3 1.22a11.7 11.7 0 0 1 6 0c2.29-1.53 3.28-1.22 3.28-1.22.66 1.64.25 2.86.13 3.16.76.84 1.22 1.9 1.22 3.2 0 4.56-2.82 5.56-5.5 5.85.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "/cases", label: "Case Library" },
  { href: "/socialplug-review", label: "Exposure Overview" },
  { href: "/refund-guide", label: "Refund Guide" },
  {
    href: "https://github.com/Albert-Weasker/socialplugscam",
    label: "Evidence Repo",
    external: true,
    github: true,
  },
  { href: "/submit-report", label: "Submit Evidence" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/8 bg-[rgba(248,242,232,0.82)] backdrop-blur-xl">
      <div className="container-shell py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="min-w-0 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-[rgba(31,60,54,0.95)] md:h-11 md:w-11">
              <Image
                src="/hammer-logo.png"
                alt="SocialPlug Evidence Archive logo"
                width={44}
                height={44}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="min-w-0">
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[var(--muted)] md:text-[0.72rem] md:tracking-[0.22em]">
                Evidence Archive
              </p>
              <p className="display-title truncate text-lg font-semibold md:text-xl">
                SocialPlug Evidence Archive
              </p>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] lg:flex">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-[var(--foreground)]"
                >
                  {item.github ? <GitHubMark /> : null}
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-[var(--foreground)]"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>
          <Link
            href="/submit-report"
            className="accent-button shrink-0 !px-4 !py-2.5 !text-xs md:!py-3 md:!text-sm"
          >
            <span className="hidden sm:inline">Submit a Report</span>
            <span className="sm:hidden">Report</span>
          </Link>
        </div>
        <nav className="mt-3 grid grid-cols-2 gap-2 text-sm text-[var(--muted)] lg:hidden">
          {navItems.map((item) => (
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[1rem] border border-black/8 bg-white/55 px-3 py-2.5 text-center transition-colors hover:text-[var(--foreground)]"
              >
                {item.github ? <GitHubMark /> : null}
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[1rem] border border-black/8 bg-white/55 px-3 py-2.5 text-center transition-colors hover:text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>
      </div>
    </header>
  );
}
