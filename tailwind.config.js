/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mobile': {'min': '0px', 'max': '425px'},
      'sm-width': {'max':'768px'},
      'sm-height': {'raw': '(max-height: 844px)'},
    },
    extend: {
      colors: {
        'primary-dark': '#242423',
        'secondary-dark': '#333533',
        'primary-light': '#E8EDDF',
        'secondary-light': '#CFDBD5',
        'extra-light': '#F5CB5C'
      },
      gridTemplateColumns: {
        'fluid': "repeat(auto-fit, minmax(20rem, 1fr))",
      },
      boxShadow: {
        'simple-shadow': 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
      },
    },
  },
  plugins: [],
}
