# Design System — aritrodutta.tech

Source of truth for visual language, typography, motion, tokens, and component guidelines across the portfolio.

---

## 1. Aesthetic Direction & Principles

- **Track B — Signature Direction**: Technical authority with refined craftsmanship. High-contrast typography, restrained atmospheric depth (3.5% SVG noise grain), micro-interactions that communicate system precision, and zero gimmicks.
- **Content Integrity**: Real data only (TCS 20× latency reduction, 700+ DSA problems, 1672 LeetCode rating). No fabricated claims.
- **Performance First**: 0ms First Contentful Paint delay; no blocking splash screens; GPU-accelerated `transform` and `opacity` motion only; zero cumulative layout shift (CLS).
- **Universal Accessibility**: WCAG AA compliance (contrast ratio ≥ 4.5:1 on all text); complete keyboard operability; immediate zero-animation fallbacks when `prefers-reduced-motion` is active.

---

## 2. Color & Surfaces

### 2.1 Dark Mode (Primary)
Near-black canvas with luminous aurora accents.

| Token | Value | Purpose |
|---|---|---|
| `--bg` | `5 5 8` (`#050508`) | Core viewport canvas |
| `--surface` | `20 21 28` (`#14151C`) | Card and panel backgrounds |
| `--surface-2` | `#1E1E28` | Elevated surfaces, popovers, dropdowns |
| `--ink` | `237 238 244` (`#EDEEF4`) | Primary text (contrast > 12:1) |
| `--muted` | `148 152 168` (`#9498A8`) | Secondary descriptions and metadata (contrast > 5:1) |
| `--border` | `rgba(255, 255, 255, 0.08)` | Hairline boundaries |
| `--aurora-1` | `#8B5CF6` (Violet) | Primary interactive accent |
| `--aurora-2` | `#22D3EE` (Cyan) | Secondary data accent |
| `--aurora-3` | `#F472B6` (Pink) | Tertiary highlight |

### 2.2 Light Mode (Luxury Porcelain)
Pristine, paper-like surface with deep contrast ink.

| Token | Value | Purpose |
|---|---|---|
| `--bg` | `245 246 250` (`#F5F6FA`) | Core viewport canvas |
| `--surface` | `255 255 255` (`#FFFFFF`) | Elevated cards |
| `--surface-2` | `#EAECEF` | Subtle group containers |
| `--ink` | `12 14 24` (`#0C0E18`) | Primary text (contrast > 14:1) |
| `--muted` | `92 98 118` (`#5C6276`) | Secondary text (contrast > 4.8:1) |
| `--border` | `rgba(0, 0, 0, 0.08)` | Hairline boundaries |
| `--aurora-text` | `#6D28D9` | High-contrast violet text for light mode |

---

## 3. Typography & Responsive Scale

Typography is strictly anchored to **Geist** and **Geist Mono** loaded via `next/font/google`.

| Level | Size Rule | Weight | Tracking | Leading | Target Elements |
|---|---|---|---|---|---|
| **Display / H1** | `clamp(2.5rem, 5vw, 4.25rem)` | 700 | `-0.03em` | 1.05 | Hero headline |
| **H2 Section** | `clamp(1.75rem, 3.5vw, 2.5rem)` | 600 | `-0.02em` | 1.15 | Section headers |
| **H3 Card** | `clamp(1.125rem, 2vw, 1.35rem)` | 600 | `-0.01em` | 1.3 | Bento card titles, project names |
| **Body** | `1rem` (16px) | 400 | `normal` | 1.6 | Narrative paragraphs, descriptions |
| **Body Sm** | `0.875rem` (14px) | 400 | `normal` | 1.5 | Compact lists, sub-details |
| **Mono Badge** | `0.75rem` (12px) | 500 | `0.08em` | 1.4 | Metric labels, tags, timestamps, code |

---

## 4. Spacing, Rhythm & Radii

- **8pt Grid System**: All margins and paddings are multiples of 4px / 8px (`0.5rem`, `1rem`, `1.5rem`, `2rem`, `3rem`, `4rem`).
- **Section Padding**: `clamp(72px, 10vw, 160px)` vertical rhythm between major sections.
- **Max Content Width**: `1240px` centered container with responsive gutter (`px-4 sm:px-6 lg:px-8`).
- **Border Radii**:
  - `token-sm`: `6px` (badges, chips, inner tags)
  - `token-md`: `10px` (inputs, buttons, pill triggers)
  - `token-lg`: `16px` (cards, dialogs, drawers)
  - `token-full`: `9999px` (floating pills, status dots)

