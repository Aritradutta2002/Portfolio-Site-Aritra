'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Sparkles } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl w-full text-center"
      >
        <GlassCard glow="primary" gradientBorder gradientBorderAnimated className="p-10 sm:p-14 relative overflow-hidden">
          {/* Orb */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose/20 rounded-full blur-3xl -z-10" />

          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="text-[8rem] sm:text-[10rem] font-black leading-none gradient-text text-glow-sm"
          >
            404
          </motion.div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose/10 text-rose border border-rose/30 text-[12px] font-semibold mb-4">
            <Sparkles size={12} />
            Page not found
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-fg-0 mb-3">
            Lost in the <span className="gradient-text">matrix</span>?
          </h1>
          <p className="text-fg-3 text-[15px] leading-relaxed mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button variant="primary" size="lg" icon={<Home size={15} />}>
                Back to home
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="secondary" size="lg" icon={<ArrowLeft size={15} />}>
                Read the blog
              </Button>
            </Link>
          </div>
        </GlassCard>
      </motion.div>
    </main>
  )
}
