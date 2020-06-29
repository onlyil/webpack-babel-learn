const { runLoaders } = require('loader-runner')
const path = require('path')
const fs = require('fs')

runLoaders({
    // resource: path.join(__dirname, './demo.txt'),
    resource: path.join(__dirname, './test.less'),
    loaders: [
        // {
        //     loader: path.join(__dirname, './raw-loader.js'),
        //     options: {
        //         name: 'test',
        //     },
        // },
        {
            loader: path.join(__dirname, './px2b-loader.js'),
        },
    ],
    context: {
        minimize: true,
    },
    readResource: fs.readFile.bind(fs),
}, (err, res) => {
    console.log(err || res)
})
