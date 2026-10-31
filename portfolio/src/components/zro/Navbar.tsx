import Link from "next/link";
import { CONTACT_LINKS, PORTFOLIO_HEADER } from "@/data/portfolioCatalog";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-900 bg-black">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          aria-label={`${PORTFOLIO_HEADER.name}, back to top`}
          className="flex items-center gap-3 text-ds-xs uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-70"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center border border-zinc-700 bg-[#0a0a0c] text-ds-2xs font-semibold tracking-normal"
          >
            AD
          </span>
          <span className="hidden sm:inline">{PORTFOLIO_HEADER.name}</span>
        </Link>

        <nav
          aria-label="Primary"
          className="flex min-w-0 items-center gap-3 text-ds-2xs uppercase tracking-[0.14em] text-zinc-400 sm:gap-6"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden transition-colors hover:text-white min-[400px]:inline"
            >
              {link.label}
            </a>
          ))}
          <a
            href={CONTACT_LINKS.resumePdf}
            className="shrink-0 border border-zinc-800 bg-[#0a0a0c] px-2.5 py-1 text-ds-2xs text-zinc-200 transition-colors hover:border-zinc-400 hover:text-white"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
