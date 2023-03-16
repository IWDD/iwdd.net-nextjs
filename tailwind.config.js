/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', '!./node_modules'],
  theme: {
    colors: {
      iwdd: '#c70d02',
    },
    extend: {
      fontFamily: {
        shipporiMincho: ['var(--font-shipporiMincho)'],
      },
    },
  },
  plugins: [],
}
