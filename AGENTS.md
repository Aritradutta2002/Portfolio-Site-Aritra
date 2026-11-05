# Agent instructions — Portfolio (aritrodutta.tech)

You are upgrading an existing, live portfolio. Follow Plan.md phase by phase.

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
1. Read Plan.md (current phase) and docs/AUDIT.md.
2. Summarize what you found in <=10 lines before editing.
3. Make the smallest change set that satisfies the phase Acceptance list.
4. Run lint, typecheck, build (and tests once they exist). Fix everything you introduced.
5. Update docs/transformation-log.md and tick the checklist.
6. Write the PR description: what changed, screenshots/GIF notes, perf numbers, open questions.

## Definition of done
Lint + typecheck + build + tests pass, no console errors, no CLS regressions, reduced-motion works,
keyboard navigation works, 320px–1920px verified, Lighthouse mobile performance >= 90.
