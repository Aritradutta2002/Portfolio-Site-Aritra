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


