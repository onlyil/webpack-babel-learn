/*
 * @Author: lin.cao
 * @Date: 2020-03-29 09:49:37
 * @LastEditTime: 2020-03-30 23:21:33
 * @LastEditors: lin.cao
 * @Description: 
 * @FilePath: /webpack-babel-learn/webpack.config.js
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    })
  ]
}
