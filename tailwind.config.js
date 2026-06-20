/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundPrimary: '#050505',
        backgroundSecondary: '#0D0D0D',
        textPrimary: '#FFFFFF',
        accentSilver: '#C0C0C0',
        borderLight: 'rgba(255,255,255,0.08)',
        // Retain existing reds if needed for accents
        primary: {
          50: '#ffe5e5',
          100: '#ffbaba',
          200: '#ff8787',
          300: '#ff5c5c',
          400: '#ff2a2a',
          500: '#ef4444',
          600: '#d32f2f',
          700: '#b71c1c',
          800: '#9a1b1b',
          900: '#7f1d1d',
        },
        metallic: {
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#d4d4d4',
          300: '#a3a3a3',
          400: '#737373',
          500: '#525252',
          600: '#404040',
          700: '#262626',
          800: '#171717',
          900: '#0a0a0a',
        },
        dark: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#4b5563',
          600: '#374151',
          700: '#1f2937',
          800: '#0a0a0a',
          900: '#050505',
          950: '#000000',
        },
      },
      fontFamily: {
        sans: ['Bebas Neue', 'Anton', 'Oswald', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}