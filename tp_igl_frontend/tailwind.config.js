/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        rammetto: ['Rammetto One', 'sans-serif'], 
        roboto: ['Roboto', 'sans-serif'], 
        'prosto-one': ['Prosto One', 'cursive'],
      },
      colors: {
        'bgblue': '#E4F1FF',
        'Mono-White': 'var(--Mono-White, #FFF)',
        'Primary-Default': 'var(--Primary-Default, #0979D0)',
        'custom': 'rgba(228, 241, 255, 0.40)',
        'Neutral-D_Grey': '#4D4D4D',
        'Primary': 'var(--Primary, #000)',
        'Text-Active': 'var(--Text-Active, #1D283D)',
      },
    },
  },
  plugins: [],
};
