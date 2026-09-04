'use client'
import { ReactNode } from 'react'

export function Container({ children, narrow, wide, className = '' }: {
  children: ReactNode; narrow?: boolean; wide?: boolean; className?: string
}) {
  const max = narrow ? 'max-w-3xl' : wide ? 'max-w-7xl' : 'max-w-6xl'
  return <div className={`${max} mx-auto px-5 sm:px-8 w-full ${className}`}>{children}</div>
}
