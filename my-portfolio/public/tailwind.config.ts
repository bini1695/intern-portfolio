import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // 👈 ADD THIS LINE
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0a',
          card: '#13131a',
          border: '#262630',
        },
        light: {
          bg: '#f8f9fa',
          card: '#ffffff',
          border: '#e5e7eb',
        },
        brand: {
          purple: '#6d4aff',
          light: '#8b6dff',
        },
        text: {
          main: '#ffffff',
          muted: '#9ca3af',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
export default config