/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'appear-from-down': 'appear 0.1s ease-in-out',
        'disappear-to-down': 'disappear 0.1s ease-in-out',
      },
      keyframes: {
        appear: {
          '0%' : { bottom: '0', scale : '0.7', opacity : '40' },
          '50%': { bottom: '8px' , scale : '0.85', opacity : '70'},
          '100%' : {bottom : '16px', scale : '1', opacity : '100'}
        },
        disappear: {
          '0%' : { bottom: '16px', scale : '1', opacity : '100'} ,
          '50%': { bottom: '8px' , scale : '0.85', opacity : '70'},
          '100%' : {bottom : '0', scale : '0.7', opacity : '40'}
        },

      }
    },
  },
  plugins: [],
}

