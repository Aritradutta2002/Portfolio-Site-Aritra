"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/Button";
import { CONTACT_LINKS, PORTFOLIO_HEADER } from "@/data/portfolioCatalog";
import { lockScroll } from "@/lib/scrollBridge";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

/** Scroll distance before the header may tuck away, and the dead-zone. */
const HIDE_AFTER = 320;
const SCROLL_DEADZONE = 6;

interface Indicator {
  x: number;
  y: number;
  width: number;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicator, setIndicator] = useState<Indicator | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuOpenRef = useRef(false);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  /* Scrolled state + hide on scroll down / reveal on scroll up. */
  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 8);

      if (menuOpenRef.current || y <= HIDE_AFTER / 4) {
        setHidden(false);
        lastY = y;
        return;
      }

      const delta = y - lastY;
      if (Math.abs(delta) < SCROLL_DEADZONE) return;
      lastY = y;

      const keyboardInside = headerRef.current?.querySelector(":focus-visible");
      if (delta > 0 && y > HIDE_AFTER && !keyboardInside) setHidden(true);
      else if (delta < 0) setHidden(false);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  /* Active section tracking. */
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

  /* Sliding indicator under the active desktop link. */
  const placeIndicator = useCallback(() => {
    const nav = navRef.current;
    const link = active
      ? nav?.querySelector<HTMLElement>(`a[href="#${active}"]`)
      : null;

    if (!nav || !link || link.offsetWidth === 0) {
      setIndicator(null);
      return;
    }

    setIndicator({
      x: link.offsetLeft,
      y: link.offsetTop + link.offsetHeight - 1,
      width: link.offsetWidth,
    });
  }, [active]);

  useLayoutEffect(() => {
    placeIndicator();
  }, [placeIndicator]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const observer = new ResizeObserver(placeIndicator);
    observer.observe(nav);
    document.fonts?.ready.then(placeIndicator).catch(() => undefined);
    return () => observer.disconnect();
  }, [placeIndicator]);

  /* Mobile menu: scroll lock, focus management, Escape, focus trap. */
  useEffect(() => {
    if (!menuOpen) return;

    lockScroll(true);
    const header = headerRef.current;
    header?.querySelector<HTMLElement>("#mobile-nav a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !header) return;

      const focusable = Array.from(
        header.querySelectorAll<HTMLElement>(
          "#mobile-nav a[href], #mobile-nav button, button[aria-controls='mobile-nav']"
        )
      ).filter((el) => el.offsetParent !== null);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 640px)");
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);

    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [menuOpen]);

  const current = (href: string) =>
    active === href.slice(1) ? "location" : undefined;

  return (
    <header
      ref={headerRef}
      data-hidden={hidden && !menuOpen}
      className={`zro-header sticky top-0 z-40 border-b ${
        scrolled || menuOpen
          ? "border-zro-line bg-zro-canvas/80 shadow-[0_24px_48px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 md:px-8">
        <Link
          href="/"
          aria-label={`${PORTFOLIO_HEADER.name}, back to top`}
          className="zro-logo group flex min-w-0 items-center gap-3"
        >
          <span className="zro-avatar">
            <Image
              src="/aritra-avatar.webp"
              alt=""
              width={96}
              height={96}
              priority
              className="zro-avatar-img"
            />
            <span aria-hidden="true" className="zro-avatar-dot" />
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate text-[0.8125rem] font-medium tracking-[-0.01em] text-zro-ink transition-opacity group-hover:opacity-80">
              {PORTFOLIO_HEADER.name}
            </span>
            <span className="zro-metric mt-1 hidden truncate text-[0.5625rem] uppercase tracking-[0.14em] text-zro-faint md:block">
              {PORTFOLIO_HEADER.role}
            </span>
          </span>
        </Link>

        <nav
          ref={navRef}
          aria-label="Primary"
          className="relative hidden items-center gap-6 sm:flex"
        >
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
          <span
            aria-hidden="true"
            className="h-4 w-px shrink-0 bg-zro-line"
          />
          <Button
            href={CONTACT_LINKS.resumePdf}
            variant="outline"
            size="sm"
            arrow
            external
          >
            Résumé
          </Button>
          <span
            aria-hidden="true"
            className="zro-nav-indicator"
            data-ready={indicator !== null}
            style={
              indicator
                ? ({
                    "--ix": `${indicator.x}px`,
                    "--iy": `${indicator.y}px`,
                    width: indicator.width,
                  } as CSSProperties)
                : undefined
            }
          />
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
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={current(link.href)}
                style={{ "--i": index } as CSSProperties}
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
            <div
              className="mt-5 flex"
              style={{ "--i": NAV_LINKS.length } as CSSProperties}
            >
              <Button
                href={CONTACT_LINKS.resumePdf}
                variant="outline"
                className="w-full"
                arrow
                external
              >
                Download résumé
              </Button>
            </div>

            <div
              className="mt-5 flex items-start gap-2.5 border-t border-zro-line pt-4"
              style={{ "--i": NAV_LINKS.length + 1 } as CSSProperties}
            >
              <span
                aria-hidden="true"
                className="zro-pulse-dot mt-[0.3rem] h-1.5 w-1.5 shrink-0 bg-zro-accent"
              />
              <span className="zro-metric text-[0.625rem] uppercase leading-[1.6] tracking-[0.08em] text-zro-faint">
                {PORTFOLIO_HEADER.availability}
              </span>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
