/** @type {import('tailwindcss').Config} */

const { height } = require('@mui/system');

// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        '48/100': '48%'
      },
      height: {
        420: '420px'
      }
    }
  },
  plugins: []
};
