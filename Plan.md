# Portfolio Migration & Transformation Plan — aritrodutta.tech

**Version:** v2 (final)  
**Goal:** Turn the live portfolio into a very animated, premium, fully responsive site using the best components from **Vengeance UI**, **Skiper UI** and (optionally) **Animmaster Lib**, executed phase by phase by a coding agent (Claude Code / GitHub Copilot).

### What changed from v1
- Install mechanics for Vengeance UI and Skiper UI are now **confirmed from their docs** (see §6).
- Animation engine corrected: both registries ship components that import **`framer-motion`**, so that is the default engine (§4.1 rule 6).
- Added: stack-mismatch decision tree, design-direction phase with a **Refined vs Signature** track, component verification registry, `/desktop` + `/classic` upgrade, SEO + structured data, automated tests + CI, hosting/redirects, analytics, security hygiene, Skiper attribution requirement, post-launch checklist.

---

## 0. How to use this file

1. Save as `PLAN.md` at the repo root.
2. Paste the block in **§4.3** into `AGENTS.md` (also valid as `CLAUDE.md` or `.github/copilot-instructions.md`).
3. Answer the decisions in **§3** (defaults apply if you don't).
4. Run phases **in order**. One phase = one branch = one PR. Paste that phase's **Prompt** into the agent.
5. Do not start a phase until the previous phase's **Acceptance** list is fully ticked.
6. After each phase the agent appends to `docs/transformation-log.md` (template in §14).

**Tracks.** Tasks tagged **[A+B]** always run. Tasks tagged **[B]** run only on the **Signature** track (default). Choose **Refined** (Track A) by skipping every **[B]** task.

---

## 1. Goals and non-goals

**Goals**
- Premium, memorable motion: smooth scroll, masked text reveals, scroll-driven storytelling, refined micro-interactions, one standout hero.
- Fully responsive 320px → 1920px+, with touch-appropriate behavior (no cursor-only effects on phones).
- Fast: LCP < 2.5s, CLS < 0.1, INP < 200ms on a throttled mid-range phone.
- Preserve what is already distinctive: AI résumé companion, `/desktop`, `/classic`, light/dark themes, AlgoGuru live-product mock, the numbers (20×, 700+, 1672, 8.79).
- Fix correctness issues found in the audit (domain/OG mismatch, broken anchors, typo).
- Production hygiene: SEO, structured data, tests, CI, redirects, analytics, rollback.

**Non-goals**
- Rewriting copy or changing any claim/metric.
- Changing the AI résumé backend, routes, or rate limiting.
- Heavy 3D/WebGL on the default page (allowed only behind an opt-in flag, Phase 11).

---

## 2. Current state (read from the public page) and what must be verified

Observed at `https://www.aritrodutta.tech/` (text only; visuals/code not seen):

- **Sections:** Hero → About → Experience (TCS, expandable responsibilities) → competitive-programming strip → Projects (6 cards, discipline filter chips) → Skills (daily drivers + 6 groups, 39 technologies) → Education → Contact.
- **Extras:** "Ask my résumé" AI input (daily limit shown as 10/10), `/desktop` interactive OS view, `/classic` plain-text view, `resume.pdf`, light/dark color scheme, live IST clock, mobile menu, large footer name mark.
- **Nav:** top nav = About, Projects, Skills, Contact, Résumé. Mobile menu = 01–05 without Experience.
- **Known issues**
  - `canonical`, `og:url`, OG/Twitter image URLs point to `aritradutta.tech`, but assets are served from `aritrodutta.tech`.
  - Hero CTA "Read experience" → `#experience`, but the nav has no Experience item.
  - Footer "Work" → `#work`, but the section id is `#projects`.
  - Typo "Jile" in Practices.
  - Hero says "Full Stack Application Engineer"; experience entry says "System Engineer" (confirm intentional).
- **Assumptions Phase 0 must verify (never trust blindly):** Next.js (metadata suggests it), App Router, TypeScript, Tailwind (v3 vs v4), existing animation libs, host (Vercel?), analytics, AI feature has a **server-side** rate limit.

---

## 3. Decisions needed before starting

| # | Decision | Locked Resolution |
|---|---|---|
| D1 | Canonical domain | **`aritrodutta.tech`** (canonical, metadataBase, OG); `aritradutta.tech` 301-redirects to it |
| D2 | Buy/use Animmaster (paid)? | **No** → free/native primitives only, skip §11b |
| D3 | Buy Skiper UI Premium ($129)? | **No** → free components only (`@skiper-ui/skiper2`), skip §11a |
| D4 | Dual titles ("Full Stack Application Engineer" vs "System Engineer") | **Keep both**: Hero emphasizes full-stack systems scope; Experience accurately reflects TCS title |
| D5 | Light + dark themes | **Keep both**: Dark space is primary; luxury porcelain light mode adheres to WCAG AA 4.5:1 |
| D6 | Track | **B – Signature** (refined motion, subtle grain, inline AI pill, Geist precision typography) |
| D7 | Hosting | **Vercel** (Next.js App Router target with edge redirects) |
| D8 | Analytics | **Vercel Analytics + Speed Insights** |
| D9 | Skiper free-tier attribution | **Yes**: Include discreet attribution link in footer credits per license |

---

## 4. Agent guide

### 4.1 Operating rules

1. **Audit before editing.** Phase 0 is read-only.
2. **One phase = one branch = one PR.** Branch: `feat/portfolio-p<NN>-<slug>`.
3. **Protected (never modify):** AI résumé API routes, rate-limit logic, env files, `resume.pdf`, content/data files (except the confirmed typo and anything listed in the approved-copy table), analytics IDs/secrets.
4. **Content is frozen.** No rephrasing, no invented metrics, testimonials or claims. Any copy change must be listed in the PR and in the approved-copy table of the log.
5. **Reuse before adding.** Use existing utilities/components first.
6. **One animation engine.** Use whatever the repo already has (`framer-motion` or `motion`). If none, install **`framer-motion`** (the Vengeance UI and Skiper UI registry components import it). Never have both `framer-motion` and `motion` installed without a logged decision.
7. **Registry components are copied code.** After `shadcn add`, files live in the repo: refactor to project tokens, delete demo code, add props, fix imports, add pointer/reduced-motion handling.
8. **Animate `transform` and `opacity` only** for continuous effects. No width/height/top/left (exception: height-auto expand/collapse via Motion layout).
9. **Every animation has three behaviors:** fine pointer, touch, and `prefers-reduced-motion`.
10. **Heavy = lazy.** Canvas/WebGL or > ~15 KB gzip → `next/dynamic` (`ssr: false` where needed), load on idle or visibility.
11. **No layout shift.** Reserve space for anything animating in. Fonts via `next/font`.
12. **Nested scroll + Lenis:** any inner scroll container (AI answer panel, case-study modal, sheet menu) gets `data-lenis-prevent`; call `lenis.stop()` while modals are open.
13. **SSR safety:** pointer/media-query hooks start at the non-interactive default and update in an effect (avoid hydration mismatch).
14. **Prove it.** At phase end run §4.2 and paste results in the PR.
15. **Stop and ask** (concrete question + recommended default) when blocked or when licensing, domain or content is ambiguous.
16. **Licensing.** Paid code (Animmaster, Skiper Premium) only with owner confirmation; never commit the raw zip; never paste paid source into public places. Free Skiper components require attribution (D9). Record every component's license in `docs/components.md`.
17. **Don't expand scope.** No unrelated refactors, dependency upgrades or renames.

### 4.2 Verification commands (adapt names to the repo's scripts)

```bash
npm run lint
npm run typecheck            # or: npx tsc --noEmit
npm run build
npm run test:e2e             # after Phase 13
npx lhci autorun             # after Phase 13; otherwise run Lighthouse manually
```

Manual each phase: 320 / 375 / 414 / 768 / 1024 / 1280 / 1536 / 1920 widths, keyboard-only pass, OS "Reduce motion" on, light and dark theme.

### 4.3 Paste into `AGENTS.md`

```markdown
# Agent instructions — Portfolio (aritrodutta.tech)

You are upgrading an existing, live portfolio. Follow PLAN.md phase by phase.

## Hard rules
- Content is frozen: no copy rewrites, no new claims or metrics.
- Never modify: AI resume API/routes/rate limit, env files, resume.pdf, analytics IDs.
- One animation engine (framer-motion or motion, whichever the repo already uses). Never both.
- Animate transform/opacity only. Respect prefers-reduced-motion. No cursor effects on touch.
- Heavy components are lazy-loaded (next/dynamic). No layout shift.
- Inner scroll containers need data-lenis-prevent. Stop Lenis while modals are open.
- Mobile first: every change must work at 320px.
- Paid code (Animmaster, Skiper Premium) only if the owner confirms a license.
- Registry components: refactor to project tokens, delete demo code, log source + license in docs/components.md.

## Workflow
1. Read PLAN.md (current phase) and docs/AUDIT.md.
2. Summarize what you found in <=10 lines before editing.
3. Make the smallest change set that satisfies the phase Acceptance list.
4. Run lint, typecheck, build (and tests once they exist). Fix everything you introduced.
5. Update docs/transformation-log.md and tick the checklist.
6. Write the PR description: what changed, screenshots/GIF notes, perf numbers, open questions.

## Definition of done
Lint + typecheck + build + tests pass, no console errors, no CLS regressions, reduced-motion works,
keyboard navigation works, 320px–1920px verified, Lighthouse mobile performance >= 90.
```

### 4.4 Running phases in your tools

- **Claude Code:** start a fresh session per phase; paste the phase prompt; let it read `AGENTS.md`/`CLAUDE.md`. Use plan mode for Phases 0, 3 and 11.
- **GitHub Copilot (agent mode):** attach `PLAN.md`, `docs/AUDIT.md` and `docs/components.md` as context; put the §4.3 block in `.github/copilot-instructions.md`.
- **Review pass:** run the §13 review prompt in a *different* session than the one that wrote the code.

---

## 5. Design and motion system

### 5.1 Tokens (create once, reuse everywhere)

```css
:root {
  /* color — dark-first; body text contrast >= 4.5:1 */
  --bg: #0a0a0b;               /* matches existing dark background */
  --surface: #111113;
  --surface-2: #17171a;
  --border: rgba(255,255,255,.08);
  --text: #f4f4f5;
  --muted: #a1a1aa;
  --accent: #3b82f6;          /* electric sapphire blue accent */

  /* typography */
  --font-sans: var(--font-geist-sans), system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), monospace;

  /* radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* motion */
  --ease-out: cubic-bezier(.22, 1, .36, 1);
  --ease-in-out: cubic-bezier(.65, 0, .35, 1);
  --dur-micro: 150ms;
  --dur-ui: 280ms;
  --dur-reveal: 700ms;

  /* layout */
  --maxw: 1240px;
  --section-y: clamp(72px, 10vw, 160px);
}

[data-theme="light"], .light {
  /* color — luxury porcelain theme; contrast >= 4.5:1 */
  --bg: #fcfcfd;
  --surface: #f4f4f6;
  --surface-2: #eaecef;
  --border: rgba(0,0,0,.08);
  --text: #09090b;
  --muted: #64748b;
  --accent: #2563eb;
}
```

Light theme and dark theme both adhere to WCAG AA contrast (≥4.5:1 on body text). Map tokens into the detected Tailwind version (v4: `@theme inline`; v3: `theme.extend`).

### 5.2 Motion spec

| Use | Duration | Easing / spring |
|---|---|---|
| Hover, press, focus | 120–180ms | ease-out |
| Menus, dock, pill expand | 250–350ms | spring `{ stiffness: 300, damping: 30 }` |
| Section reveal | 600–800ms | `--ease-out`, y 24→0, opacity 0→1 |
| Masked line reveal **[B]** | 700–900ms | `--ease-out`, translateY 105%→0 inside `overflow:hidden` |
| Stagger between siblings | 60–80ms | max 8 items, then batch |
| Count-up numbers | 1200–1600ms | ease-out, once |
| Route transition | 350–500ms | ease-in-out |

Rules: reveal **once** (`viewport={{ once: true, margin: "-10%" }}`); no looping animation near body text; at most **one** continuous ambient effect per viewport; wrap the app in `<MotionConfig reducedMotion="user">` so transform/layout animations switch off automatically for reduced-motion users.

### 5.3 Shared primitives (Phase 2)

- `components/motion/Reveal.tsx` — fade/slide on view (`delay`, `y`, `once`).
- `components/motion/Stagger.tsx` — parent/child variants.
- `components/motion/SplitReveal.tsx` **[B]** — masked line/word reveal for headings.
- `components/motion/CountUp.tsx` — number animation; final value under reduced motion.
- `hooks/usePointerFine.ts` — `(hover: hover) and (pointer: fine)`, SSR-safe.
- `hooks/useInViewPause.ts` — pauses loops when offscreen.
- `components/providers/SmoothScroll.tsx` — Lenis (`lenis` / `lenis/react`), off for reduced motion; in-page link clicks use `lenis.scrollTo(hash, { offset })`.
- `components/ScrollProgress.tsx` — thin progress bar via `useScroll`.
- `components/Cursor.tsx` **[B]** — custom dot+ring cursor, fine pointer only (Phase 3).

### 5.4 Interaction State Matrix

What the user SEES across interactive features:

| FEATURE | LOADING | EMPTY | ERROR | SUCCESS / ACTIVE | PARTIAL / STREAMING |
|---|---|---|---|---|---|
| **AI Résumé Pill** (Phase 6) | 3-dot subtle pulse (`--muted`, 1.2s cycle) inside input area | Friendly prompt: *"No details found in résumé. Ask about TCS impact, AlgoGuru, or LeetCode."* | Amber hairline banner with error text + *"Retry"* button | Pill expands to max-w 640px; rendered Markdown answer with syntax highlighting | Live streaming tokens with blinking 2px `--accent` caret |
| **AI Daily Limit** (Phase 6) | Query count updates instantly (`x/10`) | — | When `0/10`: Pill border turns subtle red; input disabled; tooltip: *"Daily limit reached. Resets at 00:00 UTC."* | Counter badge shows remaining queries (e.g. `8/10`) | Disabled submit button with cooldown countdown |
| **Project Filters** (Phase 8) | Instant filter transition with `AnimatePresence popLayout` | Clean card: *"No projects in this discipline yet."* + *"Reset filters"* action button | Fallback: reset to *"All"* view if invalid filter in query | Cards smoothly re-order without layout jump; active chip highlighted with pill background | Instant layout re-flow; no layout shift |
| **Case Study Drawer** (Phase 8) | Skeleton wireframe with subtle shimmer for diagrams and benchmarks | Notice: *"Full case study writing in progress"* with GitHub link | Error banner with *"Failed to load case study. Open repository on GitHub"* link | Smooth drawer slide-over with focus trap, ESC to close, scroll-lock | Progressive text-first render while images/canvases hydrate |
| **AlgoGuru Demo** (Phase 8) | Syntax-highlighted code block visible immediately (no blank box) | — | — | Typing line-by-line; green badge transition *"3/3 passed · 4ms · O(n)"* | Static syntax block under `prefers-reduced-motion` |
| **Email Copy / CTAs** (Phase 9) | Click scale 0.98 | — | — | Icon swaps to checkmark; tooltip: *"Copied to clipboard!"* (2s duration) | Native `mailto:` fallback if clipboard API unavailable |

### 5.5 User Journey Storyboard & Time-Horizon Arc

| STEP | TIME HORIZON | USER ACTION | EMOTIONAL STATE | PLAN SPECIFICATION |
|---|---|---|---|---|
| **1** | **Visceral (0–5s)** | Lands on page; scans first viewport | **Authority & Confidence:** "This engineer builds serious distributed systems." | 0ms FCP, static bold H1, top frosted glass nav, subtle vignette Animated Rays, Technical Proof Ribbon (20×, 700+, 1672). |
| **2** | **Interactive (5s–30s)** | Spots inline AI résumé pill; clicks quick prompt chip (e.g. *"TCS Experience"*) | **Engagement & Delight:** "Fast, transparent, intelligent." | In-place smooth expansion (max-w 640px), 3-dot pulse, streaming tokens with blinking caret, clean markdown output. |
| **3** | **Narrative (30s–2m)** | Scrolls through About narrative and TCS career highlights | **Substance:** "Real systems engineering depth, not just marketing fluff." | Editorial story panel, current focus "Right now", 4 TCS highlight cards with height-auto expand/collapse. |
| **4** | **Technical Proof (2m–4m)** | Tests project filter chips, watches AlgoGuru demo, opens case study drawer | **Respect:** "Strong algorithmic craft and architecture chops." | Zero layout jump popLayout filtering, line-by-line typing mock, slide-over drawer with architecture topology. |
| **5** | **Discovery (4m–6m)** | Notices `/desktop` OS mode or `/classic` printable sheet in nav | **Memorability:** "Distinctive personality and multi-faceted talent." | Working MacOS-style windowing on `/desktop`; clean semantic A4 print sheet on `/classic`. |
| **6** | **Reflective (Post-visit)** | Copies email / downloads résumé / reaches out on LinkedIn | **High Intent:** "Top candidate; must schedule technical screen." | One-click copy with 2s toast confirmation, working direct PDF download, fast sub-2.5s LCP everywhere. |

---

## 6. Components, install mechanics and licensing

### 6.1 Confirmed install facts

**Vengeance UI** (`vengenceui.com`)
- Registry is shadcn-compatible. Two ways to add a component:
  - Direct URL: `npx shadcn@latest add https://www.vengenceui.com/r/<name>.json`
  - Namespaced: add to `components.json`
    ```json
    { "registries": { "@vengeanceui": "https://www.vengenceui.com/r/{name}.json" } }
    ```
    then `npx shadcn@latest add @vengeanceui/<name>`
- Dependencies in its docs: `clsx`, `tailwind-merge`, `framer-motion`; needs `lib/utils.ts` with the `cn` helper. Its docs target Tailwind v4 + Next.js App Router.
- Component slugs below come from the site's component URLs. **Verify each** (`curl -sI https://www.vengenceui.com/r/<slug>.json` → expect 200) before relying on it; if one 404s, pick the closest from `https://www.vengenceui.com/components` and log the substitution.

**Skiper UI** (`skiper-ui.com`)
- `npx shadcn add @skiper-ui/skiper<NN>` writes `src/components/ui/skiper-ui/skiper<NN>.tsx`.
- Dependencies: `clsx framer-motion lucide-react tailwind-merge` + `lib/utils.ts` `cn`.
- Some components are **free**, some **premium**. Premium source is only available with a paid membership.
- **License:** free to use and modify (personal and commercial), **attribution to Skiper UI is required for the free version**; no attribution required with Pro. Skiper states many components are recreations/adaptations of others, so check the credits note in each component.
- Dynamic Island is tagged **free** on its listing (`skiper2`). Confirm before installing.

**Animmaster Lib** (`animmasterlib.dev`) — paid; delivered as a zip via Google Drive; ~60% HTML/CSS/JS, ~30% React, ~10% Next. Read `https://animmasterlib.dev/terms.html` before use.

### 6.2 Adoption matrix

| Section | Component | Library | Slug / command | Free? |
|---|---|---|---|---|
| Nav (desktop) | Spotlight Navbar (Top fixed frosted glass) | Vengeance | `spotlight-navbar` | Yes |
| Hero entrance | In-situ stagger reveal (no splash blocker) | Motion | lightweight entrance stagger (≤300ms) | Free |
| Hero background | Animated Rays | Vengeance | `animated-rays` (docs example confirmed) | Yes |
| Hero role text | Flip Text / Morph Text | Vengeance | `flip-text` / `morph-text` | Yes |
| AI résumé pill | Dynamic Island | Skiper | `@skiper-ui/skiper2` | Free (verify) |
| About / Experience bento | Staggered Grid + Cursor Card | Vengeance | `staggered-grid`, `cursor-card` | Yes |
| Project case studies | Slide-over Case Study Drawer | Motion / custom | `case-study-drawer` | Free |
| Skills matrix | Structured Skills Matrix Grid | Custom Tailwind | Grouped Domain Grid (no auto-scroll) | Free |
| CTAs | Animated hover button | Vengeance | `my-animated-button` | Yes |
| Smooth scroll | Lenis | npm | `npm i lenis` | Yes |
| Premium extras **[B, D3=yes]** | Image reveal (`skiper71`), image cursor trail (`skiper18`), hover members (`skiper6`), drag & scroll (`skiper5`) | Skiper Premium | — | **Paid** |
| Text animation / page transition **[D2=yes]** | from owned pack | Animmaster | manual | **Paid** |

Every adopted component gets a row in `docs/components.md` (§14).

### 6.3 Stack mismatch decision tree (used in Phase 0)

| Verdict | Condition | Action |
|---|---|---|
| **S1** | Next.js App Router + Tailwind | Proceed as written |
| **S2** | Next.js (Pages Router) | Proceed; adapt `layout`/`template` tasks to `_app`/`_document`; use `next/dynamic` the same way |
| **S3** | Next.js without Tailwind | Add Tailwind (v4 per Vengeance docs) alongside existing CSS, scoped to new components; log migration notes |
| **S4** | React SPA (Vite/CRA) | Recommend migrating to Next.js App Router (**stop and get approval**); otherwise port components and replace `next/image`, `next/dynamic`, metadata with equivalents |
| **S5** | Non-React (static HTML, Astro, Svelte, etc.) | Recommend migrating to Next.js (**stop and get approval**). Migration checklist: scaffold Next, move content into typed data files, preserve every URL (redirect map), carry over assets, port the AI endpoint as a route handler, keep `/desktop` and `/classic`, port analytics, re-verify OG, deploy to preview, compare before/after |

For S4/S5 the agent writes `docs/MIGRATION.md` (URL map, redirect map, content inventory, risks) and **stops for approval** before coding.

---

## 7. Phase overview

| # | Phase | Size | Track |
|---|---|---|---|
| 0 | Audit + stack verdict | S | A+B |
| 1 | Correctness fixes | S | A+B |
| 2 | Foundations + component registry | M | A+B |
| 3 | Design direction + global systems | M | A+B / B |
| 4 | Navigation | M | A+B |
| 5 | Hero + instant entrance | M | A+B |
| 6 | AI résumé pill | S | A+B |
| 7 | About + Experience | M | A+B / B |
| 8 | Projects | L | A+B |
| 9 | Skills, Education, Contact, Footer | M | A+B |
| 10 | `/desktop` + `/classic` | M | A+B |
| 11 | Optional premium (Skiper Premium, Animmaster, WebGL) | M | B, opt-in |
| 12 | SEO, structured data, analytics | S | A+B |
| 13 | Tests + CI | M | A+B |
| 14 | Performance + polish | M | A+B |
| 15 | QA, release, post-launch | M | A+B |

Each phase below: **Goal → Tasks → Acceptance → Prompt**.

---

## 8. Phases

### Phase 0 — Audit and stack verdict (read-only)

**Goal:** Know exactly what exists; choose S1–S5.

**Tasks**
- Detect: Next.js version + router, TypeScript, Tailwind version, package manager, installed animation/UI libs, `components.json`, theme and font implementation, host config (`vercel.json`, etc.), analytics scripts, env var names (not values).
- Route map (`/`, `/desktop`, `/classic`, API routes). Section→component map. Every anchor id and every `href="#…"`.
- Animation inventory (CSS keyframes, Motion/Framer, GSAP, canvas).
- Metadata audit (canonical, og:url, images, `metadataBase`), redirects, `robots`/`sitemap` presence.
- Confirm the AI résumé rate limit is **server-side** (read-only; report only).
- Lighthouse baselines (mobile 4× CPU + desktop) in `docs/baseline/`.
- `npm audit` summary (report only).

**Acceptance**
- [ ] `docs/AUDIT.md` with stack verdict (S1–S5), route/section/anchor maps, animation inventory, protected-files list, risks + recommended defaults.
- [ ] Baselines saved.
- [ ] No source files changed.
- [ ] If verdict is S4/S5: `docs/MIGRATION.md` written and work stopped for approval.

**Prompt**
```text
Follow AGENTS.md. Do Phase 0 only: a READ-ONLY audit. Do not edit source files.

Produce docs/AUDIT.md with:
1. Stack: Next.js version + router type, TypeScript, Tailwind version, package manager, installed animation/UI libs, components.json status, theming and font implementation, host/deploy config, analytics scripts, env var NAMES only.
2. Stack verdict S1-S5 per PLAN.md section 6.3.
3. Route map including API routes. Mark the AI resume feature (component + API route + rate limit) PROTECTED and state whether the rate limit is enforced server-side.
4. Section map: homepage section -> component file -> section id.
5. Anchor audit: every in-page href="#..." and whether the id exists (suspects: #experience, #work).
6. Animation inventory with file paths.
7. Metadata audit: canonical, og:url, OG/Twitter image URLs, metadataBase; which domain each uses; robots/sitemap/redirect status.
8. Baseline Lighthouse (mobile with 4x CPU slowdown, and desktop) saved under docs/baseline/ with LCP, CLS, INP/TBT and total JS size.
9. npm audit summary (report only).
10. Risks and open questions, each with a recommended default.

If the verdict is S4 or S5, also write docs/MIGRATION.md (URL map, redirect map, content inventory, risks) and STOP for approval.
End with a <=10 line summary. Do not start Phase 1.
```

---

### Phase 1 — Correctness fixes

**Goal:** Remove known defects before layering polish.

**Tasks**
- Resolve D1: set `metadataBase`, canonical, `openGraph.url`, OG/Twitter image URLs to the same domain; verify image routes return 200.
- Make the non-canonical host (and `www`/apex variants) 301 to the canonical (prefer host/DNS-level; otherwise `redirects()` in `next.config`).
- Fix anchors: nav, mobile menu, hero CTA, footer all point to existing ids; add **Experience** to the top nav and mobile menu; footer "Work" → Projects id.
- Fix "Jile" (confirm intended word; if unclear, remove and flag).
- Add `scroll-margin-top` to all section ids.
- Log D4 mismatch; do not change titles.

**Acceptance**
- [ ] Every `href="#x"` resolves.
- [ ] OG/Twitter URLs resolve (200) on the canonical domain; non-canonical host redirects 301.
- [ ] Nav, mobile menu, footer list the same sections in the same order.
- [ ] Only the typo changed in copy; listed in PR and approved-copy table.

**Prompt**
```text
Follow AGENTS.md. Read PLAN.md Phase 1 and docs/AUDIT.md. Branch feat/portfolio-p01-fixes.

Fix:
1. Domain: set metadataBase, canonical, openGraph.url and OG/Twitter image URLs to <CANONICAL_DOMAIN> (ask me if not provided). Verify OG image routes return 200. Make the other host and www/apex variants 301 to the canonical (prefer host-level config; otherwise next.config redirects).
2. Anchors: nav, mobile menu, hero CTA and footer must all point to existing ids. Add "Experience" to the top nav and mobile menu. Footer "Work" must target the Projects id.
3. Copy: fix "Jile" in Practices (if the intended word is unclear, remove it and tell me).
4. Add scroll-margin-top to every section id.
5. Do NOT change hero/experience job titles; just log the mismatch.

Output a before/after table of every changed link and string. Run lint, typecheck, build. Stop after Phase 1.
```

---

### Phase 2 — Foundations and component registry

**Goal:** Install plumbing; verify every component before using it.

**Tasks**
- Branch, deps: engine per rule 6, `lenis`, `clsx`, `tailwind-merge`, `lucide-react` (if missing); ensure `lib/utils.ts` has `cn`.
- Add `registries` entry for `@vengeanceui` to `components.json` (§6.1).
- **Verify components:** for each slug in §6.2, `curl -sI` the registry URL; install in a scratch branch, read its source, list dependencies, check license/attribution, note any extra setup (Tailwind keyframes, CSS vars). Fill `docs/components.md`. Remove installs that are not used.
- Add tokens (§5.1), motion constants (§5.2), primitives (§5.3, except Cursor).
- Mount `<MotionConfig reducedMotion="user">`, `SmoothScroll`, `ScrollProgress` in root layout. Lenis off on reduced motion and on `/desktop` if it conflicts.
- Create `docs/transformation-log.md`, PR template.

**Acceptance**
- [ ] `docs/components.md` has one row per intended component (source URL, install command, deps, license, attribution, status OK/substituted).
- [ ] Site looks the same as before except smooth scroll + progress bar.
- [ ] `/desktop` and AI input work; reduced-motion disables Lenis.
- [ ] Lint, typecheck, build pass; Lighthouse mobile within 3 points of baseline.

**Prompt**
```text
Follow AGENTS.md. Read PLAN.md Phase 2 (and section 6) and docs/AUDIT.md. Branch feat/portfolio-p02-foundations.

1. Dependencies: use the animation engine already in the repo; if none, install framer-motion. Install lenis, clsx, tailwind-merge, lucide-react if missing. Ensure lib/utils.ts exports cn.
2. Add the "registries": {"@vengeanceui": "https://www.vengenceui.com/r/{name}.json"} entry to components.json.
3. Component verification: for each slug in PLAN.md 6.2, run `curl -sI https://www.vengenceui.com/r/<slug>.json` and record the status. Try installing each in a scratch branch, read the source, list its dependencies, extra setup (tailwind keyframes, CSS variables), and license/attribution. Fill docs/components.md. If a slug 404s, choose the closest alternative from https://www.vengenceui.com/components and log the substitution. Revert installs you will not use.
4. Add design/motion tokens from PLAN.md section 5 mapped into the detected Tailwind version. Reuse the site's existing accent and light-theme tokens.
5. Build primitives from PLAN.md 5.3 (Reveal, Stagger, SplitReveal, CountUp, usePointerFine, useInViewPause, SmoothScroll, ScrollProgress). Pointer hooks must be SSR-safe.
6. Mount MotionConfig reducedMotion="user", SmoothScroll and ScrollProgress in the root layout. Disable Lenis for reduced motion and on /desktop if it conflicts. Add data-lenis-prevent to existing inner scroll containers.
7. Create docs/transformation-log.md and .github/pull_request_template.md from PLAN.md section 14.

The site must look identical except for smooth scrolling and a thin progress bar. Run lint, typecheck, build; report Lighthouse mobile vs baseline. Stop after Phase 2.
```

---

### Phase 3 — Design direction and global systems

**Goal:** Lock the visual language once, so later phases stay consistent.

**Tasks**
- **[A+B]** Typography via `next/font`: **Locked to Geist (Display & Sans body) + Geist Mono (code, metrics, chips, timestamps)** via `next/font/google`. Define a responsive type scale with `clamp()`:
  - Display/H1: `clamp(2.5rem, 5vw, 4.25rem)` (weight 700, letter-spacing `-0.03em`)
  - H2 Section Header: `clamp(1.75rem, 3.5vw, 2.5rem)` (weight 600, letter-spacing `-0.02em`)
  - H3 Card Title: `clamp(1.125rem, 2vw, 1.35rem)` (weight 600)
  - Body: `1rem` / `16px` (line-height 1.6, weight 400)
  - Mono labels / badges: `0.75rem` / `12px` (uppercase, tracking `0.08em`)
- **[B]** Atmosphere: subtle grain overlay (SVG noise, 3–4% opacity, `pointer-events:none`), hairline borders (`--border`), subtle vignette on hero.
- **[B]** `Cursor` component: dot + ring, states (default, link, "View", text), fine pointer only; native cursor kept for inputs/text selection; off under reduced motion.
- **[A+B]** Page enter transition via `template.tsx` (opacity/translate only); optional curtain wipe on route changes.
- **[A+B]** `docs/DESIGN.md`: tokens, type scale, spacing, motion spec, component states, do/don't.
- Take screenshots at 375 / 768 / 1440 in dark and light, attach to PR, **stop for owner approval**.

**Acceptance**
- [ ] `docs/DESIGN.md` committed with tokens and type scale; screenshots attached.
- [ ] No CLS from font swap (`display: swap` + `size-adjust` via `next/font`).
- [ ] Cursor never renders on touch; reduced motion = native cursor.
- [ ] Contrast ≥ 4.5:1 body in both themes.

**Prompt**
```text
Follow AGENTS.md. Read PLAN.md Phase 3 and docs/AUDIT.md. Branch feat/portfolio-p03-design. Track: <A or B>.

1. Typography: implement Geist (Display & Body) and Geist Mono via next/font/google with the clamp()-based type scale from PLAN.md Phase 3.
2. Track B: add subtle grain overlay (SVG noise, 3-4% opacity, pointer-events none), hairline borders, and cursor-following glow in the hero (fine pointer only).
3. Track B: build components/Cursor.tsx (dot + ring, link/"View"/text states). Fine pointer only; keep native cursor for inputs and text selection; disabled under reduced motion.
4. Add an enter transition in app/template.tsx (opacity/translate only).
5. Write docs/DESIGN.md (tokens, type scale, spacing, motion, component states, do/don't).
6. Capture screenshots at 375, 768 and 1440 in dark and light themes and list them in the PR. STOP and wait for my approval before Phase 4.

No copy changes. Run lint, typecheck, build.
```

---

### Phase 4 — Navigation

**Goal:** Clean, high-performance top navigation with an active section indicator and zero floating collision.

**Tasks**
- Install Spotlight Navbar (`spotlight-navbar`) from `@vengeanceui`; refactor to tokens.
- Desktop (≥1024px): fixed top frosted glass navbar (`h-14`, `backdrop-blur-md`, hairline border `--border`, sticky `top-0`, z-index 40) containing: Brand mark, section links (About, Experience, Projects, Skills, Education, Contact), **Desktop OS** (`/desktop`), **Résumé** (`resume.pdf`), and Theme Toggle.
- Mobile/tablet (<1024px): compact top bar (`h-14`) with brand + theme toggle + hamburger button opening a full-screen sheet; focus trap, `Esc` closes, scroll lock (`lenis.stop()`), `data-lenis-prevent` on sheet, `dvh` safe-area insets.
- Active-section indicator: subtle spotlight / indicator driven by `IntersectionObserver`.
- Smooth scrolling via Lenis with proper navbar height offset (`scroll-margin-top: 4rem`).

**Acceptance**
- [ ] Labels and ordering identical across top nav, mobile sheet, and footer.
- [ ] Keyboard accessible: logical tab order, Enter activates, visible focus ring, `Esc` closes sheet.
- [ ] Active section updates smoothly without jank; in-page links use Lenis with correct navbar offset.
- [ ] No horizontal scroll at 320px; touch targets ≥ 44px.
- [ ] No bottom floating widgets colliding with viewport or mobile keyboards.

**Prompt**
```text
Follow AGENTS.md. Read PLAN.md Phase 4, docs/components.md, docs/DESIGN.md. Branch feat/portfolio-p04-nav.

1. Install spotlight-navbar from @vengeanceui; refactor to our tokens; remove demo code.
2. Desktop (>=1024px): fixed top frosted glass bar (h-14, backdrop-blur-md, top-0, z-40) with About, Experience, Projects, Skills, Education, Contact, Desktop OS (/desktop), Resume (resume.pdf), theme toggle.
3. Mobile/tablet (<1024px): compact top bar + full-screen sheet with focus trap, Esc to close, lenis.stop() while open, data-lenis-prevent, safe-area insets.
4. Active-section highlighting via IntersectionObserver. In-page links scroll via Lenis with correct navbar offset (scroll-margin-top).
5. Theme toggle preserved in navbar.
6. All motion respects prefers-reduced-motion.

Acceptance: keyboard accessible, 44px touch targets, no horizontal scroll at 320px, same labels/order in nav, mobile menu and footer. Run lint, typecheck, build; report Lighthouse. Stop after Phase 4.
```

---

### Phase 5 — Hero and instant entrance

**Goal:** A confident, memorable first screen without hurting LCP. Instant hydration without blocking splash screens.

**Tasks**
- Animated Rays hero background, lazy-loaded (`next/dynamic`); enforce a central dark radial vignette mask (`radial-gradient(circle at center, rgba(10,10,11,0.92) 20%, rgba(10,10,11,0.6) 80%, transparent 100%)`) over the canvas layer so rays provide subtle peripheral ambiance without compromising H1/subtitle contrast; static gradient fallback on small screens and reduced motion; pause offscreen.
- Secondary line (e.g., "Java 21 · Azure · RAG") cycles via Flip/Morph Text. **H1 stays static** (SEO/a11y). Fixed-height wrapper.
- **[B]** H1 and subtitle use `SplitReveal` (masked lines).
- **Technical Proof Ribbon:** Consolidate core quantitative metrics (TCS 20× latency reduction, 700+ DSA problems, 1672 contest rating, 8.79/10 CGPA) into a sleek, unified horizontal technical ledger/ribbon anchored at the bottom of the Hero leading into Experience. `CountUp` once on first in-view.
- Instant hydration: **no blocking full-screen loader**. Lightweight in-situ entry stagger of badge, H1, subtitle, and CTAs (duration ≤ 300ms total, initial mount only, disabled under reduced motion).
- LCP image: `next/image` with `priority`, correct `sizes`, fixed dimensions.

**Acceptance**
- [ ] LCP < 2.5s on throttled mobile; LCP element is portrait or H1.
- [ ] Content is immediately visible on mount (0ms delay to FCP); no splash screen blocks interaction.
- [ ] Rays pause offscreen and are off under reduced motion; zero CLS from rotating text.

**Prompt**
```text
Follow AGENTS.md. Read PLAN.md Phase 5, docs/components.md, docs/DESIGN.md. Branch feat/portfolio-p05-hero. Track: <A or B>.

1. Use animated-rays as the hero background, lazy-loaded (next/dynamic). Static CSS gradient fallback on small screens and under reduced motion; pause when offscreen (useInViewPause).
2. Use flip-text (or morph-text) ONLY for a secondary line (the focus keywords). Keep the H1 static. Use a fixed-height wrapper: zero layout shift.
3. Track B: reveal the H1 and subtitle with SplitReveal (masked lines).
4. Replace static hero numbers with CountUp (once, on first view); keep exact values and labels.
5. Instant hydration: do NOT add a full-screen loader. Implement a lightweight in-situ entrance stagger (<=300ms total) for badge, H1, subtitle and CTAs on initial mount; skip under reduced motion.
6. Portrait uses next/image with priority and correct sizes.

No copy changes. Run lint, typecheck, build; report Lighthouse mobile before/after. Stop after Phase 5.
```

---

### Phase 6 — "Ask my résumé" pill

**Goal:** Make the AI feature a signature interactive showcase inside the Hero section **without touching its backend or causing floating layout collisions**.

**Tasks**
- Install Skiper UI Dynamic Island (`@skiper-ui/skiper2`) after confirming it is free; add credit per D9 in footer.
- **Placement & Spatial Layout:** Anchor the pill **inline inside the Hero section**, placed directly beneath the primary CTA buttons. It does NOT float globally or block other page sections.
- Wrap the existing input in the expanding pill:
  - **Collapsed:** Centered pill with subtle pulse, "Ask my résumé" label + live remaining daily query counter (`10/10`).
  - **Expanded (on focus/click):** Expands in-place with smooth layout transition (max-w 640px) revealing: the prompt input + existing quick-prompt chips (Experience, Projects, Stack, LeetCode, Contact) + streaming answer area (max-height 320px, internal scroll with `data-lenis-prevent`).
- Existing props, handlers, API calls, limit logic unchanged.

**Acceptance**
- [ ] Network requests/payloads identical to before (diffed).
- [ ] Pill expands smoothly inline in the Hero without shifting or breaking hero height.
- [ ] `Enter` submits, `Esc` collapses; `aria-live="polite"` on answers.
- [ ] iOS Safari with on-screen keyboard: handled cleanly with `dvh`; does not jump or break viewport.
- [ ] Limit-reached and error states styled cleanly.
- [ ] Attribution line present (if Skiper free component used).

**Prompt**
```text
Follow AGENTS.md. Read PLAN.md Phase 6 and docs/AUDIT.md. Branch feat/portfolio-p06-ai-pill.

The "Ask my resume" component and its API route are PROTECTED: do not change the API route, request/response shape, rate limiting or the 10/day logic. Presentation only.

1. Confirm @skiper-ui/skiper2 (Dynamic Island) is a free component, then `npx shadcn add @skiper-ui/skiper2`. Refactor to our tokens. Add the Skiper UI credit required by its free license to the footer credits.
2. Position the pill INLINE within the Hero section beneath the primary CTA group. It does not float globally.
3. Wrap the existing input/chips/answer UI in the expanding pill: collapsed = label + remaining count; expanded on focus/tap = input + quick-prompt chips + streaming answer area (max-height 320px, internal scroll, data-lenis-prevent).
4. Enter submits, Esc collapses, aria-live="polite" on the answer region, iOS keyboard handled with dvh.
5. Style limit-reached and error states.
6. Prove no backend change: list files touched and confirm nothing under the API route directory changed.

Run lint, typecheck, build. Stop after Phase 6.
```

---

### Phase 7 — About and Experience

**Goal:** Editorial narrative and technical career depth without redundant card spam.

**Tasks**
- **[A+B]** About Section: Dedicate to editorial narrative and current technical focus ("Beyond Code", real engineering philosophy, "Right now", profile card) in a clean layout. **Do NOT repeat quantitative stats already displayed in the Technical Proof Ribbon**.
- **[A+B]** TCS Experience Block: Highlight the four key technical achievements (latency reduction, microservices architecture, batch pipeline, cloud reliability). "View full responsibilities" = height-auto expand/collapse with staggered list, `aria-expanded`, focus kept on toggle.
- **[A+B]** Pull-quote: once-only subtle text reveal.
- **[B]** Experience storytelling: clean responsive layout (1 col <640px, 2 cols tablet, 3-4 cols desktop). Cursor spotlight only with `usePointerFine`. No scroll-jacking or scroll traps.

**Acceptance**
- [ ] No redundant metric duplication between Hero/Proof Ribbon and About.
- [ ] Grid: 1 col <640px, 2 cols tablet, 3–4 cols desktop; no overflow.
- [ ] Expand/collapse has no layout jump; keyboard works.
- [ ] Spotlight never runs on touch.

**Prompt**
```text
Follow AGENTS.md. Read PLAN.md Phase 7, docs/components.md, docs/DESIGN.md. Branch feat/portfolio-p07-experience. Track: <A or B>.

1. About Section: Focus on editorial narrative, profile, and "Right now" current engineering focus. Do NOT repeat the quantitative stats (20x, 700+, etc.) that are already in the Technical Proof Ribbon.
2. TCS Experience: Implement the four highlight cards with height-auto expand/collapse for full responsibilities, aria-expanded, focus stays on toggle.
3. Pull quote: once-only subtle text reveal.
4. Cursor spotlight only with usePointerFine; on touch use a subtle :active state.
5. Keep all text and numbers exactly as they are.

Verify 320, 375, 768, 1024, 1440. Run lint, typecheck, build. Stop after Phase 7.
```

---

### Phase 8 — Projects

**Goal:** The strongest section: smooth filtering, richer case studies, live-feeling AlgoGuru card.

**Tasks**
- Filter chips: Motion `layout` + `AnimatePresence mode="popLayout"`; chip counts unchanged.
- Cards: spotlight hover (fine pointer) + lift; inline visuals (service topology, canvas bars, Huffman tree, chat bubble) animate once in view, pause offscreen, canvas lazy-loaded.
- "Read the case study": **Slide-over Case Study Drawer** on desktop (slides from right, width `50vw`, focus trap, `role="dialog"`, `aria-modal="true"`, `Esc` closes, scroll lock, `data-lenis-prevent`) / **Bottom Sheet** on mobile (`max-h-[85dvh]`, drag-to-dismiss). Replaces gimmick folder-preview to ensure full architectural write-ups and topology diagrams are readable.
- AlgoGuru mock: code types line by line on view, then "3 / 3 test cases passed · 4 ms · O(n)" animates in; final state instantly under reduced motion.
- **[B]** Subtle 3D tilt on the flagship card (fine pointer only, ≤ 6°).
- No change to text, tags, metrics or links.

**Acceptance**
- [ ] Filtering never causes scroll jump or overlap.
- [ ] Case-study view accessible (focus trap, `aria-modal`, `Esc`, return focus) and works at 320px.
- [ ] Offscreen visuals paused; no long task > 50ms during scroll at 4× CPU.
- [ ] All links unchanged.

**Prompt**
```text
Follow AGENTS.md. Read PLAN.md Phase 8, docs/components.md, docs/DESIGN.md. Branch feat/portfolio-p08-projects. Track: <A or B>.

1. Filter chips: Motion layout animations with AnimatePresence mode="popLayout". No scroll jump, no overlap; keep chip counts as-is.
2. Cards: spotlight hover (fine pointer only) + small lift. Inline visuals (service topology, canvas bars, Huffman tree, chat bubble) animate once in view and pause offscreen; lazy-load canvas ones.
3. "Read the case study": build a slide-over case study drawer on desktop (50vw width) and a bottom sheet on mobile (max-h 85dvh). Focus trap, aria-modal, labelled, Esc closes, focus returns, scroll lock, data-lenis-prevent.
4. AlgoGuru mock: type the code line by line when in view, then animate in "3 / 3 test cases passed - 4 ms - O(n)". Under reduced motion show the final state immediately.
5. Track B: subtle tilt (max 6 degrees, fine pointer only) on the flagship card.
6. Do not change any project text, tags, metrics or links.

Verify 320/375/768/1280 and that with 4x CPU throttle there are no long tasks > 50ms while scrolling. Run lint, typecheck, build. Stop after Phase 8.
```

---

### Phase 9 — Skills, Education, Contact, Footer

**Tasks**
- **Structured Skills Matrix Grid:** Replace auto-scrolling marquee with a clean, high-density categorical grid grouped by discipline:
  1. *Languages & Runtimes:* Java 21, TypeScript, Python, C++, SQL.
  2. *Cloud & Distributed Systems:* Azure, Spring Boot, Microservices, Docker, Kubernetes, Kafka.
  3. *AI & Architecture:* RAG, Vector DBs, LangChain/LlamaIndex, System Design, REST/gRPC.
  4. *Storage & Databases:* PostgreSQL, Redis, MongoDB, Hibernate/JPA.
  5. *Practices & Tools:* Git, CI/CD, Agile, Linux, Unit/Integration Testing.
  Each skill badge rendered with subtle border, category chip indicator, and crisp typography (staggered in-situ reveal on view, once).
- Education: vertical timeline with scroll-linked progress line (`useScroll` + `scaleY`).
- Contact: magnetic CTA (fine pointer only), animated button for résumé; keep IST clock + availability badge untouched; email copy button with 2s checkmark toast.
- Footer: big name mark reveals on scroll; credits line (Skiper attribution, if free tier used).
- Small fixed section-number indicator (01 → 05) updated via `IntersectionObserver` (hidden on mobile).

**Acceptance**
- [ ] Skills grid: immediate scannability across 320px–1920px; zero layout shift; no distracting auto-scroll loops.
- [ ] Timeline line uses transform only.
- [ ] Magnetic effect never runs on touch.
- [ ] Email copy provides 2s toast feedback with checkmark.
- [ ] Credits present and accurate.

**Prompt**
```text
Follow AGENTS.md. Read PLAN.md Phase 9, docs/components.md, docs/DESIGN.md. Branch feat/portfolio-p09-finish. Track: <A or B>.

1. Skills: build a structured, high-density Skills Matrix Grid grouped by engineering discipline (Languages, Cloud & Distributed, AI & Architecture, Storage, Practices). Stagger chips on view once; NO infinite moving marquee.
2. Education: vertical timeline with a scroll-linked progress line (useScroll + scaleY, transform only).
3. Contact: magnetic CTA (usePointerFine only); resume button with my-animated-button; email copy button with 2s checkmark confirmation toast. Keep IST clock and availability badge untouched.
4. Footer: scroll-in reveal for the large name mark; add credits line for any library requiring attribution (Skiper free tier).
5. Small fixed section indicator (01-05) via IntersectionObserver; hidden below 1024px.
6. No copy changes.

Run lint, typecheck, build. Stop after Phase 9.
```

---

### Phase 10 — `/desktop` and `/classic`

**Goal:** Make the unique alternate views consistent, accessible and mobile-safe.

**Tasks**
- Apply tokens/typography to `/desktop` and `/classic`; keep behavior.
- `/desktop`: keyboard accessible windows (focus, `Esc`, arrow-key nudging optional); on < 768px show a simplified stacked layout or a clear "best on desktop" notice with a link back (no broken drag UI on touch).
- `/classic`: semantic HTML (`main`, `section`, headings in order), print stylesheet (clean A4), skip link.
- Both: back-to-main link, no animation requirement (reduced-motion safe), correct `<title>`/meta, `noindex` decision recorded (default: `/classic` indexable, `/desktop` noindex).

**Acceptance**
- [ ] No horizontal scroll at 320px on either route.
- [ ] `/desktop` fully keyboard operable; mobile fallback works.
- [ ] `/classic` passes axe with no serious/critical issues; prints cleanly.

**Prompt**
```text
Follow AGENTS.md. Read PLAN.md Phase 10 and docs/DESIGN.md. Branch feat/portfolio-p10-alt-views.

1. Apply tokens/typography to /desktop and /classic without changing their behavior or content.
2. /desktop: make windows keyboard operable (focus management, Esc to close). Below 768px, show a simplified stacked layout or a clear notice with a link back; no broken drag UI on touch.
3. /classic: semantic HTML (main/section, ordered headings), skip link, print stylesheet for clean A4 output.
4. Both: link back to the main site, correct title/meta. Robots: /classic indexable, /desktop noindex (tell me if you disagree).
5. Run axe on both routes and fix serious/critical issues you introduced or find.

Run lint, typecheck, build. Stop after Phase 10.
```

---

### Phase 11 — Optional premium extras (only if opted in)

**11a — Skiper Premium (D3 = yes, Track B).** Only with a valid license. Candidates: image reveal (`skiper71`) for portrait/project media, image cursor trail (`skiper18`) in the hero (desktop only, 4–6 project thumbnails, throttled), hover members (`skiper6`), things drag-and-scroll (`skiper5`). Add at most **two**. No attribution is required with Pro, but record the license in `docs/components.md`.

**11b — Animmaster (D2 = yes).** Read `terms.html`; keep the zip out of the repo. Choose **one** text animation (hero headline) and **one** page transition (between `/`, `/desktop`, `/classic`). Port to React; remove global side effects; no second scroll engine.

**11c — Hero WebGL (opt-in flag).** Behind `NEXT_PUBLIC_HERO_WEBGL=1`: a lightweight shader/gradient canvas (prefer a tiny library or raw WebGL; avoid heavy 3D engines). Desktop fine pointer only, lazy-loaded on idle, pauses offscreen, falls back to Animated Rays. Hard budget: ≤ 30 KB gzip added JS, 60fps on a mid laptop, GPU-light.

**Acceptance (for any of 11a/b/c)**
- [ ] Added JS ≤ 30 KB gzip per feature (or lazy-loaded).
- [ ] Reduced-motion + touch fallbacks.
- [ ] Lighthouse mobile unchanged (±2) because features are desktop-gated.
- [ ] License recorded.

**Prompt**
```text
Follow AGENTS.md. Read PLAN.md Phase 11. Branch feat/portfolio-p11-premium. Do ONLY the sub-phases I enable: 11a=<yes/no>, 11b=<yes/no>, 11c=<yes/no>.

General: lazy-load, desktop fine-pointer only, reduced-motion and touch fallbacks, <=30 KB gzip added JS per feature, record license/source in docs/components.md.
11a: add at most two Skiper Premium components from my licensed access: <list>. Do not paste their source anywhere public.
11b: the Animmaster zip is at <PATH_OUTSIDE_REPO> (never copy the zip into the repo). Read its terms and tell me any restriction. Port ONE text animation (hero headline) and ONE page transition to components/animmaster/.
11c: implement a lightweight hero shader behind NEXT_PUBLIC_HERO_WEBGL=1 with fallback to animated-rays; pause offscreen.

Run lint, typecheck, build; report bundle-size delta and Lighthouse. Stop after Phase 11.
```

---

### Phase 12 — SEO, structured data, analytics

**Tasks**
- `app/sitemap.ts`, `app/robots.ts` (allow all; disallow API routes; sitemap URL on canonical domain).
- JSON-LD `Person` schema on the home page (no email in JSON-LD).
- Verify OG/Twitter image generation (`opengraph-image`, `twitter-image`) renders correctly on canonical domain, 1200×630.
- Title/description unchanged unless in approved-copy table; `lang="en"`; `theme-color` for both schemes; favicon set + `manifest`.
- Custom `not-found.tsx` page in the site's style.
- Analytics (D8): keep existing; otherwise add Vercel Analytics + Speed Insights (no cookies banner needed for these; if another tool is used, check consent requirements).
- Security headers in `next.config` (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors`/`X-Frame-Options`); CSP in **report-only** first (the AI endpoint and fonts must keep working).

Reference snippets:

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
const base = "https://<CANONICAL_DOMAIN>";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/classic`, changeFrequency: "monthly", priority: 0.5 },
  ];
}
```

```tsx
// JSON-LD (inject with <script type="application/ld+json">)
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aritra Dutta",
  jobTitle: "Full Stack Application Engineer",
  worksFor: { "@type": "Organization", name: "Tata Consultancy Services" },
  url: "https://<CANONICAL_DOMAIN>",
  sameAs: [
    "https://github.com/Aritradutta2002",
    "https://www.linkedin.com/in/aritra-dutta-rick20/",
    "https://leetcode.com/u/Ari2001/",
    "https://www.codechef.com/users/interover01",
  ],
};
```

**Acceptance**
- [ ] `/sitemap.xml` and `/robots.txt` return 200 on the canonical domain.
- [ ] Rich Results Test / schema validator shows a valid `Person`.
- [ ] OG preview verified in LinkedIn Post Inspector and Twitter/X card preview.
- [ ] Security headers present; CSP in report-only with no violations from first-party features.

**Prompt**
```text
Follow AGENTS.md. Read PLAN.md Phase 12. Branch feat/portfolio-p12-seo. Canonical domain: <CANONICAL_DOMAIN>.

1. Add app/sitemap.ts and app/robots.ts (disallow API routes; sitemap on canonical domain).
2. Add JSON-LD Person (use the snippet in PLAN.md; do not include the email).
3. Verify opengraph-image/twitter-image render at 1200x630 and resolve on the canonical domain.
4. Add not-found.tsx in the site style; favicon set + manifest + theme-color for both schemes.
5. Analytics: keep what exists; if none, add Vercel Analytics and Speed Insights.
6. Security headers in next.config (X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame protections). Add CSP as Content-Security-Policy-Report-Only first; list any violations from first-party features.
7. Do not change title/description copy.

Run lint, typecheck, build. Stop after Phase 12.
```

---

### Phase 13 — Tests and CI

**Tasks**
- Playwright smoke tests (Chromium + WebKit): home loads, no console errors, every in-page anchor resolves, nav works on desktop and mobile viewport, filter chips change visible cards, `/desktop` and `/classic` load, AI input renders (mock the API; never call the real model in CI).
- `@axe-core/playwright` accessibility checks on `/`, `/classic`, `/desktop`.
- Reduced-motion test (`emulateMedia({ reducedMotion: "reduce" })`): motion entrance skipped, marquee static.
- Visual snapshots (optional) for 375 / 1440 in dark theme.
- Lighthouse CI with assertions; GitHub Actions workflow running lint, typecheck, build, e2e, lhci on PRs.

```ts
// e2e/smoke.spec.ts
import { test, expect } from "@playwright/test";

test("anchors resolve and no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto("/");
  const hrefs = await page.$$eval('a[href^="#"]', (as) =>
    as.map((a) => a.getAttribute("href")!).filter((h) => h.length > 1)
  );
  for (const h of new Set(hrefs)) {
    await expect(page.locator(h)).toHaveCount(1);
  }
  expect(errors).toEqual([]);
});
```

```json
// lighthouserc.json
{
  "ci": {
    "collect": { "startServerCommand": "npm run start", "url": ["http://localhost:3000/"], "numberOfRuns": 3 },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }]
      }
    }
  }
}
```

**Acceptance**
- [ ] `npm run test:e2e` green locally and in CI.
- [ ] No serious/critical axe violations.
- [ ] CI blocks merges on failures.

**Prompt**
```text
Follow AGENTS.md. Read PLAN.md Phase 13. Branch feat/portfolio-p13-tests.

1. Add Playwright (Chromium + WebKit) with: anchors-resolve + no-console-errors, desktop and mobile nav, project filter changes visible cards, /desktop and /classic load, AI input renders with the API MOCKED (never hit the real model in CI), reduced-motion behavior (entrance stagger skipped, marquee static).
2. Add @axe-core/playwright checks for /, /classic, /desktop; fix serious/critical issues you can; list the rest.
3. Add Lighthouse CI (lighthouserc.json per PLAN.md) and a GitHub Actions workflow that runs lint, typecheck, build, e2e and lhci on pull requests.
4. Add npm scripts: test:e2e, lhci.

Report results. Stop after Phase 13.
```

---

### Phase 14 — Performance and polish

**Tasks**
- Bundle analyzer; list top 10 client chunks; dynamic-import or remove anything non-essential; strip leftover registry demo code; confirm only one animation engine in the bundle.
- Images: `next/image`, accurate `sizes`, AVIF/WebP, explicit dimensions; preload only the LCP image; convert large JPGs (e.g., memoji) to WebP/AVIF.
- Fonts: `next/font`, subset, `display: swap`.
- Animation hygiene: `will-change` only while animating; loops paused offscreen; no heavy `filter`/`box-shadow` animation at scale.
- Consistency pass against `docs/DESIGN.md` (durations, easings, reveal distances, hover states).
- `content-visibility: auto` + `contain-intrinsic-size` on long below-the-fold sections.
- Low-power mode: on `navigator.hardwareConcurrency <= 4` or `saveData`, downgrade (static rays, no cursor glow, no tilt).

**Acceptance**
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- [ ] LCP < 2.5s, CLS < 0.1, INP < 200ms (throttled).
- [ ] Home-route JS documented before/after; target ≤ baseline + 60 KB.

**Prompt**
```text
Follow AGENTS.md. Read PLAN.md Phase 14 and docs/baseline/. Branch feat/portfolio-p14-perf.

1. Run the bundle analyzer; list the 10 largest client chunks; dynamically import or remove non-essential ones; delete unused registry demo code; confirm only one animation engine is bundled.
2. Images: next/image, accurate sizes, explicit dimensions, AVIF/WebP, only the LCP image preloaded.
3. Fonts via next/font, subset, display swap.
4. Animation hygiene: will-change only while animating; pause all loops/canvas offscreen; no heavy filter/box-shadow animation.
5. Consistency pass against docs/DESIGN.md.
6. content-visibility:auto + contain-intrinsic-size on long below-the-fold sections.
7. Low-power downgrade when navigator.hardwareConcurrency <= 4 or Save-Data is on: static rays, no cursor glow, no tilt.

Report before/after: home-route JS size, LCP, CLS, TBT/INP, Lighthouse scores (mobile, 4x CPU). Stop after Phase 14.
```

---

### Phase 15 — QA, release, post-launch

**Tasks**
- Run every checklist in §10–§11; fix in-scope failures.
- Preview deployment; test on at least one real iPhone and one mid-range Android.
- Tag the pre-change commit `pre-transformation` (if not yet tagged), merge PRs in order, tag `v2-portfolio`.
- Production smoke test: redirects (non-canonical host, www/apex), OG previews, `resume.pdf`, AI input end-to-end (one real request by the owner), analytics events.
- **Post-launch (week 1):** submit the sitemap in Google Search Console (add/verify the canonical property); request indexing for `/`; check Core Web Vitals field data after ~28 days; refresh link previews (LinkedIn Post Inspector); update the links on LinkedIn, GitHub profile, résumé PDF and email signature to the canonical domain; keep the old build's preview URL for a week.
- Final report: adopted components with sources/licenses, Lighthouse before/after, known issues, rollback instructions.

**Prompt**
```text
Follow AGENTS.md. Read PLAN.md Phase 15.

1. Run every item in PLAN.md sections 10 and 11; report pass/fail per item; fix in-scope failures and list the rest.
2. Confirm the AI resume feature works end-to-end and its limit logic is unchanged (diff against the baseline commit for protected paths).
3. Confirm /desktop and /classic work and are reachable from the dock and footer.
4. Verify redirects, sitemap, robots, OG/Twitter previews on the canonical domain.
5. Produce docs/RELEASE.md: adopted components (name, source, license, attribution), Lighthouse before/after, known issues, rollback steps, post-launch checklist from PLAN.md.
Do not deploy or merge; prepare release notes only.
```

---

## 9. Responsive and device behavior matrix

### 9.1 Viewport layout matrix

| Section / Feature | Desktop (≥1024px, Fine Pointer) | Tablet (640–1023px, Touch/Pointer) | Mobile (<640px, Touch, min 320px) | Reduced Motion / Low Power |
|---|---|---|---|---|
| **Top Nav** | Top fixed frosted glass bar (`h-14`), active indicator, theme toggle | Compact top bar (`h-14`) + hamburger; full-screen sheet with `dvh` | Compact top bar (`h-14`) + hamburger; full-screen sheet with `dvh` | Static, instant open/close (no spring) |
| **Hero Background** | Animated Rays + dark radial vignette mask | Reduced intensity Animated Rays + vignette | Static CSS dark radial mesh gradient | Static CSS dark radial mesh gradient |
| **Hero Headline / Stagger** | In-situ stagger (≤300ms); static H1 + cycling keywords | In-situ stagger (≤300ms); static H1 + keywords | Instant render; static H1 + keywords | Instant render; all text static |
| **Technical Proof Ribbon** | 4-column unified horizontal ribbon | 4-column wrapped horizontal grid | 2x2 compact technical ledger card | Static values, count-up skipped |
| **AI Résumé Pill** | Inline Hero pill, expands in-place to max-w 640px | Inline Hero pill, expands in-place to max-w 540px | Inline Hero pill, expands to 100% width (`dvh` keyboard handling) | Static input form, no expansion spring |
| **About Section** | 2-column editorial story panel + "Right now" card | 1-column story panel + current focus | 1-column clean story panel | Static layout, no reveal stagger |
| **Experience (TCS)** | 4 highlight cards, height-auto expand/collapse | 4 highlight cards, height-auto expand/collapse | Stacked 1-column cards, full touch targets (≥44px) | Static layout, instant expand/collapse |
| **Projects Grid** | 2-column card grid + flagship hero feature | 2-column card grid | 1-column stacked cards | Instant filter re-flow (no popLayout spring) |
| **Case Study View** | Slide-over drawer (w-1/2 screen, focus trap, ESC) | Slide-over drawer (w-2/3 screen, focus trap) | Bottom sheet drawer (`max-h-[85dvh]`, drag-to-dismiss, ESC) | Static modal overlay, no spring transition |
| **AlgoGuru Live Mock** | Interactive / line-by-line typing when in view | Line-by-line typing when in view | Line-by-line typing when in view | Pre-rendered static syntax block (instant) |
| **Skills Matrix** | 5-column categorical domain grid | 3-column categorical domain grid | 2-column compact badge grid | Static grid, no chip entrance stagger |
| **`/desktop` Route** | Full interactive windowing system (draggable/resizable) | Simplified single-window view | Informative notice + direct link to `/classic` | Static non-animated windows |
| **`/classic` Route** | Clean typographic sheet with A4 print layout | Clean typographic sheet with A4 print layout | Clean 1-column typographic sheet | Identical (native plain HTML/CSS) |

### 9.2 Accessibility & ARIA Architecture

- **Semantic Landmarks:**
  - `<header role="banner">` wraps the fixed top navigation.
  - `<nav aria-label="Primary Navigation">` wraps the navigation links.
  - `<main id="main-content">` wraps all primary content sections.
  - `<footer role="contentinfo">` wraps the footer and credits.
- **Skip Link:** Fixed offscreen `<a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black">Skip to content</a>`.
- **AI Résumé Assistant (`aria-live`):**
  - Streaming answer container tagged with `aria-live="polite"` and `aria-atomic="false"` so screen readers announce incoming response tokens without stuttering.
  - Query counter has `aria-label="Remaining daily queries: X of 10"`.
- **Modals & Drawers (Case Study & Mobile Sheet):**
  - Elements use `role="dialog"` and `aria-modal="true"`.
  - Labelled via `aria-labelledby="case-study-title"`.
  - Strict focus trap when open: Tab cycles strictly within dialog; `ESC` key unmounts/closes dialog; focus returns to the triggering card button.
- **Touch Target Floor:** Every interactive element (nav links, filter chips, theme toggle, prompt chips, copy button) has an active click/touch bounding box of at least **44×44px**.
- **Color Contrast:** All body text maintains a contrast ratio of ≥ 4.5:1 against its immediate background in both dark (`#f4f4f5` on `#0a0a0b`) and light (`#09090b` on `#fcfcfd`) modes. Large headings maintain ≥ 3:1.

---

## 10. Performance budgets and accessibility

| Metric | Budget (mobile, 4× CPU, Slow 4G) |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
| TBT | < 200ms |
| Home-route JS (gzip) | Baseline + ≤ 60 KB |
| Lighthouse | Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95 |
| Long tasks while scrolling | none > 50ms |

**Accessibility checklist**
- [ ] Everything reachable by keyboard; visible focus ring everywhere.
- [ ] `prefers-reduced-motion` honored (hero entrance, marquee, tilt, cursor, Lenis).
- [ ] Contrast ≥ 4.5:1 body, ≥ 3:1 large text/UI, both themes.
- [ ] Modals/sheets: focus trap, `Esc`, return focus, `aria-modal`, labelled.
- [ ] Decorative animation `aria-hidden`; rotating text has a static accessible equivalent.
- [ ] Skip link works.
- [ ] No content only reachable through hover.

---

## 11. QA checklist

**Cross-device**
- [ ] Widths: 320, 375, 414, 768, 1024, 1280, 1536, 1920; landscape on phones/tablets.
- [ ] Browsers: Chrome, Safari (macOS + iOS), Firefox, Edge. Check `backdrop-filter`, `dvh`, sticky, Lenis on iOS.
- [ ] Slow network + 4× CPU.
- [ ] Both dark and light themes verified across all viewports.
- [ ] Routes: `/`, `/desktop`, `/classic`, resume download, all external links.

**Regression**
- [ ] AI résumé: ask, stream, limit reached, error.
- [ ] Every number/claim identical to pre-migration (diff via the approved-copy table).
- [ ] Redirects: non-canonical host, www/apex.
- [ ] Console clean in production build.

---

## 12. Rollback

- Tag `pre-transformation` before Phase 1 merges.
- Each phase is a separate PR → revert independently (`git revert <merge-commit>`).
- Keep the previous production deployment available for instant rollback on the host (Vercel: promote the previous deployment).
- Keep the old build's preview URL for at least a week after launch.
- If Lighthouse mobile drops below 85 or INP exceeds 300ms after any phase: stop, revert that phase, investigate before continuing.
- DNS/redirect changes: record previous values in `docs/RELEASE.md` so they can be restored.

---

## 13. Extra prompts

**Independent review (fresh session)**
```text
Review the diff of branch <branch> against main using PLAN.md and AGENTS.md. Check: content unchanged, protected files untouched, reduced-motion and touch fallbacks present, no layout shift, one animation engine only, inner scroll containers have data-lenis-prevent, bundle-size delta, accessibility (focus, aria), component licenses logged. List blockers, then nice-to-haves. Do not edit files.
```

**Jank investigation**
```text
<Section/component> janks on <device/throttle>. Profile it: list long tasks and layout/paint costs. Propose the smallest fix that keeps the design (transform/opacity, IntersectionObserver pausing, dynamic import, content-visibility). Implement it, then show before/after numbers.
```

**Port a registry component to project tokens**
```text
I just ran shadcn add for <component>. Refactor it: replace hard-coded colors/radii/fonts with our tokens, delete demo/unused code, make content come from props, add usePointerFine and reduced-motion handling, fix imports and lint/typecheck. Keep its desktop behavior visually identical.
```

**Copy-freeze audit**
```text
Search the diff for any changed user-facing text or numbers. Print each as "before -> after". Revert anything not in the approved-copy table in docs/transformation-log.md.
```

**Licensing audit**
```text
List every third-party component in the repo that came from Vengeance UI, Skiper UI or Animmaster. For each: source URL, license/attribution requirement, whether attribution appears on the site, and whether any paid code is present without a recorded license. Report only.
```

---

## 14. Templates

**`docs/transformation-log.md`**
```markdown
# Transformation log

## Decisions
| ID | Decision | Value | Date |
|----|----------|-------|------|
| D1 | Canonical domain | | |
| D6 | Track | | |

## Approved copy changes
| Location | Before | After | Approved by |
|----------|--------|-------|-------------|
| Skills > Practices | Jile | (fixed/removed) | |

## Phase log
### Phase N — <name> (date)
- Branch/PR:
- What changed:
- Perf (mobile 4x CPU): LCP / CLS / TBT / JS size
- Open questions:
```

**`docs/components.md`**
```markdown
| Component | Library | Source URL | Install command | Dependencies | License | Attribution needed | Used in | Status |
|-----------|---------|------------|-----------------|--------------|---------|--------------------|---------|--------|
| Animated Rays | Vengeance UI | https://www.vengenceui.com/r/animated-rays.json | npx shadcn@latest add @vengeanceui/animated-rays | framer-motion, clsx, tailwind-merge | (verify) | (verify) | Hero | OK |
```

**`.github/pull_request_template.md`**
```markdown
## Phase
## What changed
## Screenshots / GIF notes (375, 768, 1440; dark + light)
## Perf (mobile, 4x CPU): LCP / CLS / TBT / JS size (before → after)
## Checklist
- [ ] Content unchanged (or listed in approved-copy table)
- [ ] Protected files untouched
- [ ] Reduced motion + touch fallbacks
- [ ] data-lenis-prevent on inner scroll areas
- [ ] Lint, typecheck, build, tests pass
- [ ] docs/components.md updated (license/attribution)
## Open questions
```

---

## 15. Final deliverables checklist

- [ ] `docs/AUDIT.md`, `docs/baseline/`, `docs/components.md`, `docs/DESIGN.md`, `docs/transformation-log.md`, `docs/RELEASE.md` (and `docs/MIGRATION.md` if S4/S5)
- [ ] Phases 0–10 and 12–15 merged (Phase 11 only if opted in)
- [ ] Lighthouse mobile: Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95
- [ ] Domain/OG/redirect issues resolved and verified in production
- [ ] Sitemap submitted; JSON-LD valid; link previews verified
- [ ] Tests + CI green and enforced on PRs
- [ ] Attribution/credits correct for every adopted library
- [ ] Tags: `pre-transformation`, `v2-portfolio`
- [ ] External profiles (LinkedIn, GitHub, résumé, email signature) point to the canonical domain

---

## Implementation Tasks

Synthesized from this review's findings. Each task derives from a specific finding above. Run with Claude Code or Codex; checkbox as you ship.

- [ ] **T1 (P1, human: ~1.5h / CC: ~10min)** — `Hero & Loading` — Remove blocking splash loader and implement lightweight in-situ entrance stagger (≤300ms)
  - Surfaced by: Pass 1 / Outside Review — [HARD REJECTION] Blocking First-Visit Splash Loader (Phase 5)
  - Files: `portfolio/src/components/zro/Hero.tsx`, `portfolio/src/app/(datasheet)/page.tsx`
  - Verify: Initial load renders H1 and portrait instantly with no full-screen overlay; LCP < 2.5s.
- [ ] **T2 (P1, human: ~2h / CC: ~15min)** — `Navigation & Hero` — Top fixed frosted glass navbar (`h-14`) and anchor AI résumé pill inline inside Hero below CTAs
  - Surfaced by: Pass 1 / Outside Review — [HARD REJECTION] Dual Navigation & Floating Collision (Phase 4 & Phase 6)
  - Files: `portfolio/src/components/zro/Navbar.tsx`, `portfolio/src/components/zro/HeroChatbot.tsx`, `portfolio/src/components/zro/Hero.tsx`
  - Verify: Navbar fixed at top with z-40; AI pill renders inline in Hero; no floating widgets colliding on mobile.
- [ ] **T3 (P1, human: ~1.5h / CC: ~10min)** — `Hero & About` — Build unified Technical Proof Ribbon and eliminate duplicate metric cards from About
  - Surfaced by: Pass 1 / Outside Review — [HARD REJECTION HR-5] Redundant Metric Bento Cards (Hero vs About)
  - Files: `portfolio/src/components/zro/AnimatedMetric.tsx`, `portfolio/src/components/zro/about/ProfileCard.tsx`, `portfolio/src/components/zro/about/StoryPanel.tsx`
  - Verify: Metrics 20×, 700+, 1672, 8.79 appear once in horizontal ribbon; About section focuses on narrative and "Right now".
- [ ] **T4 (P1, human: ~2h / CC: ~15min)** — `Interactive States` — Implement full visual state matrix (loading pulse, streaming caret, empty prompts, error banners) for AI Pill
  - Surfaced by: Pass 2 — Interaction State Coverage (Section 5.4)
  - Files: `portfolio/src/components/zro/HeroChatbot.tsx`, `portfolio/src/lib/nvidiaChat.ts`
  - Verify: Test simulated delay (3-dot pulse), empty query (friendly suggestions), 10/10 limit (amber/red badge with UTC reset note), network error (retry button).
- [ ] **T5 (P1, human: ~1.5h / CC: ~10min)** — `Skills Section` — Replace infinite moving Logo Slider marquee with categorical high-density Skills Matrix Grid
  - Surfaced by: Pass 4 — [HARD REJECTION HR-6] Skills Marquee Carousel Anti-pattern (Phase 9)
  - Files: `portfolio/src/components/zro/SkillsMatrix.tsx`, `portfolio/src/data/portfolioCatalog.ts`
  - Verify: Skills render in structured 5-group grid; zero auto-scrolling motion; fully accessible and scannable on 320px–1920px.
- [ ] **T6 (P1, human: ~1h / CC: ~10min)** — `Hero Canvas & Contrast` — Add central radial dark vignette mask over Animated Rays canvas
  - Surfaced by: Pass 4 — [HARD REJECTION HR-4] Background Noise Behind White Text (Phase 5)
  - Files: `portfolio/src/components/luxe/Backdrop.tsx`, `portfolio/src/styles/datasheet.css`
  - Verify: Center focal plane is darkened (`rgba(10,10,11,0.92)`); white H1 maintains ≥4.5:1 contrast against rays.
- [ ] **T7 (P1, human: ~1.5h / CC: ~10min)** — `Design Tokens & Typography` — Lock Geist + Geist Mono and apply explicit light/dark token scales
  - Surfaced by: Pass 5 — Design System Alignment (Section 5.1 & Phase 3)
  - Files: `portfolio/src/app/layout.tsx`, `portfolio/src/styles/datasheet.css`, `portfolio/tailwind.config.cjs`
  - Verify: Geist loaded via `next/font/google`; light mode porcelain theme matches WCAG AA contrast (≥4.5:1).
- [ ] **T8 (P1, human: ~2h / CC: ~15min)** — `Projects & Drawer` — Implement Slide-over Case Study Drawer on desktop and Bottom Sheet on mobile
  - Surfaced by: Pass 7 — Case Study Presentation Architecture (Phase 8)
  - Files: `portfolio/src/components/zro/projects/FlagshipShowcase.tsx`, `portfolio/src/components/zro/projects/ProjectCard.tsx`
  - Verify: Case study opens from right (50vw) on desktop and bottom (85dvh) on mobile; focus trap and ESC key work.

---

## Design Review Completion Summary

```
+====================================================================+
|         DESIGN PLAN REVIEW — COMPLETION SUMMARY                    |
+====================================================================+
| System Audit         | DESIGN.md deferred to P3, UI Scope: High    |
| Step 0               | 6/10, all 7 dimensions reviewed             |
| Pass 1  (Info Arch)  | 4/10 → 9/10 after fixes                     |
| Pass 2  (States)     | 3/10 → 9.5/10 after fixes                   |
| Pass 3  (Journey)    | 5/10 → 9.5/10 after fixes                   |
| Pass 4  (AI Slop)    | 4/10 → 9/10 after fixes                     |
| Pass 5  (Design Sys) | 4/10 → 9.5/10 after fixes                   |
| Pass 6  (Responsive) | 5/10 → 9.5/10 after fixes                   |
| Pass 7  (Decisions)  | 4 resolved, 0 deferred                      |
+--------------------------------------------------------------------+
| NOT in scope         | written (3 items)                           |
| What already exists  | written (5 items)                           |
| TODOS.md updates     | 0 items proposed                            |
| Approved Mockups     | 0 generated (API key unconfigured)          |
| Decisions made       | 4 added to plan                             |
| Decisions deferred   | none                                        |
| Overall design score | 3/10 → 9/10                                 |
+====================================================================+
```

### NOT in scope
1. Raw WebGL 3D shader scenes on default load (deferred to opt-in Phase 11c behind flag).
2. Paid commercial component registries without confirmed license (Animmaster §11b, Skiper Pro §11a).
3. Backend AI resume route logic, streaming model changes, or rate-limiting modifications (strictly presentation-only).

### What already exists
1. Dual unique views: `/desktop` (MacOS windowing OS view) and `/classic` (pure typographic printable view).
2. Verified high-scale metrics (TCS 20× latency reduction, 700+ DSA, 1672 contest rating, 8.79 CGPA).
3. Porcelain luxury light theme and dark space theme color bases.
4. AlgoGuru interactive coding problem solver live mock.
5. AI résumé chatbot API routes and daily usage tracking logic.

### Unresolved Decisions
_None. All design questions were resolved and merged directly into Plan.md._

---

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|---|---|---|---|---|---|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 0 | not_run | — |
| Outside Review | Codex + in-host | Independent 2nd opinion | 1 | issues_found | in-host: 6 hard rejections; Codex: unavailable (auth) |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 0 | not_run | — |
| Design Review | `/plan-design-review` | UI/UX gaps | 1 | clean | score: 3/10 → 9/10, 4 decisions |
| DX Review | `/plan-devex-review` | Developer experience gaps | 0 | not_run | — |

- **OUTSIDE COVERAGE:** In-host subagent completed with 6 hard rejections (resolved in plan); Codex unavailable due to custom endpoint auth.
- **VERDICT:** DESIGN REVIEW CLEARED — eng review required.

NO UNRESOLVED DECISIONS


