'use client'

import type { ReactNode } from 'react'
import { useMagnetic } from '@/lib/interactions'

type Variant = 'aurora' | 'glass'

/* Discriminated union: presence of `href` decides whether we render
   an <a> (anchor props) or a <button> (button props). This keeps
   `onClick` available on the button variant and `target`/`rel` on
   the anchor variant without losing type-safety. */
type CommonProps =
  | ({
      children: ReactNode
      variant?: Variant
      strength?: number
      className?: string
      href?: undefined
    } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({
      children: ReactNode
      variant?: Variant
      strength?: number
      className?: string
      href: string
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>)

const base =
  'magnetic inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm'

const styles: Record<Variant, string> = {
  /* Solid aurora gradient fill with ink-dark text */
  aurora: `${base} bg-aurora text-[#0B0616] hover:shadow-aurora-glow`,
  /* Translucent glass with aurora hairline */
  glass: `${base} text-ink border border-aurora/40 bg-aurora/5 backdrop-blur-sm hover:border-aurora/70 hover:text-aurorastrong`,
}

/* Consolidated magnetic CTA — wraps useMagnetic so every call site
   shares one transition/glow treatment (see .magnetic in globals.css).
   Pass `href` to render an <a>; otherwise renders a <button>. */
export function MagneticButton({
  children,
  variant = 'aurora',
  strength = 0.3,
  className = '',
  ...rest
}: CommonProps) {
  const { targetRef } = useMagnetic<HTMLElement>(strength)
  const cls = `${styles[variant]} ${className}`

  if ('href' in rest && rest.href !== undefined) {
    const anchor = rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string
    }
    return (
      <a
        ref={targetRef as React.Ref<HTMLAnchorElement>}
        className={cls}
        {...anchor}
      >
        {children}
      </a>
    )
  }

  const button = rest as React.ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button
      ref={targetRef as React.Ref<HTMLButtonElement>}
      className={cls}
      {...button}
    >
      {children}
    </button>
  )
}
