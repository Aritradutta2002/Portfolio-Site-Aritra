# ULTIMATE PREMIUM UI REDESIGN — UI_CHANGE_PLAN.md
> Project: Aritra Dutta Portfolio (Next.js 15 + React 19 + Tailwind 3.4 + Framer Motion 12)
> Goal: 100% fresh UI. Nothing reused from old "Aurora Glass" system.
> New system name: **LUXE NOIR — Editorial Premium**
> Priorities: Very Premium · Production-Ready · Motion Widgets · Responsive · Attractive · Best UX

---

## 0. Executive Summary

### What is wrong with the current UI (audit)
| Area | Current state | Problem |
|------|---------------|---------|
| Design language | "Aurora Glass" — violet/cyan/pink gradients everywhere, glassmorphism on every card | Looks generic (2021 glass trend), low contrast in light mode, gradient overuse kills premium feel |
| Typography | Only Space Grotesk + Geist, all headings same weight/size | No editorial hierarchy, no serif italic accents, no premium voice |
| Background | 3 blurred orbs + film grain | Flat, predictable, no depth system |
| Navigation | Floating glass pill + tiny mono links | Cramped on mobile, no full-screen menu, no command palette feel |
| Hero | Left text + right square portrait card, 3 role pills, 3 glass stat cards | Boxy, not memorable, portrait looks like ID card, no parallax story |
| About | One glass card story + education list + achievement rows | Wall of text, no bento, no portrait narrative |
| Skills | 4 glass cards with thin progress bars + pill clouds | Bars look dated, no interaction, no proficiency rings |
| Projects | Text-only index rows + filter underline + modal | No visuals/previews, rows feel like a table, modal is cramped |
| Experience | One big glass dossier + timeline spine | Dense, hard to scan, TCS logo is a crude SVG pill |
| Blog | Text rows + gradient CTA panel | No cover art, no reading experience |
| Contact | Underline inputs + GlowCard form | Inputs feel unfinished, no floating labels, no success animation |
| Footer | Giant gradient "Aritra." + 3 columns | Gradient wordmark looks cheap, no sitemap depth |
| Motion | `useSpotlight`, `useMagnetic`, `useTilt`, `Marquee`, `CountUp`, `RippleButton`, `ShineBorder` | Good ideas but implemented inconsistently, duplicated across files, no reduced-motion central guard per widget, no spring physics |
| Light mode | Same violet accents on porcelain bg | Poor contrast, glass borders invisible |
| Responsive | `max-w-6xl` everywhere, grids collapse but spacing doesn't scale | Mobile feels like shrunken desktop, touch targets <44px in places |
| A11y / Prod | Missing skip-link, missing focus rings on custom buttons, no structured data, images unoptimized | Not production-grade |

### New direction — LUXE NOIR
- **Vibe:** Linear × Vercel × Raycast × Editorial magazine. Dark-first obsidian, porcelain light mode, single champagne-gold accent (`#D3AB63`) + ink. One accent = premium. Three neon gradients = cheap.
- **Type voice:** Huge serif display (Instrument Serif italic accents) + clean grotesk + mono labels. Example: "Engineering *intelligent* systems."
- **Depth:** Layered surfaces (bg → raised → overlay), hairline borders (`white/8`), soft shadows, gold glow only on primary actions. Grain + grid + spotlight, not orbs.
- **Motion:** Spring physics everywhere, staggered reveals, magnetic buttons, 3D tilt, scroll parallax, counters, marquee, preloader counter, custom cursor (desktop), page wipe. All guarded by `prefers-reduced-motion` + coarse-pointer checks.
- **UX:** Sticky section nav with active tracking, full-screen mobile menu, filterable projects with visual cards, timeline experience, editorial blog cards, floating-label contact form with animated success, back-to-top progress ring, command-K style quick nav (future-proofed).
- **Responsive:** Mobile-first, fluid `clamp()` type, bento → stack, 44px+ touch targets, no horizontal overflow.
- **Production:** Skip-link, ARIA, focus-visible gold rings, semantic landmarks, JSON-LD, OG meta, sitemap-ready, optimized images, no layout shift, 60fps transforms only.

