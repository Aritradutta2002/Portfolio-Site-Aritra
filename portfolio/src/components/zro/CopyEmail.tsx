"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

/**
 * Email address that copies on click with a 2s checkmark confirmation toast.
 * Falls back to mailto: when the Clipboard API is unavailable or denied.
 */
export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number>(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const flash = (next: "copied" | "failed") => {
    setState(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2000);
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
        className="zro-copy text-[0.875rem] inline-flex items-center gap-1.5"
        aria-label={`Copy email address ${email}`}
      >
        <span>{email}</span>
        {state === "copied" ? (
          <Check className="h-3.5 w-3.5 text-emerald-400 animate-in fade-in" aria-hidden="true" />
        ) : null}
      </button>
      <span
        role="status"
        aria-live="polite"
        data-show={state !== "idle"}
        className="zro-copy-status inline-flex items-center gap-1"
      >
        {state === "copied" ? (
          <>
            <Check className="h-3 w-3 text-emerald-400" aria-hidden="true" />
            <span>Copied to clipboard</span>
          </>
        ) : state === "failed" ? (
          "Opening mail"
        ) : (
          ""
        )}
      </span>
    </span>
  );
}
