const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebPackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve('public'),
    filename: 'app.js',
    publicPath: '/'
  },
  module: {
    rules: [
      //Attempt to install Bootstrap
      // {
      //   test: /\.(scss)$/,
      //   use: [{
      //     loader: 'style-loader' // inject CSS to page
      //   }, {
      //     loader: 'css-loader' // translates CSS into CommonJS modules
      //   }, {
      //     loader: 'postcss-loader', // Run post css actions
      //     options: {
      //       plugins: function () { // post css plugins, can be exported to postcss.config.js
      //         return [
      //           require('precss'),
      //           require('autoprefixer')
      //         ]
      //       }
      //     }
      //   }, {
      //     loader: 'sass-loader' // compiles Sass to CSS
      //   }]
      // }
    ]
  },
  devServer: {
    contentBase: ['src'],
    watchContentBase: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 8000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        secure: false
      }
    }
  },
  plugins: [
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}
