import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Catena brand colors
        'catena-turquoise': '#17D9D9',
        'catena-teal': '#1ED4D4',
        'catena-navy': '#0F1A2E',
        'catena-dark': '#1A2847',
        'catena-text-primary': '#FFFFFF',
        'catena-text-secondary': '#B0B5C0',
        'catena-text-tertiary': '#7A7F8F',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
      backgroundImage: {
        'gradient-navy': 'linear-gradient(135deg, #0F1A2E 0%, #1A2847 100%)',
        'gradient-teal': 'linear-gradient(135deg, #17D9D9 0%, #1ED4D4 100%)',
      },
    },
  },
  plugins: [],
}

export default config
