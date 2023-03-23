/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090A',
      },
      fontFamily: {
        regular: 'Inter_400Regular',
        semiBold: 'Inter_600SemiBold',
        bold: 'Inter_700Bold',
        extraBold: 'Inter_800ExtraBold',
      },
    },
  },
  plugins: [],
}
