'use client'

/* Maps an appType to its live dock icon element so a minimizing window can
   animate toward the correct icon (genie-minimize target). Transient
   in-memory registry — no persistence, resets on reload. */

const registry = new Map<string, HTMLElement>()

export function registerDockIcon(appType: string, el: HTMLElement | null) {
  if (el) registry.set(appType, el)
  else registry.delete(appType)
}

export function getDockIconRect(appType: string): DOMRect | null {
  const el = registry.get(appType)
  return el ? el.getBoundingClientRect() : null
}
