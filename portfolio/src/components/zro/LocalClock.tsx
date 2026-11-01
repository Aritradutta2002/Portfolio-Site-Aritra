"use client";

import { useEffect, useState } from "react";

const TIME_ZONE = "Asia/Kolkata";

function format(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: TIME_ZONE,
  }).format(date);
}

/** Local time in India. Renders a placeholder until mounted (no hydration drift). */
export function LocalClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(format(new Date()));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={className}>
      <span className="zro-metric">{time ?? "--:--"}</span> IST
    </span>
  );
}
