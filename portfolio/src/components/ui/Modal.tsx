'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import { modalBackdrop, modalContent } from '@/lib/motion'

type ModalProps = {
  open: boolean
  onClose: () => void
  title?: ReactNode
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClass = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
}

export function Modal({ open, onClose, title, children, size = 'md', className = '' }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-backdrop"
          variants={modalBackdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-bg-0/70 backdrop-blur-md"
        >
          <motion.div
            key="modal-content"
            variants={modalContent}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className={[
              'relative w-full max-h-[90vh] overflow-y-auto glass-strong rounded-lg shadow-glass-lg',
              sizeClass[size],
              className,
            ].join(' ')}
          >
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-bg-2/80 hover:bg-bg-3 text-fg-3 hover:text-fg-0 transition-colors duration-200"
            >
              <X size={18} />
            </button>
            {title && (
              <div className="px-6 pt-6 pb-2 border-b border-line-soft">
                <h3 className="text-lg font-bold text-fg-0 pr-10">{title}</h3>
              </div>
            )}
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
