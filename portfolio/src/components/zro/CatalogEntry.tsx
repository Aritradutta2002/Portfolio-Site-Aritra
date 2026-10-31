import type { SystemCatalogItem } from "@/data/portfolioCatalog";

interface CatalogEntryProps {
  item: SystemCatalogItem;
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
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="zro-metric text-ds-xs text-zro-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span aria-hidden="true" className="h-px w-7 bg-zinc-700" />
          <span className="text-ds-2xs uppercase tracking-[0.16em] text-zro-muted">
            {item.organization}
          </span>
        </div>
        <span className="border border-zinc-800 bg-[#0d0d10] px-2.5 py-0.5 text-ds-2xs uppercase tracking-[0.14em] text-zinc-400">
          {item.badge}
        </span>
      </div>

      <h3 className="mt-5 font-ds-sans text-ds-h2 font-medium text-white">
        {item.title}
      </h3>

      <p className="mt-4 max-w-3xl text-ds-md leading-relaxed text-zinc-400">
        {item.summary}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-px border border-zinc-800 bg-zinc-800 sm:grid-cols-3">
        {item.performance.map((metric) => (
          <div key={metric.label} className="min-w-0 bg-black p-4">
            <div className="text-ds-2xs uppercase tracking-[0.12em] text-zro-muted">
              {metric.label}
            </div>
            <div className="zro-metric mt-2 break-words text-ds-xs text-zinc-400">
              <span className="mr-1.5 font-ds-mono text-[1.6rem] font-semibold italic leading-none text-white md:text-[1.75rem]">
                {metric.highlight}
              </span>
              {metric.unit}
            </div>
          </div>
        ))}
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-3 border-t border-zinc-800 pt-5 md:grid-cols-3">
        {item.highlights.slice(0, 3).map((highlight, highlightIndex) => (
          <li
            key={highlight}
            className="flex items-start gap-2.5 text-ds-xs leading-relaxed text-zinc-400"
          >
            <span className="zro-metric mt-0.5 shrink-0 text-zro-muted">
              {String(highlightIndex + 1).padStart(2, "0")}
            </span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.architecture.map((arch) => (
          <span
            key={arch.label}
            className="border border-zinc-800 bg-black px-2.5 py-1 text-ds-2xs text-zinc-300"
          >
            {arch.value}
          </span>
        ))}
      </div>

      {item.externalLinks && item.externalLinks.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
          {item.externalLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ds-xs text-white underline decoration-zinc-600 underline-offset-4 transition-colors hover:decoration-white"
            >
              {link.label} →
            </a>
          ))}
        </div>
      )}

      <details className="mt-6 border-t border-zinc-800 pt-4">
        <summary className="flex cursor-pointer list-none items-center justify-between text-ds-2xs uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-white">
          Technical specification
          <span
            aria-hidden="true"
            className="zro-plus text-ds-md leading-none transition-transform duration-300"
          >
            +
          </span>
        </summary>

        <div className="mt-5 grid grid-cols-1 gap-8 md:grid-cols-2">
          <dl className="divide-y divide-zinc-900">
            {item.specifications.map((spec) => (
              <div
                key={spec.label}
                className="grid grid-cols-12 gap-4 py-2.5 text-ds-xs"
              >
                <dt className="col-span-5 uppercase tracking-wider text-zro-muted">
                  {spec.label}
                </dt>
                <dd className="col-span-7 break-words text-zinc-200">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>

          <div>
            <div className="text-ds-2xs uppercase tracking-[0.16em] text-zro-muted">
              Architecture
            </div>
            <div className="mt-2 divide-y divide-zinc-900">
              {item.architecture.map((arch) => (
                <div
                  key={arch.label}
                  className="flex items-baseline justify-between gap-4 py-2.5 text-ds-xs"
                >
                  <span className="uppercase tracking-wider text-zro-muted">
                    {arch.label}
                  </span>
                  <span className="text-right font-medium text-white">
                    {arch.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-ds-2xs uppercase tracking-[0.14em] text-zro-muted">
              {item.footerNote}
            </div>
          </div>
        </div>
      </details>
    </article>
  );
}