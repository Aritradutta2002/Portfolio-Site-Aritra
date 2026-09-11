# 3D macOS Portfolio — End-to-End Plan

**Owner:** Aritra Dutta
**Stack:** Next.js (App Router) · React · JavaScript
**Reference:** https://www.ne0gi.com/ (letter-style "desk" portfolio) — informing the "your portfolio lives inside an environment, not a page" approach

---

## 1. Concept

The site is not a page — it's a **3D MacBook that boots into a working macOS-style desktop**. The visitor:

1. Lands on a closed laptop, idly rotating in 3D space.
2. Clicks/taps it → lid opens → camera pushes into the screen.
3. The screen boots (logo flash / progress dots) into a **real desktop environment** — wallpaper, menu bar, dock, desktop icons.
4. Clicking icons opens **draggable, resizable windows**: About, Experience, Projects (Finder-style), Resume, Contact, and a Terminal easter egg.

The 3D laptop is the single bold hero moment. Everything after it should feel like a disciplined, authentic OS — not more spectacle stacked on top of spectacle.

### Design tokens (proposal — tune to taste)

**Color**
| Token | Hex | Use |
|---|---|---|
| `--os-chrome` | `#F5F5F7` / `rgba(255,255,255,0.7)` blurred | Menu bar, dock background |
| `--os-chrome-dark` | `#1D1D1F` | Dark-mode chrome variant |
| `--accent` | `#2DD4BF` (muted teal) or `#F5A623` (amber) | Links, active window highlight, dock indicator dots — pick ONE, not macOS blue |
| `--desktop-bg` | Personal photo or generative art | Wallpaper — not a stock macOS wallpaper |
| `--window-bg` | `#FFFFFF` / `#F9F9FB` | Content windows |
| `--text-primary` | `#1D1D1F` | Body text inside apps |

**Type**
- OS chrome (menu bar, dock labels, window titles): system stack — `-apple-system, BlinkMacSystemFont, "SF Pro Text", ui-sans-serif` — for authenticity.
- App content (About/Experience copy): one distinct second typeface (e.g. a geometric sans or a humanist serif) so content windows feel like *your* voice, not OS chrome.

**Layout**
- Landing: laptop centered, generous negative space, one-line CTA below it ("Click to power on").
- Desktop: icons top-right column (macOS convention), dock bottom-center, menu bar top edge full-width.
- Windows: centered on first open, cascading offset for each subsequent window, remembering last position per app in state (not persisted).

**Principles**
- One bold moment (the laptop), everything after is quiet and functional.
- Every OS affordance (traffic lights, dock magnify, menu bar clock) should actually work — a fake close button is worse than no button.
- Content is real data (JSON), never hardcoded into components — so Experience/Projects can be updated without touching UI code.

---

## 2. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 15 (App Router), React 18/19, JavaScript | Per requirement — no TypeScript |
| 3D rendering | `@react-three/fiber` + `@react-three/drei` | React-native Three.js bindings; drei gives orbit controls, GLTF loading, environment maps |
| 3D model | CC0 MacBook GLB (Sketchfab / Poly Haven) or custom Blender export | Compress with `gltf-transform` + Draco before shipping |
| 2D animation | Framer Motion | Window open/close, dock magnify, genie-minimize, menu dropdowns |
| Scroll/camera sequencing | GSAP + ScrollTrigger (optional) | Coordinating lid-open → camera push-in → fade-to-desktop as one timeline |
| Global state | Zustand | Window manager: open windows, z-index order, position, minimized state |
| Drag/resize | `react-rnd` | Battle-tested, avoids hand-rolled pointer math |
| Styling | Tailwind CSS | Utility classes suit OS-chrome patterns (blur, ring, shadow, rounded-xl) |
| Content | Local JSON (see §5) | No CMS needed for a personal site; swap to Sanity/Contentful later if desired |
| Sound (optional) | Howler.js | Startup chime, click sounds |
| PDF viewer | `react-pdf` or native `<embed>` | For Resume.app |
| Deployment | Vercel | Native Next.js support, image optimization, zero-config |
| Analytics (optional) | Vercel Analytics or Plausible | Lightweight, privacy-respecting |

### Install list

