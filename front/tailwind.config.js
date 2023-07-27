/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
  theme: {
    screens: {
      'sm': { max: '424px' },
      'desktop': { max: '1240px' },
      'desktop-min': { min: '1239px' },
      'tablet-min': { min: '744px' },
      'tablet-max': { max: '744px' },
      'screen-min-max': { 'min': '320px', 'max': '1240px' },
      'tablet-min-max': { 'min': '744px', 'max': '1240px' },
      'phone-min-max': { 'min': '375px', 'max': '744px' },
    },
    fontFamily: {
      'poppins': "'PoppinsRegular', 'Roboto', 'sans-serif'",
    },
    extend: {
      keyframes: {
        shakecus: {
          '10%, 90%': { transform: 'translate3d(-1px, -2px, 0)' },
          '20%, 80% ': { transform: 'translate3d(2px, 2px, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 4px, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, -4px, 0)' },
        }
      },
      animation: {
        shakecus: 'shakecus 1s ease-in-out infinite',
      }
    },

  }
}
