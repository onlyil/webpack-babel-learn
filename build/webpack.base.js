const path = require('path')

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'cheap-module-eval-source-map' : 'none',
    context: path.resolve(__dirname, '..'),
    output: {
        filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
        chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|lib)/,
                use: [
                    'thread-loader',
                    'babel-loader?cacheDirectory=true',
                ],
            },
            {
                test: /\.(css|less)$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    { loader: 'postcss-loader', options: { sourceMap: isDev ? 'inline' : false } },
                    { loader: 'less-loader', options: { sourceMap: isDev } },
                ]
            },
        ],
    },
}
