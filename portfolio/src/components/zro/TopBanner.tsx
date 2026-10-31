import { CONTACT_LINKS, PORTFOLIO_HEADER } from "@/data/portfolioCatalog";

export function TopBanner() {
  return (
    <div className="border-b border-zinc-900 bg-[#08080a] px-4 py-2.5">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-ds-xs text-zinc-400">
        <span>{PORTFOLIO_HEADER.announcement}</span>
        <a
          href={CONTACT_LINKS.resumePdf}
          className="text-white underline decoration-zinc-600 underline-offset-4 transition-colors hover:decoration-white"
        >
          Download Resume PDF ↗
        </a>
      </div>
    </div>
  );
}
