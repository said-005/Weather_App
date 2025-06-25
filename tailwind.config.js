/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // مهم مع Vite
    "./src/**/*.{js,jsx,ts,tsx}", // يدعم جميع الملفات داخل src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
