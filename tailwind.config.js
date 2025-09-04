/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: '#f8fafc',
        ink: '#0f172a',
        brand: '#3b82f6',
        subtle: '#e2e8f0',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(2, 6, 23, 0.08)',
      },
    },
  },
  plugins: [],
}
