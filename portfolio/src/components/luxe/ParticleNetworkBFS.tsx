'use client'

import { useEffect, useRef } from 'react'

type Theme = {
  dot: [number, number, number]
  glow: [number, number, number]
  line: string
  lineAlpha: number
  treeAlpha: number
}

type Edge = { from: number; to: number; progress: number }

const COUNT = 69
const themes: Record<'dark' | 'light', Theme> = {
  dark: { dot: [161, 161, 170], glow: [56, 189, 248], line: '113, 113, 122', lineAlpha: 0.5, treeAlpha: 0.85 },
  light: { dot: [113, 113, 122], glow: [2, 132, 199], line: '113, 113, 122', lineAlpha: 0.55, treeAlpha: 0.9 },
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
      this.pulse = 0
    } else {
      const threshold = getThreshold()
      this.x = -threshold + (getWidth() + 2 * threshold) * Math.random()
      this.y = -threshold + (getHeight() + 2 * threshold) * Math.random()
      this.pulse = -20 * Math.random()
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
    // Never splice particles: BFSWave edges reference their stable indices.
    if (!this.active) {
      if (activeCount < COUNT) this.respawn()
      return
    }

    const threshold = this.getThreshold()
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
    const radius = Math.max(this.size * diag, 1.25) + Math.max(0.0012 * diag, 1) * p
    const [r1, g1, b1] = theme.dot
    const [r2, g2, b2] = theme.glow
    ctx.beginPath()
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgb(${r1 + (r2 - r1) * p}, ${g1 + (g2 - g1) * p}, ${b1 + (b2 - b1) * p})`
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
    start.pulse = 0
    this.vis[index] = true

    for (let i = 0; i < this.particles.length; i++) {
      const target = this.particles[i]
      if (!this.vis[i] && target.active) {
        const distance = Math.hypot(start.x - target.x, start.y - target.y)
        if (distance <= this.getThreshold()) {
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
      edge.progress += 0.0009 * diag * dt
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
    ctx.lineWidth = Math.max(0.0006 * diag, 0.75)
    ctx.strokeStyle = `rgba(${theme.glow.join(',')}, ${theme.treeAlpha})`

    for (const edge of this.edges) {
      const p1 = this.particles[edge.from]
      const p2 = this.particles[edge.to]
      if (!p1 || !p2) continue
      const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y)
      if (!distance) continue
      const tail = 0.03 * diag
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

export default function ParticleNetwork({ className = '' }: { className?: string }) {
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
    let animationFrameId = 0
    let lastTime = performance.now()
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    let theme = media.matches ? themes.dark : themes.light

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const nextRatio = Math.min(window.devicePixelRatio || 1, 2)
      if (rect.width === width && rect.height === height && nextRatio === pixelRatio) return
      width = rect.width
      height = rect.height
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
      animationFrameId = requestAnimationFrame(animate)
      resize()
      const dt = Math.min(time - lastTime, 100)
      lastTime = time
      const diag = Math.hypot(width, height)
      const activeCount = particles.reduce((count, particle) => count + Number(particle.active), 0)

      particles.forEach((particle) => particle.update(dt, diag, activeCount))
      waves.forEach((wave) => wave.update(dt, diag))
      waves = waves.filter((wave) => wave.active)

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = Math.max(0.0006 * diag, 0.75)

      for (let i = 0; i < particles.length; i++) {
        if (!particles[i].active) continue
        for (let j = 0; j < i; j++) {
          if (!particles[j].active) continue
          const distance = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
          if (distance < threshold) {
            ctx.strokeStyle = `rgba(${theme.line}, ${theme.lineAlpha * (1 - distance / threshold)})`
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      waves.forEach((wave) => wave.draw(ctx, diag, theme))
      particles.forEach((particle) => particle.draw(ctx, diag, theme))
    }

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      particles.push(
        new Particle(
          () => width,
          () => height,
          () => threshold,
          event.clientX - rect.left,
          event.clientY - rect.top,
        ),
      )
      waves.push(new BFSWave(particles.length - 1, particles, () => threshold))
    }

    const handleThemeChange = (event: MediaQueryListEvent) => {
      theme = event.matches ? themes.dark : themes.light
    }

    resize()
    media.addEventListener('change', handleThemeChange)
    canvas.addEventListener('click', handleClick)
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
      media.removeEventListener('change', handleThemeChange)
      canvas.removeEventListener('click', handleClick)
    }
  }, [])

  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} aria-hidden="true" />
}