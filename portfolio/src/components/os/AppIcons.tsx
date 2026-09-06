import * as React from 'react'

/* ── macOS-style squircle app icons ────────────────────────────────────────
   Rendered inline as SVG: resolution-independent, crisp at 4K and beyond,
   theme-safe, no external assets to download or blur.
   Every icon shares one 64×64 grid, one squircle plate (rx 14 ≈ Apple's
   22.4% superellipse) and one highlight recipe, so the set stays uniform. */

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

/** [from, to] vertical gradient for the squircle plate. */
const PLATES: Record<IconName, [string, string]> = {
  about:      ['#8B5CF6', '#5B4BE0'],
  experience: ['#2DD4BF', '#0EA5E9'],
  projects:   ['#F5A623', '#F97316'],
  project:    ['#F5A623', '#F97316'],
  resume:     ['#F472B6', '#DB2777'],
  contact:    ['#34C759', '#059669'],
  terminal:   ['#2C2C2E', '#111114'],
  finder:     ['#19B0F5', '#0A63D6'],
  photos:     ['#FFFFFF', '#EDEDF0'],
  notes:      ['#FFFFFF', '#EDEDF0'],
  calendar:   ['#FFFFFF', '#EDEDF0'],
  widgets:    ['#5E5CE6', '#3634A3'],
  launchpad:  ['#F2F2F7', '#D8D8DE'],
  spotlight:  ['#8E8E93', '#48484A'],
  apple:      ['#2C2C2E', '#111114'],
}

