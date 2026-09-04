'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ShieldAlert, ArrowLeft } from 'lucide-react'
import { LuxeBackdrop } from '@/components/luxe/Backdrop'

const messages = [
  "Nice try — this photo has two-factor authentication.",
  "ACCESS DENIED — my face is not open source.",
  "Error 403: photo too handsome to expose directly.",
  "Bruh… this is a private endpoint.",
  "This image is protected by vibes and sorcery.",
  "You thought you could just… look? Adorable.",
]

export default function NoStalkingPage() {
  const [msg, setMsg] = useState('')
  const [dots, setDots] = useState('')

  useEffect(() => {
    setMsg(messages[Math.floor(Math.random() * messages.length)])
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setDots((d) => (d.length >= 3 ? '' : d + '.'))
    }, 500)
    return () => clearInterval(t)
  }, [])

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-background font-mono text-ink">
      <LuxeBackdrop />
      <div className="relative z-10 max-w-xl px-6 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="font-serifd text-[clamp(5rem,20vw,9rem)] italic leading-none text-gold">403</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="luxe-card mt-6 p-6 text-left"
        >
          <p className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted">
            <ShieldAlert size={14} className="text-gold" /> System output
          </p>
          <p className="text-[13px] text-gold">$ curl -X GET /aritra-profile-picture.png</p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-2 text-[13px] text-rosex">
            ✗ Error: FORBIDDEN — direct image access blocked{dots}
          </motion.p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 font-sans text-lg font-semibold leading-snug"
        >
          {msg}
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }} className="mb-10 mt-3 font-sans text-sm text-muted">
          My face is available exclusively on the portfolio. Very exclusive. Very fancy.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
          <Link
            href="/"
            className="btn-gold btn-press inline-flex min-h-[52px] items-center gap-2 rounded-full px-7 font-sans text-sm font-bold"
          >
            <ArrowLeft size={15} /> View the actual portfolio
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
