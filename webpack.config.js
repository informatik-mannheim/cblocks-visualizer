const path = require('path');
const webpack = require('webpack');

const settings = {
  entry: {
    bundle: [
      'react-hot-loader/patch',
      './src/frontend/index.js'
    ]
  },
  output: {
    filename: '[name].js',
    publicPath: '/',
    path: path.resolve('build')
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', { modules: false }],
            'stage-2',
            'react'
          ],
          env: {
            development: {
              plugins: ['react-hot-loader/babel']
            }
          }
        },
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]--[local]--[hash:base64:8]'
            }
          },
          'postcss-loader' // has separate config, see postcss.config.js nearby
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve('src/www'),
    publicPath: 'http://localhost:8080/', // full URL is necessary for Hot Module Replacement if additional path will be added.
    quiet: false,
    hot: true,
    historyApiFallback: true,
    inline: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]
};

module.exports = settings;
