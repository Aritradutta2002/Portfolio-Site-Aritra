/**
 * Easing functions and CSS-bezier exports.
 */
export const easeOutExpo = (t: number) => 1 - Math.pow(2, -10 * t)

export const easeInOutQuart = (t: number) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2

export const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

/* CSS cubic-bezier strings, ready for inline use or framer-motion */
export const CSS_EASE = {
  outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  outQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
  inOutQuart: 'cubic-bezier(0.76, 0, 0.24, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  emphasized: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const
