/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // difficulty ramp used across the level ladder
        tier: {
          gray: '#9ca3af',
          green: '#22c55e',
          cyan: '#06b6d4',
          blue: '#3b82f6',
          yellow: '#eab308',
          orange: '#f97316',
          red: '#ef4444',
        },
      },
    },
  },
  plugins: [],
}
