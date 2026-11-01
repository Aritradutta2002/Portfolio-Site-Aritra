import type { CSSProperties } from "react";
import { Button } from "./ui/Button";
import { CopyEmail } from "./CopyEmail";
import { LocalClock } from "./LocalClock";
import { CONTACT_LINKS, PORTFOLIO_HEADER } from "@/data/portfolioCatalog";

const NAVIGATE_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
] as const;

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

const WORDMARK = PORTFOLIO_HEADER.name.toUpperCase();

const stagger = (index: number) => ({ "--zro-i": index } as CSSProperties);

export function FooterSection() {
  return (
    <footer id="contact" className="zro-footer relative overflow-hidden bg-zro-canvas">
      {/* Ambient light: gold pool above, grid fading upward from the base. */}
      <div className="zro-footer-ambient" aria-hidden="true" />
      <div
        data-reveal="rule"
        className="zro-footer-rule"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 md:px-8 md:pt-28">
        {/* ── Call to action + contact card ─────────────────────────── */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          <div data-reveal className="lg:col-span-7">
            <p className="zro-eyebrow zro-index">
              <span>05</span>
              <span
                aria-hidden="true"
                data-reveal="rule"
                className="zro-index-rule"
              />
              <span>Contact</span>
            </p>
            <h2 className="zro-cta mt-6 text-zro-ink">
              <span className="zro-mask" data-reveal="mask">
                <span>
                  Let&apos;s talk<span className="text-zro-accent">.</span>
                </span>
              </span>
            </h2>
            <p className="zro-lede mt-5 max-w-[46ch] text-zro-muted">
              Open to backend, cloud and full-stack engineering roles. Happy to
              walk through the architecture, the migrations, or the numbers
              above.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button
                href={`mailto:${CONTACT_LINKS.email}`}
                variant="solid"
                arrow
                magnetic
              >
                Email me
              </Button>
              <Button href={CONTACT_LINKS.resumePdf} variant="outline" magnetic>
                Download resume
              </Button>
            </div>
          </div>

          <aside
            data-reveal
            data-spot
            style={stagger(1)}
            aria-label="Contact details"
            className="zro-card zro-contact-card p-6 md:p-7 lg:col-span-5"
          >
            <div className="flex items-center justify-between gap-4 border-b border-zro-line pb-5">
              <span className="inline-flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="zro-pulse-dot h-1.5 w-1.5 rounded-full bg-zro-accent"
                />
                <span className="zro-eyebrow !text-zro-ink">
                  Available for work
                </span>
              </span>
              <LocalClock className="zro-eyebrow" />
            </div>

            <dl>
              <div className="zro-contact-row border-b border-zro-line py-4">
                <dt className="zro-eyebrow">Email</dt>
                <dd className="min-w-0">
                  <CopyEmail email={CONTACT_LINKS.email} />
                </dd>
              </div>
              <div className="zro-contact-row border-b border-zro-line py-4">
                <dt className="zro-eyebrow">Based in</dt>
                <dd className="text-[0.875rem] text-zro-ink">
                  {PORTFOLIO_HEADER.location}
                </dd>
              </div>
              <div className="zro-contact-row pt-4">
                <dt className="zro-eyebrow">Role</dt>
                <dd className="text-[0.875rem] text-zro-ink">
                  {PORTFOLIO_HEADER.role}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        {/* ── Link columns ─────────────────────────────────────────── */}
        <div
          data-stagger
          className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-zro-line pt-12 text-[0.875rem] md:mt-24 md:grid-cols-12"
        >
          <div
            data-reveal
            style={stagger(0)}
            className="col-span-2 space-y-2 md:col-span-5"
          >
            <div className="font-medium text-zro-ink">
              {PORTFOLIO_HEADER.name}
            </div>
            <div className="text-zro-muted">
              {PORTFOLIO_HEADER.role} · {PORTFOLIO_HEADER.company}
            </div>
            <p className="max-w-[34ch] pt-2 text-[0.8125rem] leading-relaxed text-zro-faint">
              Java 21 microservices, Azure PaaS migrations and AI-powered
              platforms, with measurable performance gains.
            </p>
          </div>

          <div data-reveal style={stagger(1)} className="space-y-3 md:col-span-2">
            <div className="zro-eyebrow pb-1">Navigate</div>
            <ul className="space-y-2 text-zro-muted">
              {NAVIGATE_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="zro-foot-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal style={stagger(2)} className="space-y-3 md:col-span-2">
            <div className="zro-eyebrow pb-1">Profiles</div>
            <ul className="space-y-2 text-zro-muted">
              {PROFILE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="zro-foot-link"
                  >
                    {link.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div
            data-reveal
            style={stagger(3)}
            className="col-span-2 space-y-3 md:col-span-3"
          >
            <div className="zro-eyebrow pb-1">Other views</div>
            <ul className="space-y-2 text-zro-muted">
              {INTERFACE_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="zro-foot-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Wordmark ─────────────────────────────────────────────── */}
        <div
          data-reveal
          data-spot
          aria-hidden="true"
          className="zro-wordmark mt-16 md:mt-20"
        >
          <span className="zro-wordmark-base">{WORDMARK}</span>
          <span className="zro-wordmark-lit">{WORDMARK}</span>
        </div>

        {/* ── Legal bar ────────────────────────────────────────────── */}
        <div className="relative flex flex-col gap-3 border-t border-zro-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="zro-metric text-[0.6875rem] uppercase tracking-[0.14em] text-zro-faint">
            © {new Date().getFullYear()} {PORTFOLIO_HEADER.name}
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="zro-metric text-[0.6875rem] uppercase tracking-[0.14em] text-zro-faint">
              {PORTFOLIO_HEADER.location}
            </span>
            <a
              href="#top"
              className="zro-foot-link zro-metric text-[0.6875rem] uppercase tracking-[0.14em] text-zro-muted"
            >
              Back to top
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
