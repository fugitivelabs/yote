// https://tailwindcss.com/docs/guides/create-react-app
// craco is used to customize create-react-app builds.
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}