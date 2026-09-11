import * as React from 'react'

/* ── macOS-style squircle app icons ────────────────────────────────────────
   Authentic Apple-style icons: authentic per-app palettes and glyphs,
   the shared Apple superellipse (squircle) clip, a subtle top-edge sheen
   and a single tasteful depth shadow — matte like Big Sur and later,
   not the glossy 2014 look. Every icon shares one 64×64 grid. */

export type IconName =
  | 'about'
  | 'experience'
  | 'projects'
  | 'project'
  | 'resume'
  | 'contact'
  | 'terminal'
  | 'finder'
  | 'photos'
  | 'notes'
  | 'calendar'
  | 'music'
  | 'mail'
  | 'browser'
  | 'widgets'
  | 'launchpad'
  | 'spotlight'
  | 'apple'

type Props = {
  name: IconName
  size?: number
  className?: string
  /** Overrides the glyph colour (defaults to white). */
  glyphColor?: string
}

/* Each icon: multi-stop vertical plate gradient, sampled from the real apps */
const GRAD_DEFS: Record<IconName, { stops: Array<{ offset: string; color: string }> }> = {
  /* Apple Account / System Settings person: cool graphite-blue */
  about:      { stops: [{ offset: '0%', color: '#8E9BB8' }, { offset: '50%', color: '#5E6E96' }, { offset: '100%', color: '#3D4C74' }] },
  /* ProjecX briefcase — refined teal */
  experience: { stops: [{ offset: '0%', color: '#4ADCC8' }, { offset: '48%', color: '#12B5A5' }, { offset: '100%', color: '#0B7F86' }] },
  /* Finder folder — Apple's folder blue */
  projects:   { stops: [{ offset: '0%', color: '#6EC6F7' }, { offset: '45%', color: '#2F9FF0' }, { offset: '100%', color: '#1273D8' }] },
  project:    { stops: [{ offset: '0%', color: '#6EC6F7' }, { offset: '45%', color: '#2F9FF0' }, { offset: '100%', color: '#1273D8' }] },
  /* Pages-like document — coral */
  resume:     { stops: [{ offset: '0%', color: '#FF7E75' }, { offset: '48%', color: '#F04A45' }, { offset: '100%', color: '#C72E30' }] },
  /* Messages green */
  contact:    { stops: [{ offset: '0%', color: '#67E961' }, { offset: '48%', color: '#2ECE44' }, { offset: '100%', color: '#12A02C' }] },
  /* Terminal — near-black */
  terminal:   { stops: [{ offset: '0%', color: '#3A3F46' }, { offset: '50%', color: '#1E2228' }, { offset: '100%', color: '#0B0D10' }] },
  /* Safari — sky blue */
  finder:     { stops: [{ offset: '0%', color: '#41B4F5' }, { offset: '45%', color: '#1E8FE8' }, { offset: '100%', color: '#0C63D6' }] },
  /* Photos — white plate, pinwheel glyph */
  photos:     { stops: [{ offset: '0%', color: '#FFFFFF' }, { offset: '100%', color: '#EBEBEF' }] },
  /* Notes — white paper, yellow band glyph */
  notes:      { stops: [{ offset: '0%', color: '#FFFFFF' }, { offset: '100%', color: '#F0EDE4' }] },
  /* Calendar — white plate */
  calendar:   { stops: [{ offset: '0%', color: '#FFFFFF' }, { offset: '100%', color: '#ECECF0' }] },
  /* Apple Music — the real #FA233B → #FB5C74 */
  music:      { stops: [{ offset: '0%', color: '#FB5C74' }, { offset: '100%', color: '#FA233B' }] },
  /* Mail — the real iOS blue */
  mail:       { stops: [{ offset: '0%', color: '#3BA2FF' }, { offset: '48%', color: '#1E7BEE' }, { offset: '100%', color: '#0F5FD7' }] },
  /* Aurora browser — deep sky */
  browser:    { stops: [{ offset: '0%', color: '#5CB8F8' }, { offset: '45%', color: '#2E8BEA' }, { offset: '100%', color: '#155CD0' }] },
  /* Widgets — graphite like Mission Control tile */
  widgets:    { stops: [{ offset: '0%', color: '#A78BFA' }, { offset: '45%', color: '#7C3AED' }, { offset: '100%', color: '#4C1D95' }] },
  /* Launchpad — silver */
  launchpad:  { stops: [{ offset: '0%', color: '#F5F5F7' }, { offset: '100%', color: '#CDCDD4' }] },
  /* Spotlight — graphite */
  spotlight:  { stops: [{ offset: '0%', color: '#A1A1AA' }, { offset: '50%', color: '#71717A' }, { offset: '100%', color: '#3F3F46' }] },
  /* Apple logo tile */
  apple:      { stops: [{ offset: '0%', color: '#3A3A3E' }, { offset: '50%', color: '#1C1C1E' }, { offset: '100%', color: '#0A0A0C' }] },
}

