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
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'var(--font-fira-code)', 'monospace'],
        display: ['var(--font-display)', 'var(--font-geist-sans)', 'system-ui', 'sans-serif'],
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