---

## 5. Motion Specification

All animations animate **only `transform` and `opacity`**.

| Interaction | Duration | Curve / Spring | Spec |
|---|---|---|---|
| **Hover / Focus** | 120–180ms | `cubic-bezier(.22, 1, .36, 1)` | Scale 1.02, subtle border illumination |
| **UI Expansions / Menus** | 280–350ms | `spring({ stiffness: 300, damping: 30 })` | Dynamic island expand, drawer slide |
| **Section Reveal** | 700ms | `cubic-bezier(.22, 1, .36, 1)` | `y: 24 -> 0`, `opacity: 0 -> 1` once |
| **Masked Line Reveal** | 750–850ms | `cubic-bezier(.22, 1, .36, 1)` | `translateY: 105% -> 0` inside `overflow: hidden` |
| **Sibling Stagger** | 70ms interval | Capped at 8 items | Sequential item entry |
| **Count-up Numbers** | 1400ms | `easeOutCubic` | Numeric counter once on first view |
| **Route Enter** | 350ms | `cubic-bezier(.65, 0, .35, 1)` | `y: 8 -> 0`, `opacity: 0 -> 1` in `template.tsx` |

### Reduced Motion Guarantee
When `prefers-reduced-motion: reduce` is detected:
- All transforms are forced to `0`.
- All transitions complete in `0.01ms`.
- Numeric counters immediately display final values.
- Custom cursor returns `null` (native cursor retained).
- Lenis smooth inertial scrolling is completely disabled.

---

## 6. Custom Cursor Specification (`components/Cursor.tsx`)

Only activated on devices with `(hover: hover) and (pointer: fine)`.

| State | Outer Ring Size | Ring Color | Center Dot | Behavior |
|---|---|---|---|---|
| `default` | 28px | `rgba(139, 92, 246, 0.45)` | 6px Violet | Follows cursor with light spring physics |
| `link` | 44px (scale 1.15) | `rgba(34, 211, 238, 0.8)` | Scaled down to 0.6 | Triggered on `a`, `button`, interactive controls |
| `view` | 60px (scale 1.25) | `rgba(244, 114, 182, 0.85)` | Hidden; "View" label | Triggered on project cards / case studies |
| `hidden` | 0px | Transparent | Hidden | Hovering inputs/textareas (preserves native I-beam) |

---

## 7. Component State Matrix

| Component | Loading | Empty | Error | Active / Success |
|---|---|---|---|---|
| **AI Résumé Pill** | 3-dot subtle pulse inside input | Suggestion chips for TCS, AlgoGuru, LeetCode | Amber/red banner + Retry button | Inline expansion to max-w 640px, streaming tokens |
| **Project Filters** | Seamless layout reflow | "No projects in this discipline yet" + Reset button | Revert to "All" view | Active category chip filled with accent glow |
| **Case Study Drawer** | Skeleton wireframe with shimmer | "Full case study writing in progress" | Error message with GitHub link fallback | Slide-over drawer with focus trap, ESC closes |
| **Contact / Copy** | Scale 0.98 on press | — | Native mailto fallback | Checkmark icon + "Copied to clipboard!" toast (2s) |

---

## 8. Do / Don't Rules

- **DO** use `clamp()` for responsive font sizing and vertical section rhythm.
- **DO** use `next/dynamic` for heavy client-side components (Animated Rays, canvas effects).
- **DO** add `data-lenis-prevent` on any inner scrollable element (`overflow-y-auto`).
- **DO** test all layouts at 320px mobile width to prevent horizontal scrollbars.
- **DON'T** rewrite or invent resume claims or metrics.
- **DON'T** modify `/api/chat` routes or rate-limiting logic.
- **DON'T** introduce a second animation library (stick solely to `framer-motion`).
- **DON'T** animate layout dimensions (`width`, `height`, `margin`) directly—use `transform` and `opacity`.
- **DON'T** render custom cursors on touch screens.