```bash
npx create-next-app@latest portfolio --js --tailwind --app
cd portfolio

npm install three @react-three/fiber @react-three/drei
npm install framer-motion
npm install zustand
npm install react-rnd
npm install gsap
npm install react-pdf
npm install howler          # optional
npm install @vercel/analytics
```

---

## 3. Folder Structure

```
portfolio/
├─ app/
│  ├─ layout.js
│  ├─ page.js                     # Landing: closed laptop scene
│  ├─ globals.css
│  └─ api/
│     └─ contact/route.js         # Contact form → email API
├─ components/
│  ├─ laptop/
│  │  ├─ LaptopScene.js           # R3F <Canvas>, lighting, camera rig
│  │  ├─ LaptopModel.js           # GLTF loader, lid-open animation state
│  │  ├─ BootSequence.js          # Logo flash → progress dots → fade out
│  │  └─ CameraRig.js             # Push-in animation on open
│  ├─ os/
│  │  ├─ Desktop.js               # Wallpaper + desktop icon grid
│  │  ├─ DesktopIcon.js
│  │  ├─ MenuBar.js               # Apple-logo dropdown, live clock, Cmd+K trigger
│  │  ├─ SpotlightSearch.js       # Cmd+K command palette
│  │  ├─ Dock.js                  # Magnify-on-hover, genie-minimize target
│  │  ├─ DockIcon.js
│  │  ├─ Window.js                # Draggable/resizable shell, traffic lights
│  │  └─ WindowManager.js         # Renders all open windows from store
│  └─ apps/
│     ├─ AboutApp.js
│     ├─ ExperienceApp.js         # Finder-list + column detail pane
│     ├─ ProjectsFolder.js        # Icon grid, double-click opens ProjectWindow
│     ├─ ProjectWindow.js
│     ├─ ResumeApp.js             # PDF preview
│     ├─ ContactApp.js            # Mail.app-style compose form
│     └─ TerminalApp.js           # Fake shell: whoami, ls skills, cat about.txt
├─ content/
│  ├─ about.json
│  ├─ experience.json
│  └─ projects.json
├─ store/
│  └─ windowStore.js              # Zustand store (see §6)
├─ lib/
│  └─ terminalCommands.js         # Maps fake commands → content responses
├─ public/
│  ├─ models/macbook.glb
│  ├─ wallpapers/desktop-bg.jpg
│  └─ icons/                      # Custom squircle app icons (SVG)
└─ styles/
   └─ os-chrome.css               # Blur/translucency utilities beyond Tailwind defaults
```

---

## 4. Feature Specifications

### 4.1 Boot Sequence
- Closed laptop, subtle idle rotation (sine-wave tilt, not full spin).
- Click/tap → lid rotates open (GLTF bone animation or CSS-driven Three.js group rotation) over ~1.2s, ease-out.
- Camera dollies toward the screen plane as the lid clears ~45°.
- At full-open, cut to a 2D DOM overlay (screen "wakes"): brief logo flash, then progress dots, then fade into the desktop. This handover from 3D canvas to 2D DOM is the trick that keeps the desktop performant and accessible.
- Provide a **"Skip intro"** text link, always visible, that jumps straight to the desktop (or to a plain semantic page — see §8).

### 4.2 Desktop
- Wallpaper: full-bleed personal image or generative canvas art.
- Desktop icons (top-right column, macOS convention): About, Experience, Projects, Resume, Contact — each a folder/file icon + label.
- Double-click opens the corresponding window (see WindowManager).
- Icons are draggable within the desktop bounds; position resets on reload (not persisted — keep it simple).

### 4.3 Menu Bar
- Fixed top bar, translucent/blurred background.
- Left: your logo/initials as the "Apple menu" — dropdown with real links (LinkedIn, GitHub, email).
- Center-right: current app name (updates based on focused window).
- Right: live clock, and a Spotlight-style search icon that opens Cmd+K palette to jump to any section.

### 4.4 Dock
- Bottom-center, pinned icons for each app.
- Hover: macOS-style magnify (neighboring icons scale slightly too — Framer Motion `layout` + spring).
- Click: opens window, or restores if minimized. Small dot indicator under open apps.
- Minimize: window scales/translates toward its dock icon (genie effect approximation via `scale` + `transform-origin` animation — a true fluid genie mesh warp is out of scope for v1).

