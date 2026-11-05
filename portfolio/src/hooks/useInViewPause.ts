import { useState, useEffect, type RefObject } from 'react';

/**
 * Hook to pause background animations, canvas loops, or heavy effects
 * when the element scrolls out of the viewport or when the tab is backgrounded.
 * SSR-safe and battery-preserving.
 */
export function useInViewPause(
  ref: RefObject<HTMLElement | null>,
  options?: {
    threshold?: number | number[];
    rootMargin?: string;
  }
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const element = ref.current;
    if (!element) return;

    let isIntersecting = false;

    const updateVisibility = () => {
      const isDocVisible = document.visibilityState === 'visible';
      setIsInView(isIntersecting && isDocVisible);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersecting = entry.isIntersecting;
          updateVisibility();
        });
      },
      {
        threshold: options?.threshold ?? 0,
        rootMargin: options?.rootMargin ?? '50px',
      }
    );

    observer.observe(element);
    document.addEventListener('visibilitychange', updateVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, [ref, options?.threshold, options?.rootMargin]);

  return isInView;
}
