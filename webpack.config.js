const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isDev = process.env.NODE_ENV === 'development';
const smp = new SpeedMeasureWebpackPlugin();

const config = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-eval-source-map' : 'none',
  entry: {
    main: './src/index.js',
    home: './src/home.js',
  },
  output: {
    filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          'thread-loader',
          'babel-loader',
        ],
      },
      {
        test: /\.(css|less)$/,
        use: [
          isDev ? 'style-loader': MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'postcss-loader', options: { sourceMap: isDev ? 'inline' : false } },
          { loader: 'less-loader', options: { sourceMap: isDev } },
        ]
      },
    ],
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
    // new webpack.optimize.ModuleConcatenationPlugin(), // scope hoisting 作用域提升，production 默认启用
    // new BundleAnalyzerPlugin(), // 体积分析

  ],
  optimization: {
    // minimize: true,
    minimizer: [
      new TerserPlugin({
        // terserOptions: {
        //   mangle: false, // 标识符混淆
        //   output: {
        //     beautify: true, // 为方便查看代码使用 beautify
        //   },
        // },
        parallel: true, // 并行压缩
      }),
    ],
    // usedExports: true, // 标记未使用的 export，tree-shaking 基于此，production 默认启用
    splitChunks: {
      chunks: 'all',
      name: 'commons',
    },
  },
}

// module.exports = smp.wrap(config)
module.exports = config
