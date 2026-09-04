'use client'

/* Fixed premium backdrop: grid + gold spotlight + grain + vignette */
export function LuxeBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />
      <div className="luxe-grid-bg absolute inset-0" />
      <div
        className="absolute left-1/2 top-[-320px] h-[640px] w-[1100px] max-w-none -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(211,171,99,0.13), transparent 70%)', filter: 'blur(30px)' }}
      />
      <div
        className="absolute bottom-[-280px] left-[-200px] hidden h-[520px] w-[520px] rounded-full md:block"
        style={{ background: 'radial-gradient(closest-side, rgba(52,211,153,0.06), transparent 70%)', filter: 'blur(30px)' }}
      />
      <div
        className="absolute inset-0"
        style={{ boxShadow: 'inset 0 0 220px rgba(0,0,0,0.35)' }}
      />
    </div>
  )
}