### File map (new — old files deleted or fully rewritten)
```
src/app/globals.css               REWRITE — LUXE tokens, utilities, keyframes
tailwind.config.cjs               REWRITE — noir/porcelain/gold palette, serif display, shadows
src/app/layout.tsx                REWRITE — Instrument Serif + Space Grotesk + Inter + Fira Code, SEO, JSON-LD, skip-link
src/app/page.tsx                  REWRITE — new composition + backdrop + preloader + cursor
src/lib/luxe.ts                   NEW — replaces interactions.ts (guards, magnetic, tilt, spotlight, reveal variants)
src/components/luxe/…            NEW design system (see §2)
src/components/sections/…        NEW sections (see §3–§11)
src/app/blog/page.tsx             REWRITE
src/app/social/page.tsx           REWRITE (read first)
src/app/resume/*                  RESTYLE to match (keep data flow)
UI_CHANGE_PLAN.md                 THIS FILE
```

---

## 1. Global Shell — Tokens, Typography, Backdrop, Production Base

### 1.1 Design tokens (`globals.css` + `tailwind.config.cjs`)
- **Dark (default):**
  - `--bg: 7 8 12` → `#07080C` obsidian
  - `--surface: 14 16 22` → `#0E1016`
  - `--card: 18 20 28`
  - `--ink: 244 241 234` → `#F4F1EA` warm ivory ink (softer than pure white = premium)
  - `--muted: 161 165 179`
  - `--line: 255 255 255` (used at 8–12% opacity)
  - `--gold: #D3AB63`, `--gold-soft: rgba(211,171,99,.14)`, `--gold-ink: #0B0A06` (text on gold)
  - `--emerald: #34D399` (success only), `--rose: #FB7185` (errors only)
- **Light:**
  - `--bg: 247 245 240` → `#F7F5F0` porcelain
  - `--surface: 255 255 255`, `--ink: 16 18 24`, `--muted: 94 100 114`
  - `--gold: #9A7418` (darkened for 4.5:1 contrast on porcelain), gold fills stay `#D3AB63` with dark ink
- **Type scale (fluid, `clamp`):**
  - Display: `clamp(2.75rem, 7vw, 6.5rem)`, tight `-0.04em`, `line-height .95`
  - H2: `clamp(2rem, 4.5vw, 3.5rem)`, H3: `clamp(1.4rem, 2.5vw, 2rem)`
  - Body: `1.05–1.15rem / 1.75`, measure `65ch`
  - Mono eyebrow: `11–12px, .22em tracking, uppercase`
- **Radius:** `18px cards, 22px feature cards, 999px pills/buttons`
- **Shadows:** `soft: 0 20px 60px -20px rgba(0,0,0,.5)`, `gold-glow: 0 0 0 1px rgba(211,171,99,.4), 0 8px 40px rgba(211,171,99,.25)`
- **Section rhythm:** `--section-pad: clamp(5rem, 9vw, 9rem)`, `scroll-margin-top: 5.5rem`, max width `76rem (6xl)` + `36rem prose`
- **Never reuse:** `--aurora-*`, `.glass-card`, `.text-gradient`, `.bg-aurora`, `.orb-*` — all deleted.

### 1.2 Fonts (`layout.tsx`)
- Add `Instrument_Serif` (400 italic + regular, `--font-serif-display`) for editorial italic words.
- Keep `Space_Grotesk` (`--font-display`), `Inter` (`--font-inter`), `Fira_Code` (`--font-mono`).
- Remove `Geist` to reduce payload (or keep as fallback — decision: remove Geist Sans/Mono, keep Inter + Fira Code for smaller bundle).
- `font-sans: Inter`, `font-display: Space Grotesk`, `font-serifd: Instrument Serif`, `font-mono: Fira Code`.
- `display: swap`, preconnect, no CDN fonts.

### 1.3 Backdrop (replaces `GradientOrbs`)
- New `<LuxeBackdrop />`: fixed inset-0, `-z-10`:
  1. Base bg var
  2. Fine grid (`linear-gradient` 1px lines, 72px cells, masked radial fade)
  3. Gold radial spotlight top-center (8% opacity, 900px)
  4. Emerald hint bottom-left (4%, desktop only)
  5. Film grain SVG (3% opacity, `pointer-events-none`)
  6. Vignette (inset shadow)
- No animated orbs (perf + premium stillness). Motion comes from content + cursor spotlight.
- `prefers-reduced-motion`: static backdrop, no transitions.

