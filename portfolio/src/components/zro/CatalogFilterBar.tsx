"use client";

import type { SystemCategory } from "@/data/portfolioCatalog";

interface CatalogFilterBarProps {
  selected: SystemCategory;
  onSelect: (category: SystemCategory) => void;
  totalCount: number;
}

const CATEGORIES: SystemCategory[] = [
  "ALL",
  "JAVA / SPRING",
  "CLOUD & PAAS",
  "GENAI & FULL-STACK",
];

export function CatalogFilterBar({
  selected,
  onSelect,
  totalCount,
}: CatalogFilterBarProps) {
  return (
    <div className="flex flex-col gap-4 pb-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
      <div
        role="group"
        aria-label="Filter production systems by category"
        className="flex flex-wrap items-center gap-2"
      >
        {CATEGORIES.map((category) => {
          const isActive = selected === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelect(category)}
              aria-pressed={isActive}
              className={`border px-3 py-1.5 text-ds-xs uppercase tracking-[0.14em] transition-colors ${
                isActive
                  ? "border-white bg-white font-medium text-black"
                  : "border-zinc-800 bg-[#0a0a0c] text-zinc-400 hover:border-zinc-600 hover:text-white"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div
        aria-live="polite"
        className="text-ds-xs uppercase tracking-[0.14em] text-zro-muted zro-metric"
      >
        Showing [{totalCount}] production systems
      </div>
    </div>
  );
}
