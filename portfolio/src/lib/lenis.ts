/**
 * Centralised access to the global Lenis instance.
 * `SmoothScroll` registers itself here, and any component
 * that needs `lenis.scrollTo()` (e.g. nav clicks) reads from here.
 */
import type Lenis from 'lenis'

let _lenis: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  _lenis = instance
}

export function getLenis(): Lenis | null {
  return _lenis
}

/** Scroll to a section id (without the leading #) or a target Y in pixels. */
export function scrollTo(target: string | number, options?: { offset?: number; duration?: number }) {
  if (!_lenis) return
  if (typeof target === 'number') {
    _lenis.scrollTo(target, { duration: options?.duration, offset: options?.offset })
  } else {
    const id = target.startsWith('#') ? target.slice(1) : target
    const el = document.getElementById(id)
    if (el) {
      _lenis.scrollTo(el, { duration: options?.duration, offset: options?.offset ?? -70 })
    }
  }
}

export function stop() { _lenis?.stop() }
export function start() { _lenis?.start() }
