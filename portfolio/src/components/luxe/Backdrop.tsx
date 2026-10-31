'use client'

/**
 * Layer 1 — Fixed Ambient Backdrop
 * 
 * Composed of:
 * 1. Base dark obsidian/canvas color
 * 2. 72px engineering grid radially masked from top center
 * 3. Warm champagne gold spotlight (1100x640) at top center
 * 4. Deep emerald glow pool (520x520) at bottom left (desktop only)
 * 5. Fullscreen inset vignette darkening the periphery
 *
 * Sits at z-0, completely non-interactive (pointer-events: none, aria-hidden: true).
 */
export function Backdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base Canvas */}
      <div className="absolute inset-0 bg-[#0A0A0B]" />

      {/* 72px Radially Masked Grid */}
      <div className="luxe-grid-bg absolute inset-0" />

      {/* Top Center Champagne Gold Spotlight with Slow Ambient Breathing Cycle */}
      <div
        className="luxe-spotlight absolute left-1/2 top-[-320px] h-[640px] w-[1100px] max-w-none -translate-x-1/2 rounded-full"
        style={{
          background: 'radial-gradient(closest-side, rgba(211, 171, 99, 0.15), transparent 70%)',
          filter: 'blur(34px)',
        }}
      />

      {/* Bottom Left Emerald Aurora Pool (Desktop only) */}
      <div
        className="luxe-aurora-pool absolute bottom-[-280px] left-[-200px] hidden h-[520px] w-[520px] rounded-full md:block"
        style={{
          background: 'radial-gradient(closest-side, rgba(52, 211, 153, 0.08), transparent 70%)',
          filter: 'blur(32px)',
        }}
      />

      {/* Inset Vignette */}
      <div
        className="absolute inset-0"
        style={{ boxShadow: 'inset 0 0 240px rgba(0, 0, 0, 0.4)' }}
      />
    </div>
  )
}

export default Backdrop
