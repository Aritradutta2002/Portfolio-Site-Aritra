# Premium UI & Motion Upgrade — Implementation Plan

**Goal:** Raise every section of the `/` datasheet to a production-grade, LinkedIn-ready experience with restrained cinematic motion, stronger hierarchy, and full light/dark/mobile coverage.

**Architecture:** Keep the existing obsidian/brass editorial identity. Add one shared motion layer (CSS variables + `MotionController`), split the oversized section components into focused units, and use Framer Motion only for stateful transitions (project filtering/expansion). All motion is transform/opacity, reduced-motion safe, and disabled for coarse pointers where it would cost more than it gives.

**Tech stack:** Next.js 15 / React 19 / Tailwind 3 / Framer Motion 12 / Lenis / lucide-react.

---

## Design decisions

- **Identity:** obsidian canvas, champagne brass accent, hairline geometry, sharp corners, editorial grotesk + mono labels. No glassmorphism/rainbow SaaS.
- **Motion tier:** cinematic middle. Scroll-linked reveals, subtle parallax, 3D project tilt, filter layout transitions, metric counters, command-bar chatbot, skill marquee. No WebGL, cursor trails, or scroll hijacking.
- **Hierarchy:** each section gets a large ghost index numeral, clearer eyebrow, one lead statement, then scannable cards. Long text is progressively disclosed.
- **About:** replace the five-card wall + duplicated education block with: profile card, short story, animated metric row, experience ledger with disclosure, and a compact "beyond the résumé" strip. Education stays in its own section.
- **Projects:** add bespoke CSS/SVG visuals per project (architecture map, sorting bars, Huffman tree, LeetCode heatmap, chat UI), animated filter pill, expandable case-study details, and a more convincing flagship product window.
- **Skills:** domain cards with icons + counts, a "daily drivers" band, and a slow full-bleed technology marquee.
- **Chatbot:** restyle from rounded blue SaaS to the datasheet's command-bar language; compact horizontal category rail on mobile.
- **Navigation:** add a desktop section rail with active tracking, a brass progress head, and stronger focus states.
- **Accessibility:** keyboard-accessible filters/disclosures, `aria-expanded`, `aria-current`, visible focus, `prefers-reduced-motion` fallbacks, no content hidden without JS.
- **Performance:** CSS variables written once per frame by `MotionController`; no React re-render for pointer/scroll effects. Framer Motion limited to projects.

## File map

| File | Responsibility |
|---|---|
| `src/components/zro/MotionController.tsx` | Add `[data-tilt]` pointer tilt; reset on leave |
| `src/components/zro/SectionRail.tsx` | New desktop section navigation rail |
| `src/components/zro/ui/SectionHeader.tsx` | Ghost index numeral + split-word mask reveal |
| `src/components/zro/Hero.tsx` | Hero proof strip, portrait glow, spacing + chatbot mount |
| `src/components/zro/HeroChatbot.tsx` | Restyle to zro tokens; compact category rail |
| `src/components/zro/AboutSection.tsx` | New composition |
| `src/components/zro/about/ProfileCard.tsx` | Portrait + identity + quick facts + socials |
| `src/components/zro/about/StoryPanel.tsx` | Pull quote, narrative, metric row |
| `src/components/zro/about/ExperienceLedger.tsx` | Role timeline, impact pillars, disclosure |
| `src/components/zro/about/BeyondCode.tsx` | Competitive programming strip |
| `src/components/zro/ProjectsSection.tsx` | Framer filter animation + composition |
| `src/components/zro/projects/ProjectVisual.tsx` | Per-project CSS/SVG visual |
| `src/components/zro/projects/ProjectCard.tsx` | Card + expandable case study |
| `src/components/zro/projects/FlagshipShowcase.tsx` | AlgoGuru product window |
| `src/components/zro/SkillsMatrix.tsx` | New skills composition + marquee |
| `src/components/zro/BenchmarksSection.tsx` | Timeline rail polish |
| `src/styles/datasheet.css` | New tokens, motion, visuals, responsive rules |
| `src/app/(datasheet)/page.tsx` | Mount SectionRail |

## Verification

- `npm run lint`
- `npm run build`
- Playwright screenshots at 1440×900 and 390×844, dark + light.
- Exercise filters, project expansion, experience disclosure, theme toggle, mobile nav, chatbot panel.
- Check console for errors and horizontal overflow.
