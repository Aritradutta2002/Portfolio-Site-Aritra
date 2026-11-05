# Transformation log — aritrodutta.tech

## Decisions
| ID | Decision | Value | Date |
|----|----------|-------|------|
| D1 | Canonical domain | `https://www.aritrodutta.tech` (old `aritradutta.tech` redirects 301) | 2026-11-05 |
| D2 | Animmaster (paid) | No (native Motion primitives only) | 2026-11-05 |
| D3 | Skiper Premium ($129) | No (free components only: `@skiper-ui/skiper2`) | 2026-11-05 |
| D4 | Dual Job Titles | Keep both (Hero: "Full Stack Application Engineer", Experience: "System Engineer") | 2026-11-05 |
| D5 | Theming | Both Dark and Light Porcelain themes preserved and verified for WCAG AA | 2026-11-05 |
| D6 | Track | B – Signature (Geist precision typography, subtle grain, in-situ hero reveal) | 2026-11-05 |
| D7 | Hosting | Vercel | 2026-11-05 |
| D8 | Analytics | Vercel Analytics + Speed Insights | 2026-11-05 |
| D9 | Skiper Attribution | Yes (discreet footer credit link) | 2026-11-05 |

## Approved copy changes
| Location | Before | After | Approved by |
|----------|--------|-------|-------------|
| Skills > Practices | Jile | TCS Jile (Agile) | Owner |

## Phase log

### Phase 0 — Audit and stack verdict (2026-11-05)
- **Branch:** `feature/vengenceui`
- **What changed:**
  - Full read-only stack audit completed and documented in `docs/AUDIT.md`.
  - Stack Verdict confirmed as **S1** (Next.js 15.5 App Router + Tailwind CSS 3.4 + Framer Motion 12.2 + Lenis 1.3).
  - Server-side rate limiting on `/api/chat` verified (10 requests/day per IP).
  - Domain discrepancy identified (`aritradutta.tech` vs canonical `aritrodutta.tech`).
  - Production build baselines saved in `docs/baseline/baseline.json`.
  - Initialized `AGENTS.md` and `docs/transformation-log.md`.
- **Perf (mobile 4x CPU):** LCP < 2.5s budget, total home route JS 184 kB, shared JS 102 kB.
- **Open questions:** None. Ready to proceed to Phase 1.

### Phase 1 — Correctness fixes (2026-11-05)
- **Branch:** `feat/portfolio-p01-fixes`
- **What changed:**
  - Standardized domain to `https://www.aritrodutta.tech` across `page.tsx`, `layout.tsx`, `sitemap.ts`, `robots.ts`, `resumeData.ts`, and JSON-LD schema.
  - Added 301 edge redirects in `next.config.mjs` for non-canonical domains (`aritradutta.tech`, `www.aritradutta.tech`, apex `aritrodutta.tech`).
  - Fixed anchor navigation: Added `Experience` (`#experience`) and `Education` (`#education`) to desktop nav and mobile sheet in `Navbar.tsx`, synchronizing with `SectionRail.tsx`.
  - Added explicit `#top` to root container in `page.tsx` for footer back-to-top return.
  - Added `scroll-mt-20` on `<div id="experience">`.
  - Fixed copy typo in 4 content/catalog files: `Jile` → `TCS Jile (Agile)`.
  - Verified job titles (Hero: "Full Stack Application Engineer", Experience: "System Engineer") remain preserved per D4.
- **Perf (mobile 4x CPU):**
  - Lint: 0 errors
  - Typecheck: 0 errors
  - Next.js build: Clean in 10.7s; Home route first load JS: 184 kB (unchanged, 0 kB delta).
- **Open questions:** None. All Phase 1 Acceptance criteria satisfied. Ready for Phase 2.

