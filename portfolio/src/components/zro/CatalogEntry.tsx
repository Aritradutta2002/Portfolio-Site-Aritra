import type { SystemCatalogItem } from "@/data/portfolioCatalog";

interface CatalogEntryProps {
  item: SystemCatalogItem;
}

export function CatalogEntry({ item }: CatalogEntryProps) {
  return (
    <article
      id={item.id}
      className="border-t border-zinc-800/90 py-14 md:py-20"
    >
      {/* Header: sharp icon box + eyebrow + display title + status tag */}
      <div className="flex items-start gap-4 sm:gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-zinc-800 bg-[#0a0a0c] font-ds-mono text-ds-lg font-semibold text-white">
          {item.iconGlyph}
        </div>

        <div className="min-w-0 space-y-2">
          <div className="text-ds-xs uppercase tracking-[0.16em] text-zro-muted">
            {item.organization}
          </div>
          <h2 className="font-ds-sans text-ds-h2 font-medium text-white">
            {item.title}
          </h2>
          <div className="inline-block border border-zinc-800 bg-[#0d0d10] px-2.5 py-0.5 text-ds-2xs uppercase tracking-[0.14em] text-zinc-400">
            {item.badge}
          </div>
        </div>
      </div>

      <p className="mt-6 max-w-2xl text-ds-md leading-relaxed text-zinc-400 md:text-ds-lg">
        {item.summary}
      </p>

      {/* 3-column datasheet */}
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Specifications */}
        <div className="lg:col-span-6">
          <h3 className="border-b border-zinc-800/80 pb-3 text-ds-xs uppercase tracking-[0.16em] text-zro-muted">
            Specifications
          </h3>
          <dl className="divide-y divide-zinc-900">
            {item.specifications.map((spec) => (
              <div
                key={spec.label}
                className="grid grid-cols-12 gap-4 py-3 text-ds-base md:text-ds-md"
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
        </div>

        {/* Measured performance */}
        <div className="lg:col-span-3">
          <h3 className="border-b border-zinc-800/80 pb-3 text-ds-xs uppercase tracking-[0.16em] text-zro-muted">
            Performance
          </h3>
          <div className="divide-y divide-zinc-900">
            {item.performance.map((metric) => (
              <div key={metric.label} className="py-4">
                <div className="text-ds-2xs uppercase tracking-wider text-zro-muted">
                  {metric.label}
                </div>
                <div className="zro-metric mt-1 text-ds-xs text-zinc-400">
                  <span className="mr-1.5 font-ds-mono text-[1.75rem] font-semibold italic leading-none text-white">
                    {metric.highlight}
                  </span>
                  {metric.unit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture stack */}
        <div className="lg:col-span-3">
          <h3 className="border-b border-zinc-800/80 pb-3 text-ds-xs uppercase tracking-[0.16em] text-zro-muted">
            Architecture
          </h3>
          <div className="divide-y divide-zinc-900">
            {item.architecture.map((arch) => (
              <div
                key={arch.label}
                className="flex items-baseline justify-between gap-3 py-3.5 text-ds-md"
              >
                <span className="text-ds-xs uppercase tracking-wider text-zro-muted">
                  {arch.label}
                </span>
                <span className="max-w-[62%] break-words text-right font-medium text-white">
                  {arch.value}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-ds-2xs uppercase tracking-[0.16em] text-zro-muted">
            {item.footerNote}
          </div>
        </div>
      </div>

      {/* Engineering execution log */}
      <div className="mt-10 border border-zinc-900 bg-[#08080a] p-5">
        <div className="mb-3 text-ds-xs uppercase tracking-[0.16em] text-zro-muted">
          Engineering Execution Log
        </div>
        <ul className="space-y-2 text-ds-base text-zinc-400 md:text-ds-md">
          {item.highlights.map((bullet, index) => (
            <li key={bullet} className="flex items-start gap-3">
              <span className="zro-metric select-none text-zro-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
