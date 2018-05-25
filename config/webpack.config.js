const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

// Base source paths
const PATHS = require('./paths');


module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    index: path.resolve(PATHS.SRC, 'index.js'),
    array: path.resolve(PATHS.SRC, 'array/index.js'),
    functions: path.resolve(PATHS.SRC, 'functions/index.js'),
    lang: path.resolve(PATHS.SRC, 'lang/index.js'),
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin([PATHS.DIST]),
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  output: {
    filename: '[name].js',
    path: PATHS.DIST,
  }
};