// sets up the .jsx compiler to read .jsx from ./client/ 
// and output regular .js to /public/react/
var path = require('path');
var webpack = require('webpack');

const config = {
  devtool: 'cheap-module-source-map'
  , entry: './client/app.js.jsx'
  , output: {
    path: path.join(__dirname, 'public/js')
    , filename: 'react-bundle.js'
  }
  , module: {
    loaders: [
      {
        test: /\.jsx?$/
        , exclude: /(node_modules|bower_components)/
        , loader: 'babel-loader'
        , query: {
          presets: ['es2015','react', 'stage-0']
        }
      }
    ]
  }
  , plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
    , new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
        , screw_ie8: true
      }
      , comments: false
      , sourceMap: false
    })
  ]
}

module.exports = config;