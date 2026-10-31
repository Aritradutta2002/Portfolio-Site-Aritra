'use client'

import { useEffect, useRef } from 'react'

/**
 * Layer 2 — Hand-written Canvas 2D BFS Particle Network Engine
 *
 * Architecture:
 * - 69 drifting nodes with stable indices and edge pinning.
 * - Distance-based proximity links (quadratic falloff under 15% viewport diagonal).
 * - Breadth-First Search (BFS) lightning wave propagation with comet-tail animation.
 * - Theme-aware palette (Option A: Champagne Gold / Brass).
 * - Content-first event delegation via `particle:wave` CustomEvent.
 * - Performance guard: IntersectionObserver pauses RAF loop when out of viewport.
 * - Memory guard: Click-spawned nodes are capped and recycled.
 * - Accessibility guard: prefers-reduced-motion scales drift speed down to 35%.
 */

type Theme = {
  dot: [number, number, number]
  glow: [number, number, number]
  flare: [number, number, number]
  line: string
  lineAlpha: number
  treeAlpha: number
}

type Edge = {
  from: number
  to: number
  progress: number
}

const COUNT = 69
const MAX_PARTICLES = 120

// Palette Option A: Champagne Gold / Brass
const themes: Record<'dark' | 'light', Theme> = {
  dark: {
    dot: [190, 185, 175],         // subtle warm zinc/stone
    glow: [211, 171, 99],         // champagne gold (#D3AB63 / #C8A46B)
    flare: [255, 248, 230],       // bright white-gold peak
    line: '160, 155, 145',        // warm muted hairline
    lineAlpha: 0.35,              // elegant, non-intrusive
    treeAlpha: 0.95,              // crisp, glowing lightning bolt
  },
  light: {
    dot: [115, 110, 100],
    glow: [154, 116, 24],         // deep rich gold
    flare: [205, 160, 50],
    line: '120, 115, 105',
    lineAlpha: 0.32,
    treeAlpha: 0.88,
  },
}

class Particle {
  active = true
  pulse = 1
  deg = 0
  size: number
  vx: number
  vy: number
  x: number
  y: number

  constructor(
    private readonly getWidth: () => number,
    private readonly getHeight: () => number,
    private readonly getThreshold: () => number,
    x?: number,
    y?: number,
  ) {
    const angle = 2 * Math.PI * Math.random()
    this.size = 0.0012 + 0.001 * Math.random()
    const speed = 0.00002 + 0.00002 * Math.random()
    this.vx = speed * Math.cos(angle)
    this.vy = speed * Math.sin(angle)

    if (x !== undefined && y !== undefined) {
      this.x = x
      this.y = y
      this.pulse = 0 // Click-spawned nodes flare immediately
    } else {
      const threshold = getThreshold()
      this.x = -threshold + (getWidth() + 2 * threshold) * Math.random()
      this.y = -threshold + (getHeight() + 2 * threshold) * Math.random()
      this.pulse = -20 * Math.random() // Staggered initial fade-in
    }
  }

  respawn() {
    const width = this.getWidth()
    const height = this.getHeight()
    const threshold = this.getThreshold()
    const perimeter = 2 * (width + height) * Math.random()
    let angle = (1 / 6 + (2 * Math.random()) / 3) * Math.PI

    if (perimeter < width) {
      this.x = perimeter
      this.y = -threshold
    } else if (perimeter - width < height) {
      angle += Math.PI / 2
      this.x = width + threshold
      this.y = perimeter - width
    } else if (perimeter - width - height < width) {
      angle += Math.PI
      this.x = perimeter - width - height
      this.y = height + threshold
    } else {
      angle += (3 * Math.PI) / 2
      this.x = -threshold
      this.y = perimeter - 2 * width - height
    }

    const speed = 0.00002 + 0.00002 * Math.random()
    this.size = 0.0012 + 0.001 * Math.random()
    this.vx = speed * Math.cos(angle)
    this.vy = speed * Math.sin(angle)
    this.pulse = 1
    this.active = true
  }

  update(dt: number, diag: number, activeCount: number) {
    if (!this.active) {
      if (activeCount < COUNT) this.respawn()
      return
    }

    const threshold = this.getThreshold()
    // Retain node while attached to active wave edges (deg > 0)
    if (
      !this.deg &&
      (this.x < -threshold ||
        this.x > this.getWidth() + threshold ||
        this.y < -threshold ||
        this.y > this.getHeight() + threshold)
    ) {
      this.active = false
      return
    }

    this.pulse = Math.min(this.pulse + 0.005 * dt, 1)
    this.x += this.vx * diag * dt
    this.y += this.vy * diag * dt
  }

