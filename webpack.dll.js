const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'none',
    entry: {
        vendors: [
            'vue',
        ],
    },
    output: {
        path: path.join(__dirname, './static/lib'),
        filename: '[name].dll.js',
        library: '[name]_[hash:8]',
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_[hash:8]',
            path: path.join(__dirname, './static/lib/[name]-manifest.json'),
        }),
    ],
}
