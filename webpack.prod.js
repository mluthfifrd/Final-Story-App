const common = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  performance: {
    hints: false
  },
  optimization: {
    splitChunks: {
      minSize: 10000,
      maxSize: 250000
    }
  }
})
