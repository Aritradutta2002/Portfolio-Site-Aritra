'use client'

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/Button";
import { CONTACT_LINKS, PORTFOLIO_HEADER } from "@/data/portfolioCatalog";

const PROFILE_LINKS = [
  { label: "GitHub", href: CONTACT_LINKS.github },
  { label: "LinkedIn", href: CONTACT_LINKS.linkedin },
  { label: "LeetCode", href: CONTACT_LINKS.leetcode },
  { label: "CodeChef", href: CONTACT_LINKS.codechef },
] as const;

const INTERFACE_LINKS = [
  { label: "Interactive desktop OS", href: CONTACT_LINKS.desktopView, internal: true },
  { label: "Plain-text version", href: CONTACT_LINKS.classicView, internal: true },
  { label: "Resume PDF", href: CONTACT_LINKS.resumePdf, internal: false },
] as const;

const SECTION_NAV = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#achievements" },
] as const;

export function FooterSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_LINKS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative border-t border-zro-line bg-transparent overflow-hidden">
      {/* Ambient footer glow pool blending with Layer 1 emerald/gold backdrop */}
      <div
        className="pointer-events-none absolute -bottom-24 left-[-100px] h-[340px] w-[340px] rounded-full"
        style={{
          background: "radial-gradient(closest-side, rgba(52, 211, 153, 0.08), transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 right-[-80px] h-[320px] w-[320px] rounded-full"
        style={{
          background: "radial-gradient(closest-side, rgba(211, 171, 99, 0.07), transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-14 pt-20 md:px-8 md:pt-24">
        {/* Main Contact CTA - Always fully visible (no stuck data-reveal opacity) */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-zro-accent motion-safe:animate-pulse"
            />
            <p className="zro-eyebrow">05 — Contact</p>
          </div>

          <h2 className="zro-cta mt-5 text-zro-ink">Let&apos;s talk.</h2>
          <p className="zro-lede mt-4 max-w-[48ch] text-zro-muted">
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
            <Button
              href={CONTACT_LINKS.resumePdf}
              variant="outline"
              external
            >
              Download resume
            </Button>
            <button
              onClick={handleCopyEmail}
              type="button"
              className="zro-btn zro-btn--quiet text-[0.8125rem]"
              aria-label="Copy email address"
            >
              {copied ? "✓ Email copied" : "Copy email"}
            </button>
          </div>
        </div>

        {/* 4-Column Grid: Identity, Navigation, Profiles, Alternate Views */}
        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-zro-line pt-12 text-[0.875rem] sm:grid-cols-2 md:grid-cols-12">
          {/* Identity & Direct Email */}
          <div className="space-y-2 md:col-span-4">
            <div className="font-medium text-zro-ink tracking-tight">
              {PORTFOLIO_HEADER.name}
            </div>
            <div className="text-zro-muted text-[0.8125rem] leading-relaxed">
              {PORTFOLIO_HEADER.role} at {PORTFOLIO_HEADER.company}
            </div>
            <a
              href={`mailto:${CONTACT_LINKS.email}`}
              className="zro-link inline-block text-[0.8125rem] pt-1"
            >
              {CONTACT_LINKS.email}
            </a>
          </div>

          {/* Quick Section Navigation */}
          <div className="space-y-3 md:col-span-2">
            <div className="zro-eyebrow pb-1">Jump to</div>
            <ul className="space-y-2.5 text-[0.8125rem] text-zro-muted">
              {SECTION_NAV.map((link) => (
                <li key={link.label}>
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

          {/* External Profiles */}
          <div className="space-y-3 md:col-span-3">
            <div className="zro-eyebrow pb-1">Profiles</div>
            <ul className="space-y-2.5 text-[0.8125rem] text-zro-muted">
              {PROFILE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-zro-ink"
                  >
                    {link.label}
                    <span aria-hidden="true" className="text-[0.75rem] opacity-70">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Alternate Views / Artifacts */}
          <div className="space-y-3 md:col-span-3">
            <div className="zro-eyebrow pb-1">Other views</div>
            <ul className="space-y-2.5 text-[0.8125rem] text-zro-muted">
              {INTERFACE_LINKS.map((link) => (
                <li key={link.label}>
                  {link.internal ? (
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-zro-ink"
                    >
                      {link.label}
                      <span aria-hidden="true" className="text-[0.75rem] opacity-70">→</span>
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-zro-ink"
                    >
                      {link.label}
                      <span aria-hidden="true" className="text-[0.75rem] opacity-70">↗</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Location, Availability, and Back to Top */}
        <div className="mt-14 flex flex-col gap-4 border-t border-zro-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="zro-metric text-[0.6875rem] uppercase tracking-[0.14em] text-zro-faint">
              © {new Date().getFullYear()} {PORTFOLIO_HEADER.name}
            </span>
            <span className="zro-metric text-[0.6875rem] uppercase tracking-[0.14em] text-zro-faint">
              {PORTFOLIO_HEADER.location}
            </span>
          </div>

          <div className="flex items-center justify-between gap-6 sm:justify-end">
            <span className="inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.14em] text-zro-faint">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-zro-accent motion-safe:animate-pulse"
              />
              Available for work
            </span>

            <button
              onClick={scrollToTop}
              type="button"
              className="inline-flex items-center gap-1 text-[0.6875rem] uppercase tracking-[0.14em] text-zro-muted transition-colors duration-200 hover:text-zro-ink cursor-pointer"
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
