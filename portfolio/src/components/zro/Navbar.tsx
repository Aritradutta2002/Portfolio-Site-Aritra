"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/Button";
import { CONTACT_LINKS, PORTFOLIO_HEADER } from "@/data/portfolioCatalog";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 8);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0
          );
        });

        let currentId: string | null = null;
        let highest = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > highest) {
            highest = ratio;
            currentId = id;
          }
        });

        setActive(currentId);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    const desktop = window.matchMedia("(min-width: 640px)");
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [menuOpen]);

  const current = (href: string) =>
    active === href.slice(1) ? "location" : undefined;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-zro-line bg-zro-canvas/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 md:px-8">
        <Link
          href="/"
          aria-label={`${PORTFOLIO_HEADER.name}, back to top`}
          className="group flex items-center gap-3"
        >
          <span className="zro-plate" aria-hidden="true">
            AD
          </span>
          <span className="hidden text-[0.8125rem] font-medium tracking-[-0.01em] text-zro-ink transition-opacity group-hover:opacity-70 sm:inline">
            {PORTFOLIO_HEADER.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 sm:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={current(link.href)}
              className="zro-nav-link"
            >
              {link.label}
            </a>
          ))}
          <Button
            href={CONTACT_LINKS.resumePdf}
            variant="outline"
            size="sm"
          >
            Resume
          </Button>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-9 w-9 items-center justify-center border border-zro-line text-zro-ink transition-colors hover:border-zro-line-strong sm:hidden"
        >
          <span className="sr-only">
            {menuOpen ? "Close menu" : "Open menu"}
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.25"
              />
            ) : (
              <path
                d="M1 4h12M1 10h12"
                stroke="currentColor"
                strokeWidth="1.25"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="zro-menu-panel border-t border-zro-line bg-zro-canvas/95 backdrop-blur-md sm:hidden"
        >
          <nav
            aria-label="Mobile"
            className="mx-auto flex max-w-6xl flex-col px-6 py-5"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={current(link.href)}
                className={`flex items-center justify-between border-b border-zro-line py-3.5 font-ds-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors ${
                  active === link.href.slice(1)
                    ? "text-zro-ink"
                    : "text-zro-muted hover:text-zro-ink"
                }`}
              >
                {link.label}
                <span aria-hidden="true" className="text-zro-faint">
                  ↓
                </span>
              </a>
            ))}
            <Button
              href={CONTACT_LINKS.resumePdf}
              variant="outline"
              className="mt-5 w-full"
            >
              Download resume
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
