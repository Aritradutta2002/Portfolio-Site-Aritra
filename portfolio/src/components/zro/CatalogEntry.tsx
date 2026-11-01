import type { CSSProperties } from "react";
import type { ProjectItem } from "@/data/portfolioCatalog";
import { Button } from "./ui/Button";
import { Tag } from "./ui/Tag";

interface CatalogEntryProps {
  item: ProjectItem;
  index: number;
}

export function CatalogEntry({ item, index }: CatalogEntryProps) {
  const liveLink = item.links?.find((link) => link.href.startsWith("http"));

  return (
    <article
      id={item.id}
      data-reveal
      data-spot
      style={{ "--zro-i": index } as CSSProperties}
      className="zro-card zro-work-card group p-6 md:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="zro-plate zro-work-plate">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="zro-eyebrow">{item.kind}</span>
        </div>
        <span className="zro-metric text-[0.6875rem] uppercase tracking-[0.08em] text-zro-faint">
          {item.years}
        </span>
      </div>

      <h3 className="mt-5 text-[clamp(1.5rem,3.2vw,2.125rem)] font-medium leading-[1.05] tracking-[-0.035em] text-zro-ink">
        {item.name}
      </h3>

      <p className="zro-lede mt-3 max-w-[58ch] text-zro-muted">
        {item.summary}
      </p>

      <div className="mt-7 grid gap-8 border-t border-zro-line pt-7 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="zro-eyebrow">Highlights</p>
          <ul className="mt-4 space-y-2.5">
            {item.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-3 text-[0.875rem] leading-[1.65] text-zro-muted"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.65rem] h-px w-3 shrink-0 bg-zro-line-strong"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="zro-work-panel border border-zro-line p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="zro-eyebrow">At a glance</span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 bg-zro-accent"
                />
                <span className="zro-metric text-[0.625rem] uppercase tracking-[0.08em] text-zro-accent">
                  {liveLink ? "Live" : "In build"}
                </span>
              </span>
            </div>

            <dl className="mt-4 space-y-3 border-t border-zro-line pt-4">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="zro-eyebrow">Focus</dt>
                <dd className="text-right text-[0.75rem] leading-snug text-zro-ink">
                  {item.categories.join(" · ")}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="zro-eyebrow">Timeline</dt>
                <dd className="zro-metric text-[0.6875rem] text-zro-ink">
                  {item.years}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="zro-eyebrow">Stack</dt>
                <dd className="zro-metric text-[0.6875rem] text-zro-ink">
                  {item.stack.length} technologies
                </dd>
              </div>
            </dl>

            {item.links && item.links.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2 border-t border-zro-line pt-4">
                {item.links.map((link, linkIndex) => (
                  <Button
                    key={link.label}
                    href={link.href}
                    variant={linkIndex === 0 ? "solid" : "outline"}
                    size="sm"
                    arrow
                    external
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-zro-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {item.stack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
        <span className="zro-metric shrink-0 text-[0.625rem] uppercase tracking-[0.08em] text-zro-faint">
          End-to-end ownership
        </span>
      </div>
    </article>
  );
}
