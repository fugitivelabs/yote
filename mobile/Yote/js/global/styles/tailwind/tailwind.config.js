const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.coolGray,
      blue: colors.blue,
      red: colors.rose,
      pink: colors.fuchsia,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
