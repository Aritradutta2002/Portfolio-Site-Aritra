import type { ReactNode } from "react";

type ButtonVariant = "solid" | "outline" | "quiet";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "md" | "sm";
  arrow?: boolean;
  external?: boolean;
  className?: string;
}

export function Button({
  href,
  children,
  variant = "solid",
  size = "md",
  arrow = false,
  external = false,
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

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}
