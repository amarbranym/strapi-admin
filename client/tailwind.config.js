/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {}
  },
  safelist: [
    {
      pattern: /^col-span-(1[0-2]|[1-9])$/,
    },
    {
      pattern: /^row-span-(1[0-2]|[1-9])$/,
    }
  ],
  plugins: []
};
