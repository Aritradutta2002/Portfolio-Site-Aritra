'use client'

import { motion } from 'framer-motion'

type Props = {
  index: string
  eyebrow: string
  title: string
  blurb?: string
  align?: 'left' | 'center'
}

/* Shared section header — mono index in aurora gradient, oversized
   display-font title with word-mask reveal, hairline rule.
   One component so all sections match. */
export function SectionHeading({ index, eyebrow, title, blurb, align = 'left' }: Props) {
  const centered = align === 'center'
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-64px' }}
      className={`mb-12 md:mb-16 ${centered ? 'text-center' : 'text-left'}`}
    >
      <p className={`font-mono text-xs uppercase tracking-[0.25em] text-aurorastrong mb-4 ${centered ? '' : ''}`}>
        <span className="text-ink/40">{index}</span>
        <span className="mx-3 text-ink/20">/</span>
        {eyebrow}
      </p>
      <h2 className="font-display font-bold tracking-[-0.03em] leading-[1.02] text-ink text-4xl sm:text-5xl lg:text-6xl text-balance" aria-label={title}>
        {title.split(' ').map((word, i, arr) => (
          <span key={i} aria-hidden="true" className={`inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em] ${i < arr.length - 1 ? 'mr-[0.26em]' : ''}`}>
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, margin: '-64px' }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>
      {blurb ? (
        <p className={`mt-5 text-base md:text-lg leading-relaxed text-muted max-w-2xl ${centered ? 'mx-auto' : ''}`}>
          {blurb}
        </p>
      ) : null}
      <div className={`mt-8 h-px w-full bg-gradient-to-r from-aurora/25 via-aurora/10 to-transparent ${centered ? '' : ''}`} aria-hidden="true" />
    </motion.div>
  )
}
