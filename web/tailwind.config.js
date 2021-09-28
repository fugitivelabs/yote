module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  corePlugins: {
    preflight: false, // NOTE: remove when ready to implement styles across browser
  },
  theme: {
    extend: {
      colors: {
        yote: {
          50: '#FBA640',
          100: '#FB9741',
          200: '#FA8A41',
          300: '#FB7C40',
          400: '#FA703F',
          500: '#FB6440',
          600: '#FB4840',
          700: '#ED393B',
          800: '#DF2B39',
          900: '#D41136',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
