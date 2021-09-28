module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  corePlugins: {
    preflight: false, // NOTE: remove when ready to implement styles across browser
  },
  theme: {
    extend: {
      colors: {
        orange: {
          500: '#FB4840'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
