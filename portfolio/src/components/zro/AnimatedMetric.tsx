"use client";

import { useEffect, useRef } from "react";

interface AnimatedMetricProps {
  value: string;
  className?: string;
  delay?: number;
}

/**
 * Renders the final value on the server (no-JS, SEO and LCP safe), then
 * counts the leading number up from zero once on first view. The text node
 * is written directly, so there is no hydration mismatch and no re-render.
 */
export function AnimatedMetric({ value, className, delay = 0 }: AnimatedMetricProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    const match = value.match(/^(\d+)(.*)$/);
    if (!node || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = Number(match[1]);
    const suffix = match[2];
    let frame = 0;
    let timer = 0;

    const run = () => {
      const duration = 1300;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        node.textContent = `${Math.round(target * eased)}${suffix}`;
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        node.textContent = `0${suffix}`;
        timer = window.setTimeout(run, delay);
      },
      { threshold: 0.6 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      node.textContent = value;
    };
  }, [value, delay]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