/* Plate fill for glyph sub-shapes that need to “cut back to the plate”. */
const PLATE_DEEP: Partial<Record<IconName, string>> = {
  finder: '#0A63D6',
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
        <g fill={c}>
          <circle cx="32" cy="22.5" r="9.5" />
          <path d="M32 35.5c-9.4 0-17 5.6-17 12.5V52h34v-4c0-6.9-7.6-12.5-17-12.5Z" />
        </g>
      )

    case 'experience':
      return (
        <g fill={c}>
          <path d="M23 21v-3a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v3h5a3 3 0 0 1 3 3v7H15v-7a3 3 0 0 1 3-3h5Z" opacity="0.30" />
          <path d="M15 33h34v13a4 4 0 0 1-4 4H19a4 4 0 0 1-4-4V33Z" />
          <path d="M15 26h34v7H15z" opacity="0.55" />
        </g>
      )

    case 'projects':
    case 'project':
      return (
        <g fill={c}>
          <path d="M11 21a4 4 0 0 1 4-4h11.2a3 3 0 0 1 2.1.9l3.2 3.2a3 3 0 0 0 2.1.9H49a4 4 0 0 1 4 4v19a4 4 0 0 1-4 4H15a4 4 0 0 1-4-4V21Z" />
        </g>
      )

    case 'resume':
      return (
        <g fill={c}>
          <path d="M18 12h20l11 11v29a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4Z" opacity="0.95" />
          <path d="M38 12v11h11" opacity="0.45" />
          <g opacity="0.55">
            <rect x="22" y="32" width="20" height="2.6" rx="1.3" />
            <rect x="22" y="39" width="20" height="2.6" rx="1.3" />
            <rect x="22" y="46" width="13" height="2.6" rx="1.3" />
          </g>
        </g>
      )

    case 'contact':
      return (
        <g>
          <rect x="11" y="19" width="42" height="26" rx="5" fill={c} />
          <path
            d="M14 24.5 32 36.8 50 24.5"
            fill="none"
            stroke="#059669"
            strokeWidth="3.2"
            strokeLinecap="round"
            opacity="0.9"
          />
        </g>
      )

    case 'terminal':
      return (
        <g fill={c}>
          <path
            d="M18 24l8 8-8 8"
            fill="none"
            stroke={c}
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="30" y="39" width="16" height="3.2" rx="1.6" />
        </g>
      )

    case 'finder':
      return (
        <g>
          {/* Finder face */}
          <path
            d="M32 13.5c10.8 0 19 7.8 19 17.6S42.8 48.7 32 48.7 13 40.9 13 31.1 21.2 13.5 32 13.5Z"
            fill="#FFFFFF"
          />
          {/* Eyes */}
          <circle cx="26.4" cy="30" r="2.8" fill="#0A63D6" />
          <circle cx="37.6" cy="30" r="2.8" fill="#0A63D6" />
          {/* Smile — the two-sided Finder mouth */}
          <path
            d="M24.5 37.5c2.3 3.2 5 4.6 7.5 4.6s5.2-1.4 7.5-4.6"
            fill="none"
            stroke="#0A63D6"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </g>
      )

    case 'photos': {
      /* Pinwheel of eight petals around a white core */
      return (
        <g>
          {PHOTOS_PETALS.map((petal, i) => (
            <path
              key={petal}
              d="M32 31.4 C 29.6 24.4, 29.4 17.2, 32 11.5 C 34.6 17.2, 34.4 24.4, 32 31.4 Z"
              fill={petal}
              transform={`rotate(${i * 45} 32 32)`}
            />
          ))}
          <circle cx="32" cy="32" r="6.4" fill="#FFFFFF" />
        </g>
      )
    }

    case 'notes': {
      return (
        <g>
          {/* Yellow header band */}
          <path d="M8 15a9 9 0 0 1 9-9h30a9 9 0 0 1 9 9v6H8v-6Z" fill="#F5A623" />
          {/* Ruled lines */}
          <g fill="#C7C7CC">
            <rect x="15" y="29" width="34" height="3.2" rx="1.6" />
            <rect x="15" y="38" width="34" height="3.2" rx="1.6" />
            <rect x="15" y="47" width="22" height="3.2" rx="1.6" />
          </g>
          {/* Left margin rule */}
          <rect x="21.5" y="21" width="1.6" height="34" fill="#E5B45C" />
        </g>
      )
    }

    case 'calendar': {
      /* Live date — the icon always shows today, like the real thing */
      const now = new Date()
      const month = now
        .toLocaleDateString('en-US', { month: 'short' })
        .toUpperCase()
      const day = now.getDate()
      return (
        <g>
          <path d="M8 16a8 8 0 0 1 8-8h32a8 8 0 0 1 8 8v4H8v-4Z" fill="#FF453A" />
          <text
            x="32"
            y="15.8"
            textAnchor="middle"
            fontSize="8.4"
            fontWeight="700"
            fill="#FFFFFF"
            fontFamily={SYSTEM_FONT}
          >
            {month}
          </text>
          <text
            x="32"
            y="49"
            textAnchor="middle"
            fontSize="26"
            fontWeight="500"
            fill="#1D1D1F"
            fontFamily={SYSTEM_FONT}
          >
            {day}
          </text>
        </g>
      )
    }

    case 'widgets':
      return (
        <g>
          <rect x="11" y="11" width="19" height="19" rx="5.5" fill="#64D2FF" />
          <rect x="34" y="11" width="19" height="19" rx="5.5" fill="#FFD60A" opacity="0.95" />
          <rect x="11" y="34" width="19" height="19" rx="5.5" fill="#FF6482" opacity="0.95" />
          <rect x="34" y="34" width="19" height="19" rx="5.5" fill="#30D158" opacity="0.95" />
        </g>
      )

    case 'launchpad':
      return (
        <g>
          {[
            ['#FF453A', 12, 12], ['#FF9F0A', 26, 12], ['#FFD60A', 40, 12],
            ['#30D158', 12, 26], ['#64D2FF', 26, 26], ['#0A84FF', 40, 26],
            ['#BF5AF2', 12, 40], ['#FF375F', 26, 40], ['#5E5CE6', 40, 40],
          ].map(([fill, x, y]) => (
            <circle key={`${x}-${y}`} cx={(x as number) + 6} cy={(y as number) + 6} r="6.4" fill={fill as string} />
          ))}
        </g>
      )

    case 'spotlight':
      return (
        <g fill="none" stroke={c} strokeWidth="4.2" strokeLinecap="round">
          <circle cx="28" cy="28" r="11" />
          <path d="M36.5 36.5 46 46" />
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

export default function AppIcon({ name, size = 48, className = '', glyphColor }: Props) {
  const [from, to] = PLATES[name]
  const gid = React.useMemo(
    () => `ic-${name}-${++gradSeq}-${Math.random().toString(36).slice(2, 7)}`,
    [name]
  )
  const dark = name === 'terminal' || name === 'apple'
  const lightPlate = name === 'photos' || name === 'notes' || name === 'calendar' || name === 'launchpad'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
      shapeRendering="geometricPrecision"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      {/* Squircle plate — rx 14 on a 64 grid ≈ Apple’s 22.4% superellipse */}
      <rect x="2" y="2" width="60" height="60" rx="14" fill={`url(#${gid})`} />
      {/* Top sheen — lighter on light plates so the shape stays visible */}
      <rect
        x="2"
        y="2"
        width="60"
        height="30"
        rx="14"
        fill="#FFFFFF"
        opacity={dark ? 0.06 : lightPlate ? 0.55 : 0.14}
      />
      {/* Hairline border — dark on light plates, light on dark */}
      <rect
        x="2.75"
        y="2.75"
        width="58.5"
        height="58.5"
        rx="13.4"
        fill="none"
        stroke={lightPlate ? '#3C3C43' : '#FFFFFF'}
        strokeOpacity={lightPlate ? 0.14 : 0.18}
        strokeWidth="1.5"
      />
      <Glyph name={name} color={glyphColor ?? (lightPlate ? '#1D1D1F' : '#FFFFFF')} />
    </svg>
  )
}

export { PLATE_DEEP }
