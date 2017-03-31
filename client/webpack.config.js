/**
 * sets up the .jsx compiler to read .jsx from ./client/
 * and output regular .js to /public/react/
 */

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let path = require('path');
let webpack = require('webpack');

const config = {
  devtool: 'cheap-source-map'
  , entry: './app.js.jsx'
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
    new ExtractTextPlugin({
      filename: '../css/yote.css'
    })
  ]
}

module.exports = config;
