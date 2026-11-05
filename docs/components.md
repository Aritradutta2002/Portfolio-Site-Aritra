# Components Registry & Verification — aritrodutta.tech

This document tracks all external components evaluated, verified, and adopted per `Plan.md` §6.

| Component | Library | Source URL / Slug | Install Command | Dependencies | License | Attribution Needed | Used in | Status |
|---|---|---|---|---|---|---|---|---|
| **Spotlight Navbar** | Vengeance UI | `https://www.vengenceui.com/r/spotlight-navbar.json` | `npx shadcn@latest add @vengeanceui/spotlight-navbar` | `framer-motion`, `clsx`, `tailwind-merge` | MIT / Free | No | Phase 4 (Navigation) | **Adopted & Refactored (`src/components/ui/spotlight-navbar.tsx`)** |
| **Glass Dock** | Vengeance UI | `https://www.vengenceui.com/r/glass-dock.json` | `npx shadcn@latest add @vengeanceui/glass-dock` | `framer-motion`, `clsx`, `tailwind-merge` | MIT / Free | No | Alternate desktop view | **OK (Verified 200)** |
| **Animated Rays** | Vengeance UI | `https://www.vengenceui.com/r/animated-rays.json` | `npx shadcn@latest add @vengeanceui/animated-rays` | `framer-motion`, `clsx`, `tailwind-merge` | MIT / Free | No | Phase 5 (Hero background) | **Adopted & Refactored (`src/components/ui/animated-rays.tsx`)** |
| **Flip Text** | Vengeance UI | `https://www.vengenceui.com/r/flip-text.json` | `npx shadcn@latest add @vengeanceui/flip-text` | `framer-motion`, `clsx`, `tailwind-merge` | MIT / Free | No | Phase 5 (Hero role keywords) | **Adopted & Refactored (`src/components/ui/flip-text.tsx`)** |
| **Morph Text** | Vengeance UI | `https://www.vengenceui.com/r/morph-text.json` | `npx shadcn@latest add @vengeanceui/morph-text` | `framer-motion`, `clsx`, `tailwind-merge` | MIT / Free | No | Phase 5 (Alternative role keywords) | **OK (Verified 200)** |
| **Staggered Grid** | Vengeance UI | `https://www.vengenceui.com/r/staggered-grid.json` | `npx shadcn@latest add @vengeanceui/staggered-grid` | `framer-motion`, `clsx`, `tailwind-merge` | MIT / Free | No | Phase 7 (Experience highlights) | **OK (Verified 200)** |
| **Cursor Card** | Vengeance UI | `https://www.vengenceui.com/r/cursor-card.json` | `npx shadcn@latest add @vengeanceui/cursor-card` | `framer-motion`, `clsx`, `tailwind-merge` | MIT / Free | No | Phase 7 (About & Highlights spotlight) | **OK (Verified 200)** |
| **Folder Preview** | Vengeance UI | `https://www.vengenceui.com/r/folder-preview.json` | `npx shadcn@latest add @vengeanceui/folder-preview` | `framer-motion`, `clsx`, `tailwind-merge` | MIT / Free | No | Phase 8 (Archived case studies) | **OK (Verified 200)** |
| **Animated Button** | Vengeance UI | `https://www.vengenceui.com/r/animated-button.json` | `npx shadcn@latest add @vengeanceui/animated-button` | `framer-motion`, `clsx`, `tailwind-merge` | MIT / Free | No | Phase 9 (Contact & CTAs) | **Substituted (`my-animated-button` 404 → `animated-button` 200)** |
| **Dynamic Island AI Pill** | Bespoke Motion | Bespoke Motion / Skiper adaptation | Custom Motion primitive (`src/components/motion/DynamicIslandPill.tsx`) | `framer-motion`, `clsx`, `tailwind-merge` | MIT / Project proprietary | No (free from license restrictions) | Phase 6 (AI Résumé Pill) | **Substituted (`skiper2` returned 401 Pro auth; implemented via bespoke Framer Motion primitive)** |
| **Slide-over Case Study Drawer** | Custom Motion | Bespoke Framer Motion Drawer | Custom primitive (`src/components/motion/CaseStudyDrawer.tsx`) | `framer-motion`, `clsx`, `tailwind-merge` | MIT / Project proprietary | No | Phase 8 (Projects Deep-Dive) | **OK (Approved in Design Review)** |
| **Smooth Scroll** | Lenis | npm package `lenis` | `npm i lenis` | Native JS / CSS | MIT | No | Phase 2 (Foundations) | **OK (Installed ^1.3.23)** |

## Verification Notes
1. **Button Slug Correction:** `my-animated-button` returned HTTP 404 on `vengenceui.com/r/`. Probing the registry confirmed the official slug is `animated-button` (HTTP 200).
2. **Skiper UI Authentication:** `https://skiper-ui.com/r/skiper2.json` requires `Skiper UI Pro` HTTP Bearer token (returns HTTP 401). Per decision D3 (No paid license purchase), we construct the Dynamic Island in-situ expanding pill using native `framer-motion` layout animations without external subscription dependencies.
