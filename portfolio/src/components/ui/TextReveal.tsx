'use client'

import { motion, type Variants } from 'framer-motion'
import { EASE } from '@/lib/motion'

type Props = {
  text: string
  className?: string
  charClassName?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p'
  once?: boolean
}

const container: Variants = {
  hidden: {},
  visible: (custom: { stagger: number; delay: number }) => ({
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delay,
    },
  }),
}

const char: Variants = {
  hidden: { opacity: 0, y: '110%' },
  visible: {
    opacity: 1,
    y: 0,
                transition: { duration: 0.6, ease: [...EASE.outExpo] },
  },
}

export function TextReveal({
  text,
  className = '',
  charClassName = '',
  delay = 0,
  stagger = 0.025,
  as = 'h2',
  once = true,
}: Props) {
  const words = text.split(' ')
  const Tag = motion[as] as typeof motion.h2

  return (
    <Tag
      variants={container}
      custom={{ stagger, delay }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.5 }}
      className={['inline-block overflow-visible', className].join(' ')}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap mr-[0.25em]">
          {Array.from(word).map((ch, ci) => (
            <span
              key={ci}
              className="inline-block overflow-hidden align-baseline"
              style={{ paddingBottom: '0.08em' }}
            >
              <motion.span
                variants={char}
                className={['inline-block', charClassName].join(' ')}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}
