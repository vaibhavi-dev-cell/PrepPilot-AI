/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#020617',
        surface: '#0f172a',
        primary: '#38bdf8',
      },
    },
  },
  plugins: [],
}
