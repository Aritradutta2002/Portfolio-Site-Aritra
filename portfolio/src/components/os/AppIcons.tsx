import * as React from 'react'

/* ── macOS-style squircle app icons ────────────────────────────────────────
   Authentic Apple-style icons: multi-stop gradients, inner gloss highlight,
   subtle rim light, depth shadow, and per-icon glyph detail.
   Every icon shares one 64×64 grid and the same squircle clip path
   (rx 13.5 ≈ Apple's ~21% superellipse corner radius). */

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

export const APPLE_MUSIC_LOGO = 'https://www.apple.com/v/apple-music/ag/images/overview/icon_apple_music_alt_25__e8i83er30ga6_small_2x.png'

type Props = {
  name: IconName
  size?: number
  className?: string
  /** Overrides the glyph colour (defaults to white). */
  glyphColor?: string
}

/* Each icon: [top-color, mid-color, bottom-color] for a 3-stop gradient */
type GradDef = { stops: Array<{ offset: string; color: string }>; angle?: string }

const GRAD_DEFS: Record<IconName, GradDef> = {
  about:      { stops: [{ offset: '0%', color: '#BF8FFF' }, { offset: '45%', color: '#8B5CF6' }, { offset: '100%', color: '#4C35C8' }] },
  experience: { stops: [{ offset: '0%', color: '#5EEAD4' }, { offset: '50%', color: '#06B6D4' }, { offset: '100%', color: '#0369A1' }] },
  projects:   { stops: [{ offset: '0%', color: '#FCD34D' }, { offset: '45%', color: '#F59E0B' }, { offset: '100%', color: '#D97706' }] },
  project:    { stops: [{ offset: '0%', color: '#FCD34D' }, { offset: '45%', color: '#F59E0B' }, { offset: '100%', color: '#D97706' }] },
  resume:     { stops: [{ offset: '0%', color: '#F9A8D4' }, { offset: '45%', color: '#EC4899' }, { offset: '100%', color: '#BE185D' }] },
  contact:    { stops: [{ offset: '0%', color: '#6EE7B7' }, { offset: '45%', color: '#10B981' }, { offset: '100%', color: '#047857' }] },
  terminal:   { stops: [{ offset: '0%', color: '#3A3A3E' }, { offset: '50%', color: '#1C1C1E' }, { offset: '100%', color: '#0A0A0C' }] },
  finder:     { stops: [{ offset: '0%', color: '#60C8F5' }, { offset: '40%', color: '#1A9FE8' }, { offset: '100%', color: '#0A5FD6' }] },
  photos:     { stops: [{ offset: '0%', color: '#FFFFFF' }, { offset: '100%', color: '#E8E8ED' }] },
  notes:      { stops: [{ offset: '0%', color: '#FFFDE7' }, { offset: '100%', color: '#F5F0D8' }] },
  calendar:   { stops: [{ offset: '0%', color: '#FFFFFF' }, { offset: '100%', color: '#EDEDF0' }] },
  music:      { stops: [{ offset: '0%', color: '#FF6B8A' }, { offset: '45%', color: '#FC2D55' }, { offset: '100%', color: '#B5003E' }] },
  mail:       { stops: [{ offset: '0%', color: '#7DD3FC' }, { offset: '45%', color: '#3B82F6' }, { offset: '100%', color: '#1D4ED8' }] },
  browser:    { stops: [{ offset: '0%', color: '#93C5FD' }, { offset: '40%', color: '#3B82F6' }, { offset: '100%', color: '#1E40AF' }] },
  widgets:    { stops: [{ offset: '0%', color: '#A78BFA' }, { offset: '45%', color: '#7C3AED' }, { offset: '100%', color: '#4C1D95' }] },
  launchpad:  { stops: [{ offset: '0%', color: '#F5F5F7' }, { offset: '100%', color: '#D1D1D6' }] },
  spotlight:  { stops: [{ offset: '0%', color: '#A1A1AA' }, { offset: '50%', color: '#71717A' }, { offset: '100%', color: '#3F3F46' }] },
  apple:      { stops: [{ offset: '0%', color: '#3A3A3E' }, { offset: '50%', color: '#1C1C1E' }, { offset: '100%', color: '#0A0A0C' }] },
}

