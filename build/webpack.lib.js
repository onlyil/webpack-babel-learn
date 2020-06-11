const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: 'none',
    context: path.resolve(__dirname, '..'),
    entry: {
        'large-number': './static/js/large-number.js',
        'large-number.min': './static/js/large-number.js',
    },
    output: {
        path: path.resolve(__dirname, '../lib'),
        filename: '[name].js',
        library: 'largeNumber',
        libraryTarget: 'umd',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/,
            }),
        ],
    },
}
