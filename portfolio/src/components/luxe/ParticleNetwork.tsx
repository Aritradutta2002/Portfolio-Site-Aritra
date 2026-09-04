'use client'
import { useEffect, useRef } from 'react'

/* ── Types ─────────────────────────────────────────────────── */
type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  pulse: number // 0 → 1 fade-in
  active: boolean
  pushed: boolean // spawned by click (recycled first under pressure)
}

type Edge = { from: Particle; to: Particle; progress: number }

type Palette = {
  dot: string // rgb triplet
  line: string
  lineAlpha: number
  bolt: string
  boltCore: string
}

/* ── Config ────────────────────────────────────────────────── */
const COUNT = 70
const WAVE_SPEED = 750 // px/s — lightning wavefront velocity
const MAX_PARTICLES = 160
const MAX_MANAGERS = 4
const OFFSCREEN_MARGIN = 24

const DARK_PALETTE: Palette = {
  dot: '226, 232, 240',
  line: '148, 163, 184',
  lineAlpha: 0.26,
  bolt: '56, 189, 248',
  boltCore: '224, 242, 254',
}

const LIGHT_PALETTE: Palette = {
  dot: '71, 85, 105',
  line: '100, 116, 139',
  lineAlpha: 0.32,
  bolt: '2, 132, 199',
  boltCore: '12, 74, 110',
}

const rand = (min: number, max: number) => min + Math.random() * (max - min)
const dist = (a: Particle, b: Particle) => Math.hypot(a.x - b.x, a.y - b.y)

/* ── ConnectionManager: BFS lightning traversal ──────────────
   Starting from the clicked particle, neighbours within the
   distance threshold become edges with progress 0. As each edge's
   progress reaches 1, that node's neighbours join the queue. */
class ConnectionManager {
  private visited = new Set<Particle>()
  private edges: Edge[] = []
  done = false

  constructor(
    private parts: Particle[],
    start: Particle,
    public threshold: number,
  ) {
    this.visited.add(start)
    this.expand(start)
    if (this.edges.length === 0) this.done = true
  }

  private expand(node: Particle) {
    for (const p of this.parts) {
      if (p === node || !p.active || this.visited.has(p)) continue
      const d = dist(node, p)
      if (d <= this.threshold && d > 0.01) {
        this.visited.add(p)
        this.edges.push({ from: node, to: p, progress: 0 })
      }
    }
  }

  update(dt: number) {
    for (const e of this.edges) {
      if (e.progress >= 1) continue
      // progress grows by wavefront velocity ÷ edge length
      e.progress = Math.min(1, e.progress + (WAVE_SPEED * dt) / Math.max(dist(e.from, e.to), 1))
      if (e.progress >= 1 && e.to.active) this.expand(e.to)
    }
    this.done = this.edges.length > 0 && this.edges.every((e) => e.progress >= 1)
  }

