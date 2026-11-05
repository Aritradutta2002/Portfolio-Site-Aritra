# Portfolio Transformation Audit — Phase 0

**Target Site:** `https://www.aritrodutta.tech/`  
**Repository Branch:** `feature/vengenceui` (commit `a691523`)  
**Audit Date:** 2026-11-05  
**Auditor Mode:** Read-Only Audit (Phase 0)

---

## 1. Technical Stack Overview

| Dimension | Measured Value / Configuration |
|---|---|
| **Framework & Router** | Next.js `15.5.12` — **App Router** (`portfolio/src/app`) |
| **Language & Engine** | TypeScript `5.9.3`, React `19.1.0` / React DOM `19.1.0` |
| **CSS Framework** | Tailwind CSS `^3.4.17` (configured in `tailwind.config.cjs`, PostCSS `^8.5.6`) |
| **Package Manager** | `npm` (lockfile version 3, `portfolio/package-lock.json`) |
| **Animation Libraries** | `framer-motion` (`^12.23.16`), `lenis` (`^1.3.23`) |
| **3D & Graphics Libs** | `three` (`^0.184.0`), `@react-three/fiber` (`^9.6.1`), `@react-three/drei` (`^10.7.7`) |
| **UI Utility Libraries** | `lucide-react` (`^0.544.0`), `@heroicons/react` (`^2.2.0`), `react-rnd` (`^10.5.3`), `next-themes` (`^0.4.6`) |
| **Shadcn Status** | `components.json` is **absent** (to be added in Phase 2) |
| **Theming Implementation** | `next-themes` (`ThemeProvider` in `portfolio/src/components/ThemeToggle.tsx` and `portfolio/src/styles/datasheet.css`) supporting Dark Space and Luxury Porcelain Day themes |
| **Font Implementation** | System font stack in `tailwind.config.cjs` (Geist & Geist Mono planned for Phase 3 via `next/font/google`) |
| **Host / Deploy Config** | Vercel (`next.config.mjs`) |
| **Analytics Scripts** | None active in initial markup (Vercel Analytics + Speed Insights scheduled for Phase 12) |
| **Environment Variables (Names only)** | `NVIDIA_API_KEY`, `NVIDIA_CHAT_MODEL`, `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`, `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`, `NODE_ENV` |

---

## 2. Stack Verdict: **S1 (Next.js App Router + Tailwind)**

Per `Plan.md` §6.3, the project is classified as **Verdict S1**:
- Next.js 15.5 App Router is native.
- Tailwind CSS v3 is active.
- `framer-motion` is already the installed animation engine (Rule 6 compliant).
- `lenis` is already installed.
- **Action:** Proceed as planned with standard phase progression without framework migration (`docs/MIGRATION.md` is NOT required).

---

## 3. Route Map & Protected Boundaries

### Public Route Surface
- `/` — Homepage / Datasheet view (`portfolio/src/app/(datasheet)/page.tsx`)
- `/desktop` — Interactive MacOS-style OS workspace (`portfolio/src/app/desktop/page.tsx`)
- `/classic` — Minimal plain-text / printable view (`portfolio/src/app/classic/page.tsx`)
- `/resume` — Interactive résumé companion (`portfolio/src/app/resume/page.tsx`)
- `/social` — Social directory (`portfolio/src/app/social/page.tsx`)
- `/blog` — Technical blog view (`portfolio/src/app/blog/page.tsx`)
- `/no-stalking` — Security disclaimer (`portfolio/src/app/no-stalking/page.tsx`)

### API Route Surface
- `/api/chat` (`portfolio/src/app/api/chat/route.ts`) — AI résumé query endpoint
- `/api/contact` (`portfolio/src/app/api/contact/route.ts`) — Direct contact dispatch

