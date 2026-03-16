/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f4f7f1',
          100: '#e6eddf',
          200: '#ccdcc0',
          300: '#a8c492',
          400: '#9CAF88',
          500: '#7a9464',
          600: '#607850',
          700: '#4d6040',
          800: '#3f4e35',
          900: '#35402d',
        },
        pastel: {
          50: '#f0f6fd',
          100: '#ddeaf9',
          200: '#c3d8f4',
          300: '#A8C7E7',
          400: '#7aadd8',
          500: '#5993c9',
          600: '#4578b8',
          700: '#3a63a0',
          800: '#335284',
          900: '#2e4569',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(156, 175, 136, 0.15)',
        'card': '0 4px 20px rgba(51, 65, 85, 0.08)',
        'card-hover': '0 8px 30px rgba(51, 65, 85, 0.15)',
        'glow-sage': '0 0 20px rgba(156, 175, 136, 0.3)',
        'glow-pastel': '0 0 20px rgba(168, 199, 231, 0.4)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
