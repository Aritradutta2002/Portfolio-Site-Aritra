# Portfolio Redesign — "Aurora Glass Dark"

## Context

Aritra's portfolio (Next.js 15 + Tailwind 3 + framer-motion + Lenis) currently uses a well-built "Acid Editorial" lime/black theme. The request is a **complete visual redesign** into a premium, production-grade experience with motion widgets and full responsiveness, covering **the entire site** (home page + blog, social, resume, no-stalking sub-pages), keeping **all existing content untouched**.

**Chosen direction:** Aurora Glass Dark — deep `#050508`-style canvas, aurora gradient accents (violet → cyan), glassmorphic bento-grid layouts, soft glows, floating/parallax elements. Dark-first; light mode remains supported via the existing `ThemeProvider` but restyled to a cool porcelain variant.

**Deliverable note:** the user asked for a `Plan.md` file — implementation begins by writing this plan into `Plan.md` at the repo root, then executing it.

## What stays / what's reused

- **Content & data:** all data in components stays as-is (`src/data/resumeData.ts`, projects in `Projects.tsx`, posts in `Blog.tsx`/`blog/page.tsx`, socials in `social/page.tsx`).
- **Backend/infra untouched:** `src/app/api/contact/route.ts`, `src/lib/email-config.ts`, `src/middleware.ts`, EmailJS flow in `Contact.tsx`.
- **Interaction engine reused as-is** (`src/lib/interactions.ts`): `useSpotlight`, `useMagnetic`, `useTilt`, `useReveal`, `useIntroReady`, guards for touch/reduced-motion. These are color-agnostic except CSS.
- **Infra reused:** Lenis `SmoothScroll`, `ThemeProvider` (class-based dark, default dark), `ErrorBoundary`, `CountUp`, `IntroCurtain` mechanics (re-skinned).
- **Print resume page logic kept** — only its on-screen toolbar/toolbar chrome restyled; print CSS (`PRINT_STYLES`) stays functional.

## New design system

### 1. Tokens (`src/app/globals.css` + `tailwind.config.cjs`)

Replace the acid palette with an aurora system, keeping the RGB-tripplet CSS-var pattern so `<alpha-value>` opacity modifiers keep working:

- **Dark (default):** `--bg: 5 5 8`, `--surface: 255 255 255 / 4%` (glass, not solid), `--ink: 237 238 244`, `--muted: 148 152 168`.
- **Light:** cool porcelain — `--bg: 245 246 250`, ink `12 14 24`, glass `255 255 255 / 70%` + blur.
- **Accents:** primary `--aurora-1: #8B5CF6` (violet), `--aurora-2: #22D3EE` (cyan), `--aurora-3: #F472B6` (pink, sparingly). Text-safe gradient accent via a `.text-gradient` utility (violet→cyan).
- **Gradients:** `bg-aurora` (135°, violet→cyan), gradient-border utility using `border-image`/padding-box mask technique for glass cards.
- **Glow tokens:** `--glow-violet`, `--glow-cyan` box-shadows replace `acid-glow`.
- **Keep:** modular type scale, fluid `--section-pad-y`, film-grain overlay (retinted lighter), scrollbar/selection/focus styles retinted, all reduced-motion and Lenis CSS.
- **Fonts:** add a distinctive display face for headings — e.g. `Space_Grotesk` (or `Sora`) via `next/font` in `layout.tsx` as `--font-display`; keep Geist Sans/Mono for body/mono.

### 2. New/updated shared components

- `GradientOrbs.tsx` (new): fixed, GPU-only aurora orbs (blurred radial divs) drifting via slow CSS keyframes; positioned per-section variants; disabled under reduced-motion. Replaces the per-section spotlight as the ambient layer (spotlight stays on interactive sections, recolored).
- `GlassCard.tsx` (new): shared bento/glass card — gradient hairline border, `backdrop-blur`, inner highlight, hover glow. Used by About, Skills, Projects modal, Contact, blog/social cards.
- `MagneticButton.tsx` (new): consolidated magnetic CTA (wraps `useMagnetic`) with aurora-filled and glass variants.
- `IntroCurtain.tsx`: re-skinned — dark panel with aurora gradient sweep replacing acid trailer, gradient progress line; counter/wordmark timing logic untouched.
- `Navigation.tsx`: glass pill navbar (floating, rounded-full, backdrop-blur) — desktop nav collapses into a glass dock; active indicator becomes a layout-animated pill (framer `layoutId`); scroll progress bar becomes aurora gradient. Mobile menu re-styled as glass sheet.
- `ThemeToggle.tsx`/`ThemeProvider`: keep mechanism; update icon treatment. Light default remains dark.
- `Marquee.tsx`, `CursorTag.tsx`, `SectionHeading.tsx`, `CountUp.tsx`: recolored to aurora; SectionHeading keeps word-mask reveal, index/eyebrow in gradient.
- `Footer.tsx`: giant wordmark gets gradient ink; keep progress-ring back-to-top (recolored).