### 🛡️ Protected Component Audit: AI Résumé Assistant
- **Files:** `portfolio/src/app/api/chat/route.ts`, `portfolio/src/lib/rateLimit.ts`, `portfolio/src/lib/nvidiaChat.ts`, `portfolio/src/lib/portfolioContext.ts`.
- **Status:** **STRICTLY PROTECTED.** Do not alter request/response contracts, model prompts, or rate limiting.
- **Rate Limit Verification:** **SERVER-SIDE CONFIRMED.** The rate limiter resides in `portfolio/src/lib/rateLimit.ts` and is enforced at the entry of `POST` in `/api/chat/route.ts` (10 queries/day per client IP, returning HTTP 429 with `X-RateLimit-*` headers upon exhaustion).

---

## 4. Homepage Section Map

| Section | Component File | Section ID | Notes |
|---|---|---|---|
| **Top Navigation** | `portfolio/src/components/zro/Navbar.tsx` | `#top` / fixed header | Links to `#about`, `#projects`, `#skills`, `#contact` |
| **Hero** | `portfolio/src/components/zro/Hero.tsx` | _(implicit top)_ | CTA links to `#experience` |
| **About** | `portfolio/src/components/zro/AboutSection.tsx` | `#about` | Contains heading `#about-heading` |
| **Experience** | `portfolio/src/components/zro/AboutSection.tsx` (nested) | `#experience` | Anchored at line 62 `<div id="experience">` |
| **Projects** | `portfolio/src/components/zro/ProjectsSection.tsx` | `#projects` | Contains `<div id="work" className="sr-only" />` |
| **Skills Matrix** | `portfolio/src/components/zro/SkillsMatrix.tsx` | `#skills` | Contains heading `#skills-heading` |
| **Education** | `portfolio/src/components/zro/BenchmarksSection.tsx` | `#education` | Contains heading `#education-heading` |
| **Footer & Contact** | `portfolio/src/components/zro/FooterSection.tsx` | `#contact` | Contains `#top` scroll return |
| **Wayfinding Rail** | `portfolio/src/components/zro/SectionRail.tsx` | Floating rail | Tracks `#about`, `#projects`, `#skills`, `#education`, `#contact` |

---

## 5. Anchor Audit & Link Consistency

| Anchor Target | Exists in DOM? | Triggering Elements | Issue / Recommendation |
|---|---|---|---|
| `#about` | ✅ Yes | Navbar link, SectionRail, Skip Link | Valid |
| `#experience` | ✅ Yes (`AboutSection.tsx:62`) | Hero CTA button | **Missing from Navbar & Mobile Menu** (Add in Phase 1) |
| `#projects` | ✅ Yes | Navbar link, SectionRail | Valid |
| `#work` | ⚠️ Aliased (`ProjectsSection.tsx:80`) | Footer "Work" | Redundant alias; unify to `#projects` |
| `#skills` | ✅ Yes | Navbar link, SectionRail | Valid |
| `#education` | ✅ Yes | SectionRail | **Missing from Navbar & Mobile Menu** (Add in Phase 1) |
| `#contact` | ✅ Yes | Navbar link, SectionRail | Valid |
| `#top` | ⚠️ Implicit body | Footer back-to-top | Add explicit `id="top"` or scroll-to-window-0 |

---

## 6. Animation Inventory

- **Framer Motion (`framer-motion`):**
  - Active across 22 components (`Hero`, `ProjectsSection`, `FlagshipShowcase`, `Dock`, `WindowManager`, `SpotlightSearch`, `AboutApp`, `IntroCurtain`, `Marquee`).
  - Uses `AnimatePresence`, `LayoutGroup`, `motion`, `useReducedMotion`, `useScroll`, `useTransform`.
- **Canvas Elements:**
  - `portfolio/src/components/luxe/ParticleNetworkBFS.tsx` (BFS graph particle canvas).
- **CSS Animations (`@keyframes`):**
  - `globals.css`: `orb-drift-1/2/3`, `marquee`, `shine-spin`, `aurora-flow`, `pulse-glow`, `float-dot`.
  - `datasheet.css`: `zro-menu-in`, `zro-menu-item-in`, `zro-ping`, `zro-chip-in`, `zro-msg-in`, `zro-caret-blink`, `zro-ask-bounce`, `zro-vis-dash`, `zro-vis-bar`, `zro-vis-scan`, `zro-vis-typing`, `zro-vis-caret`, `zro-demo-caret`.
  - `os-chrome.css`: `os-boot-pulse`, `os-screen-wake`, `os-caret`.

