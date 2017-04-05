/**
 * sets up the .jsx compiler to read .jsx from ./client/
 * and output regular .js to /public/react/
 */

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let path = require('path');
let webpack = require('webpack');

const config = {
  devtool: 'cheap-module-source-map'
  , entry: ['./app.js.jsx']
  , output: {
    path: path.join(__dirname, '../server/public/js')
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
      , {
        test: /\.scss$/
        , loader: ExtractTextPlugin.extract({
          fallback: 'style-loader', loader: "css-loader!sass-loader",
        })
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
        , screw_ie8: true // yeah, screw IE8
      }
      , comments: false
      , sourceMap: false
    })
    , new ExtractTextPlugin({
      filename: '../css/yote.css'
    })
    , new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: {removeAll: true } }
    })
  ]
}

module.exports = config;
