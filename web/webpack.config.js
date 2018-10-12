/**
 * sets up the .jsx compiler to read .jsx from ./client/
 * and output regular .js to /public/react/
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const context = path.resolve(__dirname, 'server/public/js');
const path = require('path');
const webpack = require('webpack');

const config = {
  context: path.resolve(__dirname, './')
  , devtool: 'cheap-source-map'
  , entry: './app.js.jsx'
  , output: {
    path: path.join(__dirname, '../server/static/js')
    , filename: 'react-bundle.js'
  }
  , module: {
    loaders: [
      {
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader'
          , loader: "css-loader!sass-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]",
        })
        , test: /\.scss$/
      }
      , {
        include: path.resolve(__dirname, './'),
        loaders: [
          'style-loader',
          'css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ],
        test: /\.css$/
      }
      , {
        exclude: /(node_modules|bower_components)/
        , loader: 'babel-loader'
        , query: {
          plugins: [
            [ 'react-css-modules', {
              context: path.resolve(__dirname, './')
              , filetypes: {
                ".scss": {
                  "syntax": "postcss-scss"
                }
              }
            }]
          ]
          , presets: ['env','react', 'stage-0']
        }
        , test: /\.jsx?$/
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
