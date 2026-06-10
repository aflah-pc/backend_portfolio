/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode manually using a class
  theme: {
    extend: {
      colors: {
        white: 'var(--text-white)',
        gray: {
          100: 'var(--text-gray-100)',
          200: 'var(--text-gray-200)',
          300: 'var(--text-gray-300)',
          400: 'var(--text-gray-400)',
          500: 'var(--text-gray-500)',
        },
        dark: {
          bg: 'var(--bg-color)',
          card: 'var(--card-color)',
          border: 'var(--border-color)',
          navBg: 'var(--nav-bg-color)'
        },
        brand: {
          blue: '#3b82f6',
          cyan: '#06b6d4',
          purple: '#8b5cf6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-gradient': 'linear-gradient(to right, #3b82f6, #06b6d4, #8b5cf6)',
      }
    },
  },
  plugins: [],
}
