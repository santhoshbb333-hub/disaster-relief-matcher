/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        canvas: '#F8FAFC',
        surface: '#FFFFFF',
        border: '#E5E7EB',
        primary: {
          DEFAULT: '#2563EB', // Professional Blue
          hover: '#1D4ED8',
          light: '#EFF6FF',
        },
        text: {
          main: '#111827',
          muted: '#6B7280',
        },
        status: {
          critical: '#DC2626',
          high: '#EA580C',
          medium: '#EAB308',
          low: '#16A34A',
          info: '#2563EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
