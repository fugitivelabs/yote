const colors = require('tailwindcss/colors')
// tailwind.config.js
const { plugin } = require('twrnc');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.gray,
      blue: colors.blue,
      red: colors.rose,
      green: colors.green,
      pink: colors.fuchsia,
      white: colors.white
    },
    fontFamily: {
      
    }
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
        input: {
          minHeight: 40
          , color: '#1b2330'
          , fontFamily: 'AvenirNextCondensed-DemiBold'
          , fontSize: 18
          , fontWeight: 'normal'
          , padding: 4
          , flex: 1
          , backgroundColor: '#fff'
        }
      });
    }),
  ],
}