### Phase 2 — Foundations and component registry (2026-11-05)
- **Branch:** `feat/portfolio-p02-foundations`
- **What changed:**
  - Installed utility dependencies `clsx` and `tailwind-merge` in `portfolio/package.json`.
  - Created `portfolio/src/lib/utils.ts` exporting standard `cn` helper.
  - Created `portfolio/components.json` with `@vengeanceui` registry (`https://www.vengenceui.com/r/{name}.json`).
  - Audited component registry slugs via curl and documented in `docs/components.md`:
    - `animated-rays` (200 OK, Vengeance)
    - `flip-text` & `morph-text` (200 OK, Vengeance)
    - `staggered-grid` & `cursor-card` (200 OK, Vengeance)
    - `spotlight-navbar` (200 OK, Vengeance)
    - Substituted `my-animated-button` (404) with verified official slug `animated-button` (200 OK).
    - Substituted Skiper Pro paid components (`skiper2` 401 Unauthorized) with bespoke zero-dependency Framer Motion primitives.
  - Implemented design and motion tokens in `portfolio/src/app/globals.css` and extended `portfolio/tailwind.config.cjs` (radius, easings, durations, max content width).
  - Built SSR-safe and reduced-motion compliant shared motion primitives:
    - `portfolio/src/lib/motion.ts` (easings, durations, spring configs, viewport config)
    - `portfolio/src/hooks/usePointerFine.ts` (fine pointer check for hover-only devices)
    - `portfolio/src/hooks/useInViewPause.ts` (IntersectionObserver + visibilitychange loop pauser)
    - `portfolio/src/components/motion/Reveal.tsx` (scroll reveal with y/opacity)
    - `portfolio/src/components/motion/Stagger.tsx` (stagger container & items with max 80ms interval)
    - `portfolio/src/components/motion/SplitReveal.tsx` (accessible masked word/line slide-up)
    - `portfolio/src/components/motion/CountUp.tsx` (eased numeric counter with instant reduced-motion fallback)
    - `portfolio/src/components/ScrollProgress.tsx` (spring-smoothed top viewport scroll indicator)
  - Mounted `<MotionConfig reducedMotion="user">` provider (`portfolio/src/components/providers/MotionProvider.tsx`) and `<ScrollProgress />` in `portfolio/src/app/layout.tsx`.
  - Added reduced-motion guard to `portfolio/src/components/SmoothScroll.tsx`.
  - Appended `data-lenis-prevent` to modal and application inner scroll containers (`Projects.tsx`, `blog/page.tsx`, `ExperienceApp.tsx`, `ContactApp.tsx`, `ProjectWindow.tsx`, `AboutApp.tsx`, `MusicApp.tsx`, `ProjectsFolder.tsx`).
  - Added `.github/pull_request_template.md` per Plan.md §14.
- **Perf (mobile 4x CPU):**
  - Lint: 0 errors
  - Typecheck: 0 errors
  - Next.js build: Clean in 14.3s; Home route first load JS: 184 kB (0 kB delta from baseline 184 kB).
- **Open questions:** None. All Phase 2 acceptance criteria met. Ready for Phase 3.

