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
        background: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        gold: {
          DEFAULT: 'var(--gold)',
          soft: 'var(--gold-soft)',
          ink: 'var(--gold-ink)',
          deep: 'var(--gold-deep)',
        },
        emeraldx: '#34D399',
        rosex: '#FB7185',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        serifd: ['var(--font-serifd)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 20px 60px -20px rgba(0,0,0,0.5)',
        card: '0 12px 40px -12px rgba(0,0,0,0.45)',
        'gold-glow': '0 0 0 1px rgba(211,171,99,0.45), 0 8px 40px rgba(211,171,99,0.28)',
        'gold-soft': '0 8px 30px -8px rgba(211,171,99,0.35)',
      },
      animation: {
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2.2s ease-in-out infinite',
        'marquee': 'marquee 32s linear infinite',
        'spin-slow': 'spin 14s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.55', transform: 'scale(0.82)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
