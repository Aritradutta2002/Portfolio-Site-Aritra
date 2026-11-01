import type { CSSProperties } from "react";
import type { ProjectItem } from "@/data/portfolioCatalog";
import { Tag } from "./ui/Tag";

interface CatalogEntryProps {
  item: ProjectItem;
  index: number;
}

export function CatalogEntry({ item, index }: CatalogEntryProps) {
  return (
    <article
      id={item.id}
      data-reveal
      data-spot
      style={{ "--zro-i": index } as CSSProperties}
      className="zro-card p-6 md:p-8"
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3">
          <div className="zro-metric text-[0.6875rem] uppercase leading-relaxed tracking-[0.14em] text-zro-faint">
            {item.years}
          </div>
          <div className="mt-2 text-[0.8125rem] leading-relaxed text-zro-muted">
            {item.kind}
          </div>
        </div>

        <div className="lg:col-span-9">
          <h3 className="text-[1.375rem] font-medium tracking-[-0.025em] text-zro-ink">
            {item.name}
          </h3>

          <p className="zro-body mt-3 max-w-[62ch] text-zro-muted">
            {item.summary}
          </p>

          <ul className="mt-6 space-y-2.5 border-t border-zro-line pt-6">
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

          <div className="mt-6 flex flex-wrap gap-2">
            {item.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>

          {item.links && item.links.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              {item.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="zro-link inline-flex items-center gap-1.5 text-[0.8125rem]"
                >
                  {link.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
