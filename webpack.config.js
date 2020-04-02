/*
 * @Author: lin.cao
 * @Date: 2020-03-29 09:49:37
 * @LastEditTime: 2020-04-02 23:13:11
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
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'postcss-loader', options: { sourceMap: isDev } },
          { loader: 'less-loader', options: { sourceMap: isDev } },
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
