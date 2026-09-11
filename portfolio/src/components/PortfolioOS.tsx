'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import LaptopStage from './laptop/LaptopStage'
import BootSequence from './laptop/BootSequence'
import { useIsMobile } from '@/hooks/useMediaQuery'

const DesktopShell = dynamic(() => import('./os/DesktopShell'), { ssr: false })
const MobileShell = dynamic(() => import('./os/MobileShell'), { ssr: false })

type Phase = 'idle' | 'opening' | 'boot' | 'desktop'

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function PortfolioOS() {
  const [phase, setPhase] = React.useState<Phase>('idle')
  const [ready, setReady] = React.useState(false)
  const isMobile = useIsMobile()

  /* `ready` gates the first client render so the server and client agree —
     no hydration mismatch, and reduced-motion users never mount WebGL. */
  React.useEffect(() => {
    setReady(true)
    if (prefersReducedMotion()) setPhase('desktop')
  }, [])

  /* The OS is a fixed, full-screen surface. */
  React.useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  /* On touch, the lid opens on its own — no drag, no fiddly tap target. */
  React.useEffect(() => {
    if (!ready || !isMobile || phase !== 'idle') return
    const t = setTimeout(() => setPhase('opening'), 650)
    return () => clearTimeout(t)
  }, [ready, isMobile, phase])

  const onPowerOn = React.useCallback(() => setPhase('opening'), [])
  const onOpened = React.useCallback(() => setPhase('boot'), [])
  const onBootComplete = React.useCallback(() => setPhase('desktop'), [])

  return (
    <div className="fixed inset-0 overflow-hidden bg-[var(--shell-background)] text-[var(--shell-foreground)] transition-colors duration-500">
      {/* ── Landing / boot ── */}
      {ready && phase !== 'desktop' && (
        <div className="absolute inset-0">
          {/* Landing backdrop — matches the wallpaper's navy/teal/red palette */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(120% 100% at 8% 88%, rgba(200,68,60,0.30) 0%, transparent 55%),' +
                'radial-gradient(100% 90% at 30% 60%, rgba(87,196,199,0.16) 0%, transparent 55%),' +
                'radial-gradient(90% 80% at 70% 30%, rgba(138,92,230,0.14) 0%, transparent 55%),' +
                'linear-gradient(180deg, var(--shell-background) 0%, #141A33 52%, #1B2444 100%)',
            }}
            aria-hidden="true"
          />

          <LaptopStage
            opening={phase === 'opening' || phase === 'boot'}
            onPowerOn={onPowerOn}
            onOpened={onOpened}
            reduce={false}
            faded={phase === 'boot'}
          />

          <BootSequence visible={phase === 'boot'} onComplete={onBootComplete} />

          {/* Always-visible escape hatch (Plan §4.1 / §8) */}
          <div className="absolute inset-x-0 bottom-4 z-[7200] flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => setPhase('desktop')}
              className="os-focusable rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[12px] font-medium text-white/85 backdrop-blur-md transition-colors hover:bg-white/20"
            >
              Skip intro
            </button>
            <a
              href="/classic"
              className="os-focusable rounded-full px-3 py-1.5 text-[12px] font-medium text-white/60 transition-colors hover:text-white/90"
            >
              View plain site
            </a>
          </div>
        </div>
      )}

      {/* ── Desktop (or mobile springboard) ── */}
      {ready && phase === 'desktop' && (
        <>
          <div className="hidden md:block">
            <DesktopShell />
          </div>
          <div className="md:hidden">
            <MobileShell />
          </div>
        </>
      )}
    </div>
  )
}
