'use client';

import React, { type MouseEvent } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Button } from './ui/Button';
import { HeroChatbot } from './HeroChatbot';
import { TechnicalProofRibbon } from './TechnicalProofRibbon';
import { FlipText } from '@/components/ui/flip-text';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { EASINGS } from '@/lib/motion';
import { CONTACT_LINKS, PORTFOLIO_HEADER } from '@/data/portfolioCatalog';

// Lazy-load Animated Rays to keep initial bundle ultra-light
const AnimatedRays = dynamic(
  () => import('@/components/ui/animated-rays').then((mod) => mod.AnimatedRays),
  {
    ssr: false,
    loading: () => (
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_35%,transparent_35%,rgba(5,5,8,0.85)_100%)]"
        aria-hidden="true"
      />
    ),
  }
);

const ROTATING_DOMAINS = [
  'Java 21 · Spring Boot',
  'Azure PaaS · Microservices',
  'LangChain · RAG Systems',
  'Algorithms · LeetCode 1672',
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const handleHeroClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (
      target.closest(
        'a, button, input, textarea, select, [role="button"], [contenteditable="true"]'
      )
    ) {
      return;
    }
    if (typeof window !== 'undefined' && window.getSelection()?.toString()) {
      return;
    }
  };

  // Lightweight in-situ entry stagger (<= 300ms total)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: 0.02,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.28,
        ease: EASINGS.easeOut,
      },
    },
  };

  return (
    <section
      onClick={handleHeroClick}
      data-spot
      className="zro-hero relative overflow-hidden border-b border-black/[0.08] dark:border-white/[0.08] cursor-default bg-transparent"
    >
      {/* 1. Background Layer: Lazy-loaded Animated Rays with Dark Vignette */}
      <AnimatedRays />

      {/* 2. Foreground Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="zro-hero-content relative z-10 mx-auto flex max-w-6xl flex-col px-6 pt-6 md:px-8 md:pt-8 lg:pt-10"
      >
        <div className="grid flex-1 grid-cols-1 items-center gap-10 py-6 md:py-8 lg:grid-cols-12 lg:gap-12 lg:py-10">
          <div className="lg:col-span-7">
            {/* Mobile Portrait Identification Block */}
            <motion.div
              variants={itemVariants}
              className="mb-6 flex items-center gap-4 lg:hidden"
            >
              <div className="relative h-[96px] w-[78px] shrink-0 overflow-hidden rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02]">
                <Image
                  src="/aritra-portrait-sm.webp"
                  alt=""
                  fill
                  priority
                  sizes="78px"
                  className="object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px bg-violet-500/70"
                />
              </div>
              <div>
                <p className="zro-eyebrow text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {PORTFOLIO_HEADER.location}
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                  <span className="font-mono text-[11px] text-neutral-600 dark:text-neutral-300">
                    {PORTFOLIO_HEADER.availability}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Desktop Status Badge */}
            <motion.div
              variants={itemVariants}
              className="hidden lg:flex items-center gap-2.5"
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 animate-pulse"
              />
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {PORTFOLIO_HEADER.availability}
              </span>
            </motion.div>

            {/* Main Headline: Static H1 for SEO/LCP + Masked SplitReveal Subtitle */}
            <h1 className="mt-5 max-w-4xl">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 font-sans">
                {PORTFOLIO_HEADER.name}
              </span>
              <SplitReveal
                text={`${PORTFOLIO_HEADER.role} at ${PORTFOLIO_HEADER.company}.`}
                as="span"
                delay={0.08}
                className="mt-3.5 block text-xl sm:text-2xl font-medium tracking-tight text-neutral-600 dark:text-neutral-400"
              />
            </h1>

            {/* Narrative & Focus Domains */}
            <motion.div variants={itemVariants} className="mt-5 max-w-[54ch]">
              <p className="text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
                <span className="lg:hidden">2+ years</span>
                <span className="hidden lg:inline">
                  {PORTFOLIO_HEADER.location} · 2+ years
                </span>{' '}
                building and modernising enterprise Java systems.
              </p>
              <div className="mt-2.5 flex items-center gap-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                <span className="text-violet-600 dark:text-violet-400 font-semibold">Focus:</span>
                <FlipText words={ROTATING_DOMAINS} interval={3200} />
              </div>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4"
            >
              <Button
                href={CONTACT_LINKS.resumePdf}
                variant="solid"
                arrow
                external
                className="min-h-[44px] px-5 text-sm font-semibold"
              >
                Download resume
              </Button>
              <Button
                href={`mailto:${CONTACT_LINKS.email}`}
                variant="outline"
                className="min-h-[44px] px-5 text-sm font-medium"
              >
                Email me
              </Button>
              <Button
                href="#experience"
                variant="quiet"
                arrow
                className="min-h-[44px] px-3 text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
              >
                Read experience
              </Button>
            </motion.div>
          </div>

          {/* Desktop Portrait Frame */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:col-span-5 lg:block"
          >
            <figure className="relative mx-auto w-full max-w-[380px] rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] shadow-xl">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/aritra-portrait.webp"
                  alt={`${PORTFOLIO_HEADER.name}, ${PORTFOLIO_HEADER.role}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 0px, 380px"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium backdrop-blur-md bg-black/60 text-white border border-white/10" aria-hidden="true">
                  Java 21 · Azure · RAG
                </span>
              </div>
              <figcaption className="border-t border-black/[0.08] dark:border-white/[0.08] px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {PORTFOLIO_HEADER.name} · {PORTFOLIO_HEADER.role}
              </figcaption>
            </figure>
          </motion.div>
        </div>

        {/* 3. Consolidated Technical Proof Ribbon (Consolidates 20x, 700+, 1672, 8.79) */}
        <motion.div variants={itemVariants} className="mt-4 mb-8">
          <TechnicalProofRibbon />
        </motion.div>

        {/* 4. Separator Hairline */}
        <div className="h-px w-full bg-black/[0.08] dark:bg-white/[0.08]" aria-hidden="true" />

        {/* 5. Inline Ask My Résumé Pill & Streaming Area */}
        <motion.div variants={itemVariants} className="py-6">
          <HeroChatbot />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
