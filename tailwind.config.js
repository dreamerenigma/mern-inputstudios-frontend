import flowbitePlugin from 'flowbite/plugin';
import scrollbarPlugin from 'tailwind-scrollbar';

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
         'xl': '1080px',
         },
         borderRadius: {
         'dropdown-bottom-only': '0 0 0.2rem 0.2rem',
         'bottom-only': '0 0 0.5rem 0.5rem',
         'top-only': '0.5rem 0.5rem 0 0',
         },
         width: {
         '1/2': '50%',
         '2/3': '66.67%',
         '3/4': '75%',
         '4/5': '80%',
         'full': '100%',
         },
      },
   },
   plugins: [
      flowbitePlugin,
      scrollbarPlugin,
   ],
};
