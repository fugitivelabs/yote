const colors = require('tailwindcss/colors')
// tailwind.config.js
const { plugin } = require('twrnc');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.coolGray,
      blue: colors.blue,
      red: colors.rose,
      pink: colors.fuchsia,
      white: colors.white
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        iosStatusBarHeight: {
          minHeight: 35,
        },
        androidStatusBarHeight: {
          minHeight: 20,
        },
        iosHeaderHeight: {
          minHeight: 55,
        },
        androidHeaderHeight: {
          minHeight: 40,
        },
        tintWhite: {
          tintColor: `#fff`,
        },
        tintAccent: {
          tintColor: `#08bdec`,
        },
      });
    }),
  ],
}
