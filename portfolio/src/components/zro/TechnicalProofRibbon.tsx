'use client';

import React from 'react';
import { CountUp } from '@/components/motion/CountUp';
import { cn } from '@/lib/utils';

export interface ProofMetric {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  context: string;
}

const METRICS: ProofMetric[] = [
  {
    value: 20,
    suffix: '×',
    label: 'API Speed-up',
    context: 'TCS Enterprise Systems',
  },
  {
    value: 700,
    suffix: '+',
    label: 'DSA Problems',
    context: 'Algorithms & Structures',
  },
  {
    value: 1672,
    label: 'LeetCode Rating',
    context: 'Contest Top Percentile',
  },
  {
    value: 8.79,
    decimals: 2,
    suffix: '/10',
    label: 'Academic CGPA',
    context: 'Computer Science',
  },
];

export function TechnicalProofRibbon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-full rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-sm p-4 sm:p-6',
        className
      )}
      aria-label="Verified technical metrics"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y md:divide-y-0 md:divide-x divide-black/[0.08] dark:divide-white/[0.08]">
        {METRICS.map((metric, index) => (
          <div
            key={metric.label}
            className={cn(
              'flex flex-col justify-center',
              index > 0 ? 'pt-4 md:pt-0 md:pl-6' : ''
            )}
          >
            <div className="flex items-baseline gap-1 text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 font-sans">
              <CountUp
                value={metric.value}
                prefix={metric.prefix}
                suffix={metric.suffix}
                decimals={metric.decimals}
                duration={1.4}
              />
            </div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-violet-600 dark:text-violet-400 font-semibold">
              {metric.label}
            </div>
            <div className="text-[12px] text-neutral-500 dark:text-neutral-400 truncate">
              {metric.context}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechnicalProofRibbon;
