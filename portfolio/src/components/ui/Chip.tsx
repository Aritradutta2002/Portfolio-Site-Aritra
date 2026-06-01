'use client'

import { type HTMLAttributes, type ReactNode } from 'react'

type Tone = 'primary' | 'secondary' | 'rose' | 'amber' | 'emerald' | 'sky' | 'neutral'

type ChipProps = {
  tone?: Tone
  size?: 'sm' | 'md'
  icon?: ReactNode
  className?: string
  children: ReactNode
} & HTMLAttributes<HTMLSpanElement>

const toneClass: Record<Tone, string> = {
  primary:   'bg-primary/10 text-primary border-primary/30',
  secondary: 'bg-secondary/10 text-secondary border-secondary/30',
  rose:      'bg-rose/10 text-rose border-rose/30',
  amber:     'bg-amber/10 text-amber border-amber/30',
  emerald:   'bg-emerald/10 text-emerald border-emerald/30',
  sky:       'bg-sky/10 text-sky border-sky/30',
  neutral:   'bg-bg-2 text-fg-2 border-line',
}

const sizeClass = {
  sm: 'h-6 px-2.5 text-[10.5px] gap-1',
  md: 'h-7 px-3 text-[12px] gap-1.5',
}

export function Chip({ tone = 'primary', size = 'md', icon, className = '', children, ...rest }: ChipProps) {
  return (
    <span
      className={[
        'inline-flex items-center font-semibold rounded-full border backdrop-blur-sm',
        'transition-colors duration-300',
        toneClass[tone],
        sizeClass[size],
        className,
      ].join(' ')}
      {...rest}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </span>
  )
}
