import type { ProjectItem } from "@/data/portfolioCatalog";

interface CatalogEntryProps {
  item: ProjectItem;
  index: number;
}

export function CatalogEntry({ item, index }: CatalogEntryProps) {
  return (
    <article
      id={item.id}
      style={
        {
          animationDelay: `${Math.min(index, 4) * 60}ms`,
        } as React.CSSProperties
      }
      className="zro-card border border-zinc-800/90 bg-[#08080a] p-6 md:p-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="font-ds-sans text-ds-xl font-medium text-white">
          {item.name}
        </h3>
        <span className="zro-metric text-ds-xs text-zinc-400">{item.years}</span>
      </div>
      <div className="mt-1 text-ds-2xs uppercase tracking-[0.14em] text-zro-muted">
        {item.kind}
      </div>

      <p className="mt-4 max-w-3xl text-ds-sm leading-relaxed text-zinc-400">
        {item.summary}
      </p>

      <ul className="mt-5 space-y-2 border-t border-zinc-800 pt-5">
        {item.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex gap-3 text-ds-xs leading-relaxed text-zinc-400"
          >
            <span
              aria-hidden="true"
              className="mt-2 h-px w-3 shrink-0 bg-zinc-600"
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.stack.map((tech) => (
          <span
            key={tech}
            className="border border-zinc-800 bg-black px-2 py-0.5 text-ds-2xs text-zinc-300"
          >
            {tech}
          </span>
        ))}
      </div>

      {item.links && item.links.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
          {item.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ds-xs text-white underline decoration-zinc-600 underline-offset-4 transition-colors hover:decoration-white"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
