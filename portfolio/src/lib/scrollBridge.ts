import type Lenis from "lenis";

/**
 * Small bridge so UI components (navbar, back-to-top, anchor handling) can
 * scroll and lock the page without caring whether Lenis is running.
 * Lenis is only created on the datasheet route and never under
 * `prefers-reduced-motion`; in every other case these helpers fall back to
 * native scrolling.
 */

let instance: Lenis | null = null;

/** Sticky header height (h-16) used as the anchor landing offset. */
export const HEADER_OFFSET = 64;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function hasLenis() {
  return instance !== null;
}

export function scrollToTarget(
  target: HTMLElement | number,
  { immediate = false }: { immediate?: boolean } = {}
) {
  if (instance) {
    instance.scrollTo(target, {
      offset: typeof target === "number" ? 0 : -HEADER_OFFSET,
      duration: 1.3,
      immediate,
      // The mobile menu stops Lenis while open; an anchor tap must still scroll.
      force: true,
    });
    return;
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = reduced || immediate ? "auto" : "smooth";

  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior });
  } else {
    target.scrollIntoView({ behavior, block: "start" });
  }
}

/** Freezes page scroll (mobile menu). Safe to call repeatedly. */
export function lockScroll(locked: boolean) {
  const html = document.documentElement;
  html.style.overflow = locked ? "hidden" : "";
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  }
}