  draw(ctx: CanvasRenderingContext2D, pal: Palette) {
    ctx.save()
    ctx.lineCap = 'round'
    for (const e of this.edges) {
      if (e.progress <= 0) continue
      const t = Math.min(e.progress, 1)
      const tipX = e.from.x + (e.to.x - e.from.x) * t
      const tipY = e.from.y + (e.to.y - e.from.y) * t
      // glow pass
      ctx.shadowColor = `rgba(${pal.bolt}, 0.9)`
      ctx.shadowBlur = 14
      ctx.strokeStyle = `rgba(${pal.bolt}, 0.85)`
      ctx.lineWidth = 2.5
      ctx.beginPath()
      ctx.moveTo(e.from.x, e.from.y)
      ctx.lineTo(tipX, tipY)
      ctx.stroke()
      // hot core pass
      ctx.shadowBlur = 0
      ctx.strokeStyle = `rgba(${pal.boltCore}, 0.95)`
      ctx.lineWidth = 1.1
      ctx.beginPath()
      ctx.moveTo(e.from.x, e.from.y)
      ctx.lineTo(tipX, tipY)
      ctx.stroke()
      // spark tip
      ctx.fillStyle = `rgba(${pal.boltCore}, 0.95)`
      ctx.beginPath()
      ctx.arc(tipX, tipY, 2, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()
  }
}

/* Interactive particle-network background — vanilla canvas, no libs.
   ~70 drifting nodes + faint distance lines; clicking the canvas drops
   a node and fires a BFS lightning traversal from it. */
export function ParticleNetwork({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Reduced-motion preference slows the ambient drift to a gentle crawl
    // instead of freezing the field entirely, and still allows the lightning.
    const MOTION_SCALE = reduced ? 0.35 : 1
    const html = document.documentElement

    /* ── Theming: OS preference drives the palette; the site theme
         toggle (html.dark / html.light) takes precedence when set ── */
    let pal: Palette = { ...DARK_PALETTE }
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    let override: boolean | null = html.classList.contains('dark')
      ? true
      : html.classList.contains('light')
        ? false
        : null
    const applyTheme = () => {
      const dark = override ?? mq.matches
      pal = dark ? { ...DARK_PALETTE } : { ...LIGHT_PALETTE }
    }
    applyTheme()
    const onMqChange = () => {
      if (override === null) applyTheme()
    }
    mq.addEventListener('change', onMqChange)
    const mo = new MutationObserver(() => {
      override = html.classList.contains('dark')
        ? true
        : html.classList.contains('light')
          ? false
          : null
      applyTheme()
    })
    mo.observe(html, { attributes: true, attributeFilter: ['class'] })

    /* ── State ─────────────────────────────────────────────── */
    let w = 0
    let h = 0
    let threshold = 0
    let particles: Particle[] = []
    const extras: Particle[] = [] // click-spawned, recycled first
    let managers: ConnectionManager[] = []
    let raf = 0
    let visible = true

    const randomVelocity = (inwardFromEdge?: number): { vx: number; vy: number } => {
      if (inwardFromEdge === undefined) {
        const a = Math.random() * Math.PI * 2
        const s = rand(9, 24)
        return { vx: Math.cos(a) * s, vy: Math.sin(a) * s }
      }
      // new trajectory heading inward from the given edge (0=top,1=right,2=bottom,3=left)
      const base = [Math.PI / 2, Math.PI, -Math.PI / 2, 0][inwardFromEdge]
      const a = base + rand(-0.7, 0.7)
      const s = rand(9, 24)
      return { vx: Math.cos(a) * s, vy: Math.sin(a) * s }
    }

    const seedParticle = (p: Partial<Particle> = {}): Particle => ({
      x: rand(0, w),
      y: rand(0, h),
      ...randomVelocity(),
      size: rand(1, 2.4),
      pulse: 0,
      active: true,
      pushed: false,
      ...p,
    })

    const respawn = (p: Particle) => {
      p.active = false
      const edge = Math.floor(Math.random() * 4)
      if (edge === 0) { p.x = rand(0, w); p.y = -OFFSCREEN_MARGIN }
      else if (edge === 1) { p.x = w + OFFSCREEN_MARGIN; p.y = rand(0, h) }
      else if (edge === 2) { p.x = rand(0, w); p.y = h + OFFSCREEN_MARGIN }
      else { p.x = -OFFSCREEN_MARGIN; p.y = rand(0, h) }
      const v = randomVelocity(edge)
      p.vx = v.vx
      p.vy = v.vy
      p.size = rand(1, 2.4)
      p.pulse = 0
      p.active = true
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.max(rect.width, 1)
      h = Math.max(rect.height, 1)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // connection threshold: 15% of the canvas diagonal
      threshold = Math.hypot(w, h) * 0.15
      managers.forEach((m) => { m.threshold = threshold })
      if (particles.length === 0) {
        particles = Array.from({ length: COUNT }, () => seedParticle())
      }
      draw()
    }

    /* ── Frame ─────────────────────────────────────────────── */
    const step = (dt: number) => {
      for (const p of particles) {
        if (!p.active) continue
        p.pulse = Math.min(1, p.pulse + dt * 0.9)
        p.x += p.vx * dt * MOTION_SCALE
        p.y += p.vy * dt * MOTION_SCALE
        if (
          p.x < -OFFSCREEN_MARGIN || p.x > w + OFFSCREEN_MARGIN ||
          p.y < -OFFSCREEN_MARGIN || p.y > h + OFFSCREEN_MARGIN
        ) {
          respawn(p)
        }
      }
      managers.forEach((m) => {
        m.threshold = threshold
        m.update(dt)
      })
      managers = managers.filter((m) => !m.done)
    }

    const drawLinks = () => {
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        if (!a.active) continue
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          if (!b.active) continue
          const d = dist(a, b)
          if (d < threshold) {
            const alpha = (1 - d / threshold) * pal.lineAlpha
            ctx.strokeStyle = `rgba(${pal.line}, ${alpha.toFixed(3)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
    }

    const drawDots = () => {
      for (const p of particles) {
        if (!p.active || p.pulse <= 0) continue
        ctx.fillStyle = `rgba(${pal.dot}, ${(0.85 * p.pulse).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      drawLinks()
      drawDots()
      for (const m of managers) m.draw(ctx, pal)
    }

    let last = 0
    // Self-perpetuating loop: it always reschedules itself, so it can never
    // die permanently. When the tab is hidden or the canvas is off-screen it
    // idles cheaply and resumes drifting as soon as it is visible again.
    const loop = (t: number) => {
      raf = 0
      if (visible && !document.hidden) {
        const dt = Math.min(last ? (t - last) / 1000 : 1 / 60, 0.05)
        last = t
        step(dt)
        draw()
      } else {
        last = 0
      }
      raf = requestAnimationFrame(loop)
    }
    const kick = () => {
      if (!raf && visible && !document.hidden) {
        last = 0
        raf = requestAnimationFrame(loop)
      }
    }

    /* Click: drop a node at the click point + fire BFS lightning */
    const onClick = (e: MouseEvent) => {
      const x = e.offsetX
      const y = e.offsetY
      let node: Particle
      const free = particles.find((p) => !p.active)
      if (free) {
        Object.assign(free, seedParticle({ x, y, pushed: true }))
        node = free
      } else if (particles.length < MAX_PARTICLES) {
        node = seedParticle({ x, y, pushed: true })
        particles.push(node)
        extras.push(node)
      } else {
        // recycle the oldest click-spawned node in place (refs stay valid)
        const old = extras.shift()
        if (!old) return
        Object.assign(old, seedParticle({ x, y, pushed: true }))
        extras.push(old)
        node = old
      }
      managers.push(new ConnectionManager(particles, node, threshold))
      if (managers.length > MAX_MANAGERS) managers.shift()
      kick()
    }

    const onVis = () => kick()
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) kick()
        else if (raf) {
          cancelAnimationFrame(raf)
          raf = 0
        }
      },
      { threshold: 0 }
    )

    resize()
    kick()
    window.addEventListener('resize', resize)
    canvas.addEventListener('click', onClick)
    document.addEventListener('visibilitychange', onVis)
    io.observe(canvas)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('click', onClick)
      document.removeEventListener('visibilitychange', onVis)
      mq.removeEventListener('change', onMqChange)
      mo.disconnect()
      io.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
