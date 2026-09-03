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
        acid: '#BEF264', // Signature fills — vivid lime in both themes
        acidstrong: 'rgb(var(--acidtext) / <alpha-value>)', // Text-safe accent per theme
        'glass-white': 'rgba(250, 250, 250, 0.05)',
        'glass-black': 'rgba(0, 0, 0, 0.4)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'var(--font-fira-code)', 'monospace'],
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
        'glass': '0 4px 30px rgba(0, 0, 0, 0.5)',
        'neon-purple': '0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)',
        'neon-cyan': '0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3)',
        'acid-glow': '0 0 0 1px rgba(190, 242, 100, 0.4), 0 0 28px rgba(190, 242, 100, 0.25)',
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
