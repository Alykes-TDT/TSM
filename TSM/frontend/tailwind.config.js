/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream:        '#FAFAF7',
        'cream-dark': '#F2F2EE',
        ink:          '#1A1A18',
        'ink-light':  '#3A3A36',
        muted:        '#8A8A82',
        border:       '#E2E2DC',
        gold:         '#C9A84C',
        'gold-light': '#E8C96A',
        'gold-dark':  '#A8893A',
        'dark-bg':    '#0F0F0D',
        'dark-surface': '#1A1A18',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease both',
        'fade-in': 'fadeIn 0.6s ease both',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glowPulse: {
          '0%,100%': { opacity: '0.5' },
          '50%':     { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
