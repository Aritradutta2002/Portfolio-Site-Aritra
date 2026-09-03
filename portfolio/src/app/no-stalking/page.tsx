'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const messages = [
  "Nice try, but this photo has two-factor authentication 😎",
  "ACCESS DENIED — my face is not open source 🚫",
  "Error 403: Photo too handsome to expose directly 💅",
  "Bruh... this is a private endpoint 💀",
  "This image is protected by vibes & sorcery 🧙‍♂️",
  "You thought you could just... look? Adorable. 🫠",
]

export default function NoStalkingPage() {
  const [msg, setMsg] = useState('')
  const [dots, setDots] = useState('')

  useEffect(() => {
    // Pick a random message
    setMsg(messages[Math.floor(Math.random() * messages.length)])
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.')
    }, 500)
    return () => clearInterval(t)
  }, [])

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-background text-ink"
      style={{ fontFamily: 'monospace' }}
    >
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem', maxWidth: '600px' }}>

        {/* Status code */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '1.5rem' }}
        >
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 2.5 }}
            style={{
              fontSize: 'clamp(5rem, 20vw, 9rem)',
              fontWeight: 900,
              letterSpacing: '-0.05em',
              color: 'rgb(var(--acidtext))',
              display: 'block',
            }}
          >
            403
          </motion.span>
        </motion.div>

        {/* Terminal-style header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border border-line/15 bg-surface"
          style={{
            padding: '1.5rem 2rem',
            marginBottom: '2rem',
          }}
        >
          <p className="font-mono text-muted" style={{ fontSize: '0.75rem', marginBottom: '0.5rem', textAlign: 'left', opacity: 0.7 }}>
            {'>'} SYSTEM OUTPUT
          </p>
          <p style={{ color: 'rgb(var(--acidtext))', fontSize: '0.8rem', textAlign: 'left', marginBottom: '0.75rem' }}>
            $ curl -X GET /aritra-profile-picture.png
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              color: '#f87171',
              fontSize: '0.8rem',
              textAlign: 'left',
              marginBottom: '0',
            }}
          >
            ✗ Error: FORBIDDEN — direct image access blocked{dots}
          </motion.p>
        </motion.div>

        {/* Funny message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-ink"
          style={{
            fontSize: 'clamp(1rem, 3vw, 1.3rem)',
            fontWeight: 600,
            marginBottom: '0.75rem',
            lineHeight: 1.4,
          }}
        >
          {msg}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-muted"
          style={{ fontSize: '0.8rem', marginBottom: '2.5rem' }}
        >
          My face is available exclusively on the portfolio. Very exclusive. Very fancy.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link
            href="/"
            className="bg-acid text-[#101204] hover:shadow-acid-glow"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 24px',
              borderRadius: '999px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 700,
              transition: 'box-shadow 0.2s',
            }}
          >
            ← View the actual portfolio
          </Link>
        </motion.div>

      </div>
    </main>
  )
}
