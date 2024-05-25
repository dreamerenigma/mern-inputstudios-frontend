/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-thick': '0 10px 15px rgba(0, 0, 0, 0.25)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.2)',
      },
      screens: {
        'lg': '1400px',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar'),
  ],
};
