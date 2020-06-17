const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')
// const CompressionWebpackPlugin = require('compression-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development';
const smp = new SpeedMeasureWebpackPlugin();

const config  = merge(baseConfig, {
    entry: {
        index: './src/pages/home/entry-client.js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../index.html'),
            title: 'webpack home',
            chunks: ['index'],
            filename: 'index.html',
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
        new webpack.DllReferencePlugin({
            manifest: require('../static/lib/vendors-manifest.json'),
        }),
        new HardSourceWebpackPlugin(), // 模块缓存，速度提升明显
        // new CompressionWebpackPlugin(), // gzip
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
                cache: true, // 压缩缓存，速度提升明显
            }),
        ],
        // usedExports: true, // 标记未使用的 export，tree-shaking 基于此，production 默认启用
        splitChunks: {
            chunks: 'all',
            name: isDev,
        },
    },
})

// module.exports = smp.wrap(config)
module.exports = config
