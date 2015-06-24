/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/'
  },

  cache: true,
  debug: true,
  devtool: "eval",
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/components/main'
  ],

  stats: {
    colors: true,
    reasons: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true
    })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'styles': __dirname + '/src/styles',
      'mixins': __dirname + '/src/mixins',
      'components': __dirname + '/src/components'
    }
  },

  module: {
    /* preLoaders: [{
       test: /\.(js|jsx)$/,
       exclude: /node_modules/,
       loader: 'jsxhint'
       }], */
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loaders: [ 'babel' ],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg|woff|woff2|wtc)$/,
      loader: 'url-loader?limit=8192'
    }]
  },

};