---

## 7. Metadata, SEO & Domain Audit

- **Canonical Domain Discrepancy:**
  - `metadataBase` in `page.tsx`: `https://www.aritradutta.tech` (spelled with **`a`**).
  - `canonical` in `page.tsx`: `https://www.aritradutta.tech/`.
  - `sitemap.ts`: `https://www.aritradutta.tech/sitemap.xml`.
  - `robots.ts`: `https://www.aritradutta.tech/sitemap.xml`.
  - **Live Service Reality:** Live domain is `aritrodutta.tech` (spelled with **`o`**).
  - **Fix for Phase 1:** Set all canonicals, `metadataBase`, OG/Twitter image URLs, and sitemap URLs to `https://www.aritrodutta.tech`. Configure 301 redirect for `aritradutta.tech` → `aritrodutta.tech`.
- **Structured Data:** JSON-LD `Person` schema is present in `page.tsx:49-69`. Needs minor cleanups (ensure canonical domain URL and clean sameAs links).
- **Dynamic OG Images:** `opengraph-image.tsx` and `twitter-image.tsx` generate 1200×630 cards dynamically.

---

## 8. Build Performance & Baseline Metrics

- **Production Build (`next build`):**
  - Compiled in 13.7s without errors.
  - Typecheck (`tsc --noEmit`) and ESLint: **0 errors**.
  - Route Bundle Weights:
    - `/` (Home): **28.4 kB** (First Load JS: **184 kB**)
    - `/classic`: **33.4 kB** (First Load JS: **193 kB**)
    - `/desktop`: **4.76 kB** (First Load JS: **151 kB**)
    - Shared Chunks: **102 kB**
- **Budgets Recorded (`docs/baseline/baseline.json`):**
  - LCP Target: < 2.5s (Mobile, 4× CPU slowdown)
  - CLS Target: < 0.1
  - INP Target: < 200ms
  - Home JS Added Budget: ≤ +60 KB gzip

---

## 9. Dependency Security Audit (`npm audit`)

- **Total Vulnerabilities:** 36 (22 moderate, 12 high, 2 critical).
- **Key Affected Packages:** `fast-xml-parser` (AWS SDK sub-dependency), `nodemailer`, `picomatch`, `postcss`, `sharp`.
- **Verdict:** Do NOT run destructive `npm audit fix --force` (would upgrade Next.js to untested patch version and break dependencies). Isolated dependency bumps will be scheduled in Phase 14 hygiene.

---

## 10. Risks, Open Questions & Recommended Defaults

| # | Risk / Decision | Recommended Default | Phase Addressed |
|---|---|---|---|
| **R1** | Spelled domain mismatch (`aritradutta.tech` vs `aritrodutta.tech`) | Standardize on `aritrodutta.tech`; 301-redirect old domain | Phase 1 |
| **R2** | Inconsistent nav anchors (Experience & Education missing from header) | Add Experience & Education to top nav & mobile menu in identical order | Phase 1 & Phase 4 |
| **R3** | Dual animation engines risk | `framer-motion` is already installed; never install `motion` package | Phase 2 |
| **R4** | Heavy canvas background on low-power devices | Add `@media (prefers-reduced-motion)` and low-power hardware check (`navigator.hardwareConcurrency <= 4`) | Phase 5 |
| **R5** | AI résumé rate limit protection | Strictly server-side; do not touch `/api/chat` backend routes | Protected (all phases) |

---

### Phase 0 Summary
Stack verdict is **S1** (Next.js App Router + Tailwind + Framer Motion). AI résumé rate limiting is server-side verified. Anchors, metadata domain discrepancies, and bundle baselines are fully mapped. Phase 0 acceptance complete. Ready for Phase 1.
