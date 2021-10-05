const Nth = require('tailwindcss-nth-child');
const plugin = new Nth('odd');
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brown: {
          DEFAULT: '#B16042',
          light: '#FEEFDF',
        },
      },
      padding: {
        '1/3': '33.3333%',
        '2/3': '66.6667%',
      },
    },
  },
  variants: {
    extend: { backgroundColor: ['nth-child'], borderWidth: ['first'] },
  },
  plugins: [require('@tailwindcss/line-clamp'), plugin.nthChild()],
};
