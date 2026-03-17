import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/cases", label: "Case Library" },
  { href: "/socialplug-review", label: "Exposure Overview" },
  { href: "/refund-guide", label: "Refund Guide" },
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
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[var(--foreground)]"
              >
                {item.label}
              </Link>
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
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[1rem] border border-black/8 bg-white/55 px-3 py-2.5 text-center transition-colors hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
