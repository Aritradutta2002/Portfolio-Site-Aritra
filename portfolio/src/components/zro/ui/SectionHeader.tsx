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
      <p className="zro-eyebrow" data-reveal="fade">
        {index}
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
