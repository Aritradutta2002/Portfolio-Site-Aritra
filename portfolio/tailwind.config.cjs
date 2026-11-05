/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        /* Theme-adaptive via CSS vars (:root = light, .dark = dark).
           Opacity modifiers work through the <alpha-value> pattern. */
        background: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        /* Aurora accents — vivid in both themes */
        aurora: {
          DEFAULT: '#8B5CF6', // violet — plain `aurora` for opacity modifiers
          1: '#8B5CF6', // violet
          2: '#22D3EE', // cyan
          3: '#F472B6', // pink
        },
        aurorastrong: 'var(--aurora-text)', // text-safe accent per theme
        /* Datasheet palette — scoped tokens defined in styles/datasheet.css.
           Only `.zro-root` renders these, so legacy routes are unaffected. */
        zro: {
          canvas: 'rgb(var(--zro-canvas) / <alpha-value>)',
          surface: 'rgb(var(--zro-surface) / <alpha-value>)',
          'surface-2': 'rgb(var(--zro-surface-2) / <alpha-value>)',
          ink: 'rgb(var(--zro-ink) / <alpha-value>)',
          muted: 'rgb(var(--zro-muted) / <alpha-value>)',
          faint: 'rgb(var(--zro-faint) / <alpha-value>)',
          accent: 'rgb(var(--zro-accent) / <alpha-value>)',
          line: 'var(--zro-hairline)',
          'line-strong': 'var(--zro-hairline-strong)',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'var(--font-fira-code)', 'monospace'],
        display: ['var(--font-display)', 'var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        /* Zro datasheet — scoped so the legacy sites keep their own typefaces. */
        'ds-sans': ['var(--font-ds-sans)', 'var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        'ds-mono': ['var(--font-ds-mono)', 'var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        'zro-tight': '-0.03em',
        'zro-tighter': '-0.045em',
        'zro-label': '0.14em',
        'zro-eyebrow': '0.18em',
      },
      borderRadius: {
        'token-sm': 'var(--radius-sm, 6px)',
        'token-md': 'var(--radius-md, 10px)',
        'token-lg': 'var(--radius-lg, 16px)',
        'token-full': 'var(--radius-full, 9999px)',
      },
      transitionTimingFunction: {
        'ease-out-token': 'var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1))',
        'ease-inout-token': 'var(--ease-in-out, cubic-bezier(0.65, 0, 0.35, 1))',
        'zro-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'zro-inout': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        'micro': 'var(--dur-micro, 150ms)',
        'ui': 'var(--dur-ui, 280ms)',
        'reveal': 'var(--dur-reveal, 700ms)',
        zro: '240ms',
      },
      maxWidth: {
        'content': 'var(--maxw, 1240px)',
      },
      /* Modular type scale — 1.25 ratio */
      fontSize: {
        xs:   ['0.8rem',   { lineHeight: '1.6' }],
        sm:   ['1rem',     { lineHeight: '1.7' }],
        base: ['1.25rem',  { lineHeight: '1.7' }],
        lg:   ['1.563rem', { lineHeight: '1.6' }],
        xl:   ['1.953rem', { lineHeight: '1.4' }],
        '2xl': ['2.441rem', { lineHeight: '1.25' }],
        '3xl': ['3.052rem', { lineHeight: '1.15' }],
        '4xl': ['3.815rem', { lineHeight: '1.1' }],
        '5xl': ['4.768rem', { lineHeight: '1.05' }],
        /* Zro datasheet scale — explicit px so the legacy 1.25 ratio
           (text-sm = 1rem, text-5xl = 4.77rem) never leaks in. */
        'ds-2xs': ['0.625rem', { lineHeight: '1.5' }],
        'ds-xs': ['0.6875rem', { lineHeight: '1.6' }],
        'ds-sm': ['0.75rem', { lineHeight: '1.6' }],
        'ds-base': ['0.8125rem', { lineHeight: '1.7' }],
        'ds-md': ['0.875rem', { lineHeight: '1.7' }],
        'ds-lg': ['1rem', { lineHeight: '1.7' }],
        'ds-xl': ['1.125rem', { lineHeight: '1.5' }],
        'ds-h2': ['clamp(1.75rem, 3.5vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.035em' }],
        'ds-h1': ['clamp(2.5rem, 7vw, 4.75rem)', { lineHeight: '1.04', letterSpacing: '-0.035em' }],
        'ds-cta': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.035em' }],
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(13, 16, 40, 0.12)',
        'aurora-glow': '0 0 0 1px rgba(139, 92, 246, 0.4), 0 0 28px rgba(139, 92, 246, 0.25)',
        'aurora-glow-cyan': '0 0 0 1px rgba(34, 211, 238, 0.4), 0 0 28px rgba(34, 211, 238, 0.25)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