### 1.4 Production base (`layout.tsx` + `globals.css`)
- `<html class="dark">` default dark, `next-themes` with `attribute="class"`, `enableSystem=false`.
- Skip-link ("Skip to content") gold focus ring, `main#content`.
- Semantic: `header nav`, `main`, `section aria-labelledby`, `footer contentinfo`.
- Meta: title, description, keywords, OG, Twitter, canonical, `theme-color` per scheme, `robots`.
- JSON-LD Person schema (name, jobTitle, worksFor TCS, sameAs links).
- Scrollbar: 10px thin, thumb gold/20 hover gold/40. Selection: gold bg, black ink. Focus-visible: 2px gold offset 3px.
- `overflow-x: clip` on body, `img { max-width:100%; height:auto }`, no horizontal scroll on 360px.

---

## 2. New Design System — `src/components/luxe/` (all NEW, zero reuse)

| Component | File | Design | Motion | Responsive / A11y |
|-----------|------|--------|--------|-------------------|
| `Container` | `Container.tsx` | `max-w-6xl mx-auto px-5 sm:px-8`, optional `narrow` (prose) and `wide` (7xl) | none (layout) | Fluid padding, no overflow |
| `Eyebrow` | `Eyebrow.tsx` | Mono 11px uppercase gold: `01 — About` with 24px hairline + dot | Fade+slide on inView | `aria-hidden` line, semantic `p` |
| `SectionHeading` | `SectionHeading.tsx` | Eyebrow + serif/sans mixed title (`Engineering *intelligent* systems` — italic serif word in gold) + muted blurb + hairline | Word-mask stagger reveal (each word slides up from overflow hidden, 0.06 stagger, `[0.22,1,0.36,1]`) | `h2 id` anchored, `text-balance`, left align desktop / left mobile (no centered walls) |
| `GoldButton` + `GhostButton` | `Buttons.tsx` | Gold: `bg-gold text-black, pill, 14px bold, arrow icon slides on hover, gold-glow shadow`; Ghost: `border white/12, blur bg, hover border-gold/50` | Magnetic wrapper (0.25 strength, ±10px clamp) + press scale `.97` + shimmer sweep on hover | `min-h-[48px]`, focus ring, `disabled` state, `asChild` link/button |
| `Chip` / `Tag` | `Chip.tsx` | `border white/10, white/60 text, mono 11px, hover border-gold/40 + gold text` | None / subtle fade | Wrap, no truncation |
| `LuxeCard` | `Card.tsx` | `bg-surface/80 blur, 1px hairline border, 20px radius, inner top highlight (white/6 gradient), hover: border-gold/30 + lift -4px + soft shadow` | Tilt optional (max 6°, perspective 900px) + spotlight border (cursor-tracked radial) | Stack on mobile, `overflow-hidden` |
| `Stat` | `Stat.tsx` | Big display number (Space Grotesk 40px) + mono label + hairline top | `CountUp` on inView (easeOut 1.4s, respects reduced-motion → final value instantly) | 2-col mobile, 4-col desktop |
| `Divider` | `Divider.tsx` | Hairline `white/8` with centered gold diamond or mono label | None | Full-bleed within container |
| `Avatar / PortraitFrame` | `Portrait.tsx` | Arch shape (`rounded-t-[999px] rounded-b-[24px]`) or 24px rounded with gold hairline ring + status badge ("Open to work" pulsing emerald dot) | Parallax `useScroll` drift + tilt on hover | `aspect-[4/5]`, `priority` hero image, `alt` descriptive |
| `Marquee` | `Marquee.tsx` | Bordered top/bottom strip, mono uppercase items separated by gold ✦ (no emoji — SVG diamond), pause on hover | CSS `marquee 32s linear infinite`, duplicate list `aria-hidden` | Wraps on reduced-motion, no horizontal scroll |
| `Reveal` | `Reveal.tsx` | Wrapper for fade/slide/blur reveals | IO-based, `once:true`, `margin -64px`, stagger via `delay` prop | Instant when reduced-motion |
| `Magnetic` | `Magnetic.tsx` | Behavior wrapper (no visual) | rAF-throttled translate, spring reset | Disabled on touch/coarse |
| `Tilt` | `Tilt.tsx` | Behavior wrapper | perspective tilt + glare highlight | Disabled on touch |
| `Spotlight` | `Spotlight.tsx` | Container + cursor glow child (gold 10% radial, 600px, blur) | rAF translate3d | Hidden on touch |
| `Counter` | `Counter.tsx` | Display number | rAF count with easeOutExpo, comma format | `aria-label` final value |
| `Preloader` | `Preloader.tsx` | Full-screen obsidian, center serif counter 0→100 + mono "Portfolio 2026" + gold progress hairline, curtain wipe up on done | 1.4s counter, `ease [0.76,0,0.24,1]` exit, sessionStorage skip on repeat visit | `aria-busy`, reduced-motion → skip instantly |
| `Cursor` | `Cursor.tsx` | 12px gold dot + 36px ring, scales to 64px pill with label ("View"/"Read"/"Open") over `[data-cursor]` targets | Lerp follow (0.18), spring scale | Desktop only (`pointer:fine`), hidden when reduced-motion/touch |
| `ScrollProgress` | `ScrollProgress.tsx` | 2px gold bar top, `scaleX` spring | `useScroll + useSpring` | `aria-hidden` |
| `BackToTop` | `BackToTop.tsx` | 48px circular gold button + SVG progress ring (pathLength) | Appears after 600px, spring pop | `aria-label="Back to top"` |
| `ThemeToggle` | `ThemeToggle.tsx` | Sun/Moon in bordered circle, rotate morph | 0.3s rotate + scale | `aria-pressed`, persisted |

