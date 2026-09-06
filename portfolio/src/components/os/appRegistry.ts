import type { AppType } from '@/store/windowStore'
import type { IconName } from './AppIcons'

export interface AppDefinition {
  /** Matches AppType for openable windows. */
  id: AppType
  label: string
  icon: IconName
  /** Short description surfaced in Spotlight and dock tooltips. */
  description: string
  /** Spotlight keywords. */
  keywords?: string[]
  /** Show on the dock. */
  dock: boolean
  /** Show as a desktop icon. */
  desktop: boolean
}

export const APPS: AppDefinition[] = [
  {
    id: 'finder',
    label: 'Finder',
    icon: 'finder',
    description: 'Browse this portfolio like a filesystem',
    keywords: ['files', 'folders', 'browse', 'documents'],
    dock: true,
    desktop: true,
  },
  {
    id: 'about',
    label: 'About',
    icon: 'about',
    description: 'Who I am, what I build, and what I work with',
    keywords: ['bio', 'profile', 'skills', 'education', 'me'],
    dock: true,
    desktop: true,
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: 'experience',
    description: 'Roles at TCS — Element Fleet and Ultimatix',
    keywords: ['work', 'job', 'career', 'tcs', 'roles'],
    dock: true,
    desktop: true,
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: 'projects',
    description: 'Things I designed, built and shipped end-to-end',
    keywords: ['work', 'portfolio', 'apps', 'algoguru'],
    dock: true,
    desktop: true,
  },
  {
    id: 'resume',
    label: 'Resume',
    icon: 'resume',
    description: 'Full resume — preview or download the PDF',
    keywords: ['cv', 'pdf', 'download'],
    dock: true,
    desktop: true,
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: 'contact',
    description: 'Send me a message',
    keywords: ['email', 'mail', 'hire', 'reach', 'message'],
    dock: true,
    desktop: true,
  },
  {
    id: 'photos',
    label: 'Photos',
    icon: 'photos',
    description: 'A small gallery of abstract work',
    keywords: ['gallery', 'images', 'pictures', 'art', 'wallpapers'],
    dock: true,
    desktop: false,
  },
  {
    id: 'notes',
    label: 'Notes',
    icon: 'notes',
    description: 'Editable notes — saved in this browser',
    keywords: ['note', 'write', 'todo', 'scratch', 'draft'],
    dock: true,
    desktop: false,
  },
  {
    id: 'calendar',
    label: 'Calendar',
    icon: 'calendar',
    description: 'Month view with career milestones',
    keywords: ['month', 'dates', 'events', 'schedule', 'timeline'],
    dock: true,
    desktop: false,
  },
  {
    id: 'terminal',
    label: 'Terminal',
    icon: 'terminal',
    description: 'A small shell that knows my resume',
    keywords: ['shell', 'console', 'cli', 'easter egg', 'hacker'],
    dock: true,
    desktop: false,
  },
]

export const DOCK_APPS = APPS.filter((a) => a.dock)
export const DESKTOP_APPS = APPS.filter((a) => a.desktop)

export const APP_BY_ID = APPS.reduce<Record<string, AppDefinition>>((acc, a) => {
  acc[a.id] = a
  return acc
}, {})

export function appLabel(id: string): string {
  return APP_BY_ID[id]?.label ?? id
}