let gradSeq = 0

/* macOS Photos pinwheel petal colours, clockwise from 12 o'clock. */
const PHOTOS_PETALS = [
  '#F5C244', '#F0803C', '#E5484D', '#E58AB5',
  '#8E64D5', '#4C8DF6', '#37B4EB', '#57BE6E',
]

const SYSTEM_FONT = `-apple-system, 'SF Pro Text', 'Segoe UI', system-ui, sans-serif`

function Glyph({ name, color }: { name: IconName; color: string }) {
  const c = color
  switch (name) {
    case 'about':
      return (
        <g>
          {/* Head */}
          <circle cx="32" cy="22" r="9" fill={c} />
          {/* Shoulders */}
          <path d="M14 52c0-9.9 8.1-17 18-17s18 7.1 18 17H14Z" fill={c} />
          {/* Subtle inner highlight on head */}
          <circle cx="29" cy="19.5" r="3.5" fill="rgba(255,255,255,0.18)" />
        </g>
      )

    case 'experience':
      return (
        <g>
          {/* Briefcase body */}
          <rect x="13" y="28" width="38" height="24" rx="4" fill={c} />
          {/* Briefcase top bar */}
          <rect x="13" y="26" width="38" height="6" rx="3" fill={c} opacity="0.75" />
          {/* Handle */}
          <path d="M24 26v-4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" />
          {/* Center clasp */}
          <rect x="28" y="37" width="8" height="5" rx="2" fill="rgba(0,0,0,0.22)" />
          {/* Horizontal divider */}
          <rect x="13" y="37" width="38" height="2" rx="1" fill="rgba(0,0,0,0.15)" />
        </g>
      )

    case 'projects':
    case 'project':
      return (
        <g>
          {/* Folder back */}
          <path d="M11 24a4 4 0 0 1 4-4h10.5a3 3 0 0 1 2.1.9l2.8 2.8a3 3 0 0 0 2.1.9H49a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H15a4 4 0 0 1-4-4V24Z" fill={c} />
          {/* Folder tab highlight */}
          <path d="M11 24a4 4 0 0 1 4-4h10.5a3 3 0 0 1 2.1.9l2.8 2.8a3 3 0 0 0 2.1.9H49a4 4 0 0 1 4 4v2H11v-6Z" fill="rgba(255,255,255,0.22)" />
          {/* Inner shadow at top of folder body */}
          <path d="M11 30h42v2H11z" fill="rgba(0,0,0,0.08)" />
        </g>
      )

    case 'resume':
      return (
        <g>
          {/* Paper body */}
          <path d="M18 11h18l12 12v29a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V15a4 4 0 0 1 4-4Z" fill={c} />
          {/* Folded corner */}
          <path d="M36 11v12h12" fill="none" stroke={c} strokeWidth="1.5" opacity="0.5" />
          <path d="M36 11l12 12H36V11Z" fill="rgba(0,0,0,0.18)" />
          {/* Text lines */}
          <rect x="22" y="31" width="20" height="2.5" rx="1.25" fill="rgba(0,0,0,0.28)" />
          <rect x="22" y="37.5" width="20" height="2.5" rx="1.25" fill="rgba(0,0,0,0.22)" />
          <rect x="22" y="44" width="13" height="2.5" rx="1.25" fill="rgba(0,0,0,0.18)" />
          {/* Top highlight */}
          <path d="M18 11h18v3H18a4 4 0 0 0-4 4v-3a4 4 0 0 1 4-4Z" fill="rgba(255,255,255,0.22)" />
        </g>
      )

    case 'contact':
      return (
        <g>
          {/* Envelope body */}
          <rect x="10" y="18" width="44" height="30" rx="6" fill={c} />
          {/* Envelope flap */}
          <path d="M10 24l22 15 22-15" fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* Envelope flap highlight */}
          <path d="M10 18l22 15 22-15" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Bottom crease lines */}
          <path d="M10 46 24 33M54 46 40 33" fill="none" stroke="rgba(0,0,0,0.14)" strokeWidth="2" strokeLinecap="round" />
        </g>
      )

    case 'terminal':
      return (
        <g>
          {/* Prompt chevron */}
          <path
            d="M16 24l10 8-10 8"
            fill="none"
            stroke={c}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Cursor bar */}
          <rect x="30" y="38.5" width="18" height="3.5" rx="1.75" fill={c} />
          {/* Subtle screen glow */}
          <rect x="2" y="2" width="60" height="60" rx="13.5" fill="rgba(0,255,100,0.04)" />
        </g>
      )

    case 'finder':
      return (
        <g>
          {/* Face — two-tone split: left blue, right lighter */}
          <path d="M32 13c10.5 0 18.5 7.6 18.5 17.5S42.5 48 32 48 13.5 40.4 13.5 30.5 21.5 13 32 13Z" fill="#FFFFFF" />
          {/* Left half tint */}
          <path d="M13.5 30.5C13.5 20.6 21.5 13 32 13v35C21.5 48 13.5 40.4 13.5 30.5Z" fill="#D6EEFF" />
          {/* Left eye */}
          <circle cx="26" cy="29.5" r="3.2" fill="#0A5FD6" />
          <circle cx="25" cy="28.2" r="1.1" fill="rgba(255,255,255,0.55)" />
          {/* Right eye */}
          <circle cx="38" cy="29.5" r="3.2" fill="#0A5FD6" />
          <circle cx="37" cy="28.2" r="1.1" fill="rgba(255,255,255,0.55)" />
          {/* Smile */}
          <path
            d="M24 37.5c2.5 3.5 5.2 5 8 5s5.5-1.5 8-5"
            fill="none"
            stroke="#0A5FD6"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {/* Nose hint */}
          <path d="M30.5 33.5 32 35.5 33.5 33.5" fill="none" stroke="#0A5FD6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
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
          {/* White center circle with subtle shadow */}
          <circle cx="32" cy="32" r="7" fill="rgba(0,0,0,0.08)" />
          <circle cx="32" cy="32" r="6.2" fill="#FFFFFF" />
        </g>
      )
    }

    case 'notes': {
      return (
        <g>
          {/* Paper background — warm cream */}
          <rect x="8" y="8" width="48" height="48" rx="9" fill="#FFFDE7" />
          {/* Yellow header band */}
          <path d="M8 8h48a0 0 0 0 1 0 0v14H8V8Z" fill="#F5A623" />
          <path d="M8 8h48" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
          {/* Spiral binding holes */}
          <circle cx="20" cy="15" r="2.5" fill="rgba(0,0,0,0.22)" />
          <circle cx="32" cy="15" r="2.5" fill="rgba(0,0,0,0.22)" />
          <circle cx="44" cy="15" r="2.5" fill="rgba(0,0,0,0.22)" />
          {/* Left margin rule */}
          <rect x="20" y="22" width="1.5" height="30" fill="#E8C97A" />
          {/* Ruled lines */}
          <rect x="24" y="27" width="26" height="2.2" rx="1.1" fill="#D4C5A0" />
          <rect x="24" y="34" width="26" height="2.2" rx="1.1" fill="#D4C5A0" />
          <rect x="24" y="41" width="26" height="2.2" rx="1.1" fill="#D4C5A0" />
          <rect x="24" y="48" width="16" height="2.2" rx="1.1" fill="#D4C5A0" />
        </g>
      )
    }

    case 'calendar': {
      const now = new Date()
      const month = now.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
      const day = now.getDate()
      return (
        <g>
          {/* Calendar body */}
          <rect x="8" y="12" width="48" height="44" rx="8" fill="#FFFFFF" />
          {/* Red header */}
          <path d="M8 12h48v16H8V12Z" fill="#FF3B30" />
          <path d="M8 12h48a0 0 0 0 1 0 0v4H8v-4Z" fill="rgba(255,255,255,0.18)" />
          {/* Ring holes */}
          <rect x="20" y="8" width="4" height="10" rx="2" fill="#C0392B" />
          <rect x="40" y="8" width="4" height="10" rx="2" fill="#C0392B" />
          {/* Month label */}
          <text x="32" y="23" textAnchor="middle" fontSize="8" fontWeight="700" fill="#FFFFFF" fontFamily={SYSTEM_FONT} letterSpacing="0.5">{month}</text>
          {/* Day number */}
          <text x="32" y="50" textAnchor="middle" fontSize="26" fontWeight="300" fill="#1D1D1F" fontFamily={SYSTEM_FONT}>{day}</text>
          {/* Grid lines hint */}
          <line x1="8" y1="28" x2="56" y2="28" stroke="#E5E5EA" strokeWidth="1" />
        </g>
      )
    }

    case 'music':
      return (
        <g>
          {/* Music note */}
          <path d="M38 16v26a9 9 0 1 1-4-7.4V20.5l14-3.5v22a9 9 0 1 1-4-7.4V13L38 16Z" fill={c} />
          {/* Highlight on note head */}
          <circle cx="25" cy="42" r="3" fill="rgba(255,255,255,0.22)" />
          <circle cx="44" cy="38" r="3" fill="rgba(255,255,255,0.22)" />
        </g>
      )

    case 'mail':
      return (
        <g>
          {/* Envelope body */}
          <rect x="9" y="16" width="46" height="33" rx="7" fill={c} />
          {/* Top highlight strip */}
          <rect x="9" y="16" width="46" height="8" rx="7" fill="rgba(255,255,255,0.18)" />
          {/* Envelope V-fold */}
          <path d="M11 19l21 16 21-16" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Bottom crease */}
          <path d="M11 47 26 33M53 47 38 33" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="2" strokeLinecap="round" />
        </g>
      )

    case 'browser':
      return (
        <g>
          {/* Globe body */}
          <circle cx="32" cy="32" r="20" fill={c} />
          {/* Latitude lines */}
          <ellipse cx="32" cy="32" rx="10" ry="20" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.8" />
          {/* Equator */}
          <line x1="12" y1="32" x2="52" y2="32" stroke="rgba(255,255,255,0.45)" strokeWidth="1.8" />
          {/* Tropic lines */}
          <path d="M14 22h36M14 42h36" stroke="rgba(255,255,255,0.28)" strokeWidth="1.4" />
          {/* Outer ring highlight */}
          <circle cx="32" cy="32" r="20" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          {/* Top gloss */}
          <path d="M18 18a20 20 0 0 1 28 0" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      )

    case 'widgets':
      return (
        <g>
          {/* Top-left: blue */}
          <rect x="10" y="10" width="20" height="20" rx="6" fill="#64D2FF" />
          <rect x="10" y="10" width="20" height="8" rx="6" fill="rgba(255,255,255,0.28)" />
          {/* Top-right: yellow */}
          <rect x="34" y="10" width="20" height="20" rx="6" fill="#FFD60A" />
          <rect x="34" y="10" width="20" height="8" rx="6" fill="rgba(255,255,255,0.28)" />
          {/* Bottom-left: pink */}
          <rect x="10" y="34" width="20" height="20" rx="6" fill="#FF6482" />
          <rect x="10" y="34" width="20" height="8" rx="6" fill="rgba(255,255,255,0.22)" />
          {/* Bottom-right: green */}
          <rect x="34" y="34" width="20" height="20" rx="6" fill="#30D158" />
          <rect x="34" y="34" width="20" height="8" rx="6" fill="rgba(255,255,255,0.22)" />
        </g>
      )

    case 'launchpad':
      return (
        <g>
          {[
            ['#FF453A', 10, 10], ['#FF9F0A', 26, 10], ['#FFD60A', 42, 10],
            ['#30D158', 10, 26], ['#64D2FF', 26, 26], ['#0A84FF', 42, 26],
            ['#BF5AF2', 10, 42], ['#FF375F', 26, 42], ['#5E5CE6', 42, 42],
          ].map(([fill, x, y]) => (
            <rect
              key={`${x}-${y}`}
              x={x as number}
              y={y as number}
              width="12"
              height="12"
              rx="3.5"
              fill={fill as string}
            />
          ))}
        </g>
      )

    case 'spotlight':
      return (
        <g>
          <circle cx="28" cy="27" r="12" fill="none" stroke={c} strokeWidth="4.5" />
          <line x1="37" y1="36" x2="48" y2="47" stroke={c} strokeWidth="4.5" strokeLinecap="round" />
          {/* Inner lens glint */}
          <circle cx="24" cy="23" r="3.5" fill="rgba(255,255,255,0.22)" />
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

export default function AppIcon({ name, size = 48, className = '', glyphColor }: Props) {
  const uid = React.useMemo(
    () => `ic-${name}-${++gradSeq}-${Math.random().toString(36).slice(2, 7)}`,
    [name]
  )
  const clipId = `${uid}-clip`
  const gradId = `${uid}-grad`
  const glossId = `${uid}-gloss`
  const innerShadowId = `${uid}-inner`

  if (name === 'music') {
    return (
      <img
        src={APPLE_MUSIC_LOGO}
        alt=""
        width={size}
        height={size}
        className={className}
        draggable={false}
        style={{ display: 'block', objectFit: 'contain', borderRadius: '22%' }}
      />
    )
  }

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
        filter: `drop-shadow(0 1px 1px rgba(0,0,0,0.12)) drop-shadow(0 3px 6px rgba(0,0,0,0.22)) drop-shadow(0 8px 16px rgba(0,0,0,0.14))`,
      }}
    >
      <defs>
        {/* Squircle clip */}
        <clipPath id={clipId}>
          <path d={SQUIRCLE_PATH} />
        </clipPath>

        {/* Main plate gradient */}
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          {gradDef.stops.map((s) => (
            <stop key={s.offset} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>

        {/* Top-left diagonal gloss — Apple's light source comes from top-left */}
        <linearGradient id={glossId} x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%"   stopColor="#FFFFFF" stopOpacity={isDark ? 0.12 : isLight ? 0.75 : 0.32} />
          <stop offset="55%"  stopColor="#FFFFFF" stopOpacity={isDark ? 0.03 : isLight ? 0.12 : 0.06} />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Inner bottom vignette for depth */}
        <linearGradient id={innerShadowId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="50%"  stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.22)" />
        </linearGradient>
      </defs>

      {/* ── Plate ── */}
      <g clipPath={`url(#${clipId})`}>
        {/* Base gradient fill */}
        <rect x="0" y="0" width="64" height="64" fill={`url(#${gradId})`} />

        {/* Bottom vignette for depth */}
        <rect x="0" y="0" width="64" height="64" fill={`url(#${innerShadowId})`} />

        {/* Glyph */}
        <Glyph name={name} color={glyphCol} />

        {/* Diagonal gloss — top-left light source, covers top ~55% */}
        <rect x="0" y="0" width="64" height="36" fill={`url(#${glossId})`} />
      </g>

      {/* ── Rim — inner stroke so it sits inside the shape ── */}
      <path
        d={SQUIRCLE_PATH}
        fill="none"
        stroke={isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.18)'}
        strokeWidth="1"
      />
    </svg>
  )
}

export { GRAD_DEFS as PLATE_DEEP }
