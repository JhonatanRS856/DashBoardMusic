/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'text-color': '#aaaaaa',
        'borde-white' : 'rgb(245,245,245,.6)',
        'borde-img' : '#6d5e91'
      } 
    },
  },
  plugins: [],
}

