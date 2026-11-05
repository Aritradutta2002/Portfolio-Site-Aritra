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

