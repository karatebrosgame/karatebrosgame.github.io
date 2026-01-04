/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-bangers)', 'cursive'],
        pixel: ['var(--font-press-start-2p)', 'cursive'],
      },
      colors: {
        brand: {
          red: '#DC2626',
          dark: '#000000',
          light: '#F3F4F6'
        }
      }
    },
  },
  plugins: [],
}

