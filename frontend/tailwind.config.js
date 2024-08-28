/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path based on your project structure
  ],
  theme: {
    extend: {
      colors: {
        'dark-navy-blue': '#001F3F',
        'light-navy-blue': '#003366',
        'darker-navy-blue': '#000D1A',
      },
    },
  },
  plugins: [],
}
