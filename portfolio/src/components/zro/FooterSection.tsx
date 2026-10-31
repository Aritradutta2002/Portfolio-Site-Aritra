import { Button } from "./ui/Button";
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
    <footer id="contact" className="bg-zro-canvas">
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-20 md:px-8 md:pt-24">
        <div data-reveal className="max-w-3xl">
          <p className="zro-eyebrow">05 — Contact</p>
          <h2 className="zro-cta mt-5 text-zro-ink">Let&apos;s talk.</h2>
          <p className="zro-lede mt-4 max-w-[46ch] text-zro-muted">
            Open to backend, cloud and full-stack engineering roles. Happy to
            walk through the architecture, the migrations, or the numbers above.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button
              href={`mailto:${CONTACT_LINKS.email}`}
              variant="solid"
              arrow
            >
              Email me
            </Button>
            <Button href={CONTACT_LINKS.resumePdf} variant="outline">
              Download resume
            </Button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-zro-line pt-12 text-[0.875rem] md:grid-cols-12">
          <div className="space-y-2 md:col-span-6">
            <div className="font-medium text-zro-ink">
              {PORTFOLIO_HEADER.name}
            </div>
            <div className="text-zro-muted">
              {PORTFOLIO_HEADER.role} · {PORTFOLIO_HEADER.company}
            </div>
            <a
              href={`mailto:${CONTACT_LINKS.email}`}
              className="zro-link inline-block text-[0.875rem]"
            >
              {CONTACT_LINKS.email}
            </a>
          </div>

          <div className="space-y-3 md:col-span-3">
            <div className="zro-eyebrow pb-1">Profiles</div>
            <ul className="space-y-2 text-zro-muted">
              {PROFILE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-zro-ink"
                  >
                    {link.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 md:col-span-3">
            <div className="zro-eyebrow pb-1">Other views</div>
            <ul className="space-y-2 text-zro-muted">
              {INTERFACE_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors duration-200 hover:text-zro-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-zro-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="zro-metric text-[0.6875rem] uppercase tracking-[0.14em] text-zro-faint">
            © {new Date().getFullYear()} {PORTFOLIO_HEADER.name}
          </span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="zro-metric text-[0.6875rem] uppercase tracking-[0.14em] text-zro-faint">
              {PORTFOLIO_HEADER.location}
            </span>
            <span className="inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.14em] text-zro-faint">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-zro-accent"
              />
              Available for work
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
