/*
   Webpack distribution configuration

   This file is set up for serving the distribution version. It will be compiled
   to dist/ by default
 */

'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist/assets'),
    publicPath: '/assets/'
  },

  cache: true,
  debug: false,
  devtool: 'eval',
  entry: './src/components/main',

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'src/index.html',
      inject: true
    })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'styles': __dirname + '/src/styles',
      'mixins': __dirname + '/src/mixins',
      'components': __dirname + '/src/components/'
    }
  },

  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'jsxhint'
    }],

    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.(png|jpg|woff|woff2)$/,
      loader: 'url-loader?limit=8192'
    }]
  }
};
