/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        navy: {
          DEFAULT: '#172554',
          900: '#0F172A',
          800: '#172554',
        },
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#EFF6FF',
        },
        slate: {
          secondary: '#334155',
          muted: '#64748B',
          border: '#E2E8F0',
        },
        cat: {
          tech: {
            bg: '#EFF6FF',
            text: '#1D4ED8',
            border: '#BFDBFE',
            pill: '#DBEAFE',
          },
          cultural: {
            bg: '#FAF5FF',
            text: '#7E22CE',
            border: '#E9D5FF',
            pill: '#F3E8FF',
          },
          sports: {
            bg: '#F0FDF4',
            text: '#15803D',
            border: '#BBF7D0',
            pill: '#DCFCE7',
          },
          academic: {
            bg: '#FFFBEB',
            text: '#B45309',
            border: '#FDE68A',
            pill: '#FEF3C7',
          },
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'modal': '20px',
        'pill': '9999px',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'card': '0 2px 8px -2px rgba(15, 23, 42, 0.06), 0 1px 4px -1px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
      }
    },
  },
  plugins: [],
}
