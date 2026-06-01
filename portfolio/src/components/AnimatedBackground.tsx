'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    const ctxOrNull = canvasEl.getContext('2d')
    if (!ctxOrNull) return
    const canvas: HTMLCanvasElement = canvasEl
    const ctx: CanvasRenderingContext2D = ctxOrNull

    // ── Resize ───────────────────────────────────────────────────
    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Theme helpers ────────────────────────────────────────────
    function isDark() {
      return document.documentElement.classList.contains('dark')
    }
    function bgColor()         { return isDark() ? '#000000' : '#f8f8f8' }
    function particleColor(a: number) {
      return isDark()
        ? `rgba(255,255,255,${a})`
        : `rgba(180,195,220,${a})`
    }

    // ══════════════════════════════════════════════════
    // CLASS s — Particle
    // ══════════════════════════════════════════════════
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.vx = (Math.random() - 0.5) * 1.0
        this.vy = (Math.random() - 0.5) * 1.0
        this.radius = Math.random() * 4 + 8   // 8–12px — big nodes
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0)             { this.x = 0;             this.vx *= -1 }
        if (this.x > canvas.width)  { this.x = canvas.width;  this.vx *= -1 }
        if (this.y < 0)             { this.y = 0;             this.vy *= -1 }
        if (this.y > canvas.height) { this.y = canvas.height; this.vy *= -1 }
      }

      draw() {
        // Outer glow halo
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3.5)
        grd.addColorStop(0, particleColor(0.3))
        grd.addColorStop(1, particleColor(0))
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = particleColor(0.85)
        ctx.fill()
      }
    }

    // ══════════════════════════════════════════════════
    // CLASS u — Pulse
    // ══════════════════════════════════════════════════
    class Pulse {
      particleIndex: number
      life: number

      constructor(particleIndex: number) {
        this.particleIndex = particleIndex
        this.life = 1.0
      }

      update() {
        this.life -= 0.02
      }

      isDead() {
        return this.life <= 0
      }

      draw(l: Particle[]) {
        const p = l[this.particleIndex]
        if (!p) return
        const { x, y } = p
        const life = this.life

        // 1. Expanding ring — radius grows as life decreases
        const ringRadius = (1 - life) * 80
        ctx.save()
        ctx.shadowColor = 'rgba(0,180,255,0.9)'
        ctx.shadowBlur  = 16
        ctx.beginPath()
        ctx.arc(x, y, ringRadius + p.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,200,255,${life * 0.9})`
        ctx.lineWidth   = 2.5
        ctx.stroke()
        ctx.restore()

        // Second inner ring
        if (ringRadius > 10) {
          ctx.beginPath()
          ctx.arc(x, y, (ringRadius * 0.5) + p.radius, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(100,220,255,${life * 0.5})`
          ctx.lineWidth   = 1.2
          ctx.stroke()
        }

        // 2. Electric bolt lines to every particle within 150px
        //    opacity = life * (1 - distance/150)  — exact williamlin.io formula
        for (let k = 0; k < l.length; k++) {
          if (k === this.particleIndex) continue
          const other = l[k]
          const dx    = other.x - x
          const dy    = other.y - y
          const dist  = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            const lineAlpha = life * (1 - dist / 150)

            ctx.save()
            ctx.shadowColor = 'rgba(0,180,255,0.8)'
            ctx.shadowBlur  = 12

            // Outer glow stroke
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(0,160,255,${lineAlpha * 0.7})`
            ctx.lineWidth   = 4
            ctx.stroke()

            // Bright core stroke
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(160,230,255,${lineAlpha})`
            ctx.lineWidth   = 1.5
            ctx.stroke()

            ctx.restore()
          }
        }

        // 3. Glowing center — extra bright circle at the linked particle
        ctx.save()
        ctx.shadowColor = 'rgba(0,220,255,1)'
        ctx.shadowBlur  = 30
        const glowGrd = ctx.createRadialGradient(x, y, 0, x, y, p.radius * 3)
        glowGrd.addColorStop(0,   `rgba(220,245,255,${life})`)
        glowGrd.addColorStop(0.4, `rgba(0,200,255,${life * 0.8})`)
        glowGrd.addColorStop(1,   `rgba(0,80,255,0)`)
        ctx.beginPath()
        ctx.arc(x, y, p.radius * 3, 0, Math.PI * 2)
        ctx.fillStyle = glowGrd
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, y, p.radius + 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220,245,255,${life})`
        ctx.fill()
        ctx.restore()
      }
    }

    // ── Initialise arrays — l = particles, f = pulses ────────────
    const l: Particle[] = []
    const f: Pulse[]    = []
    let mouse = { x: -9999, y: -9999 }
    let rafId = 0

    // Seed 100 particles
    for (let i = 0; i < 100; i++) {
      l.push(new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ))
    }

    // ── Draw loop ────────────────────────────────────────────────
    function draw() {
      ctx.fillStyle = bgColor()
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update all particles
      for (const p of l) { p.update() }

      // Draw connections between all particles (within 120px)
      for (let i = 0; i < l.length; i++) {
        for (let j = i + 1; j < l.length; j++) {
          const dx   = l[i].x - l[j].x
          const dy   = l[i].y - l[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = particleColor(1 - dist / 120)
            ctx.lineWidth   = 1
            ctx.moveTo(l[i].x, l[i].y)
            ctx.lineTo(l[j].x, l[j].y)
            ctx.stroke()
          }
        }
      }

      // Mouse ghost connections
      for (const p of l) {
        const dx   = p.x - mouse.x
        const dy   = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          ctx.beginPath()
          ctx.strokeStyle = particleColor(1 - dist / 120)
          ctx.lineWidth   = 1
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      // Draw all particles
      for (const p of l) { p.draw() }

      // Update + draw pulses, remove dead ones
      for (let i = f.length - 1; i >= 0; i--) {
        f[i].update()
        if (f[i].isDead()) {
          f.splice(i, 1)
        } else {
          f[i].draw(l)
        }
      }

      rafId = requestAnimationFrame(draw)
    }

    // ── Events ───────────────────────────────────────────────────
    function handleMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect()
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    // Exact replica of original:
    //   l.push(new s(e.offsetX, e.offsetY))
    //   f.push(new u(l.length - 1))
    function handleClick(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect()
      const ox = e.clientX - rect.left
      const oy = e.clientY - rect.top
      l.push(new Particle(ox, oy))
      f.push(new Pulse(l.length - 1))
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click',     handleClick)
    draw()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize',    resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click',     handleClick)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