/* macOS Photos pinwheel — Apple's real petal hues, clockwise from 12 o'clock. */
const PHOTOS_PETALS = [
  '#FDBA2F', '#F87A3E', '#F5453C', '#F78EBB',
  '#9A6AD8', '#4B8DF8', '#35C1F1', '#64BE60',
]

const SYSTEM_FONT = `-apple-system, 'SF Pro Text', 'Segoe UI', system-ui, sans-serif`

function Glyph({ name, color, uid }: { name: IconName; color: string; uid: string }) {
  const c = color
  switch (name) {
    case 'about':
      return (
        <g>
          {/* Head */}
          <circle cx="32" cy="22.5" r="8.6" fill={c} />
          {/* Shoulders — Apple-account style arc */}
          <path d="M15 51c0-9.4 7.6-16.5 17-16.5S49 41.6 49 51H15Z" fill={c} />
          {/* Soft top-light on head */}
          <circle cx="29.2" cy="20" r="3.4" fill="rgba(255,255,255,0.20)" />
        </g>
      )

    case 'experience':
      return (
        <g>
          {/* Handle behind body */}
          <path d="M24.5 27v-3.5a4.5 4.5 0 0 1 4.5-4.5h6a4.5 4.5 0 0 1 4.5 4.5V27" fill="none" stroke={c} strokeWidth="3.2" strokeLinecap="round" />
          {/* Body */}
          <rect x="13" y="27" width="38" height="24" rx="5" fill={c} />
          {/* Top sheen */}
          <rect x="13" y="27" width="38" height="7" rx="3.5" fill="rgba(255,255,255,0.20)" />
          {/* Clasp */}
          <rect x="28.5" y="36.5" width="7" height="5.5" rx="2" fill="rgba(0,0,0,0.20)" />
        </g>
      )

    case 'projects':
    case 'project':
      return (
        <g>
          {/* Folder back + tab, Apple folder blue */}
          <path d="M11 24.5a4.5 4.5 0 0 1 4.5-4.5h9.8a3.5 3.5 0 0 1 2.47 1.02l2.9 2.9c.66.66 1.55 1.03 2.48 1.03H48.5A4.5 4.5 0 0 1 53 29.4v17.1a4.5 4.5 0 0 1-4.5 4.5h-33A4.5 4.5 0 0 1 11 46.5v-22Z" fill={c} />
          {/* Front paper sheet — white document peeking out */}
          <rect x="19" y="29.5" width="26" height="17" rx="2" fill="#FFFFFF" opacity="0.92" />
          {/* Folder front, slightly lighter blue */}
          <path d="M11 30.5a3 3 0 0 1 3.6-2.94l14.9 3.1a12 12 0 0 0 4.98 0l13.92-3.1A3 3 0 0 1 53 30.5v16a4.5 4.5 0 0 1-4.5 4.5h-33A4.5 4.5 0 0 1 11 46.5v-16Z" fill="#5DBBF6" />
          <path d="M11 30.5a3 3 0 0 1 3.6-2.94l14.9 3.1a12 12 0 0 0 4.98 0l13.92-3.1A3 3 0 0 1 53 30.5v3l-42-5.4v2.34Z" fill="rgba(255,255,255,0.25)" />
        </g>
      )

    case 'resume':
      return (
        <g>
          {/* Paper body */}
          <path d="M18 11h17.5L48 23.5V52a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V15a4 4 0 0 1 4-4Z" fill="#FFFFFF" />
          {/* Folded corner */}
          <path d="M35.5 11 48 23.5H39a3.5 3.5 0 0 1-3.5-3.5V11Z" fill="#FFD3CF" />
          {/* Text lines */}
          <rect x="21.5" y="30" width="21" height="2.6" rx="1.3" fill="#F04A45" opacity="0.85" />
          <rect x="21.5" y="36.5" width="21" height="2.6" rx="1.3" fill="#C9C9CF" />
          <rect x="21.5" y="43" width="13" height="2.6" rx="1.3" fill="#C9C9CF" />
          {/* Name bar */}
          <rect x="21.5" y="21" width="12" height="4.5" rx="2.25" fill="#F04A45" opacity="0.55" />
        </g>
      )

    case 'contact':
      /* Messages — white speech bubble on green */
      return (
        <g>
          <path
            d="M32 14.5c10.5 0 19 6.9 19 15.4 0 8.5-8.5 15.4-19 15.4-1.6 0-3.2-.17-4.7-.5-1.9 1.5-4.6 3.1-7.6 3.5-.7.1-1.3-.55-1.1-1.2.5-1.9.7-4.1.4-5.9-3.7-2.8-6-6.8-6-11.3 0-8.5 8.5-15.4 19-15.4Z"
            fill="#FFFFFF"
          />
          {/* Subtle bubble shading */}
          <path d="M32 14.5c10.5 0 19 6.9 19 15.4 0 1.5-.3 3-.85 4.4C48.4 26.9 41 21.5 32 21.5S15.6 26.9 13.85 34.3A15.5 15.5 0 0 1 13 29.9c0-8.5 8.5-15.4 19-15.4Z" fill="rgba(0,0,0,0.05)" />
        </g>
      )

    case 'terminal':
      return (
        <g>
          {/* Window chrome: title bar */}
          <rect x="6" y="12" width="52" height="40" rx="7" fill="#0E1116" />
          <path d="M6 19a7 7 0 0 1 7-7h38a7 7 0 0 1 7 7v3.5H6V19Z" fill="#2E333B" />
          {/* Title-bar dots */}
          <circle cx="12.5" cy="17.6" r="1.5" fill="#FF5F57" />
          <circle cx="17.5" cy="17.6" r="1.5" fill="#FEBC2E" />
          <circle cx="22.5" cy="17.6" r="1.5" fill="#28C840" />
          {/* Prompt */}
          <path d="M14 30l7.5 6-7.5 6" fill="none" stroke="#E8E8EA" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="26" y="39.5" width="17" height="3.2" rx="1.6" fill="#E8E8EA" />
        </g>
      )

    case 'finder':
      /* The real Finder: two-tone split face filling the whole icon */
      return (
        <g>
          {/* Right (darker) half — full-bleed face */}
          <path d="M32 4C25 4 12 8 12 32s13 28 20 28 20-4 20-28S39 4 32 4Z" fill={`url(#${uid}-fright)`} />
          {/* Left (lighter) half */}
          <path d="M32 4C25 4 12 8 12 32s13 28 20 28V4Z" fill={`url(#${uid}-fleft)`} />
          <defs>
            <linearGradient id={`${uid}-fleft`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A8E2FD" />
              <stop offset="100%" stopColor="#54B7F7" />
            </linearGradient>
            <linearGradient id={`${uid}-fright`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#43ADF6" />
              <stop offset="100%" stopColor="#0F76DE" />
            </linearGradient>
          </defs>
          {/* Eyes — sit either side of the centre line */}
          <ellipse cx="22.5" cy="27.5" rx="2.6" ry="4.4" fill="#0B3D73" />
          <ellipse cx="41.5" cy="27.5" rx="2.6" ry="4.4" fill="#0B3D73" />
          <circle cx="23.3" cy="25.9" r="0.9" fill="rgba(255,255,255,0.85)" />
          <circle cx="42.3" cy="25.9" r="0.9" fill="rgba(255,255,255,0.85)" />
          {/* Smile crossing the split */}
          <path d="M20 38c3.6 4.6 7.6 6.9 12 6.9s8.4-2.3 12-6.9" fill="none" stroke="#0B3D73" strokeWidth="2.7" strokeLinecap="round" />
        </g>
      )

    case 'photos': {
      return (
        <g>
          {PHOTOS_PETALS.map((petal, i) => (
            <path
              key={petal}
              d="M32 30.5 C 29.2 23, 29 15.5, 32 10 C 35 15.5, 34.8 23, 32 30.5 Z"
              fill={petal}
              transform={`rotate(${i * 45} 32 32)`}
            />
          ))}
          <circle cx="32" cy="32" r="7" fill="rgba(0,0,0,0.06)" />
          <circle cx="32" cy="32" r="6.1" fill="#FFFFFF" />
        </g>
      )
    }

    case 'notes': {
      return (
        <g>
          {/* Paper — full bleed white */}
          <rect x="4" y="4" width="56" height="56" fill="#FDFDFB" />
          {/* Yellow header band */}
          <rect x="4" y="4" width="56" height="17" fill="#FFC933" />
          <rect x="4" y="19.5" width="56" height="1" fill="rgba(0,0,0,0.10)" />
          {/* Ruled lines */}
          <rect x="13" y="29" width="38" height="2.2" rx="1.1" fill="#DEDEE3" />
          <rect x="13" y="36.5" width="38" height="2.2" rx="1.1" fill="#DEDEE3" />
          <rect x="13" y="44" width="26" height="2.2" rx="1.1" fill="#DEDEE3" />
        </g>
      )
    }

    case 'calendar': {
      const now = new Date()
      const weekday = now
        .toLocaleDateString('en-US', { weekday: 'short' })
        .toUpperCase()
      const day = now.getDate()
      return (
        <g>
          {/* Body — full bleed white */}
          <rect x="4" y="4" width="56" height="56" fill="#FFFFFF" />
          {/* Red header */}
          <rect x="4" y="4" width="56" height="15" fill="#FF453A" />
          {/* Weekday label — real Calendar shows the weekday */}
          <text x="32" y="15" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#FFFFFF" fontFamily={SYSTEM_FONT} letterSpacing="0.8">{weekday}</text>
          {/* Date number */}
          <text x="32" y="51" textAnchor="middle" fontSize="29" fontWeight="300" fill="#1D1D1F" fontFamily={SYSTEM_FONT}>{day}</text>
        </g>
      )
    }

    case 'music':
      /* Apple Music beamed note */
      return (
        <g fill="#FFFFFF">
          <path d="M42.5 14.5c0-1.2-1-2-2.2-1.8L26 15.4c-1.4.2-2.4 1.3-2.4 2.7v19.2a6.9 6.9 0 0 0-3.1-.74c-3.6 0-6.5 2.4-6.5 5.4s2.9 5.4 6.5 5.4 6.5-2.4 6.5-5.4V25.3c0-.9.65-1.65 1.55-1.8l10.6-2.06c1-.2 1.85.55 1.85 1.55v12.6a6.9 6.9 0 0 0-3.1-.74c-3.6 0-6.5 2.4-6.5 5.4s2.9 5.4 6.5 5.4 6.5-2.4 6.5-5.4V14.5Z" />
        </g>
      )

    case 'mail':
      /* The real Mail envelope — white, crisp flap */
      return (
        <g>
          <rect x="9" y="17" width="46" height="31" rx="6" fill="#FFFFFF" />
          {/* Flap fold */}
          <path d="M11.5 20.5 30.1 34a3.2 3.2 0 0 0 3.8 0l18.6-13.5" fill="none" stroke="#B9CFF3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Bottom creases */}
          <path d="M12 45.5 25.5 33.5M52 45.5 38.5 33.5" fill="none" stroke="#E3ECF9" strokeWidth="2" strokeLinecap="round" />
        </g>
      )

    case 'browser':
      /* Safari compass */
      return (
        <g>
          {/* Dial face */}
          <circle cx="32" cy="32" r="24" fill="#F4F7FB" />
          {/* Blue ring */}
          <circle cx="32" cy="32" r="24" fill="none" stroke={`url(#${uid}-sring)`} strokeWidth="3" />
          <defs>
            <linearGradient id={`${uid}-sring`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3FADF6" />
              <stop offset="100%" stopColor="#1668E3" />
            </linearGradient>
          </defs>
          {/* Degree ticks */}
          {Array.from({ length: 36 }).map((_, i) => {
            const a = (i * 10 * Math.PI) / 180
            const major = i % 9 === 0
            const r1 = major ? 16.6 : 18.4
            const r2 = 20
            return (
              <line
                key={i}
                x1={32 + r1 * Math.sin(a)}
                y1={32 - r1 * Math.cos(a)}
                x2={32 + r2 * Math.sin(a)}
                y2={32 - r2 * Math.cos(a)}
                stroke={major ? '#8E9AA8' : '#C6CDD6'}
                strokeWidth={major ? 1.5 : 0.9}
                strokeLinecap="round"
              />
            )
          })}
          {/* Needle — red north, white south */}
          <g transform="rotate(-45 32 32)">
            <path d="M32 14.5 36.4 32H27.6L32 14.5Z" fill="#FF3B30" />
            <path d="M32 49.5 27.6 32h8.8L32 49.5Z" fill="#FFFFFF" stroke="#D9DEE6" strokeWidth="0.6" />
          </g>
        </g>
      )

    case 'widgets':
      return (
        <g>
          {/* System-colour tiles */}
          <rect x="10" y="10" width="20" height="20" rx="6" fill="#0A84FF" />
          <rect x="34" y="10" width="20" height="20" rx="6" fill="#FFD60A" />
          <rect x="10" y="34" width="20" height="20" rx="6" fill="#FF375F" />
          <rect x="34" y="34" width="20" height="20" rx="6" fill="#30D158" />
          <rect x="10" y="10" width="20" height="9" rx="4.5" fill="rgba(255,255,255,0.25)" />
          <rect x="34" y="10" width="20" height="9" rx="4.5" fill="rgba(255,255,255,0.30)" />
          <rect x="10" y="34" width="20" height="9" rx="4.5" fill="rgba(255,255,255,0.22)" />
          <rect x="34" y="34" width="20" height="9" rx="4.5" fill="rgba(255,255,255,0.22)" />
        </g>
      )

    case 'launchpad':
      /* Big Sur+ Launchpad — silver rocket */
      return (
        <g transform="rotate(45 32 32)">
          {/* Body */}
          <path d="M32 11c4.6 3.8 7 9.2 7 15.4 0 3.4-.7 6.6-2 9.6h-10a24.4 24.4 0 0 1-2-9.6c0-6.2 2.4-11.6 7-15.4Z" fill="#7C8794" />
          {/* Nose cone */}
          <path d="M32 11c2.6 2.1 4.5 4.8 5.7 7.9h-11.4C27.5 15.8 29.4 13.1 32 11Z" fill="#E5484D" />
          {/* Window */}
          <circle cx="32" cy="24.5" r="3.4" fill="#F5F5F7" stroke="#4A545F" strokeWidth="1.4" />
          {/* Fins */}
          <path d="M27 33.5c-3.4 1.5-5.6 4.3-6.5 8.4l6.2-2.6-.4-2.6.7-3.2Z" fill="#E5484D" />
          <path d="M37 33.5c3.4 1.5 5.6 4.3 6.5 8.4l-6.2-2.6.4-2.6-.7-3.2Z" fill="#E5484D" />
          {/* Exhaust */}
          <path d="M32 37.5c1.9 2.7 2.9 5.6 2.9 8.7 0 3.1-1 6-2.9 8.7-1.9-2.7-2.9-5.6-2.9-8.7 0-3.1 1-6 2.9-8.7Z" fill="#FFB340" />
          <path d="M32 42c1 1.9 1.5 3.8 1.5 5.8 0 2-.5 3.9-1.5 5.8-1-1.9-1.5-3.8-1.5-5.8 0-2 .5-3.9 1.5-5.8Z" fill="#FFE08A" />
        </g>
      )

    case 'spotlight':
      return (
        <g>
          <circle cx="28" cy="27" r="12" fill="rgba(255,255,255,0.10)" stroke={c} strokeWidth="4.5" />
          <line x1="37" y1="36" x2="48" y2="47" stroke={c} strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="24" cy="23" r="3.2" fill="rgba(255,255,255,0.25)" />
        </g>
      )

    case 'apple':
      return (
        <g fill={c}>
          <path d="M41.2 34.3c-.05-6.1 5-9 5.2-9.2-2.8-4.1-7.2-4.7-8.8-4.8-3.7-.4-7.3 2.2-9.2 2.2-1.9 0-4.9-2.1-8-2.1-4.1.05-7.9 2.4-10 6.1-4.3 7.4-1.1 18.4 3.1 24.4 2 2.9 4.4 6.2 7.6 6.1 3-.1 4.2-2 7.9-2 3.6 0 4.7 2 7.9 1.9 3.3-.05 5.4-3 7.4-5.9 2.3-3.4 3.3-6.7 3.3-6.9-.1-.05-6.4-2.5-6.4-9.8ZM35.6 18.1c1.7-2 2.8-4.9 2.5-7.7-2.5.1-5.5 1.7-7.2 3.7-1.6 1.8-2.9 4.7-2.5 7.5 2.8.2 5.6-1.4 7.2-3.5Z" />
        </g>
      )

    default:
      return null
  }
}

/* ── True Apple superellipse squircle (continuous curvature, 64×64 grid) ──
   Apple uses a superellipse with n≈5, not a simple rounded rect.
   This cubic-bezier approximation matches the real iOS/macOS icon shape:
   corners have a smooth "squircle" curve that flows continuously into the
   straight sides — no abrupt tangent break like a plain rx rect. */
const SQUIRCLE_PATH = [
  'M 32 2',
  'C 44.2 2, 50.4 2, 55.2 4.8',
  'C 59.2 7.2, 61.8 11.2, 62 16',
  'C 62.2 20.8, 62 26, 62 32',
  'C 62 38, 62.2 43.2, 62 48',
  'C 61.8 52.8, 59.2 56.8, 55.2 59.2',
  'C 50.4 62, 44.2 62, 32 62',
  'C 19.8 62, 13.6 62, 8.8 59.2',
  'C 4.8 56.8, 2.2 52.8, 2 48',
  'C 1.8 43.2, 2 38, 2 32',
  'C 2 26, 1.8 20.8, 2 16',
  'C 2.2 11.2, 4.8 7.2, 8.8 4.8',
  'C 13.6 2, 19.8 2, 32 2',
  'Z',
].join(' ')

/* Icons whose glyph must render edge-to-edge (no inner padding) */
const FULL_BLEED = new Set<IconName>(['finder', 'notes', 'calendar'])

export default function AppIcon({ name, size = 48, className = '', glyphColor }: Props) {
  /* Stable per-icon ids — no gradient-id churn across re-renders. */
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const clipId = `${uid}-clip`
  const gradId = `${uid}-grad`
  const sheenId = `${uid}-sheen`
  const vignetteId = `${uid}-vig`

  const gradDef = GRAD_DEFS[name]
  const isLight = name === 'photos' || name === 'notes' || name === 'calendar' || name === 'launchpad'
  const isDark = name === 'terminal' || name === 'apple'
  const glyphCol = glyphColor ?? (isLight ? '#1D1D1F' : '#FFFFFF')

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
      shapeRendering="geometricPrecision"
      style={{
        display: 'block',
        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.18)) drop-shadow(0 6px 14px rgba(0,0,0,0.22))',
      }}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={SQUIRCLE_PATH} />
        </clipPath>

        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          {gradDef.stops.map((s) => (
            <stop key={s.offset} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>

        {/* Subtle top sheen — modern macOS icons are matte, not glossy */}
        <linearGradient id={sheenId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={isDark ? 0.10 : isLight ? 0.45 : 0.16} />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity={isDark ? 0.02 : isLight ? 0.08 : 0.03} />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Bottom vignette for quiet depth */}
        <linearGradient id={vignetteId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="55%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.16)" />
        </linearGradient>
      </defs>

      {/* ── Plate ── */}
      <g clipPath={`url(#${clipId})`}>
        <rect x="0" y="0" width="64" height="64" fill={`url(#${gradId})`} />

        {/* Glyph — inset apps keep Apple's ~8% padding, full-bleed apps don't */}
        {FULL_BLEED.has(name) ? (
          <Glyph name={name} color={glyphCol} uid={uid} />
        ) : (
          <g transform="translate(4.2 4.2) scale(0.87)">
            <Glyph name={name} color={glyphCol} uid={uid} />
          </g>
        )}

        <rect x="0" y="0" width="64" height="64" fill={`url(#${vignetteId})`} />
        <rect x="0" y="0" width="64" height="64" fill={`url(#${sheenId})`} />
      </g>

      {/* ── Rim — hairline inner stroke ── */}
      <path
        d={SQUIRCLE_PATH}
        fill="none"
        stroke={isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.14)'}
        strokeWidth="1"
      />
    </svg>
  )
}

export { GRAD_DEFS as PLATE_DEEP }