All motion uses `cubic-bezier(0.22,1,0.36,1)` (easeOutExpo-ish) + spring `stiffness 260 damping 28`. Only `transform` + `opacity` animated (compositor only).

---

## 3. Navigation — `src/components/sections/Navbar.tsx` (REWRITE)

**Old:** floating glass pill, 8 tiny mono links, cramped mobile dropdown.
**New:** floating luxe bar + full-screen mobile menu.

- **Desktop (>=900px):**
  - Fixed top, `max-w-6xl` floating bar: `bg-bg/70 blur-20px, border white/8, radius 18px, h-16` when scrolled; transparent `h-20` at top.
  - Left: monogram `AD` (gold square, black serif "A") + `Aritra Dutta` (Space Grotesk 15px bold) + emerald availability dot.
  - Center/right: links (About, Skills, Work, Experience, Writing, Contact) — 13px medium, muted → ink on hover with gold underline grow; active link gets gold dot + ink color (IntersectionObserver `rootMargin -40%/-55%`).
  - Right cluster: ThemeToggle + `Hire me` GoldButton (small, `h-10`) + scroll progress hairline under bar.
- **Mobile (<900px):**
  - Bar: monogram + ThemeToggle + burger (2-line morph to X, 48px target).
  - Tap → full-screen obsidian overlay (`z-90`): huge serif links (32px, staggered slide-up 0.06), index numbers mono gold, bottom contact row + socials + Hire CTA. Close on link click / Escape. Body scroll locked (`lenis.stop()`).
- **Behavior:** hide on scroll down >400px, reveal on scroll up (framer `useMotionValueEvent`), always show when mobile menu open. `Escape` closes. Focus trapped in overlay (initial focus on first link, return focus to burger on close).
- **Responsive:** no overflow at 360px; links never wrap; bar padding `12px`.
- **A11y:** `nav aria-label="Primary"`, `button aria-expanded`, overlay `role="dialog" aria-modal`, focus-visible gold rings.

---

## 4. Hero — `src/components/sections/Hero.tsx` + `src/components/luxe/ParticleNetwork.tsx` (REWRITE)

**Old:** "Aritra Dutta." + 3 role pills + paragraph + 3 CTAs + 3 glass stats + square portrait card + tech marquee.
**New (amended Sep 2026 — centered particle-network hero):** small rounded avatar + centered copy over a vanilla-canvas particle network with BFS lightning on click.

```
[ particle network canvas (click = new node + BFS lightning) + center focus vignette ]
            ( avatar 112–128px rounded-full, gold ring, live dot )
   [ ● Full-stack engineer @ TCS · Bhubaneswar ]
   Engineering intelligent systems,   (italic serif gold on "intelligent")
   crafted precisely.
   Sub: I'm Aritra Dutta — Java microservices with 30× wins,
        zero-downtime Azure migrations, GenAI in production.
   [ View my work ↓ ] [ Resume ]   AlgoGuru live ↗
   ( ○ ○ ○ )  LEETCODE 1672 · 700+ SOLVES
© 2026 Aritra Dutta                 click the background
Stats band (4): 2yr+ @TCS · 700+ solves · 1672 LeetCode · 30× uplift
Tech marquee strip (bordered)
```

