const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-eval-source-map' : 'none',
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
  },
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
          isDev ? 'style-loader': MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'postcss-loader', options: { sourceMap: isDev ? 'inline' : false } },
          { loader: 'less-loader', options: { sourceMap: isDev } },
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'webpack learn',
      minify: {
        collapseWhitespace: !isDev,
        minifyCSS: !isDev,
        minifyJS: !isDev,
        removeComments: !isDev,
      },
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash:8].css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(), // scope hoisting 作用域提升

  ],
  optimization: {
    usedExports: true, // 标记未使用的 export，tree-shaking 基于此，默认 production 启用
  },
}