  draw(ctx: CanvasRenderingContext2D, diag: number, theme: Theme) {
    if (!this.active) return
    const p = this.pulse >= 0 && this.pulse < 1 ? Math.sin(Math.PI * Math.sqrt(this.pulse)) : 0
    const radius = Math.max(this.size * diag, 1.25) + Math.max(0.0014 * diag, 1.2) * p

    const [r1, g1, b1] = theme.dot
    const [r2, g2, b2] = p > 0.5 ? theme.flare : theme.glow
    const r = Math.round(r1 + (r2 - r1) * p)
    const g = Math.round(g1 + (g2 - g1) * p)
    const b = Math.round(b1 + (b2 - b1) * p)

    ctx.beginPath()
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fill()
  }
}

class BFSWave {
  private readonly vis: boolean[]
  private readonly edges: Edge[] = []

  constructor(
    startIndex: number,
    private readonly particles: Particle[],
    private readonly getThreshold: () => number,
  ) {
    this.vis = Array(particles.length).fill(false)
    this.visit(startIndex)
  }

  private visit(index: number) {
    const start = this.particles[index]
    if (!start || this.vis[index]) return
    start.pulse = 0 // Flash as wavefront arrives
    this.vis[index] = true

    const threshold = this.getThreshold()
    for (let i = 0; i < this.particles.length; i++) {
      const target = this.particles[i]
      if (!this.vis[i] && target.active) {
        const distance = Math.hypot(start.x - target.x, start.y - target.y)
        if (distance <= threshold) {
          this.edges.push({ from: index, to: i, progress: 0 })
          start.deg++
          target.deg++
        }
      }
    }
  }

  update(dt: number, diag: number) {
    while (this.vis.length < this.particles.length) this.vis.push(false)
    const reachedNodes: number[] = []

    for (let i = this.edges.length - 1; i >= 0; i--) {
      const edge = this.edges[i]
      const p1 = this.particles[edge.from]
      const p2 = this.particles[edge.to]
      if (!p1 || !p2) {
        this.edges.splice(i, 1)
        continue
      }
      const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y)
      edge.progress += 0.00095 * diag * dt // Propagation speed
      if (edge.progress >= distance) {
        this.edges.splice(i, 1)
        p1.deg = Math.max(0, p1.deg - 1)
        p2.deg = Math.max(0, p2.deg - 1)
        reachedNodes.push(edge.to)
      }
    }

    reachedNodes.forEach((node) => this.visit(node))
  }

  draw(ctx: CanvasRenderingContext2D, diag: number, theme: Theme) {
    ctx.lineWidth = Math.max(0.0007 * diag, 0.85)
    ctx.strokeStyle = `rgba(${theme.glow.join(',')}, ${theme.treeAlpha})`

    for (const edge of this.edges) {
      const p1 = this.particles[edge.from]
      const p2 = this.particles[edge.to]
      if (!p1 || !p2) continue
      const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y)
      if (!distance) continue

      const tail = 0.032 * diag
      const headRatio = Math.min((edge.progress / distance) * ((distance + tail) / distance), 1)
      const tailRatio = Math.max(headRatio - tail / distance, 0)

      ctx.beginPath()
      ctx.moveTo(p1.x + (p2.x - p1.x) * tailRatio, p1.y + (p2.y - p1.y) * tailRatio)
      ctx.lineTo(p1.x + (p2.x - p1.x) * headRatio, p1.y + (p2.y - p1.y) * headRatio)
      ctx.stroke()
    }
  }

  get active() {
    return this.edges.length > 0
  }
}

export interface ParticleNetworkBFSProps {
  className?: string
}

