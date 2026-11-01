"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Email address that copies on click. Falls back to the mail client when the
 * Clipboard API is unavailable or denied, and announces the result politely.
 */
export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number>(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const flash = (next: "copied" | "failed") => {
    setState(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2200);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      flash("copied");
    } catch {
      flash("failed");
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <span className="relative inline-block max-w-full">
      <button
        type="button"
        onClick={copy}
        className="zro-copy text-[0.875rem]"
        aria-label={`Copy email address ${email}`}
      >
        {email}
      </button>
      <span
        role="status"
        aria-live="polite"
        data-show={state !== "idle"}
        className="zro-copy-status"
      >
        {state === "copied" ? "Copied" : state === "failed" ? "Opening mail" : ""}
      </span>
    </span>
  );
}
