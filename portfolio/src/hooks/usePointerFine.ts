"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe hook detecting fine pointer devices (mouse/trackpad).
 * Defaults to false during initial hydration to prevent hydration mismatch,
 * then accurately binds to client media query.
 */
export function usePointerFine(): boolean {
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsFine(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsFine(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isFine;
}
