
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ComponentProps } from 'react'

// Derive the props type from the actual exported provider to avoid importing
// internal/compiled type declarations under `dist/` which may not be present.
type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
