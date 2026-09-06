'use client'

import * as React from 'react'
import { AnimatePresence } from 'framer-motion'
import { useWindowStore, selectFocused } from '@/store/windowStore'
import Window from './Window'
import { AppBody } from '@/components/apps/registry'

export default function WindowManager() {
  const windows = useWindowStore((s) => s.windows)
  const closeWindow = useWindowStore((s) => s.closeWindow)
  const focused = selectFocused(windows)

  /* Esc / ⌘W close the frontmost window. */
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      /* Never hijack typing inside inputs or the terminal. */
      const tag = target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable) return

      if (e.key === 'Escape' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'w')) {
        if (!focused) return
        e.preventDefault()
        closeWindow(focused.id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [focused, closeWindow])

  return (
    <div className="pointer-events-none absolute inset-0">
      <AnimatePresence>
        {windows
          .filter((w) => !w.minimized)
          .map((w) => (
            <Window key={w.id} win={w} focused={focused?.id === w.id}>
              <AppBody win={w} />
            </Window>
          ))}
      </AnimatePresence>
    </div>
  )
}
