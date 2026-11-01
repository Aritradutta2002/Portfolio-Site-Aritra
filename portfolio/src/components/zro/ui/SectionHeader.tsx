import type { CSSProperties } from "react";

interface SectionHeaderProps {
  id: string;
  index: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  id,
  index,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <p className="zro-eyebrow zro-index" data-reveal="fade">
        <span>{index}</span>
        <span
          aria-hidden="true"
          data-reveal="rule"
          className="zro-index-rule"
          style={{ "--zro-delay": "180ms" } as CSSProperties}
        />
      </p>
      <h2 id={id} className="zro-title mt-4 text-zro-ink">
        <span className="zro-mask" data-reveal="mask">
          <span>{title}</span>
        </span>
      </h2>
      {description ? (
        <p className="zro-lede mt-4 max-w-[46ch] text-zro-muted" data-reveal>
          {description}
        </p>
      ) : null}
    </div>
  );
}
