/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    screens: {
      'sm': { max: '424px' },
      'desktop': { max: '1240px' },
      'desktop-min': { min: '1239px' },
    },
    fontFamily: {
      'poppins': "'PoppinsRegular', 'Roboto', 'sans-serif'",
    }

  }
}
