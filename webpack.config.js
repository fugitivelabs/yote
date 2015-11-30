// sets up the .jsx compiler to read .jsx from ./client/ 
// and output regular .js to /public/react/
var path = require('path');
var webpack = require('webpack');

module.exports = {
  cache: true
  , entry: './client/app.js.jsx'
  , output: {
    path: path.join(__dirname, 'public/js')
    , filename: 'react-bundle.js'
  }
  , module: {
    loaders: [
      { 
        test: /\.jsx?$/
        , loader: 'babel'
        , exlude: /node_modules/
        , query: {
          presets: ['es2015','react']
        }
      }
    ]
  }
}