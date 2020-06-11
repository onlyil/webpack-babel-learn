const { runLoaders } = require('loader-runner')
const path = require('path')
const fs = require('fs')

runLoaders({
    resource: path.join(__dirname, './demo.txt'),
    loaders: [
        {
            loader: path.join(__dirname, './raw-loader.js'),
            options: {
                name: 'test',
            },
        },
    ],
    context: {
        minimize: true,
    },
    readResource: fs.readFile,
}, (err, res) => {
    console.log(err || res)
})
