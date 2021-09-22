// https://tailwindcss.com/docs/guides/create-react-app
// craco is used to customize create-react-app builds.
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ]
    }
  }
  // https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration-file
  , devServer: {
    /**
     * `writeToDisk: true` will create a `dist` folder to be served by our server instead of using the built in react dev server
     * allowing us to modify the html before it's served (currently used to inject req.user)
     * https://stackoverflow.com/questions/65941637/making-webpack-and-cra-emit-files-in-watch-mode
     */
    writeToDisk: true
    // disable auto opening browser to localhost:3000 (we serve the app from localhost:3030)
    , open: false
  }
}