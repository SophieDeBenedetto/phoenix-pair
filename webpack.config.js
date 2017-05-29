'use strict';

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

function join(dest) { return path.resolve(__dirname, dest); }

function web(dest) { return join('web/static/' + dest); }

var config = module.exports = {
  entry: web("js/app.js"),
  output: {
    path: join('priv/static/js'),
    filename: "app.js"
  },

  resolve: {
    extensions: ['.js', '.sass', '.css'],
    modules: ['node_modules'],
  },

  module: {
    noParse: /vendor\/phoenix/,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy'],
          presets: ['react', 'es2015', 'stage-2', 'stage-0'],
        },
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract({fallbackLoader: 'style', loader: 'css!sass?indentedSyntax&includePaths[]=' + __dirname +  '/node_modules'})
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ],
  },

  plugins: [
    new ExtractTextPlugin('css/application.css'),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  );
}
