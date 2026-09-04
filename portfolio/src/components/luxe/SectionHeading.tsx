'use client'
import { motion } from 'framer-motion'

type Props = {
  index: string
  eyebrow: string
  titleA: string
  titleItalic: string
  titleB?: string
  blurb?: string
}

/* Editorial heading: mono eyebrow + grotesk + serif italic gold word */
export function SectionHeading({ index, eyebrow, titleA, titleItalic, titleB, blurb }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-64px' }}
      className="mb-12 md:mb-16"
    >
      <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted mb-5">
        <span className="text-gold font-bold">{index}</span>
        <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
        <span>{eyebrow}</span>
      </p>
      <h2 className="section-display font-display font-bold text-ink text-balance">
        {titleA}{' '}
        <span className="serif-accent">{titleItalic}</span>
        {titleB ? ` ${titleB}` : ''}
      </h2>
      {blurb ? (
        <p className="mt-5 text-base md:text-lg leading-relaxed text-muted max-w-2xl">{blurb}</p>
      ) : null}
      <div className="mt-8 h-px w-full bg-gradient-to-r from-line/20 via-line/8 to-transparent" aria-hidden="true" />
    </motion.div>
  )
}
