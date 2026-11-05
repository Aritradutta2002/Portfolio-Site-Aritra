"use client";

import { useEffect } from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/**
 * One shared, framework-free motion driver for the datasheet.
 *
 * It only writes CSS custom properties, so effects run on the compositor
 * without any React re-render:
 *
 *   --scroll-p   (0 → 1)  whole-page progress, on .zro-root
 *   --sv         (-1 → 1) viewport position of a `[data-scroll]` element
 *                         (0 = centred), for parallax
 *   --sd         (0 → 1)  draw progress of a `[data-scroll]` element
 *                         (timeline rails)
 *   --mx / --my  (px)     pointer position inside a `[data-spot]` element
 *   --tx / --ty  (px)     magnetic offset on a `[data-magnetic]` element
 *
 * Reduced motion keeps the progress readout but disables parallax, spotlight
 * tracking and magnetic offsets; draw progress is set to its final state.
 */
export function MotionController() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".zro-root");
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    /* ── Scroll ─────────────────────────────────────────────────────── */

    const tracked = new Set<HTMLElement>();
    let scrollFrame = 0;
    let lastProgress = -1;

    const measure = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const sv = clamp(
        (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2),
        -1,
        1
      );
      const sd = clamp((vh * 0.7 - rect.top) / (rect.height || 1), 0, 1);
      el.style.setProperty("--sv", sv.toFixed(4));
      el.style.setProperty("--sd", sd.toFixed(4));
    };

    const updateScroll = () => {
      scrollFrame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
      if (progress !== lastProgress) {
        lastProgress = progress;
        root.style.setProperty("--scroll-p", progress.toFixed(4));
      }
      tracked.forEach(measure);
    };

    const scheduleScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
    };

    const scrollTargets = document.querySelectorAll<HTMLElement>("[data-scroll]");
    let io: IntersectionObserver | null = null;

    if (reduced) {
      scrollTargets.forEach((el) => {
        el.style.setProperty("--sv", "0");
        el.style.setProperty("--sd", "1");
      });
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              tracked.add(el);
              measure(el);
            } else {
              tracked.delete(el);
              measure(el); // settle at the exit value
            }
          });
        },
        { rootMargin: "25% 0px 25% 0px" }
      );
      scrollTargets.forEach((el) => io!.observe(el));
    }

    window.addEventListener("scroll", scheduleScroll, { passive: true });
    window.addEventListener("resize", scheduleScroll, { passive: true });
    updateScroll();

    /* ── Pointer (spotlight + magnetic) ─────────────────────────────── */

    let pointerFrame = 0;
    let lastEvent: PointerEvent | null = null;
    let magnet: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;

    const resetMagnet = () => {
      if (!magnet) return;
      magnet.style.removeProperty("--tx");
      magnet.style.removeProperty("--ty");
      magnet = null;
    };

    const resetTilt = () => {
      if (!tilt) return;
      tilt.style.removeProperty("--rx");
      tilt.style.removeProperty("--ry");
      tilt.style.removeProperty("--gx");
      tilt.style.removeProperty("--gy");
      tilt = null;
    };

    const applyPointer = () => {
      pointerFrame = 0;
      const event = lastEvent;
      if (!event) return;
      const target = event.target as Element | null;
      if (!target || !target.closest) return;

      const spot = target.closest<HTMLElement>("[data-spot]");
      if (spot) {
        const rect = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${(event.clientX - rect.left).toFixed(1)}px`);
        spot.style.setProperty("--my", `${(event.clientY - rect.top).toFixed(1)}px`);
      }

      if (reduced) {
        resetTilt();
        return;
      }

      const next = target.closest<HTMLElement>("[data-magnetic]");
      if (magnet && magnet !== next) resetMagnet();
      if (next) {
        const rect = next.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        next.style.setProperty("--tx", `${clamp(dx * 0.22, -9, 9).toFixed(2)}px`);
        next.style.setProperty("--ty", `${clamp(dy * 0.3, -6, 6).toFixed(2)}px`);
        magnet = next;
      }

      /* Subtle 3D tilt for project artwork. Values are degrees, capped low so
         the effect reads as depth rather than a gimmick. */
      const nextTilt = target.closest<HTMLElement>("[data-tilt]");
      if (tilt && tilt !== nextTilt) resetTilt();
      if (nextTilt) {
        const rect = nextTilt.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        /* Subtle 3D tilt for project artwork. Clamped to max 6 degrees for fine pointer only. */
        nextTilt.style.setProperty("--rx", `${clamp(-py * 6, -6, 6).toFixed(2)}deg`);
        nextTilt.style.setProperty("--ry", `${clamp(px * 6, -6, 6).toFixed(2)}deg`);
        nextTilt.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
        nextTilt.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
        tilt = nextTilt;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      lastEvent = event;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(applyPointer);
    };

    const onLeaveDocument = () => {
      resetMagnet();
      resetTilt();
    };

    if (finePointer) {
      // Reduced motion keeps spotlights following the pointer (a lighting
      // change, not movement); only the magnetic offset is skipped.
      document.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeaveDocument);
      window.addEventListener("blur", onLeaveDocument);
    }

    return () => {
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      io?.disconnect();
      window.removeEventListener("scroll", scheduleScroll);
      window.removeEventListener("resize", scheduleScroll);
      document.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onLeaveDocument);
      window.removeEventListener("blur", onLeaveDocument);
      resetMagnet();
      resetTilt();
    };
  }, []);

  return null;
}