export function ParticleNetworkBFS({ className = '' }: ParticleNetworkBFSProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let width = 0
    let height = 0
    let pixelRatio = 1
    let threshold = 0
    let particles: Particle[] = []
    let waves: BFSWave[] = []
    const extras: number[] = [] // indices of click-spawned nodes
    let animationFrameId = 0
    let lastTime = performance.now()
    let isVisible = true

    // Theme detection with dynamic class observer
    const html = document.documentElement
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    let override: boolean | null = html.classList.contains('dark')
      ? true
      : html.classList.contains('light')
        ? false
        : null
    let theme: Theme = (override ?? media.matches) ? themes.dark : themes.light

    const applyTheme = () => {
      theme = (override ?? media.matches) ? themes.dark : themes.light
    }
    const handleThemeChange = () => {
      if (override === null) applyTheme()
    }
    const themeObserver = new MutationObserver(() => {
      override = html.classList.contains('dark')
        ? true
        : html.classList.contains('light')
          ? false
          : null
      applyTheme()
    })
    themeObserver.observe(html, { attributes: true, attributeFilter: ['class'] })

    // Reduced motion scaling
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let motionScale = reducedMotionQuery.matches ? 0.35 : 1
    const handleMotionChange = (e: MediaQueryListEvent) => {
      motionScale = e.matches ? 0.35 : 1
    }
    reducedMotionQuery.addEventListener('change', handleMotionChange)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const nextRatio = Math.min(window.devicePixelRatio || 1, 2)
      if (rect.width === width && rect.height === height && nextRatio === pixelRatio) return

      width = Math.max(rect.width, 1)
      height = Math.max(rect.height, 1)
      pixelRatio = nextRatio
      threshold = 0.15 * Math.hypot(width, height)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)

      if (!particles.length) {
        particles = Array.from(
          { length: COUNT },
          () => new Particle(() => width, () => height, () => threshold),
        )
      }
    }

    const animate = (time: number) => {
      if (!isVisible) return

      animationFrameId = requestAnimationFrame(animate)
      resize()

      const dt = Math.min(time - lastTime, 100)
      lastTime = time
      const diag = Math.hypot(width, height)
      const activeCount = particles.reduce((count, p) => count + Number(p.active), 0)

      particles.forEach((p) => p.update(dt * motionScale, diag, activeCount))
      waves.forEach((wave) => wave.update(dt, diag))
      waves = waves.filter((wave) => wave.active)

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = Math.max(0.0006 * diag, 0.75)

      // 1. Proximity links between ambient nodes
      for (let i = 0; i < particles.length; i++) {
        if (!particles[i].active) continue
        for (let j = 0; j < i; j++) {
          if (!particles[j].active) continue
          const distance = Math.hypot(
            particles[i].x - particles[j].x,
            particles[i].y - particles[j].y,
          )
          if (distance < threshold) {
            const alpha = theme.lineAlpha * (1 - distance / threshold)
            ctx.strokeStyle = `rgba(${theme.line}, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // 2. Active BFS lightning wavefronts
      waves.forEach((wave) => wave.draw(ctx, diag, theme))

      // 3. Constellation nodes
      particles.forEach((particle) => particle.draw(ctx, diag, theme))
    }

    // Fire wave from specific coordinates (canvas-local or viewport client coords)
    const fireAt = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top

      if (x < 0 || x > width || y < 0 || y > height) return

      let index: number
      if (particles.length < MAX_PARTICLES) {
        particles.push(new Particle(() => width, () => height, () => threshold, x, y))
        index = particles.length - 1
        extras.push(index)
      } else {
        // Recycle oldest click-spawned node to keep memory stable
        while (extras.length && !particles[extras[0]].active) extras.shift()
        const recycled = extras.shift()
        if (recycled === undefined) return
        Object.assign(
          particles[recycled],
          new Particle(() => width, () => height, () => threshold, x, y),
        )
        extras.push(recycled)
        index = recycled
      }

      waves.push(new BFSWave(index, particles, () => threshold))
    }

    const handleClick = (e: MouseEvent) => {
      fireAt(e.clientX, e.clientY)
    }

    const handleCustomWave = (e: Event) => {
      const customEvent = e as CustomEvent<{ x: number; y: number }>
      if (customEvent.detail) {
        fireAt(customEvent.detail.x, customEvent.detail.y)
      }
    }

    // IntersectionObserver to pause loop when scrolled out of view
    const observer = new IntersectionObserver(([entry]) => {
      const nextVisible = entry.isIntersecting && !document.hidden
      if (nextVisible && !isVisible) {
        isVisible = true
        lastTime = performance.now()
        animationFrameId = requestAnimationFrame(animate)
      } else if (!nextVisible && isVisible) {
        isVisible = false
        cancelAnimationFrame(animationFrameId)
      }
    }, { threshold: 0.05 })

    observer.observe(canvas)

    const handleVisibilityChange = () => {
      if (document.hidden && isVisible) {
        isVisible = false
        cancelAnimationFrame(animationFrameId)
      } else if (!document.hidden && !isVisible) {
        isVisible = true
        lastTime = performance.now()
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    resize()
    media.addEventListener('change', handleThemeChange)
    window.addEventListener('particle:wave', handleCustomWave)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    canvas.addEventListener('click', handleClick)
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
      observer.disconnect()
      themeObserver.disconnect()
      media.removeEventListener('change', handleThemeChange)
      reducedMotionQuery.removeEventListener('change', handleMotionChange)
      window.removeEventListener('particle:wave', handleCustomWave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      canvas.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`block ${className}`}
      aria-hidden="true"
    />
  )
}

export default ParticleNetworkBFS
