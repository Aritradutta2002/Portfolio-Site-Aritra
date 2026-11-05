/**
 * Standard motion constants and easings per Plan.md §5.2.
 * Strictly transform and opacity animations.
 */

export const EASINGS = {
  easeOut: [0.22, 1, 0.36, 1] as const,
  easeInOut: [0.65, 0, 0.35, 1] as const,
};

export const DURATIONS = {
  micro: 0.15,
  ui: 0.28,
  reveal: 0.7,
  countUp: 1.4,
};

export const SPRINGS = {
  gentle: { stiffness: 300, damping: 30 },
  snappy: { stiffness: 400, damping: 25 },
};

export const VIEWPORT_CONFIG = {
  once: true,
  margin: "-10%",
};
