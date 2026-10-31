import { CONTACT_LINKS, PORTFOLIO_HEADER } from "@/data/portfolioCatalog";

const PROFILE_LINKS = [
  { label: "GitHub", href: CONTACT_LINKS.github },
  { label: "LinkedIn", href: CONTACT_LINKS.linkedin },
  { label: "LeetCode (1672)", href: CONTACT_LINKS.leetcode },
  { label: "CodeChef (1708 · 3★)", href: CONTACT_LINKS.codechef },
] as const;

const INTERFACE_LINKS = [
  { label: "Interactive Desktop OS", href: CONTACT_LINKS.desktopView },
  { label: "Plain-text version", href: CONTACT_LINKS.classicView },
  { label: "Resume PDF", href: CONTACT_LINKS.resumePdf },
] as const;

export function FooterSection() {
  return (
    <footer id="contact" className="bg-black">
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-20">
        <div data-reveal className="max-w-3xl">
          <div className="text-ds-2xs uppercase tracking-[0.18em] text-zro-muted">
            05 / Contact
          </div>
          <h2 className="mt-3 font-ds-sans text-ds-cta font-medium text-white">
            Let&apos;s build something that ships.
          </h2>
          <p className="mt-4 max-w-xl text-ds-md leading-relaxed text-zinc-400 md:text-ds-lg">
            Open to backend, cloud, and full-stack engineering roles. Based in
            Bhubaneswar, India — happy to talk architecture, Java, or the next
            system you need to modernise.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href={`mailto:${CONTACT_LINKS.email}`}
              className="border border-white bg-white px-6 py-3.5 text-ds-sm font-medium text-black transition-colors hover:bg-zinc-200"
            >
              Email me →
            </a>
            <a
              href={CONTACT_LINKS.resumePdf}
              className="border border-zinc-700 bg-[#08080a] px-6 py-3.5 text-ds-sm text-white transition-colors hover:border-white"
            >
              Download resume
            </a>
            <a
              href={`mailto:${CONTACT_LINKS.email}`}
              className="text-ds-sm text-zinc-300 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              {CONTACT_LINKS.email}
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-zinc-900 pt-12 text-ds-xs md:grid-cols-12">
          <div className="space-y-3 md:col-span-6">
            <div className="flex h-8 w-8 items-center justify-center border border-zinc-700 bg-[#0a0a0c] font-ds-mono font-bold text-white">
              AD
            </div>
            <div className="font-medium text-zinc-300">
              {PORTFOLIO_HEADER.name} — {PORTFOLIO_HEADER.role}
            </div>
            <div className="text-zro-muted">
              {PORTFOLIO_HEADER.company} · {PORTFOLIO_HEADER.location}
            </div>
          </div>

          <div className="space-y-2.5 md:col-span-3">
            <div className="pb-1 uppercase tracking-[0.16em] text-zro-muted">
              Profiles
            </div>
            <ul className="space-y-2 text-zinc-400">
              {PROFILE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5 md:col-span-3">
            <div className="pb-1 uppercase tracking-[0.16em] text-zro-muted">
              Other views
            </div>
            <ul className="space-y-2 text-zinc-400">
              {INTERFACE_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-zinc-900 pt-6 text-ds-2xs uppercase tracking-[0.14em] text-zro-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {PORTFOLIO_HEADER.name}
          </span>
          <span>Bhubaneswar, India</span>
        </div>
      </div>
    </footer>
  );
}