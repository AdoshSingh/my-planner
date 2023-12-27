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
        cusSecThree: '#7FFEF8', 
      },
      fontFamily:{
        comfortaa: ['Comfortaa', 'sans-serif'],
        passionOne: ['Passion One', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      backgroundImage: {
        cusImage: 'url(./src/assets/background.jpg)',
        cusWallpaper1: 'url(./src/assets/wallpaper-1.jpg)',
        cusWallpaper2: 'url(./src/assets/wallpaper-2.jpg)',
        cusWallpaper3: 'url(./src/assets/wallpaper-3.jpg)',
        cusWallpaper4: 'url(./src/assets/wallpaper-4.jpg)',
      }
    },
  },
  plugins: [],
}

