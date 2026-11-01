"use client";

import { useEffect } from "react";
import { scrollToTarget, setLenis, hasLenis } from "@/lib/scrollBridge";

/**
 * Opt-in inertial scrolling for the datasheet route.
 *
 * - Lenis is imported on demand so it stays out of the initial bundle.
 * - Skipped entirely for `prefers-reduced-motion`; native scroll is kept.
 * - In-page `#hash` links are routed through Lenis so they ease instead of
 *   snapping, and keyboard focus follows the scroll target.
 */
export function DatasheetScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let cancelled = false;
    let frame = 0;
    let destroy: (() => void) | null = null;

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !hasLenis()
      ) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!anchor) return;

      const hash = anchor.getAttribute("href") ?? "";
      if (hash === "#" || hash === "#top") {
        event.preventDefault();
        scrollToTarget(0);
        return;
      }

      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      scrollToTarget(target);
      history.pushState(null, "", hash);

      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.95,
      });

      setLenis(lenis);
      document.addEventListener("click", onClick);

      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);

      destroy = () => {
        document.removeEventListener("click", onClick);
        cancelAnimationFrame(frame);
        setLenis(null);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);

  return null;
}
