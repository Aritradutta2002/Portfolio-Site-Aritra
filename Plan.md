# Background System — Logic, Animation & Replication Plan

**Repository:** `Portfolio-Site-Aritra`
**Reference implementation:** `portfolio/` (Next.js 15, React 19, Tailwind 3)
**Purpose of this document:** explain exactly how the site's background is built, then provide a step-by-step, copy-paste guide to reproduce the same look and behavior in another application (React, Next.js, Vue, Svelte, or plain HTML). If the target app is not a display-only portfolio, read **§11 first** — it defines when to reduce, relocate, or disable each layer instead of copying it 1:1.

**Key fact:** the background needs **no extra dependencies**. The canvas engine is hand-written (no Three.js, no particles library). Only the hero *content* uses Framer Motion; the background itself is plain Canvas 2D + CSS.

---

## Table of contents

1. [What "the background" actually is](#1-what-the-background-actually-is)
2. [Source file map](#2-source-file-map)
3. [Design tokens and theming contract](#3-design-tokens-and-theming-contract)
4. [Layer 1 — Ambient backdrop](#4-layer-1--ambient-backdrop)
5. [Layer 2 — Particle network engine](#5-layer-2--particle-network-engine)
6. [Layer 3 — Hero composition and click-through](#6-layer-3--hero-composition-and-click-through)
7. [Layer 4 — Film grain](#7-layer-4--film-grain)
8. [Animation inventory and timing](#8-animation-inventory-and-timing)
9. [Performance, accessibility, lifecycle](#9-performance-accessibility-lifecycle)
10. [Step-by-step replication guide](#10-step-by-step-replication-guide)
11. [Adapting this to a different application (decision guide)](#11-adapting-this-to-a-different-application-decision-guide)
12. [Framework-specific notes](#12-framework-specific-notes)
13. [Tuning cookbook](#13-tuning-cookbook)
14. [QA checklist and acceptance criteria](#14-qa-checklist-and-acceptance-criteria)
15. [Known pitfalls](#15-known-pitfalls)
16. [Appendix — plain-JS version](#16-appendix--plain-js-version)
17. [Copy checklist](#17-copy-checklist)

---

## 1. What "the background" actually is

The background is a **four-layer composition**, not a single component:

| Stack (bottom → top) | Layer |
|---|---|
| page background | body color (`--background`) |
| `z-0` | fixed ambient backdrop: base + grid + gold/emerald glows + vignette |
| `z-0` | particle canvas, then hero focus vignette (both inside the hero) |
| `z-10` | hero content / page content |
| `z-70` | film grain overlay (fixed, pointer-events: none) |
| `z-105` | scroll progress line |
| `z-120` | custom cursor (desktop only) |

| Layer | File / selector | Motion? | Cost |
|---|---|---|---|
| Ambient backdrop (base + grid + gold/emerald glows + inset vignette) | `Backdrop.tsx` / `.luxe-grid-bg` | Static | CSS gradients, composited once |
| Particle network (dots, proximity lines, BFS lightning on click) | `ParticleNetworkBFS.tsx` | Continuous + interactive | Canvas 2D, ~2.3k distance checks/frame |
| Hero focus vignette | inline style in `Hero.tsx` | Static | one radial gradient |
| Film grain | `.luxe-grain::after` | Static | tiled inline SVG noise at 3.2% opacity |
| Extra atmosphere (optional): gold dot cursor, scroll progress, marquee, orbit rings | `Cursor.tsx`, `ScrollProgress.tsx`, `Marquee.tsx`, `Hero.tsx` | CSS/Framer | lightweight |

The visual identity is: **near-black obsidian, a faint 72px engineering grid that fades downward, two soft colored light pools (champagne gold top, emerald bottom-left), a vignette, low-opacity grain, and a living constellation of nodes that "electrocutes" itself when clicked.**

> **Important stacking caveat:** in this repo the backdrop is rendered at `-z-10` inside a page wrapper that has an opaque `bg-background`. Depending on stacking-context rules in your target app, a negative-z fixed child can be painted *behind* that opaque wrapper and become invisible. The replication guide below uses the safer pattern: backdrop at `z-0` as a sibling, content wrapped at `z-10`. Verify visually in the target app.

---

## 2. Source file map

| Concern | Path |
|---|---|
| Ambient backdrop | `portfolio/src/components/luxe/Backdrop.tsx` |
| **Particle engine used in production** | `portfolio/src/components/luxe/ParticleNetworkBFS.tsx` |
| Alternative engine (glowing lightning, full-viewport, lifecycle guards; currently unused) | `portfolio/src/components/luxe/ParticleNetwork.tsx` |
| Hero composition / click-through | `portfolio/src/components/sections/Hero.tsx` |
| Grid, grain, cursor, reveal, reduced-motion CSS | `portfolio/src/app/globals.css` |
| Color tokens (light/dark) | `portfolio/src/app/globals.css` lines 9–53 |
| Tailwind token mapping | `portfolio/tailwind.config.cjs` |
| Page mount | `portfolio/src/app/page.tsx` |
| Body grain class | `portfolio/src/app/layout.tsx` line 68 |
| Theme class strategy | `portfolio/src/components/ThemeProvider.tsx` (`next-themes`, `attribute="class"`) |
| Optional cursor | `portfolio/src/components/luxe/Cursor.tsx` |
| Hero reveal gate | `portfolio/src/lib/luxe.ts` (`useLuxeReady`, `luxeParent`, `luxeChild`) |
| Preloader (gates hero entrance) | `portfolio/src/components/luxe/Preloader.tsx` |

---

## 3. Design tokens and theming contract

The background only needs a handful of tokens. They are stored as **space-separated RGB triplets** so Tailwind can inject alpha with `rgb(var(--token) / 0.05)`.

```css
:root {
  color-scheme: light;

  --bg: 247 245 240;          /* page base — porcelain */
  --surface: 255 255 255;
  --card: 255 255 255;
  --ink: 16 18 24;
  --muted: 94 100 114;
  --line: 16 18 24;           /* grid + link lines */
  --background: #F7F5F0;      /* literal hex for body / sections */
  --foreground: #101218;

  --gold: #9A7418;
  --gold-soft: rgba(154, 116, 24, 0.12);
  --gold-ink: #FFFFFF;
  --gold-deep: #7A5C12;
}

.dark {
  color-scheme: dark;

  --bg: 7 8 12;               /* obsidian */
  --surface: 14 16 22;
  --card: 19 21 29;
  --ink: 244 241 234;
  --muted: 161 165 179;
  --line: 255 255 255;
  --background: #07080C;
  --foreground: #F4F1EA;

  --gold: #D3AB63;            /* champagne */
  --gold-soft: rgba(211, 171, 99, 0.13);
  --gold-ink: #0B0A06;
  --gold-deep: #B08D45;
}
```

**Theming contract for the canvas:**

- The app puts `dark` or `light` on `<html>` (`next-themes` with `attribute="class"`, `defaultTheme="dark"`).
- If neither class is present, the canvas falls back to `prefers-color-scheme`.
- A `MutationObserver` watches `<html class>` so the canvas recolors immediately when the user flips the theme toggle. (The production BFS file currently only listens to the OS media query — the portable version below adds the class observer.)

**If your target app does not use next-themes:** toggle a `dark`/`light` class on `<html>` yourself, or set `data-theme` and change the observer's `attributeFilter` + selector accordingly. Nothing else in the engine depends on the theme library.

---

## 4. Layer 1 — Ambient backdrop

### 4.1 Anatomy

| Element | Geometry | Paint |
|---|---|---|
| Base | `inset: 0` | `var(--background)` |
| Grid | full screen | 1px lines every **72px**, `rgb(var(--line) / 0.05)`, radially masked from top center (`ellipse 90% 70% at 50% 0%`, solid until 30%, gone by 75%) |
| Gold spotlight | `1100 × 640`, centered horizontally, top `-320px` | `radial-gradient(closest-side, rgba(211,171,99,0.13), transparent 70%)`, `blur(30px)` |
| Emerald pool | `520 × 520`, bottom `-280px`, left `-200px`, hidden below `md` (768px) | `radial-gradient(closest-side, rgba(52,211,153,0.06), transparent 70%)`, `blur(30px)` |
| Inset vignette | full screen | `box-shadow: inset 0 0 220px rgba(0,0,0,0.35)` |

Notes:

- The gold/emerald RGBA values are **hard-coded** (not theme tokens). They read as warm/cool light pools in both themes. If you need them theme-aware, move to variables.
- `max-w-none` on the gold blob matters if Tailwind's image reset (`max-width: 100%`) would otherwise clamp its 1100px width.
- The whole layer is `pointer-events: none` and `aria-hidden="true"` — it must never intercept clicks.

### 4.2 Portable CSS + markup (no React required)

```css
.luxe-backdrop {
  position: fixed;
  inset: 0;
  z-index: 0;                 /* repo uses -10; see stacking caveat */
  overflow: hidden;
  pointer-events: none;
  background: var(--background);
}

.luxe-backdrop__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgb(var(--line) / 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgb(var(--line) / 0.05) 1px, transparent 1px);
  background-size: 72px 72px;
  -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, black 30%, transparent 75%);
  mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, black 30%, transparent 75%);
}

.luxe-backdrop__spot {
  position: absolute;
  left: 50%;
  top: -320px;
  width: 1100px;
  height: 640px;
  max-width: none;
  transform: translateX(-50%);
  border-radius: 9999px;
  background: radial-gradient(closest-side, rgba(211, 171, 99, 0.13), transparent 70%);
  filter: blur(30px);
}

.luxe-backdrop__pool {
  position: absolute;
  left: -200px;
  bottom: -280px;
  width: 520px;
  height: 520px;
  border-radius: 9999px;
  background: radial-gradient(closest-side, rgba(52, 211, 153, 0.06), transparent 70%);
  filter: blur(30px);
}

@media (max-width: 767px) {
  .luxe-backdrop__pool { display: none; }
}

.luxe-backdrop__vignette {
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 220px rgba(0, 0, 0, 0.35);
}
```

```html
<div class="luxe-backdrop" aria-hidden="true">
  <div class="luxe-backdrop__grid"></div>
  <div class="luxe-backdrop__spot"></div>
  <div class="luxe-backdrop__pool"></div>
  <div class="luxe-backdrop__vignette"></div>
</div>
```

### 4.3 React equivalent (source)

```tsx
'use client'

/* Fixed premium backdrop: grid + gold spotlight + grain + vignette */
export function LuxeBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />
      <div className="luxe-grid-bg absolute inset-0" />
      <div
        className="absolute left-1/2 top-[-320px] h-[640px] w-[1100px] max-w-none -translate-x-1/2 rounded-full"
        style={{
          background: 'radial-gradient(closest-side, rgba(211,171,99,0.13), transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
      <div
        className="absolute bottom-[-280px] left-[-200px] hidden h-[520px] w-[520px] rounded-full md:block"
        style={{
          background: 'radial-gradient(closest-side, rgba(52,211,153,0.06), transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
      <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 220px rgba(0,0,0,0.35)' }} />
    </div>
  )
}
```

Mount it **once per page**, before the content, and make sure the content sits above it:

```tsx
<div className="relative min-h-screen">
  <LuxeBackdrop />
  <div className="relative z-10">{/* page content */}</div>
</div>
```

---

## 5. Layer 2 — Particle network engine

This is the heart of the background. Production file: `ParticleNetworkBFS.tsx`.

### 5.1 Mental model

1. **69 drifting nodes** live on a canvas that fills the hero.
2. Every pair closer than **15% of the viewport diagonal** is connected by a faint line whose opacity falls off with distance.
3. Clicking anywhere spawns a node at the pointer and starts a **Breadth-First traversal of that proximity graph**. Each edge is animated as a short comet-tail segment travelling from its parent node to its child at constant pixel speed.
4. When a segment arrives, the child node flashes (pulse animation) and **expands**, emitting its own segments. The wave therefore spreads outward like lightning through the network, branches, and dies out.
5. The result is an ambient constellation that is calm until touched, then briefly alive.

There are **no libraries** — only `requestAnimationFrame`, `CanvasRenderingContext2D`, `Math.hypot`, and a `MutationObserver`.

### 5.2 Units and formulas (resolution independence)

All values are normalized to the canvas diagonal so the look is identical on a phone and a 4K monitor.

```
diag      = hypot(width, height)                  // CSS pixels
threshold = 0.15 * diag                           // connection / wave radius
radius    = max(size * diag, 1.25)                // dot radius, size ∈ [0.0012, 0.0022]
speedX    = (0.00002 … 0.00004) * diag            // px per millisecond
waveSpeed = 0.0009 * diag                         // px per millisecond
tail      = 0.03 * diag                           // length of the lightning segment
lineWidth = max(0.0006 * diag, 0.75)              // px
```

At a 1440×900 viewport (`diag ≈ 1697`):

| Quantity | Value |
|---|---|
| Connection radius | ≈ 255 px |
| Drift speed | 34 – 68 px/s |
| Wave speed | ≈ 1527 px/s |
| Lightning tail | ≈ 51 px |
| Dot radius | 2.0 – 3.7 px (clamped min 1.25) |
| Base line width | 1.02 px |

**Time units:** `dt` is in **milliseconds** and clamped to `100` per frame (`Math.min(time - lastTime, 100)`). That clamp prevents a huge jump after a background tab, and it is why speeds above are per-ms, not per-second.

### 5.3 Particle lifecycle

Each node (`Particle`) has `x, y, vx, vy, size, pulse, deg, active`.

**Spawn (initial):**

- Position is randomized across `[-threshold, width + threshold]` so nodes can start just off-screen and drift in.
- Velocity: random angle, speed `0.00002–0.00004 × diag` per ms.
- `pulse = -20 * random()` → a staggered fade-in over up to ~4 s (pulse climbs at `0.005` per ms, so 0→1 takes 200 ms; the negative start delays it).
- `size = 0.0012 + 0.001 * random()`.

**Update:**

```ts
pulse = min(pulse + 0.005 * dt, 1)
x += vx * diag * dt
y += vy * diag * dt
```

**Culling / respawn:**

- If the node is not part of an active wave (`deg === 0`) and leaves the canvas by more than one `threshold`, it is marked `active = false`.
- Inactive nodes respawn only while the field is under the target count. They are placed on a random point of the rectangle **perimeter** (expanded by `threshold`) and given an **inward-facing velocity** (±0.7 rad jitter around the inward normal), so the field stays populated forever.
- **`deg` is a pin.** While a node has active lightning edges attached, it is *not* culled even if it drifts off-screen. This keeps edge endpoints valid mid-flight. `deg` is decremented when each edge completes.
- Nodes are **never spliced** from the array. Indices are stable, because waves store `from`/`to` **indices**, not object references. Reusing/teleporting a node in place is safe.

**Dot appearance:**

```
p = (pulse >= 0 && pulse < 1) ? sin(PI * sqrt(pulse)) : 0
radius = max(size * diag, 1.25) + max(0.0012 * diag, 1) * p
color  = lerp(theme.dot, theme.glow, p)
```

So each node normally sits at the muted dot color, and briefly flares/expands toward the lightning color when a wave reaches it (or when it spawns from a click, since newborn click nodes start at `pulse = 0`).

### 5.4 The BFS lightning wave

```ts
class BFSWave {
  vis: boolean[]                 // one flag per particle index
  edges: { from, to, progress }[] // progress in pixels

  constructor(startIndex, particles, getThreshold) {
    vis = new Array(particles.length).fill(false)
    visit(startIndex)
  }

  visit(index) {
    const start = particles[index]
    if (!start || vis[index]) return
    start.pulse = 0            // flash as the wavefront arrives
    vis[index] = true

    for (let i = 0; i < particles.length; i++) {
      const target = particles[i]
      if (!vis[i] && target.active) {
        if (hypot(start - target) <= threshold) {
          edges.push({ from: index, to: i, progress: 0 })
          start.deg++; target.deg++
        }
      }
    }
  }

  update(dt, diag) {
    for (each edge, backwards) {
      edge.progress += 0.0009 * diag * dt        // constant px/ms
      if (edge.progress >= distance(from, to)) {
        remove edge
        from.deg--; to.deg--
        reached.push(to)                          // expand next frame
      }
    }
    reached.forEach(node => visit(node))
  }
}
```

Key details:

- **It is a wavefront flood fill, not strict level-order BFS.** An edge becomes a "source" only when its own segment finishes, which naturally produces distance-ordered propagation across varying edge lengths.
- A target is not marked visited until it is *expanded*, so several parents can emit edges toward it, and duplicate edges are possible. That is visually acceptable and is one reason `deg` exists.
- `progress` is measured in **pixels**, not 0–1. This gives the wave a constant physical speed regardless of edge length.
- A wave is discarded when it has no edges left (`edges.length === 0`), so completed waves cost nothing.
- If the start node has no neighbours within the threshold, the wave dies immediately and nothing appears. Dense fields give dramatic chains; sparse fields give a single hop.

### 5.5 Rendering order (per frame)

1. `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)` — draw in CSS pixels, stay crisp on retina.
2. `clearRect(0, 0, width, height)`.
3. Set base line width.
4. **Base links:** double loop `i` over nodes, `j < i`; if `distance < threshold`, stroke with
   `rgba(line, lineAlpha * (1 - distance / threshold))` — closer pairs are brighter; lines vanish at the threshold.
5. **Waves:** single stroke style, comet-tail segment:
   ```
   tail      = 0.03 * diag
   headRatio = min((progress / distance) * ((distance + tail) / distance), 1)
   tailRatio = max(headRatio - tail / distance, 0)
   line from lerp(from, to, tailRatio) to lerp(from, to, headRatio)
   ```
6. **Dots:** pulse-mapped radius and dot→glow color lerp.

There is **no shadow blur / glow filter** in the production BFS canvas; the lightning reads as a glowing bolt purely from the cyan/blue stroke plus the white-hot dot flashes. That keeps the frame cheap.

### 5.6 Theme palettes

```ts
const themes = {
  dark: {
    dot: [161, 161, 170],       // zinc-400
    glow: [56, 189, 248],       // sky-400  (wave + flare)
    line: '113, 113, 122',      // zinc-500
    lineAlpha: 0.5,
    treeAlpha: 0.85,
  },
  light: {
    dot: [113, 113, 122],
    glow: [2, 132, 199],        // sky-600
    line: '113, 113, 122',
    lineAlpha: 0.55,
    treeAlpha: 0.9,
  },
}
```

Resolution:

```
override = html.classList.contains('dark')  ? true
         : html.classList.contains('light') ? false
         : null
dark = override ?? matchMedia('(prefers-color-scheme: dark)').matches
```

### 5.7 Configuration reference

| Constant | Value | Effect | Safe range |
|---|---|---|---|
| `COUNT` | 69 | Ambient node target | 40 (calm) – 110 (busy) |
| connection threshold | `0.15 × diag` | Graph radius; also click-wave radius | 0.10 – 0.20 |
| node speed | `0.00002–0.00004 × diag / ms` | Drift | halve for slower, double for livelier |
| node size | `0.0012–0.0022 × diag` | Dot radius | 0.0008 – 0.003 |
| pulse speed | `0.005 / ms` | 200 ms flare | 0.003 – 0.01 |
| wave speed | `0.0009 × diag / ms` | Lightning travel | 0.0004 (slow crawl) – 0.0018 (snap) |
| tail | `0.03 × diag` | Bolt segment length | 0.01 – 0.06 |
| `lineAlpha` | 0.5 dark / 0.55 light | Ambient web opacity | 0.25 – 0.65 |
| `treeAlpha` | 0.85 dark / 0.9 light | Bolt opacity | 0.6 – 1 |
| `MAX_PARTICLES` | 120 (portable) | Click-spawn cap | 90 – 160 |
| DPR cap | 2 | Retina sharpness vs fill cost | keep 2, 1.5 on low-end |

### 5.8 Portable React component (copy-paste)

This is the production engine hardened with four small changes (the first three are marked `PORT` in the code):

1. follows the app theme class as well as the OS preference,
2. caps click-spawned particles and recycles them instead of growing forever,
3. respects `prefers-reduced-motion` by slowing drift to 35%,
4. uses `Math.max(rect.width, 1)` to avoid a zero-sized canvas edge case.

```tsx
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
const MAX_PARTICLES = 120

const themes: Record<'dark' | 'light', Theme> = {
  dark: {
    dot: [161, 161, 170],
    glow: [56, 189, 248],
    line: '113, 113, 122',
    lineAlpha: 0.5,
    treeAlpha: 0.85,
  },
  light: {
    dot: [113, 113, 122],
    glow: [2, 132, 199],
    line: '113, 113, 122',
    lineAlpha: 0.55,
    treeAlpha: 0.9,
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
      this.pulse = 0 // click-spawned nodes flare immediately
    } else {
      const threshold = getThreshold()
      this.x = -threshold + (getWidth() + 2 * threshold) * Math.random()
      this.y = -threshold + (getHeight() + 2 * threshold) * Math.random()
      this.pulse = -20 * Math.random() // staggered fade-in
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
    // Never splice particles: wave edges reference stable indices.
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
    const extras: number[] = [] // indices of click-spawned nodes, for recycling
    let animationFrameId = 0
    let lastTime = performance.now()

    /* PORT: follow OS preference + the app's html.dark / html.light class */
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

    /* PORT: gentle motion instead of full-speed drift for reduced-motion users */
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const motionScale = reduced ? 0.35 : 1

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

      for (let i = 0; i < particles.length; i++) {
        if (!particles[i].active) continue
        for (let j = 0; j < i; j++) {
          if (!particles[j].active) continue
          const distance = Math.hypot(
            particles[i].x - particles[j].x,
            particles[i].y - particles[j].y,
          )
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

    /* Click: spawn a node at the pointer and fire a traversal from it */
    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      let index: number

      if (particles.length < MAX_PARTICLES) {
        particles.push(new Particle(() => width, () => height, () => threshold, x, y))
        index = particles.length - 1
        extras.push(index)
      } else {
        // PORT: recycle the oldest click-spawned node instead of growing forever
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

    resize()
    media.addEventListener('change', handleThemeChange)
    canvas.addEventListener('click', handleClick)
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
      media.removeEventListener('change', handleThemeChange)
      themeObserver.disconnect()
      canvas.removeEventListener('click', handleClick)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
```

> The media listener is registered once, next to the click listener, and removed in the cleanup. If you copy from the repo original instead, keep its single registration and add the class observer from this version.

### 5.9 The alternative engine in the repo

`ParticleNetwork.tsx` is a second, unused implementation. It is useful if you want a **stronger lightning glow** or a **full-page** field.

| Aspect | `ParticleNetworkBFS` (live) | `ParticleNetwork` (alternative) |
|---|---|---|
| Nodes | 69 + click-spawned | 70 + click-spawned `extras` |
| Click behavior | Spawns a node, waves from it | Spawns a node, waves from it |
| Wave rendering | Comet-tail segment, no shadow blur | 3-pass stroke: glow (`shadowBlur 14`), hot core, spark tip |
| Wave speed | `0.0009 × diag / ms` | `750 px/s` fixed |
| Line alpha | 0.5 / 0.55 | 0.26 / 0.32 |
| Theme | OS media query only | OS + `html` class override |
| Lifecycle | Always animating | `IntersectionObserver` + `visibilitychange` pause, self-restarting loop |
| Reduced motion | Not handled | Drift scaled to 0.35 |
| Particle cap | None (grows) | `MAX_PARTICLES = 160`, recycles extras |
| Managers | Unlimited waves (grows) | `MAX_MANAGERS = 4` (oldest dropped) |

If you want the "electric" look with visible bloom, port `ParticleNetwork.tsx`. If you want the calm hero look of this site, port `ParticleNetworkBFS.tsx`.

### 5.10 Lifecycle gotchas to keep

- **Resize guard:** `resize()` runs every frame but exits early unless CSS size or DPR changed. It is cheap; do not move it to a scroll handler only.
- **DPR:** canvas backing store is `CSS size × min(devicePixelRatio, 2)`, and the context is scaled back down. Never draw using `devicePixelRatio` math manually.
- **Clear, don't fade:** the canvas is fully cleared each frame; there is no motion-blur trail. The "tail" is a drawn segment, not persistence.
- **Stable indices:** do not filter the particle array while waves are alive. Mark `active = false` and reuse in place.
- **`deg` pinning:** never cull a node that has wave edges attached.
- **Cleanup:** cancel the RAF, remove the theme listener, disconnect the observer and canvas listener on unmount (React Strict Mode will run the effect twice in development).

---

## 6. Layer 3 — Hero composition and click-through

The canvas only fills the hero, not the whole page. The hero is built so that **every click passes through the copy to the canvas**.

```tsx
<section
  id="home"
  className="relative overflow-hidden bg-background !pb-0 !pt-0"
>
  <ParticleNetwork className="absolute inset-0 h-full w-full" />

  {/* Focus vignette: keeps centered copy crisp over the field */}
  <div
    className="pointer-events-none absolute inset-0"
    aria-hidden="true"
    style={{
      background:
        'radial-gradient(ellipse 62% 52% at 50% 42%, transparent 40%, rgb(var(--bg) / 0.55) 100%)',
    }}
  />

  {/* Content is click-through; only links/buttons opt back in */}
  <div className="pointer-events-none relative z-10">
    <h1>Aritra Dutta</h1>
    <a className="pointer-events-auto" href="#work">View my work</a>
  </div>
</section>
```

Why this works:

- The canvas is `absolute inset-0` inside a `relative overflow-hidden` section, so it never leaks outside the hero.
- The vignette is drawn **above the canvas** and fades the field into the page background at the edges. Formula: transparent until 40% of the ellipse, then to `--bg` at 100%, centered at `50% 42%` (slightly above center, around the portrait/name).
- Content has `pointer-events-none`, so clicks on the name/tagline/empty space hit the canvas underneath. Interactive children (`a`, `button`) set `pointer-events-auto`.
- Content is `z-10` to stack above canvas and vignette.

Sizing requirements for the target app:

- The section must have a real height (`min-h-[100svh]`, a fixed height, or content height). A canvas with `height: 100%` inside an auto-height parent collapses to the canvas default 150px.
- The canvas must be `display: block` to avoid inline baseline gaps.
- Do **not** apply `transform`, `filter`, `opacity < 1`, or `will-change` to the section unless intentional — those create stacking contexts and can change what the canvas covers.
- If content needs text selection, `pointer-events-none` still allows selection in most browsers, but links/buttons need `pointer-events-auto`.

Mobile:

- Taps fire `click` (after the usual delay in old browsers), so the effect works. If you want instant response, listen to `pointerdown` instead and ignore multi-touch/scroll gestures.
- Consider disabling clicks on touch to avoid accidental bolts while scrolling, or keep them — the site keeps them.

---

## 7. Layer 4 — Film grain

Grain is applied to `<body>` with a utility class, not a component.

```css
.luxe-grain::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 70;
  pointer-events: none;
  opacity: 0.032;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

```tsx
<body className="... luxe-grain">
```

```html
<body class="luxe-grain">
```

Details:

- A 160×160 tiled SVG `feTurbulence` texture; `stitchTiles="stitch"` makes the tile seamless.
- Opacity **0.032** is deliberately almost subliminal. Raising it above ~0.06 looks dirty.
- `position: fixed` + `z-index: 70` means it sits above cards and the navbar but below the cursor (`z-120`) and scroll progress (`z-105`). It is purely decorative (`pointer-events: none`).
- Grain is **not** animated. Animating noise is expensive and distracting; the "film" feel comes from the static texture plus vignette.

---

## 8. Animation inventory and timing

### Background-related

| Animation | Driver | Timing |
|---|---|---|
| Particle drift | Canvas rAF | 24–48 px/s (at 1200px diag) |
| Node fade-in on spawn | Canvas | 0 → 1 in 200 ms, staggered up to ~4 s |
| Node flare on wave arrival | Canvas | 200 ms, sinusoidal radius + color |
| Base link opacity | Canvas | Continuous function of distance, no keyframes |
| Lightning traversal | Canvas | `0.9 × diag` px/s; each edge lasts `distance / speed` |
| Lightning tail | Canvas | `3%` of diagonal (~36–51 px) |
| Theme recolor | JS + CSS | Instant on class toggle |
| Grain / grid / glows | none | static |

### Foreground atmosphere that completes the look (optional)

| Element | Source | Timing |
|---|---|---|
| Hero content reveal | Framer Motion `luxeParent/luxeChild` | stagger `0.08s`, child `0.7s`, ease `[0.22, 1, 0.36, 1]`, y `30px` |
| Hero reveal gate | `useLuxeReady` | after preloader (`~1.5s`) or immediately on repeat/reduced motion |
| Preloader | `Preloader.tsx` | 1.3 s counter (cubic ease), 200 ms hold, 0.9 s curtain wipe |
| Orbit ring | Hero | spin 22 s linear |
| Asterisk | Hero | rotate 12 s linear |
| Scroll cue | Hero | 1.7 s loop |
| Status dot | Hero | `pulseDot` 2.2 s |
| Marquee | `Marquee.tsx` | 34 s linear, pauses on hover |
| Scroll progress | `ScrollProgress.tsx` | spring (stiffness 140, damping 28) |
| Cursor ring | `Cursor.tsx` | lerp factor 0.14 per frame, 38px → 72px on `data-cursor` |

**Reduced motion:** global CSS collapses CSS animations/transitions to `0.01ms` and disables the cursor. The production BFS canvas ignores this preference (a gap); the portable component above slows drift to 35% instead of freezing it, which matches the alternative engine's approach.

**Important:** the canvas starts immediately on mount, *independently* of the preloader. Only hero text waits for `luxe-ready`. Do not gate the canvas on the preloader or the background will be blank during the reveal.

---

## 9. Performance, accessibility, lifecycle

### Performance

- **Node budget:** 69 nodes → `69 × 68 / 2 = 2346` distance checks per frame. That is trivial. The cost is stroke count: dense fields can draw several hundred 1px line segments.
- **DPR cap 2** prevents 3x phones/4K from quadrupling fill cost.
- **No shadow blur** in the live engine. If you port the alternative engine, `shadowBlur` per edge is the expensive part; cap concurrent waves (the alternative uses 4).
- **Static CSS** for grid/glow/vignette; no JS scroll parallax. This keeps the background off the main-thread scroll path.
- **`content-visibility: auto`** on `section[id]` lets offscreen sections skip rendering. If you use a full-page fixed canvas, add `IntersectionObserver` to pause when it is not visible (alternative engine does this).
- **Tab hidden:** browsers throttle/pause rAF automatically. The loop does not manually pause in BFS; the timestamp clamp (`dt ≤ 100ms`) prevents a visual jump on return.
- **Estimated frame cost:** well under 4 ms on a mid-range laptop at 1440×900. Verify in your app; if you exceed ~8 ms, lower `COUNT` to 45–55 and/or the DPR cap to 1.5.

### Accessibility

- Canvas and decorative divs carry `aria-hidden="true"`.
- All ambient layers are `pointer-events: none`; they never block focus or selection.
- The lightning is decorative. Nothing depends on seeing or clicking it; keyboard users are unaffected.
- `prefers-reduced-motion` handling: CSS for foreground, 35% drift in the portable engine. Consider disabling click waves entirely under reduced motion if your audience is motion-sensitive.
- Theme contrast: node/line colors are deliberately low-contrast decoration. Never put essential text directly on the busiest part of the field without the hero vignette.

### Lifecycle

- `'use client'` in Next.js; all `window`/`document` access is inside `useEffect`, so SSR is safe.
- Resize listener: not needed — the animation loop's guarded `resize()` covers it. (The alternative engine registers one manually; either works.)
- Cleanup: RAF, media listener, MutationObserver, click listener. Without cleanup, Strict Mode double-mounts in dev and leaves ghost loops.

---

## 10. Step-by-step replication guide

**Estimated effort:** 45–90 minutes for a full port; 20 minutes for backdrop-only.

### 10.1 Decide the scope

| Option | What you get | Use when |
|---|---|---|
| **A. Backdrop only** | Grid + gold/emerald glows + vignette + grain | You want the "premium dark" atmosphere with zero animation |
| **B. Full hero (recommended)** | A + particle constellation + click lightning + focus vignette | Replicating this site's actual look |
| **C. Full-page field** | B but canvas fixed behind all content, lower opacity, `pointer-events: none`, click disabled or captured on a hero layer | You want the network everywhere; be careful with readability and battery |

Option B is documented end-to-end below; A skips steps 4–5; C uses the alternative engine with `position: fixed`.

> **Porting to a different product?** Read §11 before choosing. The correct scope, density, and click model depend on the target app's content and brand; the portfolio defaults are not automatically the best fit.

### 10.2 Add the tokens

1. Copy the `:root` and `.dark` blocks from §3 into your global stylesheet.
2. Make sure your app toggles `class="dark"` / `class="light"` on `<html>`, or adapt the theme selector.
3. If your design tokens are hex/rgba rather than RGB triplets, either convert them to triplets (best, keeps `rgb(var(--x) / a)` working) or replace the CSS `rgb(var(--line) / 0.05)` occurrences with `color-mix(in srgb, var(--line) 5%, transparent)`.

### 10.3 Add the backdrop CSS and mount it

1. Paste the CSS from §4.2 into your global stylesheet (or translate it to utility classes).
2. Add the markup from §4.2 as the **first child** of your page shell, before content.
3. Set the shell to `position: relative`; give content `position: relative; z-index: 10`.
4. Remove any opaque background from intermediate wrappers so the grid/glows can show through, or accept that the backdrop only appears where wrappers are transparent. The body background color should match `--background`.

### 10.4 Add the particle canvas

1. Create `components/ParticleNetwork.tsx` with the code from §5.8.
2. In your hero section:
   - `position: relative; overflow: hidden;`
   - canvas: `position: absolute; inset: 0; width: 100%; height: 100%; display: block;`
   - ensure the section has a real height (`min-height: 100svh` or content).
3. Add the focus vignette div from §6 directly after the canvas.
4. Put hero content in a wrapper with `position: relative; z-index: 10; pointer-events: none`, and add `pointer-events: auto` to every link/button.
5. Verify clicks fire: add `console.log('wave')` inside `handleClick` temporarily.

### 10.5 Wire the theme

- If you use `next-themes`: `<ThemeProvider attribute="class" defaultTheme="dark">`; nothing else needed — the component's MutationObserver sees the class.
- If you use a custom toggle: `document.documentElement.classList.toggle('dark')`; same observer picks it up.
- If you use only system preference: delete the observer and rely on the media query listener.
- Test: toggling the theme should recolor dots/lines/bolts within one frame, with no canvas recreation.

### 10.6 Add grain (optional but recommended)

1. Add `.luxe-grain::after` from §7 to global CSS.
2. Add `luxe-grain` to `<body>`.
3. Keep opacity ≤ 0.04.

### 10.7 Verify the click-through

- Click on the hero headline: a bolt should originate at the pointer.
- Click on a CTA: it should navigate, not spawn a bolt (because it has `pointer-events: auto`).
- Click in the empty margin: bolt.
- Scroll the page: the hero canvas scrolls away with the section (not fixed).
- Resize the window: node density and radius rescale, canvas stays sharp.

### 10.8 Done checklist

- [ ] Grid visible at the top, fading out by ~75% of the viewport.
- [ ] Warm glow at top center, subtle emerald only on desktop.
- [ ] Vignette darkens the corners.
- [ ] Grain visible at 100% zoom (barely) and invisible on photos.
- [ ] Dots drift slowly and wrap around edges.
- [ ] Lines fade with distance and disappear at the threshold.
- [ ] Click produces a branching lightning wave with a comet tail.
- [ ] Node flashes as the wave arrives.
- [ ] Theme toggle recolors everything instantly.
- [ ] No layout shift on load; canvas fills its section.
- [ ] No console errors on mount/unmount (React Strict Mode).
- [ ] Reduced-motion users see gentler drift.
- [ ] 60 fps on a mid-range laptop; no long frames while scrolling.

---

## 11. Adapting this to a different application (decision guide)

The portfolio background works because the hero is **mostly empty, dark, and display-only**. Copying it 1:1 into a content-heavy app, dashboard, docs site, or checkout flow will hurt readability, INP, and conversion. The rule is:

> **Visual intensity ∝ empty space × brand boldness ÷ content density.**

This section turns that rule into concrete decisions. Use the defaults unless the target app gives you a reason to deviate.

### Quick decision tree (read this first)

1. **Does the first viewport contain a form, table, or more than a few lines of body copy?**
   → Use the **static backdrop only** (grid + one glow + vignette + optional grain). No canvas.
2. **Is the hero sparse and display-only (portfolio, launch, campaign)?**
   → Use the **hero-only canvas**, then pick the click model in §11.4.
3. **Is the product mostly authenticated app screens (dashboard, admin, inbox)?**
   → **No particles.** Optionally keep a very subtle grid in the app shell.
4. **Is it a marketing or creative site with card-based content below the fold?**
   → Either hero-only, or a fixed full-page canvas with an IntersectionObserver pause.
5. **Is the device touch-first or low-end?**
   → Halve density, cap DPR at 1.5, and disable click-spawned waves (keep ambient drift or freeze).
6. **Anything still ambiguous?**
   → Ship the **§11.10 recommended default**: hero-only, brand-tinted, content-first, 56 nodes, grain scoped to the hero.

### 11.1 Inputs to collect before writing code

| Question | Why it matters | Default if unknown |
|---|---|---|
| What is the app's primary job? (convert / read / operate / browse) | Marketing pages can afford motion; tools cannot | Marketing |
| How dense is the hero? (headline only, or headline + form + cards) | Dense heroes need lower density or no canvas | 3–5 elements |
| Brand accent color and dark/light default | Particle glow and line tint must come from the brand | Dark, one accent |
| Does the hero contain forms, tables, CTAs, or selectable copy? | Decides the click model | Yes → content-first |
| Framework and rendering mode (SSR/SSG/SPA) | Effect placement and hydration safety | Next.js App Router |
| Mobile share and low-end audience | Density, DPR, and click behavior | 50% mobile |
| Existing motion policy / accessibility budget | Reduced motion, toggle, vestibular safety | Respect OS setting |
| Existing z-index scale and modal layers | Grain and canvas stacking | Content 10, grain below modals |

### 11.2 Decision 1 — Coverage

| Option | Behavior | Best for | Watch out |
|---|---|---|---|
| **Hero-only** (recommended) | Canvas is absolute inside the hero; scrolls away | Marketing pages, portfolios, landing pages | Needs a real hero height |
| **Fixed full-page** | Canvas fixed behind all content; pages need transparent surfaces | Creative/agency sites with card-based content | Must pause off-screen; never behind long text/forms |
| **Route-specific** | Landing page gets the full effect, app routes get nothing | SaaS with marketing + product in one codebase | Keep the engine out of authenticated layouts |
| **Backdrop only** | Grid + glows + vignette, no canvas | Dashboards, docs, e-commerce | Zero interaction cost |

**Rule of thumb:** if more than ~30% of the first viewport is text/controls, use hero-only or backdrop-only. Do not put a moving particle field behind a form.

### 11.3 Decision 2 — Density and intensity

Match the engine constants to content density instead of using the portfolio values blindly.

| Hero density | `COUNT` | `threshold` | `lineAlpha` | Click waves | Grain |
|---|---|---|---|---|---|
| Sparse / display-only | 60–80 | `0.15 × diag` | 0.45–0.55 | Yes | 0.03 |
| Medium (CTA, short form) | 40–55 | `0.13 × diag` | 0.30–0.40 | Optional | 0.02 |
| Dense (cards, table, inputs) | 0 | — | — | No | 0–0.015 |
| Full-page creative | 80–110 | `0.16 × diag` | 0.35–0.45 | Delegated | 0.03 |

Also scale by area, not just by taste: `COUNT ≈ 69 × (viewportArea / (1440 × 900))`, clamped to the range above. A 4K monitor should not have the same 69 nodes as a phone.

### 11.4 Decision 3 — Click model

This is the most important behavioral change for a non-portfolio app.

| Model | How it works | Pros | Cons | Use when |
|---|---|---|---|---|
| **Portfolio click-through** | Hero content wrapper has `pointer-events: none`; clicks fall to the canvas | Maximum effect; clicking text works | Text cannot be selected; links need explicit opt-in | Display-only hero |
| **Content-first delegation** (recommended) | Content keeps normal pointer events; a section-level `click` handler ignores interactive targets and forwards coordinates to the engine | Preserves selection and normal UX; no accidental waves on buttons | Clicking content may still wave unless filtered | Apps with copy, forms, or links |
| **Ambient-only** | No click; a timer starts a wave from a random node every 8–12 s | Always alive, zero interaction risk | Less personal | Content-heavy pages |
| **None** | No waves | Safest | Loses the signature moment | Dashboards, checkout |

Content-first pattern (keep the canvas non-interactive):

```tsx
<section
  className="relative"
  onClick={(event) => {
    const target = event.target as HTMLElement
    if (target.closest('a, button, input, textarea, select, [role="button"], [contenteditable="true"]')) return
    if (window.getSelection()?.toString()) return // don't interrupt text selection
    window.dispatchEvent(
      new CustomEvent('particle:wave', { detail: { x: event.clientX, y: event.clientY } }),
    )
  }}
>
  <ParticleNetwork className="pointer-events-none absolute inset-0 h-full w-full" />
  {/* vignette, then normal content with default pointer events */}
</section>
```

In the engine, refactor `handleClick` into `fireAt(clientX, clientY)` and listen for that event, so the canvas itself needs no pointer events. `fireAt` must convert viewport coordinates to canvas-local coordinates (`clientX - canvas.getBoundingClientRect().left`, same for `y`). This is the single biggest usability improvement over the portfolio implementation.

### 11.5 Decision 4 — Palette

- **Glow:** use the brand's primary accent, not the portfolio cyan. Convert to an RGB triplet for the engine palette.
- **Dots/links:** keep them neutral (gray in dark mode, slate in light mode). Tinting everything makes the field look like a screensaver.
- **Light theme:** lower `lineAlpha` by ~0.05–0.1 versus dark, and darken the glow. Cyan-on-white looks toy-like; a deep brand tone reads better.
- **Two accents:** if the brand has a secondary color, use it for the wide ambient pool (the portfolio's emerald role), not for the lightning.
- **Contrast:** put the hero vignette behind text and check the worst-case contrast; never rely on the particle field itself for contrast.

Example remap:

```ts
// brand #7C5CFF, dark theme
dark: { dot: [161, 161, 170], glow: [124, 92, 255], line: '113, 113, 122', lineAlpha: 0.45, treeAlpha: 0.9 }
// light theme
light: { dot: [71, 85, 105], glow: [91, 61, 214], line: '100, 116, 139', lineAlpha: 0.4, treeAlpha: 0.85 }
```

### 11.6 Decision 5 — Effects budget by device

| Condition | Changes |
|---|---|
| Desktop, fine pointer | Full effect, click waves enabled |
| Tablet | 75% density, 80% alpha, clicks optional |
| Mobile / coarse pointer | 50–65% density, DPR cap 1.5, disable click spawns or make waves ambient-only |
| Low-end device / low FPS | Reduce `COUNT`, disable waves, keep static backdrop |
| `prefers-reduced-motion` | 35% drift or static field; no auto waves; no parallax |
| `prefers-reduced-data` / save-data | Static CSS backdrop only |
| Print | Hide canvas, glows, grain; keep readable text |

Do not decide by user-agent. Use capability and preference signals: `matchMedia('(pointer: coarse)')`, `matchMedia('(prefers-reduced-motion: reduce)')`, `navigator.connection?.saveData`, and a measured FPS sample.

### 11.7 Decision matrix by app type

| Target app | Backdrop | Particles | Click | Grain | Additional changes |
|---|---|---|---|---|---|
| Portfolio / personal site | Full | Hero-only, 60–80 | Portfolio or content-first | 0.03 | Closest to this repo |
| SaaS marketing site | Grid + one glow | Hero-only, 45–60 | Ambient-only or empty-space only | 0.02, hero-scoped | Reduce glow opacity behind pricing |
| SaaS product / dashboard | Subtle grid only | None | None | None | Keep the app shell clean |
| Blog / documentation | Very subtle grid or none | None | None | None | Reading comfort first |
| E-commerce / checkout | Brand gradient only | Hero-only, 30–40 | None | 0.015, hero only | Never animate near buy CTAs |
| Creative agency | Full | Full-page fixed, 80–110 | Delegated | 0.03 | Pause with IntersectionObserver |
| Resume / CV page | Backdrop + grain | None | None | 0.02 | Ensure print styles hide effects |
| Event / launch page | Full | Hero, 50–70 | Yes | 0.03 | Add a motion toggle for accessibility |

### 11.8 Improvements to make in the target app

These are deliberate upgrades over the original implementation. Apply the ones that fit the target; items 1–4 are recommended almost everywhere, and item 5 for any fixed canvas.

1. **Content-first click handling** — preserve text selection and normal controls (§11.4).
2. **Theme-class awareness** — already added in §5.8; otherwise the canvas ignores the app's theme toggle.
3. **Particle cap + recycling** — prevents unbounded growth on repeated clicks.
4. **Reduced-motion scaling** — 35% drift; optionally disable waves entirely.
5. **Visibility and off-screen pause** — mandatory for a fixed full-page canvas:

   ```ts
   let running = !document.hidden
   const io = new IntersectionObserver(([entry]) => {
     running = entry.isIntersecting && !document.hidden
     if (running) kick()
     else cancelAnimationFrame(raf)
   })
   io.observe(canvas)
   document.addEventListener('visibilitychange', () => {
     running = !document.hidden
     if (running) kick()
   })
   ```

6. **Adaptive quality** — sample the first ~2 seconds; if average frame time exceeds ~22 ms, downgrade once (lower `COUNT`, DPR cap 1.5, disable click waves). Keep it one-way to avoid oscillation.
7. **Batched link rendering** — for `COUNT > 120`, bucket line alphas into 6–8 levels and stroke one path per bucket instead of one path per pair. At 69 nodes this is unnecessary.
8. **Spatial grid for very high density** — only if you go above ~150 nodes; otherwise the O(n²) pair loop is cheaper than the bookkeeping.
9. **A persisted motion toggle** — "Reduce animations" in settings or footer, stored in `localStorage`, overriding the OS preference in both directions.
10. **Static fallback** — if canvas creation fails or JS is disabled, the CSS backdrop alone must still look intentional.
11. **Scoped grain** — in app contexts, put grain below modals/dropdowns (or only on the hero). A full-screen `z-70` overlay above dialogs can look like dirty glass.
12. **Light-theme pass** — verify dots, lines, and bolts on pure white; lower alpha and darken the glow.
13. **No custom cursor** — the portfolio's gold cursor is charming on a portfolio and hostile in a tool. Drop it unless the brand is explicitly experiential.
14. **No preloader gate** — never delay an app's content for a background animation.

### 11.9 Keep, change, drop

| Item | Verdict | Reason |
|---|---|---|
| 72px grid + radial mask | Keep, tune spacing | Cheap and brand-neutral |
| Gold/emerald light pools | Change colors/opacity | Must match the target brand |
| Inset vignette | Keep | Protects text contrast |
| BFS particle engine | Keep, retune or hero-scope | Signature effect; density is the variable |
| Click-through content (`pointer-events: none`) | Change to content-first | Breaks selection in real apps |
| Film grain at `z-70` | Change/scope | Can sit above modals and forms |
| Custom cursor | Drop | Usability and accessibility risk |
| Preloader | Drop | Delays content; not a background concern |
| Marquee | Drop unless brand-appropriate | Separate from the background |

### 11.10 Recommended default (no other constraints)

If you have no strong reason to deviate, ship this:

- **Coverage:** hero-only canvas; fixed backdrop only on the landing route.
- **Density:** `COUNT = 56`, `threshold = 0.14 × diag`, drift at the original speed.
- **Palette:** neutral dots/lines, brand-primary glow, light-theme alpha reduced by 0.08.
- **Click:** content-first delegation on desktop; ambient-only (or none) on touch.
- **Effects:** grain `0.02`, scoped to the hero; grid 72px; one glow, no second pool unless the brand has a secondary color.
- **Performance:** DPR cap 2, pause off-screen, one-way quality downgrade, reduced-motion scaling.
- **Safety:** static CSS fallback, feature flag, persisted motion toggle.
- **Exclude:** custom cursor, preloader, marquee, full-page particle field.

This keeps the recognizable feel while behaving like a good citizen in a product or content site.

### 11.11 Rollout and measurement

1. Implement behind a flag (`?bg=on|off`, env var, or settings toggle).
2. Measure before/after: LCP, INP, long tasks, and a 10-second FPS sample on a mid-range phone.
3. Keep the static backdrop as the fallback path.
4. Roll out to the landing page first; only extend to app routes if metrics hold.
5. Add a user-facing "Reduce motion" toggle and persist it.
6. Review with real content: the busiest page, the longest form, and the smallest phone.

---

## 12. Framework-specific notes

### Next.js (App Router) — same as this repo

```
src/
├─ app/
│  ├─ layout.tsx        // body className includes "luxe-grain"
│  ├─ globals.css       // tokens + backdrop + grain
│  └─ page.tsx          // <LuxeBackdrop /> + <ParticleNetwork /> in hero
├─ components/
│  ├─ LuxeBackdrop.tsx  // 'use client' is optional; it has no hooks
│  └─ ParticleNetwork.tsx // MUST be 'use client'
```

- Add `'use client'` to the canvas component only.
- Import it in a Server Component page; that is allowed (the client boundary is the canvas itself).
- Do **not** import `window`-using code at module scope.

### Vite / CRA React

- Drop the component in `src/components/`.
- Put tokens/backdrop CSS in `src/index.css`.
- Add `luxe-grain` to `<body class="luxe-grain">` in `index.html`.
- Theme: toggle `document.documentElement.classList`; no provider needed.

### Vue 3

- Use the same classes: `onMounted` → run the `useEffect` body; `onBeforeUnmount` → cleanup.
- Keep the engine in a plain `.ts` file (`createParticleNetwork(canvas)`), and call it from the component. This is the cleanest port and avoids duplicating class logic.

### Svelte / SvelteKit

- `onMount(() => { const cleanup = createParticleNetwork(canvas); return cleanup })`.
- Same plain-JS engine module as Vue.

### Plain HTML / no build step

- Use the appendix in §16. Include the tokens, backdrop CSS, and grain CSS inline or in a stylesheet.
- Everything is ES2017+; no transpiler required.

### Tailwind notes

If you keep Tailwind, map the tokens in `tailwind.config` (as this repo does):

```js
colors: {
  background: 'rgb(var(--bg) / <alpha-value>)',
  surface: 'rgb(var(--surface) / <alpha-value>)',
  card: 'rgb(var(--card) / <alpha-value>)',
  ink: 'rgb(var(--ink) / <alpha-value>)',
  muted: 'rgb(var(--muted) / <alpha-value>)',
  line: 'rgb(var(--line) / <alpha-value>)',
  gold: {
    DEFAULT: 'var(--gold)',
    soft: 'var(--gold-soft)',
    ink: 'var(--gold-ink)',
    deep: 'var(--gold-deep)',
  },
}
```

And `darkMode: 'class'`. With Tailwind v4, define the same variables in `@theme` or use arbitrary values; the canvas does not care about Tailwind at all.

---

## 13. Tuning cookbook

**"Calmer / more minimal"**

```ts
COUNT = 45
threshold = 0.12 * diag
node speed = 0.000012–0.000025 * diag
lineAlpha = 0.35
```

**"Denser, more dramatic network"**

```ts
COUNT = 95
threshold = 0.18 * diag
lineAlpha = 0.55
```

**"Faster, snappier lightning"**

```ts
waveSpeed = 0.0016 * diag per ms
tail = 0.045 * diag
```

**"Slow, cinematic crawl"**

```ts
waveSpeed = 0.0004 * diag per ms
tail = 0.02 * diag
pulse speed = 0.003
```

**Blue → gold lightning** (match a gold-accented brand):

```ts
dark:  { glow: [211, 171, 99],  dot: [226, 232, 240] }
light: { glow: [154, 116, 24],  dot: [71, 85, 105] }
```

**Green terminal aesthetic**:

```ts
glow: [52, 211, 153]
line: '52, 211, 153'
lineAlpha: 0.18
```

**Disable click interaction** (for a full-page decorative field):

- Remove `canvas.addEventListener('click', handleClick)` and the handler.
- Or keep waves but trigger them on a timer: every 6–10 s pick a random active node and start a wave. This gives life without demanding interaction.

**Pause when off-screen** (recommended for full-page / option C):

```ts
const io = new IntersectionObserver(([entry]) => {
  running = entry.isIntersecting && !document.hidden
  if (running) kick()
  else cancelAnimationFrame(animationFrameId)
})
io.observe(canvas)
```

Also add `document.addEventListener('visibilitychange', ...)` as a belt-and-braces pause.

**Mobile budget:**

- `COUNT` × 0.7
- DPR cap 1.5
- Disable click spawns on `(pointer: coarse)` if the field sits behind scrollable content
- Consider a static CSS-only backdrop on small screens

---

## 14. QA checklist and acceptance criteria

### Visual

- Grid lines are exactly 72px apart and fade radially from the top; no visible tiling seams.
- Gold pool is centered and clipped by the viewport (no horizontal scrollbar).
- Emerald pool is absent below 768px.
- Corners are darker than the center (vignette).
- Grain is uniform, fixed during scroll, and does not tint photos.

### Behavioral

- A click anywhere in the hero (except on links/buttons) starts a wave at the pointer.
- The wave branches, not just one line; branches terminate at isolated nodes.
- Each bolt has a bright head and a shortened tail; it does not draw the full edge instantly.
- Reached nodes flash and slightly grow.
- Nodes that drift off-screen reappear from the opposite edge with inward velocity.
- Repeated clicks do not degrade performance indefinitely (cap + recycling).
- Theme toggle switches palettes without resetting the animation.

### Technical

- `prefers-reduced-motion: reduce` → slower drift, no cursor, CSS animations neutralized.
- Canvas is `aria-hidden`, not focusable, and does not capture keyboard events.
- Resize from 320px to 4K keeps dots round and lines crisp.
- No memory growth after 5 minutes of clicking (heap stable).
- Unmount/remount leaves exactly one animation loop.
- Lighthouse: no new accessibility violations; CLS 0 from the background.

---

## 15. Known pitfalls

1. **Opaque ancestor hides a `-z-10` backdrop.** If the fixed backdrop uses negative z-index and any wrapper has an opaque background, the wrapper paints over it. Fix: mount the backdrop at `z-0` as a sibling and wrap content at `z-10`, or remove the opaque wrapper background.
2. **Canvas has zero height.** `height: 100%` inside an auto-height parent collapses. Give the hero `min-height` or explicit height.
3. **Canvas is inline by default**, adding a few px of baseline gap. Use `display: block`.
4. **Clicking text doesn't work** because content sits above the canvas with normal pointer events. Use `pointer-events: none` on the content wrapper and `auto` on interactive elements.
5. **The click never fires** because an overlay (vignette) is above the canvas without `pointer-events: none`.
6. **Theme toggle doesn't affect the canvas** in the original BFS file — it only follows the OS. Add the class/`MutationObserver` code (already in §5.8).
7. **Unbounded particle growth** on repeated clicks (original BFS). Cap and recycle.
8. **Culling breaks bolts:** if a node with `deg > 0` is deactivated or removed, edges reference a dead node. Keep `deg` pinning and never splice.
9. **`shadowBlur` is expensive:** if porting the alternative engine, limit concurrent waves and avoid per-line shadow in the ambient web.
10. **rAF after unmount:** missing `cancelAnimationFrame` causes ghost loops in dev/Strict Mode.
11. **DPR mismatch:** setting `canvas.width` from CSS pixels without the DPR multiplier makes everything blurry; setting it on every frame is wasteful. Resize only when CSS size/DPR changes.
12. **Time jumps:** without clamping `dt`, returning to a background tab flings nodes across the screen and completes waves instantly.
13. **Tailwind `max-width: 100%`** clamps the 1100px glow blob; use `max-w-none` or plain CSS.
14. **`mask-image` needs the `-webkit-` prefix** for older Safari; include both.
15. **Grain too strong:** >0.05 opacity looks like noise, not film. Keep ~0.03.
16. **Negative `z-index` inside a transformed/filtered section** is trapped in that stacking context and may disappear. Avoid transforms on ancestors of the backdrop.
17. **Force-reduced-motion CSS** sets `animation-duration: 0.01ms !important`, which does not affect canvas. Handle reduced motion in JS as well.
18. **`COUNT` is a soft target, not a hard cap.** The engine samples the active count once per frame and then respawns every inactive node while that snapshot is below `COUNT`. With click-spawned extras, one frame can revive several nodes and the field can settle denser than 69. If you need an exact cap, increment a local budget inside the update loop:

    ```ts
    let budget = activeCount
    for (const p of particles) {
      if (!p.active && budget < COUNT) {
        p.respawn()
        budget++
      }
    }
    ```

---

## 16. Appendix — plain-JS version

A standalone port for non-React apps. Same algorithm, same constants, no build step. Drop this at the end of `<body>`; the canvas must be sized by CSS.

```html
<style>
  .hero {
    position: relative;
    overflow: hidden;
    min-height: 100svh;
    background: var(--background);
  }
  .hero canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
  .hero__content {
    position: relative;
    z-index: 10;
    pointer-events: none;
  }
  .hero__content a,
  .hero__content button {
    pointer-events: auto;
  }
  .hero__vignette {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(
      ellipse 62% 52% at 50% 42%,
      transparent 40%,
      rgb(var(--bg) / 0.55) 100%
    );
  }
</style>

<section class="hero">
  <canvas data-particle-network aria-hidden="true"></canvas>
  <div class="hero__vignette" aria-hidden="true"></div>
  <div class="hero__content">
    <!-- your content -->
  </div>
</section>

<script>
  ;(() => {
    const canvas = document.querySelector('[data-particle-network]')
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const COUNT = 69
    const MAX_PARTICLES = 120
    const THEMES = {
      dark: {
        dot: [161, 161, 170],
        glow: [56, 189, 248],
        line: '113, 113, 122',
        lineAlpha: 0.5,
        treeAlpha: 0.85,
      },
      light: {
        dot: [113, 113, 122],
        glow: [2, 132, 199],
        line: '113, 113, 122',
        lineAlpha: 0.55,
        treeAlpha: 0.9,
      },
    }

    const html = document.documentElement
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const motionScale = reduced ? 0.35 : 1

    let width = 0
    let height = 0
    let dpr = 1
    let threshold = 0
    let nodes = []
    let waves = []
    const extras = []

    let override = html.classList.contains('dark')
      ? true
      : html.classList.contains('light')
        ? false
        : null
    let theme = (override ?? media.matches) ? THEMES.dark : THEMES.light
    const applyTheme = () => {
      theme = (override ?? media.matches) ? THEMES.dark : THEMES.light
    }
    media.addEventListener('change', () => {
      if (override === null) applyTheme()
    })
    new MutationObserver(() => {
      override = html.classList.contains('dark')
        ? true
        : html.classList.contains('light')
          ? false
          : null
      applyTheme()
    }).observe(html, { attributes: true, attributeFilter: ['class'] })

    function makeNode(x, y) {
      const initial = x === undefined
      const node = {
        x: initial ? -threshold + (width + 2 * threshold) * Math.random() : x,
        y: initial ? -threshold + (height + 2 * threshold) * Math.random() : y,
        vx: 0,
        vy: 0,
        size: 0.0012 + 0.001 * Math.random(),
        pulse: initial ? -20 * Math.random() : 0,
        deg: 0,
        active: true,
      }
      const angle = 2 * Math.PI * Math.random()
      const speed = 0.00002 + 0.00002 * Math.random()
      node.vx = speed * Math.cos(angle)
      node.vy = speed * Math.sin(angle)
      return node
    }

    function respawn(node) {
      const perimeter = 2 * (width + height) * Math.random()
      let angle = (1 / 6 + (2 * Math.random()) / 3) * Math.PI

      if (perimeter < width) {
        node.x = perimeter
        node.y = -threshold
      } else if (perimeter - width < height) {
        angle += Math.PI / 2
        node.x = width + threshold
        node.y = perimeter - width
      } else if (perimeter - width - height < width) {
        angle += Math.PI
        node.x = perimeter - width - height
        node.y = height + threshold
      } else {
        angle += (3 * Math.PI) / 2
        node.x = -threshold
        node.y = perimeter - 2 * width - height
      }

      const speed = 0.00002 + 0.00002 * Math.random()
      node.size = 0.0012 + 0.001 * Math.random()
      node.vx = speed * Math.cos(angle)
      node.vy = speed * Math.sin(angle)
      node.pulse = 1
      node.active = true
    }

    function resize() {
      const rect = canvas.getBoundingClientRect()
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2)
      if (rect.width === width && rect.height === height && nextDpr === dpr) return

      width = Math.max(rect.width, 1)
      height = Math.max(rect.height, 1)
      dpr = nextDpr
      threshold = 0.15 * Math.hypot(width, height)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)

      if (!nodes.length) {
        nodes = Array.from({ length: COUNT }, () => makeNode())
      }
    }

    function visit(wave, index) {
      const start = nodes[index]
      if (!start || wave.vis[index]) return
      start.pulse = 0
      wave.vis[index] = true

      for (let i = 0; i < nodes.length; i++) {
        const target = nodes[i]
        if (wave.vis[i] || !target.active) continue
        if (Math.hypot(start.x - target.x, start.y - target.y) <= threshold) {
          wave.edges.push({ from: index, to: i, progress: 0 })
          start.deg++
          target.deg++
        }
      }
    }

    function startWave(index) {
      const wave = { vis: new Array(nodes.length).fill(false), edges: [] }
      visit(wave, index)
      waves.push(wave)
    }

    function update(dt) {
      const diag = Math.hypot(width, height)
      const activeCount = nodes.reduce((n, node) => n + (node.active ? 1 : 0), 0)

      for (const node of nodes) {
        if (!node.active) {
          if (activeCount < COUNT) respawn(node)
          continue
        }
        if (
          !node.deg &&
          (node.x < -threshold ||
            node.x > width + threshold ||
            node.y < -threshold ||
            node.y > height + threshold)
        ) {
          node.active = false
          continue
        }
        node.pulse = Math.min(node.pulse + 0.005 * dt * motionScale, 1)
        node.x += node.vx * diag * dt * motionScale
        node.y += node.vy * diag * dt * motionScale
      }

      for (const wave of waves) {
        while (wave.vis.length < nodes.length) wave.vis.push(false)
        const reached = []

        for (let i = wave.edges.length - 1; i >= 0; i--) {
          const edge = wave.edges[i]
          const a = nodes[edge.from]
          const b = nodes[edge.to]
          if (!a || !b) {
            wave.edges.splice(i, 1)
            continue
          }
          const distance = Math.hypot(a.x - b.x, a.y - b.y)
          edge.progress += 0.0009 * diag * dt
          if (edge.progress >= distance) {
            wave.edges.splice(i, 1)
            a.deg = Math.max(0, a.deg - 1)
            b.deg = Math.max(0, b.deg - 1)
            reached.push(edge.to)
          }
        }

        for (const index of reached) visit(wave, index)
      }

      waves = waves.filter((wave) => wave.edges.length > 0)
    }

    function draw() {
      const diag = Math.hypot(width, height)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = Math.max(0.0006 * diag, 0.75)

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        if (!a.active) continue
        for (let j = 0; j < i; j++) {
          const b = nodes[j]
          if (!b.active) continue
          const distance = Math.hypot(a.x - b.x, a.y - b.y)
          if (distance < threshold) {
            ctx.strokeStyle = `rgba(${theme.line}, ${theme.lineAlpha * (1 - distance / threshold)})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      ctx.strokeStyle = `rgba(${theme.glow.join(',')}, ${theme.treeAlpha})`
      for (const wave of waves) {
        for (const edge of wave.edges) {
          const a = nodes[edge.from]
          const b = nodes[edge.to]
          if (!a || !b) continue
          const distance = Math.hypot(a.x - b.x, a.y - b.y)
          if (!distance) continue

          const tail = 0.03 * diag
          const headRatio = Math.min((edge.progress / distance) * ((distance + tail) / distance), 1)
          const tailRatio = Math.max(headRatio - tail / distance, 0)

          ctx.beginPath()
          ctx.moveTo(a.x + (b.x - a.x) * tailRatio, a.y + (b.y - a.y) * tailRatio)
          ctx.lineTo(a.x + (b.x - a.x) * headRatio, a.y + (b.y - a.y) * headRatio)
          ctx.stroke()
        }
      }

      for (const node of nodes) {
        if (!node.active) continue
        const p =
          node.pulse >= 0 && node.pulse < 1 ? Math.sin(Math.PI * Math.sqrt(node.pulse)) : 0
        const radius = Math.max(node.size * diag, 1.25) + Math.max(0.0012 * diag, 1) * p
        const [r1, g1, b1] = theme.dot
        const [r2, g2, b2] = theme.glow
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgb(${r1 + (r2 - r1) * p}, ${g1 + (g2 - g1) * p}, ${b1 + (b2 - b1) * p})`
        ctx.fill()
      }
    }

    let last = performance.now()
    let raf = 0

    function frame(time) {
      raf = requestAnimationFrame(frame)
      resize()
      const dt = Math.min(time - last, 100)
      last = time
      update(dt)
      draw()
    }

    canvas.addEventListener('click', (event) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      let index

      if (nodes.length < MAX_PARTICLES) {
        nodes.push(makeNode(x, y))
        index = nodes.length - 1
        extras.push(index)
      } else {
        while (extras.length && !nodes[extras[0]].active) extras.shift()
        index = extras.shift()
        if (index === undefined) return
        Object.assign(nodes[index], makeNode(x, y))
        extras.push(index)
      }

      startWave(index)
    })

    resize()
    raf = requestAnimationFrame(frame)
    window.addEventListener('beforeunload', () => cancelAnimationFrame(raf), { once: true })
  })()
</script>
```

---

## 17. Copy checklist

**Minimum files to replicate the full hero background**

| # | File | Source | Action |
|---|---|---|---|
| 1 | Global CSS tokens | `portfolio/src/app/globals.css` lines 9–53 | Copy `:root` + `.dark` |
| 2 | Grid utility | same file, `.luxe-grid-bg` | Copy |
| 3 | Grain utility | same file, `.luxe-grain::after` | Copy |
| 4 | Backdrop component | `portfolio/src/components/luxe/Backdrop.tsx` | Copy, or use CSS/markup from §4.2 |
| 5 | Particle engine | `portfolio/src/components/luxe/ParticleNetworkBFS.tsx` | Copy, or use §5.8 portable version |
| 6 | Hero composition | `portfolio/src/components/sections/Hero.tsx` lines 27–52 | Copy structure |
| 7 | Body grain class | `portfolio/src/app/layout.tsx` line 68 | Add `luxe-grain` |
| 8 | Theme provider | `portfolio/src/components/ThemeProvider.tsx` | Optional; any class toggle works |
| 9 | Cursor (optional) | `portfolio/src/components/luxe/Cursor.tsx` + CSS | Optional |
| 10 | Scroll progress (optional) | `portfolio/src/components/luxe/ScrollProgress.tsx` | Optional, needs Framer Motion |

**Port order:** tokens → backdrop → grain → hero markup → canvas → theme observer → verify → tune.

**Do not port:** the site's profile image, copy, stats, social links, or preloader unless you want the full page experience. The background is independent of all of them.

---

*End of plan. If you want the exact look of this site, port `ParticleNetworkBFS.tsx` (not `ParticleNetwork.tsx`) plus `Backdrop.tsx` and the three CSS utilities; everything else is optional atmosphere.*

