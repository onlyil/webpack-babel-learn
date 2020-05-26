const loaderUtils = require('loader-utils')
const path = require('path')
const fs = require('fs')

module.exports = function (source) {
    const options = loaderUtils.getOptions(this)
    const callback = this.async()

    const json = JSON.stringify(`${options.name}:${source}`)

    fs.readFile(path.join(__dirname, './demo.txt'), 'utf-8', (err, data) => {
        if (err) {
            callback(err, '')
            return
        }
        callback(null, data)
    })

    // return `export default ${json}`
    // this.callback(null, json)
}
