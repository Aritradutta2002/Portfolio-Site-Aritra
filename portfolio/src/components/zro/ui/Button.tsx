import type { ReactNode } from "react";

type ButtonVariant = "solid" | "outline" | "quiet";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "md" | "sm";
  arrow?: boolean;
  external?: boolean;
  /** Pulls the button slightly toward the cursor (desktop, motion-safe). */
  magnetic?: boolean;
  className?: string;
}

export function Button({
  href,
  children,
  variant = "solid",
  size = "md",
  arrow = false,
  external = false,
  magnetic = false,
  className = "",
}: ButtonProps) {
  const classes = [
    "zro-btn",
    `zro-btn--${variant}`,
    size === "sm" ? "zro-btn--sm" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <span className="zro-btn-arrow" aria-hidden="true">
          {external ? "↗" : "→"}
        </span>
      ) : null}
    </>
  );

  const magnet = magnetic ? { "data-magnetic": "" } : {};

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...magnet}
      >
        {content}
      </a>
    );
  }

  return (
    <a href={href} className={classes} {...magnet}>
      {content}
    </a>
  );
}
