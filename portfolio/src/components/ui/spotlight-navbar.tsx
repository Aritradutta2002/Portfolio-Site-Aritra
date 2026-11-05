'use client';

import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface NavItem {
  label: string;
  href: string;
}

export interface SpotlightNavbarProps {
  items: readonly NavItem[] | NavItem[];
  activeHref?: string | null;
  className?: string;
  onItemClick?: (item: NavItem, index: number, event: React.MouseEvent) => void;
}

/**
 * Spotlight Navbar from @vengeanceui refactored to portfolio tokens.
 * Features:
 * - Dynamic cursor spotlight tracking (--spotlight-x)
 * - Spring-smoothed active section ambience (--ambience-x)
 * - Accessible keyboard focus rings
 * - Framer-motion driven spring physics with reduced-motion fallback
 */
export function SpotlightNavbar({
  items,
  activeHref,
  className,
  onItemClick,
}: SpotlightNavbarProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const [hoverX, setHoverX] = useState<number | null>(null);

  const activeIndex = items.findIndex((item) => item.href === activeHref);

  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  // Mouse spotlight tracking
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setHoverX(x);
      spotlightX.current = x;
      nav.style.setProperty('--spotlight-x', `${x}px`);
    };

    const handleMouseLeave = () => {
      setHoverX(null);
      if (activeIndex >= 0) {
        const activeItem = nav.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
        if (activeItem) {
          const navRect = nav.getBoundingClientRect();
          const itemRect = activeItem.getBoundingClientRect();
          const targetX = itemRect.left - navRect.left + itemRect.width / 2;

          const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (reduced) {
            spotlightX.current = targetX;
            nav.style.setProperty('--spotlight-x', `${targetX}px`);
          } else {
            animate(spotlightX.current, targetX, {
              type: 'spring',
              stiffness: 240,
              damping: 24,
              onUpdate: (v) => {
                spotlightX.current = v;
                nav.style.setProperty('--spotlight-x', `${v}px`);
              },
            });
          }
        }
      }
    };

    nav.addEventListener('mousemove', handleMouseMove);
    nav.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      nav.removeEventListener('mousemove', handleMouseMove);
      nav.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [activeIndex]);

  // Ambience active position tracking
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || activeIndex < 0) return;

    const activeItem = nav.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    if (!activeItem) return;

    const navRect = nav.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const targetX = itemRect.left - navRect.left + itemRect.width / 2;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      ambienceX.current = targetX;
      nav.style.setProperty('--ambience-x', `${targetX}px`);
      return;
    }

    const controls = animate(ambienceX.current, targetX, {
      type: 'spring',
      stiffness: 260,
      damping: 26,
      onUpdate: (v) => {
        ambienceX.current = v;
        nav.style.setProperty('--ambience-x', `${v}px`);
      },
    });

    return () => controls.stop();
  }, [activeIndex]);

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className={cn(
        'relative h-10 rounded-full border border-black/[0.08] dark:border-white/[0.08]',
        'bg-black/[0.02] dark:bg-white/[0.03] backdrop-blur-md transition-all duration-300 overflow-hidden',
        className
      )}
    >
      {/* Navigation items list */}
      <ul className="relative flex items-center h-full px-1.5 gap-0.5 z-[10]">
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <li key={item.href} className="relative h-full flex items-center justify-center">
              <a
                href={item.href}
                data-index={idx}
                aria-current={isActive ? 'location' : undefined}
                onClick={(e) => onItemClick?.(item, idx, e)}
                className={cn(
                  'px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 rounded-full select-none',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400',
                  isActive
                    ? 'text-black dark:text-white font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>

      {/* 1. Moving spotlight (cursor follower) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
        style={{
          opacity: hoverX !== null ? 1 : 0,
          background: `
            radial-gradient(
              120px circle at var(--spotlight-x, 0px) 100%, 
              rgba(139, 92, 246, 0.18) 0%, 
              transparent 70%
            )
          `,
        }}
        aria-hidden="true"
      />

      {/* 2. Active Ambience bottom glow */}
      {activeIndex >= 0 && (
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px] z-[2]"
          style={{
            background: `
              radial-gradient(
                70px circle at var(--ambience-x, 0px) 0%, 
                rgba(139, 92, 246, 1) 0%, 
                rgba(34, 211, 238, 0.6) 50%,
                transparent 100%
              )
            `,
          }}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}

export default SpotlightNavbar;
