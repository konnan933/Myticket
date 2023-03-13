/** @type {import('tailwindcss').Config} */

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
      },
      borderColor: {
        'bc-yellow-theme': '#FBC95C',
        'bc-gray-theme': '#262626'
      }
    }
  },
  plugins: []
};
