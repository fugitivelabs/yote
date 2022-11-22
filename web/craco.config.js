const path = require('path');
// get the env
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// craco is used to customize create-react-app builds. We are only using it to serve development builds from the server.
module.exports = {
  // https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration-file
  webpack: {
    configure: (webpackConfig) => {
      // write to `dist` in development mode, `build` in production mode
      webpackConfig.output.path = path.resolve(__dirname, env === 'production' ? 'build' : 'dist');
      return webpackConfig;
    },
  },
  devServer: {
    // disable auto opening browser to localhost:3000 (we serve the app from localhost:3030)
    open: false,
    devMiddleware: {
      /**
       * `writeToDisk: true` will update the output folder (`dist` or 'build`) to be served by our server instead of using the built in react dev server
       * allowing us to modify the html before it's served (currently used to inject req.user, allowing logins to persist on dev the same way they do on prod)
       * https://stackoverflow.com/questions/65941637/making-webpack-and-cra-emit-files-in-watch-mode
       */
      writeToDisk: true
    }
  }
}