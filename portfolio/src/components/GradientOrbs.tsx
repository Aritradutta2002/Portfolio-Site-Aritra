'use client'

/* Ambient aurora orbs — fixed blurred radial divs drifting on slow
   GPU-only CSS keyframes (see .orb-* in globals.css). Rendered once
   behind the whole page; animation disabled under reduced-motion
   (also handled in CSS). Zero JS after mount. */
export function GradientOrbs() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div className="orb orb-1 w-[42rem] h-[42rem] max-w-[90vw] max-h-[90vw] -top-40 -left-32" />
      <div className="orb orb-2 w-[36rem] h-[36rem] max-w-[85vw] max-h-[85vw] top-1/3 -right-32" />
      <div className="orb orb-3 w-[28rem] h-[28rem] max-w-[80vw] max-h-[80vw] bottom-0 left-1/4" />
    </div>
  )
}