### 3. Home page sections (`src/app/page.tsx` + `src/components/*`)

- **Hero:** bento-style grid — large glass card with name/role/CTAs beside portrait card (keep tilt + parallax); stats become glass mini-cards with aurora numbers; tech marquee recolored; CTAs → `MagneticButton`. Optional subtle 3D: reuse existing `@react-three/fiber` deps (already installed) for a lightweight floating gradient sphere/dots behind the name — client-only, reduced-motion/`IntersectionObserver`-gated, low poly count, and removed entirely if it risks perf (fallback: static SVG aurora blob).
- **About:** two-column glass bento (story card + education list card); achievements as gradient-numbered list.
- **Skills:** skill meters animate with gradient fill; category cards become glass; CP stats become a 4-cell gradient-border grid.
- **Projects:** index-row style kept (it's good) with recolored hover (row underline → aurora gradient sweep on hover); modal → `GlassCard` with aurora top bar; filter tabs get layout-animated underline.
- **Experience:** dossier card → glass; timeline dots → aurora gradient with glow.
- **Blog:** post rows recolored; CTA band → aurora gradient panel.
- **Contact:** form card → glass; focus rings → violet; submit button → aurora fill.

### 4. Sub-pages

- `src/app/blog/page.tsx`: same card/row treatment as home blog section; search/filter chrome → glass inputs.
- `src/app/social/page.tsx`: platform cards → `GlassCard` grid with gradient icons and per-card hover glow.
- `src/app/resume/ResumeClient.tsx`: on-screen toolbar restyled (glass, aurora download button, back button); the printable `.resume` paper keeps its clean ATS styles (only screen wrapper changes).
- `src/app/no-stalking/page.tsx`: restyle container to match (glass panel, gradient status code); humor copy untouched.

### 5. Metadata & icons

- `layout.tsx`: update `theme-color` meta (e.g. `#050508`), keep metadata text (content unchanged); add display font variable.
- `src/app/icon.svg`: regenerate as an aurora-gradient "AD" mark (existing PNGs stay unless regeneration is trivial via the SVG).

## File-by-file change list

| File | Change |
|---|---|
| `src/app/globals.css` | New aurora token system, glass/gradient utilities, glow shadows, retinted grain/scrollbar/selection/marquee/reveal CSS |
| `tailwind.config.cjs` | Colors (aurora, glass), font stacks, new shadows/animations; remove `acid-glow`, neon-* leftovers |
| `src/app/layout.tsx` | Add display font, theme-color meta |
| `src/components/*` (all) | Re-skin per sections above; 3 new components (GradientOrbs, GlassCard, MagneticButton) |
| `src/app/page.tsx` | Mount GradientOrbs; no structural change |
| `src/app/{blog,social,resume,no-stalking}/*` | Re-skin per above |
| `Plan.md` (new, repo root) | Copy of this plan (user-requested deliverable) |

## Non-goals / guardrails

- No content, data, copy, or link changes.
- No changes to contact API, EmailJS config, middleware, SEO metadata text.
- No new heavy deps (three.js/fiber/drei already installed; only used if perf-safe).
- All interactions must keep no-op guards for touch + `prefers-reduced-motion` (already enforced in `interactions.ts`; new components follow suit).
- Keep pages fully responsive: bento grids collapse to single column on mobile; glass effects degrade gracefully (solid surface fallback).

## Verification

1. `npm run build` — zero type/lint errors.
2. `npm run dev` and manually check:
   - Home: intro curtain → hero entrance → every section; both themes via toggle; nav active pill tracks sections; marquee, counters, meters, modal, magnetic/tilt/spotlight all fire; scroll-progress works with Lenis.
   - Sub-pages: `/blog`, `/social`, `/resume` (toolbar + Print Preview → PDF renders correctly), `/no-stalking`.
   - Contact form: validation errors, loading state, success message (EmailJS or fallback error path).
   - Responsive: 390px / 768px / 1440px widths; mobile menu opens and scrolls correctly.
   - Reduced motion (emulate `prefers-reduced-motion`): curtain skipped, content visible, no trapped-hidden state.
3. Lighthouse pass (Performance/Accessibility/Best Practices/SEO) — expect ≥90 across; check focus-visible rings on new buttons.
