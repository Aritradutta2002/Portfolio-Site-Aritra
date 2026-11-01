"use client";

import { useEffect, useState } from "react";
import { scrollToTarget } from "@/lib/scrollBridge";

/** Appears once the reader is well past the hero; scrolls back smoothly. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * 1.25);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      data-visible={visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => scrollToTarget(0)}
      className="zro-top"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 12V2M2.5 6.5L7 2l4.5 4.5" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    </button>
  );
}