### 4.5 Window Manager
- Every window: title bar with traffic lights (red = close, yellow = minimize, green = zoom/maximize), draggable by title bar, resizable via `react-rnd`.
- Store tracks: `id`, `appType`, `position {x,y}`, `size {w,h}`, `zIndex`, `minimized`, `maximized`.
- Clicking a window brings it to front (`zIndex` bump via store action).
- Keyboard: `Esc` closes focused window, `Cmd/Ctrl+W` closes, arrow keys nudge position when title bar focused (accessibility nicety).

### 4.6 Apps

**AboutApp** — Bio, photo, skills grid (grouped by category: languages, frameworks, tools), quick facts (role, location, certifications).

**ExperienceApp** — Finder-style two-pane layout: left list of roles/projects (e.g. TCS Xcelerate migration), right detail pane showing description, tech used, dates. Mirrors macOS Finder's column view.

**ProjectsFolder** — Grid of project "folders" (icon + name), double-click opens a `ProjectWindow` with description, stack, links (live demo, GitHub), and screenshots.

**ResumeApp** — Embedded PDF viewer (`react-pdf`) with a visible "Download" button as fallback.

**ContactApp** — Mail.app-style compose window: To (pre-filled), Subject, Body fields; submits to `/api/contact` which sends via a transactional email provider (Resend/SendGrid) or `mailto:` fallback if no backend email service is set up.

**TerminalApp** (easter egg) — A fake shell prompt. Supported commands map to your real data:
```
whoami              → prints name + title
cat about.txt       → prints bio
ls skills           → lists skills from about.json
ls projects         → lists project names, `cd <project>` shows detail
open resume         → triggers ResumeApp
help                → lists available commands
```

---

## 5. Content Data Model

**`content/about.json`**
```json
{
  "name": "Aritra Dutta",
  "title": "Assistant System Engineer / Full Stack Application Engineer",
  "company": "Tata Consultancy Services",
  "location": "Bhubaneswar, India",
  "bio": "…",
  "education": [
    { "degree": "B.Tech, ECE", "institution": "MAKAUT", "cgpa": "8.79" }
  ],
  "certifications": ["TCS DEEP Ninja DevOps"],
  "skills": {
    "languages": [],
    "frameworks": [],
    "tools": []
  },
  "links": {
    "portfolio": "aritrodutta.tech",
    "github": "",
    "linkedin": ""
  }
}
```

**`content/experience.json`**
```json
[
  {
    "id": "xcelerate-migration",
    "role": "Full Stack Application Engineer",
    "org": "TCS — Element Fleet (Xcelerate)",
    "period": "…",
    "summary": "Java microservices migration work.",
    "stack": ["Java", "Spring Boot", "…"]
  }
]
```

**`content/projects.json`**
```json
[
  {
    "id": "algoguru",
    "name": "AlgoGuru",
    "tagline": "Full-stack learning platform for algorithms & competitive programming",
    "description": "…",
    "stack": ["React", "Node.js", "…"],
    "links": { "live": "", "github": "" },
    "images": ["/projects/algoguru-1.png"]
  }
]
```

---

## 6. State Management — Window Store Shape

```js
// store/windowStore.js (Zustand)
{
  windows: [
    {
      id: 'about-1',
      appType: 'about',        // maps to component in apps/
      title: 'About',
      position: { x: 120, y: 80 },
      size: { width: 480, height: 360 },
      zIndex: 3,
      minimized: false,
      maximized: false
    }
  ],
  openApp: (appType) => {},     // opens new or focuses existing
  closeWindow: (id) => {},
  focusWindow: (id) => {},      // bumps zIndex to max+1
  minimizeWindow: (id) => {},
  toggleMaximize: (id) => {},
  updatePosition: (id, pos) => {},
  updateSize: (id, size) => {}
}
```

---

## 7. Responsive Strategy

Full drag-to-open 3D + freely draggable desktop windows do not translate well to touch. Mobile approach:

- **Laptop scene**: replace interactive drag-open with a lightweight, auto-playing open animation (still 3D, but no orbit controls) to keep the "wow" without fiddly touch interactions.
- **Desktop metaphor**: switch from draggable desktop icons + floating windows to an **iOS-style springboard grid** — tap an icon, its app opens full-screen (like an iOS app), swipe/tap back to return to springboard. Same content components, different shell (`MobileShell.js` instead of `Desktop.js` + `WindowManager.js`).
- **Terminal easter egg**: keep it, but with a mobile-friendly keyboard-aware input.

---

## 8. Accessibility & SEO

- The 3D canvas is invisible to search engines and unusable for screen-reader/no-JS visitors. Render your **actual About/Experience/Projects content as real semantic HTML** (server-rendered, e.g. below the fold or visually hidden but in the DOM) so crawlers and assistive tech get the real content regardless of the 3D layer.
- Respect `prefers-reduced-motion`: skip the lid-open/camera-push animation and drop straight to the desktop (or the plain HTML fallback) for users who've set that preference.
- Keyboard access: dock and desktop icons are focusable and `Enter`-activatable; windows are closable/movable via keyboard (see §4.5).
- Visible focus rings on all interactive OS chrome (icons, traffic lights, menu items) — don't rely on hover-only affordances.
- Always-visible "Skip intro" / "View plain resume" link for anyone who doesn't want the 3D experience.

---

## 9. Performance Strategy

- Dynamically import the R3F scene with `next/dynamic({ ssr: false })` and show a lightweight 2D placeholder (static laptop image) while it hydrates.
- Draco-compress and `gltf-transform`-optimize the MacBook GLB; target under ~2–3MB.
- Lazy-load app window components — only import `ProjectWindow`, `TerminalApp`, etc. when the user actually opens them (`next/dynamic` per app).
- Use `next/image` for wallpaper and screenshots with explicit sizes.
- Budget: aim for Lighthouse Performance ≥ 85 on desktop even with the 3D scene — measure after each phase, not just at the end.

---

## 10. Roadmap

| Phase | Goal | Key tasks |
|---|---|---|
| **1. Foundation** | Content and structure locked before any 3D work | Scaffold Next.js + Tailwind; write `about.json`, `experience.json`, `projects.json`; build plain HTML versions of each section |
| **2. 3D laptop shell** | Laptop renders and opens | Source/optimize GLB; render in R3F with idle rotation; build lid-open animation; camera push-in |
| **3. OS desktop shell** | OS chrome works as flat 2D UI | Build Zustand window store, MenuBar, Dock, Desktop + icons — no 3D dependency yet |
| **4. Content apps** | Real data inside real windows | Build AboutApp, ExperienceApp, ProjectsFolder/ProjectWindow, ResumeApp, ContactApp (+ `/api/contact`) |
| **5. Interaction polish** | Everything feels alive | `react-rnd` drag/resize, dock magnify + genie-minimize, boot sequence stitched end-to-end, optional sound |
| **6. Responsive & performance** | Works everywhere, fast | Mobile springboard shell, lazy-loading, Draco compression, semantic-HTML fallback, Lighthouse audit, reduced-motion handling |
| **7. Deploy & iterate** | Live and improving | Vercel deploy + custom domain, analytics, then TerminalApp + Spotlight search as post-launch additions |

---

## 11. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| 3D model licensing issues | Use CC0/CC-BY assets with clear attribution, or model your own in Blender |
| Canvas-only content hurts SEO | Server-render real semantic HTML fallback (§8) — non-negotiable, do this in Phase 1 |
| Heavy 3D tanks mobile performance | Simplified mobile shell (§7) instead of trying to force the desktop experience onto touch |
| Scope creep (sound, genie-warp, live wallpapers) | Treat these as Phase 7+ polish, never blocking core launch |
| Draggable windows feel janky | Use a proven library (`react-rnd`) rather than hand-rolled pointer math |

---

## 12. Post-Launch Ideas (optional)

- Spotlight-style Cmd+K search across all content.
- Dark/light mode toggle tied to actual macOS `prefers-color-scheme`.
- A "Notes.app" with short blog-style dev notes.
- Live GitHub contribution graph rendered inside a widget on the desktop.
- Subtle ambient sound toggle (keyboard clicks, startup chime) — off by default.
