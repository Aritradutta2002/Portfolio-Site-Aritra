"use client";

import { useEffect, useState } from "react";

/**
 * Detects low-power devices to downgrade heavy animations:
 * - navigator.hardwareConcurrency <= 4
 * - navigator.connection?.saveData === true
 * - navigator.deviceMemory <= 4
 * SSR-safe, defaults to false during hydration to prevent hydration mismatch.
 */
export function useLowPower(): boolean {
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
    };

    const lowCores = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;
    const saveData = Boolean(nav.connection?.saveData);
    const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;

    const detected = lowCores || saveData || lowMemory;
    setIsLowPower(detected);

    if (detected) {
      document.documentElement.dataset.lowPower = "true";
    }
  }, []);

  return isLowPower;
}
