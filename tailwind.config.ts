import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  safelist: ['text-white', 'bg-kovaad-red', 'font-sans', 'font-helvetica'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'sans-serif'],
        twemoji: ['var(--font-twemoji_mozilla)', 'sans-serif'],
      },
      colors: {
        'kovaad-red': '#EF3D3D',
        // other custom colors...
      },
    },
  },
  plugins: [],
}
export default config