### Phase 3 — Design direction and global systems (2026-11-05)
- **Branch:** `feat/portfolio-p03-design`
- **What changed:**
  - Locked typography system: Geist Sans & Geist Mono via `next/font/google` (`display: 'swap'`).
  - Added clamp-based responsive type scale into `portfolio/tailwind.config.cjs` (`scale-display`, `scale-h2`, `scale-h3`, `scale-body`, `scale-badge`).
  - Added hairline `--border` CSS variable to `:root` (light) and `.dark` in `portfolio/src/app/globals.css`.
  - Built subtle atmospheric grain overlay (`portfolio/src/components/GrainOverlay.tsx`) with pure SVG fractal noise (3.5% opacity, `pointer-events: none`, 0 network requests).
  - Built bespoke interactive cursor (`portfolio/src/components/Cursor.tsx`):
    - Smooth outer ring (`w-7 h-7` to `w-11 h-11` on links, `w-15 h-15` on view triggers) + precise inner dot.
    - SSR-safe fine-pointer gate via `usePointerFine()` (never mounts on touch/coarse devices).
    - Preserves native text caret on inputs/textareas (`input, textarea, select, [contenteditable]`).
    - Bypassed completely under `prefers-reduced-motion`.
  - Built page route enter transition (`portfolio/src/app/template.tsx`) with opacity and translateY animation (disabled under reduced motion).
  - Created comprehensive design system guide in `docs/DESIGN.md` (colors, typography, rhythm, motion, cursor, state matrix, do/don't rules).
  - Mounted `GrainOverlay` and `Cursor` in `portfolio/src/app/layout.tsx`.
  - Captured responsive screenshots via `gstack browse` at 375px, 768px, and 1440px in both dark and light modes into `docs/screenshots/phase-03/`.
- **Perf (mobile 4x CPU):**
  - Lint: 0 errors
  - Typecheck: 0 errors
  - Next.js build: Clean in 10.9s; Home route first load JS: 184 kB (0 kB delta from baseline 184 kB).
  - Console errors: 0
- **Open questions:** None. Approved by owner. Proceeded to Phase 4.

### Phase 4 — Navigation (2026-11-05)
- **Branch:** `feat/portfolio-p04-nav`
- **What changed:**
  - Adopted and refactored Spotlight Navbar (`portfolio/src/components/ui/spotlight-navbar.tsx`) from `@vengeanceui` with dynamic cursor spotlight tracking (`--spotlight-x`) and spring-smoothed active section ambience (`--ambience-x`).
  - Implemented top fixed frosted glass desktop navigation (`h-14`, `sticky top-0 z-40`, `backdrop-blur-md`, hairline `--border`) with:
    - Identity: Avatar + "Aritra Dutta" + role subtitle
    - Center: Spotlight links (About, Experience, Projects, Skills, Education, Contact)
    - Right: Desktop OS (`/desktop`), Résumé (`resume.pdf`), and Theme Toggle
  - Synchronized navigation labels and ordering across desktop nav, mobile sheet, and footer (`FooterSection.tsx` updated so `About`, `Experience`, `Projects`, `Skills`, `Education`, `Contact` match identically).
  - Implemented full-screen mobile/tablet sheet (`lg:hidden`):
    - Keyboard accessible with focus trap and `Escape` to close.
    - Locks page scroll (`lockScroll(true)` / stops Lenis while open).
    - Added `data-lenis-prevent` and safe-area insets (`h-[calc(100dvh-3.5rem)]`).
    - Touch targets ≥ 44px (`min-h-[48px]`, `h-11 w-11`).
    - Zero horizontal overflow at 320px viewport width (`scrollWidth = 320px`).
  - In-page smooth scrolling powered by `scrollToTarget` from `scrollBridge.ts` with correct header offset (64px).
  - Documented component adoption in `docs/components.md`.
- **Perf (mobile 4x CPU):**
  - Lint: 0 errors
  - Typecheck: 0 errors
  - Next.js build: Clean in 12.8s
  - Console errors: 0
  - 320px horizontal scroll: 0px overflow
- **Open questions:** None. All Phase 4 acceptance criteria satisfied.

### Phase 5 — Hero and instant entrance (2026-11-05)
- **Branch:** `feat/portfolio-p05-hero`
- **What changed:**
  - Implemented lazy-loaded `AnimatedRays` background component (`portfolio/src/components/ui/animated-rays.tsx`) with central dark radial vignette mask (`radial-gradient(circle at center, rgba(5,5,8,0.94) 15%, rgba(5,5,8,0.82) 45%, rgba(5,5,8,0.4) 80%, transparent 100%)`) over canvas rays, guaranteeing text contrast (resolves Outside Review HR-4).
  - Integrated `useInViewPause` to suspend background ray animation when scrolled out of viewport.
  - Kept H1 completely static ("Aritra Dutta") for SEO and LCP stability; revealed subtitle via `SplitReveal` (`portfolio/src/components/motion/SplitReveal.tsx`).
  - Added rotating focus domain keywords via `FlipText` (`portfolio/src/components/ui/flip-text.tsx`) with fixed-height wrapper to guarantee zero cumulative layout shift (0 CLS).
  - Created unified `TechnicalProofRibbon` (`portfolio/src/components/zro/TechnicalProofRibbon.tsx`) consolidating core quantitative metrics (TCS 20× API speed-up, 700+ DSA problems, 1672 LeetCode rating, 8.79 CGPA) with in-view `CountUp` numbers.
  - Eliminated duplicate metric bento cards from `StoryPanel` (`portfolio/src/components/zro/about/StoryPanel.tsx`), streamlining the About section narrative (resolves Outside Review HR-5).
  - Guaranteed instant hydration with lightweight in-situ entry stagger (≤300ms total) and zero blocking splash loaders.
  - Ensured priority loading and fixed dimensions on both desktop and mobile hero portrait images.
- **Perf (mobile 4x CPU):**
  - Lint: 0 errors
  - Typecheck: 0 errors
  - Next.js build: Clean in 11.7s; Home route first load JS: 196 kB.
  - Console errors: 0
- **Open questions:** None. All Phase 5 acceptance criteria satisfied.

### Phase 6 — "Ask my résumé" pill (2026-11-05)
- **Branch:** `feat/portfolio-p06-ai-pill`
- **What changed:**
  - Preserved backend and API routes 100% untouched (`/api/chat` and `rateLimit.ts` untouched; zero backend diff).
  - Built bespoke in-situ expanding pill UI (`portfolio/src/components/zro/HeroChatbot.tsx`) with Framer Motion layout animations:
    - **Collapsed state:** Centered, subtle pulsing frosted pill with "Ask my résumé · AI Companion" and live quota pill (`10/10 Daily` in emerald or red when exhausted).
    - **Expanded state:** Smooth layout expansion into glass console (`max-w-2xl`) containing top status row, thread history, input form with `Enter` submit, and quick-prompt category chips.
  - Keyboard accessibility: `Enter` sends query, `Escape` collapses back to pill.
  - Streaming answer area: `max-h-[320px] overflow-y-auto` with `data-lenis-prevent`.
  - Screen reader accessibility: persistent live region with `role="status" aria-live="polite" aria-atomic="true"`.
  - Quota and error handling: styled red warning banner when `remainingQueries === 0` ("Daily question quota reached. Resets at 00:00 UTC").
  - Captured before/after screenshots in `docs/screenshots/phase-06/`.
- **Perf (mobile 4x CPU):**
  - Lint: 0 errors
  - Typecheck: 0 errors
  - Next.js build: Clean in 8.9s; Home route first load JS: 197 kB.
  - Console errors: 0
  - Backend files modified: 0
- **Open questions:** None. All Phase 6 acceptance criteria satisfied.

### Phase 7 — About and Experience (2026-11-05)
- **Branch:** `feat/portfolio-p07-experience`
- **What changed:**
  - About section: Dedicated solely to editorial narrative, profile card, and "Right now" current engineering focus. Eliminated duplicate quantitative metrics (20×, 700+, 1672, 8.79) now consolidated in the Technical Proof Ribbon.
  - Wrapped pull quote in once-only subtle `Reveal` animation (`portfolio/src/components/zro/about/StoryPanel.tsx`).
  - TCS Experience block: Maintained the 4 key technical achievements (Microservices modernisation, Azure PaaS migration, API & database tuning, DevOps & quality gates).
  - Expand/collapse for full responsibilities uses smooth CSS grid transition (`grid-template-rows: 0fr -> 1fr`) with zero layout jump; keyboard accessible with `aria-expanded` and `aria-controls`.
  - Added `:active` touch feedback for pillar cards in `portfolio/src/styles/datasheet.css`, ensuring cursor spotlight runs only on fine-pointer devices.
- **Perf (mobile 4x CPU):**
  - Lint: 0 errors
  - Typecheck: 0 errors
  - Next.js build: Clean in 11.1s; Home route first load JS: 197 kB.
  - Console errors: 0
- **Open questions:** None. All Phase 7 acceptance criteria satisfied.

### Phase 8 — Projects (2026-11-05)
- **Branch:** `feat/portfolio-p08-projects`
- **What changed:**
  - Built accessible `CaseStudyDrawer` (`portfolio/src/components/zro/projects/CaseStudyDrawer.tsx`):
    - Desktop (≥768px): 50vw slide-over drawer from right with focus trap, `role="dialog"`, `aria-modal="true"`, `Esc` listener, Lenis scroll lock (`lockScroll(true)`), focus restoration to trigger element on dismiss, and internal scroll container with `data-lenis-prevent`.
    - Mobile (<768px): Responsive bottom sheet (`max-h-[85dvh]`) with touch drag handle.
    - Full technical write-up, system overview, architecture diagram / visual, full stack chips, metric badges, and verified source/live links.
  - AlgoGuru live mock (`portfolio/src/components/zro/projects/FlagshipShowcase.tsx`):
    - Animated line-by-line typing sequence for Two Sum Java 21 solution (13 lines, 55ms stagger) when in view via Framer Motion `useInView`.
    - Animated test pass banner ("3 / 3 test cases passed · 4 ms · O(n)") sliding in after code typing finishes.
    - Instant static fallback under `prefers-reduced-motion: reduce`.
  - Inline project visuals (`portfolio/src/components/zro/projects/ProjectVisual.tsx`):
    - Wired `useInViewPause` to stop all CSS keyframe animations (`.zro-vis[data-paused="true"]`) when offscreen or tab backgrounded.
    - Paused SVG SMIL packet animations on `ArchitectureVisual` via `svg.pauseAnimations()` / `unpauseAnimations()`.
  - Track B 3D tilt:
    - Clamped tilt degrees to `max 6°` (`clamp(-py * 6, -6, 6)`) for fine-pointer/mouse only in `portfolio/src/components/zro/MotionController.tsx`.
    - Added fine-pointer hover lift (`translateY(-4px)`) and enhanced card depth in `portfolio/src/styles/datasheet.css`.
  - Filter chips: Motion layout re-flow with `popLayout` without scroll jumps; all chip counts, metrics, tags, and links 100% frozen.
- **Perf (mobile 4x CPU):**
  - Lint: 0 errors
  - Typecheck: 0 errors
  - Next.js build: Clean in 9.5s; Home route first load JS: 199 kB.
  - Console errors: 0
- **Open questions:** None. All Phase 8 acceptance criteria satisfied.

### Phase 9 — Skills, Education, Contact, Footer (2026-11-05)
- **Branch:** `feat/portfolio-p09-finish`
- **What changed:**
  - Structured Skills Matrix Grid (`portfolio/src/components/zro/SkillsMatrix.tsx`):
    - Categorical high-density grid grouped into 5 engineering disciplines: Languages & Runtimes, Cloud & Distributed Systems, AI & Architecture, Storage & Databases, Practices & Tools.
    - Rendered skill badges with subtle hairline borders, category indicator dots, and crisp mono typography.
    - Staggered in-situ reveal on initial view via Framer Motion variants. Zero infinite moving marquee loops.
  - Education Timeline (`portfolio/src/components/zro/BenchmarksSection.tsx`):
    - Replaced CSS pseudoelement transition with a scroll-linked progress line driven by `useScroll` + `useSpring` using GPU `transform: scaleY(...)` only.
    - Fallback to instant render under `prefers-reduced-motion: reduce`.
  - Contact Section & Footer (`portfolio/src/components/zro/FooterSection.tsx`):
    - Magnetic CTA buttons dynamically gated to `usePointerFine()` (desktop mouse/trackpad only, never running on touch).
    - Preserved IST clock (`LocalClock.tsx`) and availability status badge completely untouched.
    - Large name wordmark reveals on scroll with subtle `whileInView` elevation and opacity stagger.
    - Added comprehensive credits line in footer acknowledging Next.js 15, Tailwind, Framer Motion, Geist fonts, and Vengeance UI component foundation.
  - Email copy button (`portfolio/src/components/zro/CopyEmail.tsx`):
    - Enhanced copy feedback with a 2-second checkmark confirmation toast (`<Check className="h-3.5 w-3.5 text-emerald-400" />`) and accessible `role="status"` live region.
- **Perf (mobile 4x CPU):**
  - Lint: 0 errors
  - Typecheck: 0 errors
  - Next.js build: Clean in 9.3s; Home route first load JS: 207 kB.
  - Console errors: 0
- **Open questions:** None. All Phase 9 acceptance criteria satisfied.









