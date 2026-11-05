'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SpotlightNavbar } from '@/components/ui/spotlight-navbar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from './ui/Button';
import { CONTACT_LINKS, PORTFOLIO_HEADER } from '@/data/portfolioCatalog';
import { lockScroll, scrollToTarget } from '@/lib/scrollBridge';

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
] as const;

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Scroll detection for frosted glass intensity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (section): section is HTMLElement => section !== null
    );

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.2, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Mobile menu scroll lock, focus trap, and Escape key handling
  useEffect(() => {
    if (!menuOpen) return;

    lockScroll(true);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || !sheetRef.current) return;

      const focusable = Array.from(
        sheetRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, input, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null && !el.hasAttribute('disabled'));

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

    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleResize = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    mediaQuery.addEventListener('change', handleResize);

    // Initial focus on first link inside sheet
    const timer = setTimeout(() => {
      sheetRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
      lockScroll(false);
      window.removeEventListener('keydown', onKeyDown);
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, [menuOpen]);

  // Handle in-page smooth navigation via Lenis bridge
  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e?.preventDefault();
      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        scrollToTarget(target);
        history.pushState(null, '', href);
      }
    }
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 h-14 border-b transition-colors duration-200 ${
        scrolled || menuOpen
          ? 'border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-[#050508]/80 backdrop-blur-md shadow-sm'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1240px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Identity */}
        <Link
          href="/"
          onClick={(e) => handleNavClick('#top', e)}
          aria-label={`${PORTFOLIO_HEADER.name}, back to top`}
          className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-md p-1 -ml-1 select-none"
        >
          <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-black/10 dark:ring-white/15">
            <Image
              src="/aritra-avatar.webp"
              alt=""
              width={32}
              height={32}
              priority
              className="h-full w-full object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-black"
            />
          </span>
          <span className="flex flex-col">
            <span className="truncate text-[13.5px] font-semibold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              {PORTFOLIO_HEADER.name}
            </span>
            <span className="hidden truncate text-[10px] uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400 sm:block">
              {PORTFOLIO_HEADER.role}
            </span>
          </span>
        </Link>

        {/* Center: Desktop Spotlight Navbar (>= 1024px) */}
        <div className="hidden lg:flex items-center justify-center">
          <SpotlightNavbar
            items={NAV_LINKS}
            activeHref={activeSection}
            onItemClick={(item, _, e) => handleNavClick(item.href, e)}
          />
        </div>

        {/* Right: Actions (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/desktop"
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-full border border-black/[0.08] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
            Desktop OS
          </Link>
          <Button
            href={CONTACT_LINKS.resumePdf}
            variant="outline"
            size="sm"
            arrow
            external
            className="h-8 text-[12px] px-3 font-medium"
          >
            Résumé
          </Button>
          <ThemeToggle
            className="relative h-8 w-8 flex items-center justify-center rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            iconSize={15}
          />
        </div>

        {/* Right: Mobile / Tablet Controls (< 1024px) */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <ThemeToggle
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.08] dark:border-white/[0.08] text-neutral-800 dark:text-neutral-200"
            iconSize={17}
          />
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation-sheet"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-neutral-100 hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path
                  d="M3 3l12 12M15 3L3 15"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M2.5 5h13M2.5 9h13M2.5 13h13"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Full-screen Mobile Navigation Sheet (< 1024px) */}
      {menuOpen && (
        <div
          id="mobile-navigation-sheet"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          data-lenis-prevent
          className="fixed inset-x-0 top-14 h-[calc(100dvh-3.5rem)] overflow-y-auto bg-white dark:bg-[#050508] border-t border-black/[0.08] dark:border-white/[0.08] z-50 lg:hidden flex flex-col justify-between p-6"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.href, e)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`flex min-h-[48px] items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-violet-500/10 text-violet-600 dark:text-violet-400 font-semibold'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-neutral-400 text-xs font-mono" aria-hidden="true">
                    ↓
                  </span>
                </a>
              );
            })}

            <div className="h-px bg-black/[0.08] dark:bg-white/[0.08] my-3" aria-hidden="true" />

            <Link
              href="/desktop"
              onClick={() => setMenuOpen(false)}
              className="flex min-h-[48px] items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-neutral-700 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400" aria-hidden="true" />
                Desktop OS View
              </span>
              <span className="text-neutral-400 text-xs font-mono" aria-hidden="true">
                ↗
              </span>
            </Link>
          </nav>

          {/* Bottom Actions inside Sheet */}
          <div className="pt-6 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-col gap-3">
            <Button
              href={CONTACT_LINKS.resumePdf}
              variant="solid"
              external
              className="w-full min-h-[48px] justify-center text-sm font-semibold"
            >
              Download Résumé (PDF)
            </Button>
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 font-mono px-1">
              <span>{PORTFOLIO_HEADER.availability}</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
