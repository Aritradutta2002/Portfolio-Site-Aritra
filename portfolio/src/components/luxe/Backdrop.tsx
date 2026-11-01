'use client'

/**
 * Layer 1 — Fixed Ambient Backdrop
 * 
 * Composed of:
 * 1. Base adaptive canvas color (porcelain in day mode, obsidian in night mode)
 * 2. 72px engineering grid radially masked from top center
 * 3. Warm ambient spotlight (1100x640) at top center
 * 4. Deep emerald glow pool (520x520) at bottom left (desktop only)
 * 5. Fullscreen inset vignette darkening the periphery
 *
 * The grid and the two light pools drift slowly against the scroll
 * (`--scroll-p`, written by MotionController) so the page feels lit from
 * behind. The base and vignette stay fixed.
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
      <div className="absolute inset-0 bg-[rgb(var(--zro-canvas))] transition-colors duration-500" />

      <div className="zro-backdrop-drift">
        {/* 72px Radially Masked Grid */}
        <div className="luxe-grid-bg absolute inset-0" />

        {/* Top Center Ambient Spotlight */}
        <div
          className="absolute left-1/2 top-[-320px] h-[640px] w-[1100px] max-w-none -translate-x-1/2 rounded-full"
          style={{
            background: 'radial-gradient(closest-side, var(--zro-spotlight, rgba(211, 171, 99, 0.14)), transparent 70%)',
            filter: 'blur(32px)',
          }}
        />

        {/* Bottom Left Emerald Aurora Pool (Desktop only) */}
        <div
          className="absolute bottom-[-280px] left-[-200px] hidden h-[520px] w-[520px] rounded-full md:block"
          style={{
            background: 'radial-gradient(closest-side, var(--zro-aurora-pool, rgba(52, 211, 153, 0.07)), transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </div>

      {/* Inset Vignette */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{ boxShadow: 'inset 0 0 240px var(--zro-vignette, rgba(0, 0, 0, 0.4))' }}
      />
    </div>
  )
}

export default Backdrop
