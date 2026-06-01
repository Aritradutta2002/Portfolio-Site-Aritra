'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { forwardRef, type ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow'
type Size = 'sm' | 'md' | 'lg'

type ButtonProps = {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  iconRight?: ReactNode
  loading?: boolean
  children?: ReactNode
  fullWidth?: boolean
  shimmer?: boolean
  className?: string
} & HTMLMotionProps<'button'>

const variantClass: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-neon-primary hover:shadow-[0_0_24px_hsl(var(--primary)/0.7),0_0_48px_hsl(var(--primary)/0.4)]',
  secondary:
    'glass-strong text-fg-1 hover:text-fg-0 border-line hover:border-primary/60',
  outline:
    'border border-line bg-transparent text-fg-2 hover:border-primary/60 hover:text-primary',
  ghost:
    'bg-transparent text-fg-2 hover:bg-bg-2 hover:text-fg-0',
  glow:
    'bg-bg-1 text-fg-0 border border-primary/40 shadow-neon-primary hover:shadow-[0_0_32px_hsl(var(--primary)/0.6)]',
}

const sizeClass: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-[12.5px] gap-1.5',
  md: 'h-11 px-5 text-[13.5px] gap-2',
  lg: 'h-13 px-6 text-[15px] gap-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', icon, iconRight, loading, children, fullWidth, shimmer = true, className = '', disabled, ...rest },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileHover={!disabled && !loading ? { y: -2, scale: 1.02 } : undefined}
      whileTap={!disabled && !loading ? { scale: 0.97 } : undefined}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      disabled={disabled || loading}
      className={[
        'group relative inline-flex items-center justify-center font-semibold tracking-wide rounded-full overflow-hidden',
        'transition-[box-shadow,background,border-color,color] duration-400 ease-out-expo',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        variantClass[variant],
        sizeClass[size],
        fullWidth ? 'w-full' : '',
        shimmer ? 'shimmer-btn' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          {children}
        </span>
      ) : (
        <>
          {icon && <span className="inline-flex">{icon}</span>}
          <span>{children}</span>
          {iconRight && (
            <span className="inline-flex transition-transform duration-300 group-hover:translate-x-1">
              {iconRight}
            </span>
          )}
        </>
      )}
    </motion.button>
  )
})
