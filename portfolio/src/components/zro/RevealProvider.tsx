"use client";

import { useEffect } from "react";

/**
 * Reveals elements marked with `data-reveal` as they enter the viewport.
 * Re-observes new nodes so filtered catalog cards animate in as well.
 * Content is visible by default when JavaScript is unavailable.
 */
export function RevealProvider() {
  useEffect(() => {
    const revealAll = () =>
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.classList.add("is-visible"));

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) revealAll();
    };

    motion.addEventListener("change", onMotionChange);

    if (motion.matches) {
      revealAll();
      return () => motion.removeEventListener("change", onMotionChange);
    }

    const observed = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );

    const observeNew = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)")
        .forEach((el) => {
          if (observed.has(el)) return;
          observed.add(el);
          observer.observe(el);
        });
    };

    observeNew();

    const mutations = new MutationObserver(observeNew);
    mutations.observe(document.body, { childList: true, subtree: true });

    /* The observer's bottom margin means an element resting in the last few
       percent of the viewport can never cross the threshold once the page can
       scroll no further. At the end of the page, reveal whatever is on screen. */
    let endFrame = 0;
    const flushAtEnd = () => {
      endFrame = 0;
      const atEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (!atEnd) return;
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)")
        .forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add("is-visible");
            observer.unobserve(el);
          }
        });
    };
    const onScrollEnd = () => {
      if (!endFrame) endFrame = requestAnimationFrame(flushAtEnd);
    };
    window.addEventListener("scroll", onScrollEnd, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScrollEnd);
      cancelAnimationFrame(endFrame);
      observer.disconnect();
      mutations.disconnect();
      motion.removeEventListener("change", onMotionChange);
      // Never leave content hidden if this island unmounts mid-viewport.
      revealAll();
    };
  }, []);

  return null;
}
