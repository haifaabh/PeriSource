/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        rammetto: ['Rammetto One', 'sans-serif'], 
        roboto: ['Roboto', 'sans-serif'], 
      },
    },
  },
  plugins: [],
};
