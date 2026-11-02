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
  const words = title.split(" ");

  return (
    <div className={`zro-section-head relative ${className}`}>
      <span className="zro-section-ghost" aria-hidden="true" data-scroll>
        {index}
      </span>

      <p className="zro-eyebrow zro-index relative z-[1]" data-reveal="fade">
        <span>{index}</span>
        <span
          aria-hidden="true"
          data-reveal="rule"
          className="zro-index-rule"
          style={{ "--zro-delay": "180ms" } as CSSProperties}
        />
      </p>

      <h2 id={id} className="zro-title relative z-[1] mt-4 text-zro-ink">
        {words.map((word, wordIndex) => (
          <span
            key={`${word}-${wordIndex}`}
            data-reveal="mask"
            className="zro-mask zro-mask--word"
            style={
              { "--zro-delay": `${wordIndex * 70}ms` } as CSSProperties
            }
          >
            <span>{word}</span>
          </span>
        ))}
      </h2>

      {description ? (
        <p
          className="zro-lede relative z-[1] mt-4 max-w-[46ch] text-zro-muted"
          data-reveal
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
