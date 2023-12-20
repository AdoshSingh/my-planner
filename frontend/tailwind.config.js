/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        cusDarkOne: '#0B0C10',
        cusDarkTwo: '#1F2833',
        cusText: '#C5C6C7',
        cusSecOne: '#66FCF1',
        cusSecTwo: '#45A29E', 
      },
      fontFamily:{
        comfortaa: ['Comfortaa', 'sans-serif'],
        passionOne: ['Passion One', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      backgroundImage: {
        cusImage: 'url(./src/assets/background.jpg)',
      }
    },
  },
  plugins: [],
}

