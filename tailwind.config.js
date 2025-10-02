/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#fff8f3',
          100: '#ffede0',
          200: '#ffd9bd',
          300: '#ffb886',
          400: '#ff9357',
          500: '#ff6b35',
          600: '#f04f1b',
          700: '#c73d14',
          800: '#9e3318',
          900: '#7f2d16',
        },
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.03)',
        'sm': '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        'DEFAULT': '0 2px 4px -1px rgb(0 0 0 / 0.06), 0 4px 6px -1px rgb(0 0 0 / 0.08)',
        'md': '0 4px 6px -2px rgb(0 0 0 / 0.05), 0 8px 12px -2px rgb(0 0 0 / 0.08)',
        'lg': '0 8px 16px -4px rgb(0 0 0 / 0.08), 0 12px 24px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 16px 32px -8px rgb(0 0 0 / 0.1), 0 20px 40px -8px rgb(0 0 0 / 0.12)',
        '2xl': '0 24px 48px -12px rgb(0 0 0 / 0.18)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.6' },
        },
      },
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};