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
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#050505', fontFamily: 'monospace' }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(139,92,246,0.12) 0%, transparent 70%)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem', maxWidth: '600px' }}>

        {/* Glitchy status code */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '1.5rem' }}
        >
          <motion.span
            animate={{ opacity: [1, 0.4, 1], x: [0, -2, 2, 0] }}
            transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 2.5 }}
            style={{
              fontSize: 'clamp(5rem, 20vw, 9rem)',
              fontWeight: 900,
              letterSpacing: '-0.05em',
              background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 30px rgba(139,92,246,0.6))',
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
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(139,92,246,0.3)',
            borderRadius: '12px',
            padding: '1.5rem 2rem',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)',
          }}
        >
          <p style={{ color: '#06b6d4', fontSize: '0.75rem', marginBottom: '0.5rem', textAlign: 'left', opacity: 0.7 }}>
            {'>'} SYSTEM OUTPUT
          </p>
          <p style={{ color: '#22c55e', fontSize: '0.8rem', textAlign: 'left', marginBottom: '0.75rem' }}>
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
          style={{
            color: '#e2e8f0',
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
          style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '2.5rem' }}
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
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 24px',
              background: 'rgba(139,92,246,0.2)',
              border: '1px solid rgba(139,92,246,0.5)',
              borderRadius: '10px',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 600,
              boxShadow: '0 0 15px rgba(139,92,246,0.3)',
              transition: 'all 0.2s',
            }}
          >
            ← View the actual portfolio
          </Link>
        </motion.div>

      </div>
    </main>
  )
}
