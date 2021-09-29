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
        },
        green: {
          50: '#E7FFF2',
          100: '#BEFFDD',
          200: '#90FFC5',
          300: '#62FFAD',
          400: '#11FF83',
          500: '#0DF07A',
          600: '#0AD46B',
          700: '#07A452',
          800: '#057339',
          900: '#005127',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