- **Layout:** centered Flexbox column, `min-h-[100svh]`, text-center. Order: avatar → badge → title → sub → CTAs → socials. Corner mono labels (`© 2026` left, `click the background` right, `sm:` only) pinned to the viewport block.
- **Background:** `ParticleNetwork` canvas (absolute inset-0, `aria-hidden`) — vanilla JS in `useEffect`, zero libraries. ~70 nodes (`x, y, vx, vy, size, pulse, active`) drift slowly and respawn at random edges with fresh trajectories; links under a threshold of 15% of the canvas diagonal fade with distance. Clicking the canvas drops a node at `offsetX/offsetY` and constructs a `ConnectionManager` that BFS-traverses neighbours, animating each edge's `progress` at constant wavefront velocity and expanding from every reached node; the glow (cyan/sky two-pass line + spark tip) shoots outward over the gray links, and managers are disposed on completion (cap 4, nodes recycled at 160). DPR capped at 2, pauses off-screen / on `hidden` tab, single static frame under `prefers-reduced-motion`.
- **Theme:** fully adaptive — `bg-background` + luxe tokens (near-black hero in dark mode, porcelain in light). Canvas palettes (slate dots/lines + sky lightning vs. ivory + cyan) switch via `matchMedia('(prefers-color-scheme: dark)')`, with a `MutationObserver` on the `html` class so the site theme toggle re-themes the canvas too. Vignette uses `rgb(var(--bg) / 0.55)` so it follows the theme.
- **Type:** `hero-display` clamp, serif italic gold word, `text-balance`. Mono badge with emerald pulse dot.
- **Avatar:** small rounded `h-28 w-28 md:h-32 md:w-32 rounded-full`, gold ring + offset on `#0a0a0a`, gold glow blur, emerald live dot, `priority` + `sizes="128px"`, descriptive `alt`.
- **CTAs:** Gold "View my work" (scrolls to #work) magnetic + Ghost "Resume" (`/resume`) + text link "AlgoGuru ↗" with underline animation. Socials centered with gold fill sweep.
- **Stats:** 4 counters in bordered band (hairline dividers, big numbers, CountUp).
- **Marquee:** full-bleed bordered strip at hero bottom.
- **Motion:** preloader-gated stagger (avatar → badge → title → sub → CTAs → socials → stats), magnetic CTAs, CountUp on view. Reduced-motion: all instant, static particle frame.
- **A11y/SEO:** `h1` once, `p` sub, `alt="Portrait of Aritra Dutta, full-stack engineer"`, socials `aria-label`, canvas `aria-hidden`, CTA focus rings.

---

## 5. About — `src/components/sections/About.tsx` (REWRITE)

**Old:** glass story card + education list + achievement rows.
**New:** Bento narrative.

- **Heading:** `01 — About` / `Engineer by craft, *problem solver* by nature` / blurb.
- **Bento grid (`lg:grid-cols-3`):**
  - **A (2-col, tall): Story card** — "Who I am" mono label, 3 tight paragraphs (TCS role, stack, CP passion), signature serif italic quote: *"I like systems that are fast, readable, and kind to the next engineer."* + interest chips (Gaming, Travel, Music, Learning — Lucide icons, no emoji).
  - **B: Snapshot card** — location, timezone (IST), experience, availability, languages (English/Hindi/Bengali) as definition rows with hairlines.
  - **C: Education card** — 3 entries with index `01/02/03`, degree bold, institution muted, grade gold pill (Trophy icon).
  - **D (full-width): Achievements strip** — 6 rows, hover bg gold/4, gold index, arrow on hover. Or 3-col mini-cards on desktop — decision: rows (scannable, editorial).
- **Motion:** stagger reveal per card, achievement rows slide 12px stagger.
- **Responsive:** stack single column mobile, snapshot after story.
- **A11y:** `h3` per card, lists semantic `ul/li`, no emoji (Lucide icons).

---

## 6. Skills — `src/components/sections/Skills.tsx` (REWRITE)

**Old:** 4 glass cards with % bars + pill clouds.
**New:** Proficiency + ecosystem.

- **Heading:** `02 — Arsenal` / `Tools I *master,* not just use` / blurb.
- **Top: 4 mastery cards** (Languages / Frameworks / Data & Infra / Cloud & DevOps):
  - Each: mono label + hairline, skill rows with **dot proficiency (5 dots)** instead of % bars (premium, less "resume-y") + years mono (`3y`) on hover tooltip. Top skill gets gold dots.
  - Hover: border-gold/30 + spotlight.
- **Middle: Ecosystem cloud** — "Also in the toolbox" chips (Spring Security, Kafka, JUnit, Mockito, SonarQube…) + **AI row** (gold-filled chips: GenAI, RAG, LangChain, LLM Integration with Sparkles icon).
- **Bottom: Competitive programming band** — 4 `Stat` tiles (LeetCode 1672 / CodeChef 1708 3-Star / 700+ solves / Codeforces 1046) + Certifications list (issuer gold pills).
- **Motion:** dots pop stagger, chips fade stagger, stats CountUp.
- **Responsive:** 1-col mobile → 2-col sm → 4-col? Decision: 2-col md, 4-col xl for mastery? Actually 2-col md (readable), CP 2-col mobile / 4-col desktop.
- **A11y:** `aria-label="Java proficiency 5 out of 5"`, lists semantic.

---

## 7. Projects — `src/components/sections/Projects.tsx` (REWRITE)

**Old:** text index rows + category underline filter + cramped modal.
**New:** Visual cards + case-study modal.

- **Heading:** `03 — Selected Work` / `Things I've *shipped*` / blurb + "AlgoGuru live ↗" link.
- **Filter:** pill tabs (All / Web / Backend / AI / CP) with layout-animated gold pill background (`layoutId`), counts mono. `aria-pressed`.
- **Cards:** `md:grid-cols-2` large cards:
  - **Cover:** 16/10 gradient cover per project (unique duo-tone + big serif letter + grid overlay + browser dots row) — no external images needed, zero CLS. AlgoGuru cover gets "LIVE" emerald badge.
  - **Body:** category mono gold + title Space Grotesk 22px + 2-line excerpt + tech chips (max 4 + "+3") + footer row (GitHub icon btn + "Case study →" text btn).
  - **Hover:** lift -6px, cover scales 1.04, gold border, cursor pill "Open".
  - **Featured:** AlgoGuru spans 2 cols on desktop with horizontal layout (cover left, body right).
- **Modal (case study):** centered `max-w-3xl`, cover top, title + meta + long description + tech + links (View Code / Live Demo gold) + close X + Escape + backdrop blur + body lock. `role="dialog" aria-modal`.
- **Platform stats band:** 3 Stats (700+ solves / 1672 LeetCode / 1708 CodeChef) in bordered band.
- **Motion:** layout animations on filter (`AnimatePresence popLayout`), cards fade-up stagger, modal spring up.
- **Responsive:** 1-col mobile, featured stacks; modal full-screen sheet on mobile (`rounded-t-24px`, swipe-down to close affordance).
- **A11y:** articles semantic, buttons 44px, modal focus trap + return focus.

---

## 8. Experience — `src/components/sections/Experience.tsx` (REWRITE)

**Old:** big glass dossier + skills bars + timeline.
**New:** Sticky dossier + timeline.

- **Heading:** `04 — Experience` / `Two years of *production* pressure` / blurb.
- **Layout `lg:grid-cols-[.9fr_1.1fr] gap-12`:**
  - **Left (sticky `top-28`):** TCS dossier card — company monogram (custom "TCS" serif in navy tile, not crude SVG), role, location, dates, Active badge, description, tech chips, 4 mini-stats (2yr+, 30× uplift, 2000+ tests, 10K users), "Download resume" ghost btn.
  - **Right:** Assignment timeline — 2 assignments (Element Fleet / Ultimatix) as timeline nodes (gold spine, dots with glow), each with period mono gold, client serif 20px, role muted, bullet list (gold dash markers, hairline dividers), achievement callouts (CheckCircle emerald).
- **Bottom: Career timeline strip** (3 nodes: TCS Present / ILP Training / B.Tech) + Professional skills dots (6 rows, dot proficiency).
- **Motion:** dossier fade-up, timeline nodes slide-in stagger, spine draws on scroll (`scaleY` via `useScroll` target ref).
- **Responsive:** sticky disabled mobile (stacks: dossier → assignments), spine left-aligned.
- **A11y:** `ol` for timeline, `time` elements, lists semantic.

---

## 9. Blog / Writing — `src/components/sections/Blog.tsx` + `src/app/blog/page.tsx` (REWRITE)

**Old:** text rows + gradient CTA.
**New:** Editorial cards.

- **Heading:** `05 — Writing` / `Notes from the *workbench*` / blurb.
- **Featured (2 large):** horizontal cards (cover monogram + category + read time + title serif 24px + excerpt 2-line + footer views/likes) with "Featured" gold badge.
- **Recent (3):** vertical cards grid.
- **CTA band:** obsidian panel with gold hairline, serif "Want the longer versions?" + Ghost-gold "View all posts →" + giant outlined "Aa" backdrop.
- **`/blog` page:** sticky luxe header (back link + wordmark + search), hero, featured grid, search + category select (floating-label inputs), posts grid, pagination pills, post modal reader (serif body, meta, tags, like btn with optimistic fill), empty state, skeletons (shimmer, not pulse blocks).
- **Motion:** cards fade-up, modal spring, like heart pop.
- **Responsive:** 1-col mobile, 2-col sm featured, 3-col lg recent.
- **A11y:** `article`, `time dateTime`, modal reader `role="dialog"`, like `aria-pressed`.

---

## 10. Contact — `src/components/sections/Contact.tsx` (REWRITE)

**Old:** underline inputs + GlowCard.
**New:** Split concierge panel.

- **Heading:** `06 — Contact` / `Let's build something *precise*` / blurb.
- **Layout `lg:grid-cols-[.9fr_1.1fr] gap-12`:**
  - **Left:** "Direct lines" — email/phone/location rows (48px icon tiles, copy-email btn with check feedback), socials (6 circular 48px btns), availability card (emerald dot + "Replies within 24h" + "5+ years coding" stats).
  - **Right: Form card** — obsidian raised card, gold top hairline:
    - Floating-label inputs (label floats up on focus/filled, gold underline grow, error rose text + shake on invalid).
    - Fields: Name, Email, Subject, Message (textarea auto-grow, char count 500).
    - Submit GoldButton full-width with loading spinner + success morph (check + "Message sent — I'll reply within 24h", confetti-free, subtle gold pulse). Error → rose banner + mailto fallback link.
    - Keeps EmailJS flow + `react-hook-form` validation (same env keys, same API).
- **Motion:** card fade-up, input focus springs, success check draw (SVG pathLength).
- **Responsive:** stack mobile, form first? Decision: info first on mobile (so email copy is reachable), form second.
- **A11y:** `label htmlFor`, `aria-invalid`, `aria-describedby` errors, `aria-live="polite"` status, 48px targets.

---

## 11. Footer — `src/components/sections/Footer.tsx` (REWRITE)

**Old:** gradient "Aritra." + 3 cols + bottom bar.
**New:** Monument + sitemap.

- **Top: Monument wordmark** — "ARITRA" Space Grotesk 12vw outlined (stroke, not gradient) + serif italic gold "dutta" overlay + tagline + availability badge. Subtle parallax on scroll.
- **Middle: 4 cols** — Index (nav anchors) / Sitemap (Blog, Social, Resume, No-stalking) / Contact (email/phone/location with copy) / Elsewhere (socials + CP badges LeetCode/CodeChef/Codeforces).
- **Bottom bar:** © year dynamic + "Built with Next.js · TypeScript · Tailwind" mono chips + BackToTop progress-ring button.
- **Motion:** wordmark letters stagger on view, cols fade stagger.
- **Responsive:** cols 2-col mobile → 4-col desktop, wordmark scales `clamp`.
- **A11y:** `footer contentinfo`, nav `aria-label="Footer"`, links descriptive.

---

## 12. Sub-pages

| Page | Plan |
|------|------|
| `/blog` | Full rewrite per §9. Keep post data + like/search/filter/pagination logic, restyle to LUXE. |
| `/social` | Read current, then restyle: centered luxe card stack, big social rows with copy buttons, QR-ish monogram, same backdrop + nav. |
| `/resume` | Keep `resumeData.ts` flow + `ResumeClient` logic, restyle: porcelain paper card in dark shell, gold accents, print stylesheet (`@media print` hides nav/backdrop), Download PDF btn. |
| `/no-stalking` | Restyle to playful luxe minimal (keep joke, add cursor + backdrop). |
| `/api/contact` | Keep Nodemailer logic untouched (already production). Verify env handling. |

---

## 13. Motion Widgets — Build Spec (all in `luxe/` + `lib/luxe.ts`)

| Widget | Props | Physics | Guards |
|--------|-------|---------|--------|
| `Preloader` | `minMs=1400` | Counter 0→100 rAF, exit curtain `y:-100%` 0.9s expo | Skip if `sessionStorage luxe-seen` or reduced-motion |
| `Cursor` | `labels via data-cursor="View"` | Lerp 0.18 dot, 0.12 ring, scale spring | Only `pointer:fine` + no reduced-motion |
| `Magnetic` | `strength .25, max 10px` | rAF translate, reset 0.5s spring | Disabled touch/reduced |
| `Tilt` | `max 6deg, glare bool` | perspective 900px, glare radial follows | Disabled touch/reduced |
| `SpotlightCard` | `color gold` | CSS vars `--mx/--my`, radial border glow | Hidden touch |
| `Marquee` | `speed 32s, pauseOnHover` | CSS keyframes translateX -50% | Static wrap if reduced |
| `Counter` | `to, suffix, duration 1.4s` | easeOutExpo rAF, Intl grouping | Instant final if reduced |
| `Reveal` | `delay, y 24, blur 6px` | IO once, expo out 0.7s | Instant if reduced |
| `ScrollProgress` | — | `useSpring(stiffness 140 damping 28)` | `aria-hidden` |
| `BackToTop` | `showAfter 600` | pop spring, ring pathLength | Focusable, label |
| `Modal` | `onClose, labelledBy` | spring y+scale, backdrop fade | Escape, focus trap, body lock, return focus |
| `Toast` (form) | `status` | slide-up + auto-dismiss 5s | `aria-live polite` |

Perf rules: only `transform/opacity`, `will-change` sparingly, `content-visibility: auto` on below-fold sections, images `sizes` + `priority` only for hero.

---

## 14. Responsive Matrix (must-pass)

| Breakpoint | Nav | Hero | Bento/About | Skills | Projects | Experience | Blog | Contact | Footer |
|------------|-----|------|-------------|--------|----------|------------|------|---------|--------|
| 360×800 | burger + sheet | stack, portrait after CTA, stats 2-col | stack | 1-col, dots wrap | 1-col, cover 16/10 | stack, spine left | 1-col | stack, info first | 2-col cols, wordmark 17vw |
| 768 | burger + sheet | 2-col? No — still stack until 1024 | 2-col | 2-col | 1-col large | stack | 2-col | stack | 2-col |
| 1024 | full bar | 2-col editorial | 3-col bento | 2-col | 2-col (+featured span) | sticky 2-col | 3-col recent | 2-col split | 4-col |
| 1440 | full bar, max-6xl centered | max-6xl, no stretch | max-6xl | max-6xl | max-6xl | max-6xl | max-6xl | max-6xl | max-6xl |

No horizontal scroll at any width. Touch targets ≥44px. Tap highlights transparent. `100dvh` for full-screen menu (not `100vh`).

---

## 15. Accessibility + Production Checklist

- [ ] Skip-link, landmarks, one `h1`, logical `h2/h3` order
- [ ] All icon buttons `aria-label`, all toggles `aria-pressed/expanded`
- [ ] Focus-visible gold rings everywhere, no `outline:none` without replacement
- [ ] Contrast: gold `#9A7418` on porcelain (light), `#D3AB63` on `#07080C` (dark) — both ≥4.5:1 for text
- [ ] `prefers-reduced-motion` disables every widget (central `usePrefersReducedMotion`)
- [ ] `alt` on all images, `time dateTime` on dates, `aria-live` on form status
- [ ] Keyboard: Escape closes menu/modal, Tab traps in modal/menu, focus returns on close
- [ ] SEO: title/desc/OG/Twitter/canonical/JSON-LD/sitemap/robots
- [ ] Perf: no layout shift (covers fixed aspect, images sized), fonts `swap`, below-fold `content-visibility`
- [ ] `npm run build` + `lint` clean, 360px + 1440px visual pass, light + dark pass, keyboard-only pass

---

## 16. Execution Order

1. Tokens + fonts + layout + backdrop (`globals.css`, `tailwind.config`, `layout.tsx`, `page.tsx`, `LuxeBackdrop`)
2. Primitives (`Container`, `Eyebrow`, `SectionHeading`, `Buttons`, `Chip`, `Card`, `Stat`, `Counter`, `Reveal`, `Magnetic`, `Marquee`)
3. Chrome (`Navbar`, `Footer`, `Preloader`, `Cursor`, `ScrollProgress`, `BackToTop`)
4. Sections in page order (Hero → About → Skills → Projects → Experience → Blog → Contact)
5. Sub-pages (`/blog`, `/social`, `/resume`, `/no-stalking`)
6. Delete old components (`GlassCard`, `GlowCard`, `GradientOrbs`, `IntroCurtain`, old `Navigation/Hero/...` replaced) — only after replacements compile
7. Build + fix + responsive/a11y pass

*Old Aurora classes (`aurora`, `glass-card`, `orb`, `text-gradient`, `bg-aurora`) must not appear in final `grep`.*
