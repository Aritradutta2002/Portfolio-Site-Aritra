import Link from "next/link";
import { CONTACT_LINKS } from "@/data/portfolioCatalog";

const NAV_LINKS = [
  { label: "Catalog", href: "#catalog" },
  { label: "Specs", href: "#skills" },
  { label: "Benchmarks", href: "#benchmarks" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-900 bg-black">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          aria-label="AD — Aritra Dutta, back to home"
          className="flex h-9 w-9 shrink-0 items-center justify-center border border-zinc-700 bg-[#0a0a0c] font-ds-mono text-ds-sm font-semibold tracking-tighter text-white transition-colors hover:border-white"
        >
          AD
        </Link>

        <nav
          aria-label="Primary"
          className="flex items-center gap-3 text-ds-xs uppercase tracking-[0.14em] text-zinc-400 sm:gap-7"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={CONTACT_LINKS.desktopView}
            className="hidden border border-zinc-800 bg-[#0a0a0c] px-2.5 py-1 text-ds-2xs text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white sm:inline-block"
          >
            OS Mode ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
