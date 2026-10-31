import { CONTACT_LINKS, PORTFOLIO_HEADER } from "@/data/portfolioCatalog";

const PROFILE_LINKS = [
  { label: "GitHub", href: CONTACT_LINKS.github },
  { label: "LinkedIn", href: CONTACT_LINKS.linkedin },
  { label: "LeetCode", href: CONTACT_LINKS.leetcode },
  { label: "CodeChef", href: CONTACT_LINKS.codechef },
] as const;

const INTERFACE_LINKS = [
  { label: "Interactive desktop OS", href: CONTACT_LINKS.desktopView },
  { label: "Plain-text version", href: CONTACT_LINKS.classicView },
  { label: "Resume PDF", href: CONTACT_LINKS.resumePdf },
] as const;

export function FooterSection() {
  return (
    <footer id="contact" className="bg-black">
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-20">
        <div data-reveal className="max-w-3xl">
          <h2 className="font-ds-sans text-ds-cta font-medium text-white">
            Let&apos;s talk.
          </h2>
          <p className="mt-4 max-w-xl text-ds-sm leading-relaxed text-zinc-400">
            Open to backend, cloud and full-stack engineering roles. Happy to
            walk through the architecture, the migrations, or the numbers above.
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
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-zinc-900 pt-12 text-ds-xs md:grid-cols-12">
          <div className="space-y-2 md:col-span-6">
            <div className="font-medium text-zinc-200">
              {PORTFOLIO_HEADER.name}
            </div>
            <div className="text-zro-muted">
              {PORTFOLIO_HEADER.role} · {PORTFOLIO_HEADER.company}
            </div>
            <a
              href={`mailto:${CONTACT_LINKS.email}`}
              className="inline-block text-zinc-400 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              {CONTACT_LINKS.email}
            </a>
          </div>

          <div className="space-y-2.5 md:col-span-3">
            <div className="pb-1 text-zro-muted">Profiles</div>
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
            <div className="pb-1 text-zro-muted">Other views</div>
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
          <span>{PORTFOLIO_HEADER.location}</span>
        </div>
      </div>
    </footer>
  );
}
