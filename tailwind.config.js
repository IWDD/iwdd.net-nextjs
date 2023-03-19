/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', '!./node_modules'],
  theme: {
    extend: {
      colors: {
        iwdd: '#c70d02',
      },
      fontFamily: {
        shipporiMincho: ['var(--font-shipporiMincho)'],
      },
    },
  },
  plugins: [],
}
