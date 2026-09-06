'use client'

import dynamic from 'next/dynamic'
import type { WindowInstance } from '@/store/windowStore'
import type { AppProps } from './types'

/* Every app is lazy-loaded so closed windows cost nothing (Plan §9). */
function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="os-boot-dot h-1.5 w-1.5 rounded-full bg-neutral-400"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}

export const APP_COMPONENTS = {
  about: dynamic(() => import('./AboutApp'), { ssr: false, loading: Loading }),
  experience: dynamic(() => import('./ExperienceApp'), { ssr: false, loading: Loading }),
  projects: dynamic(() => import('./ProjectsFolder'), { ssr: false, loading: Loading }),
  project: dynamic(() => import('./ProjectWindow'), { ssr: false, loading: Loading }),
  resume: dynamic(() => import('./ResumeApp'), { ssr: false, loading: Loading }),
  contact: dynamic(() => import('./ContactApp'), { ssr: false, loading: Loading }),
  terminal: dynamic(() => import('./TerminalApp'), { ssr: false, loading: Loading }),
  photos: dynamic(() => import('./PhotosApp'), { ssr: false, loading: Loading }),
  notes: dynamic(() => import('./NotesApp'), { ssr: false, loading: Loading }),
  calendar: dynamic(() => import('./CalendarApp'), { ssr: false, loading: Loading }),
  finder: dynamic(() => import('./FinderApp'), { ssr: false, loading: Loading }),
} as const

export type AppComponentProps = AppProps & { windowId?: string; payload?: string }

export function AppBody({ win }: { win: WindowInstance }) {
  const Component = APP_COMPONENTS[win.appType] as
    | React.ComponentType<AppComponentProps>
    | undefined
  if (!Component) return null
  return <Component windowId={win.id} payload={win.payload} />
}
