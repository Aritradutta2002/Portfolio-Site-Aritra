'use client'

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items]
  return (
    <div className="marquee relative overflow-hidden border-y border-line/10 bg-surface/40 backdrop-blur-sm" aria-label="Technologies">
      <div className="marquee-track flex w-max items-center gap-10 px-6 py-4">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-10" aria-hidden={half === 1}>
            {row.slice(half * items.length, half * items.length + items.length).map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted">{item}</span>
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className="text-gold">
                  <rect x="1.8" y="1.8" width="6.4" height="6.4" transform="rotate(45 5 5)" fill="currentColor" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
