const loaderUtils = require('loader-utils')
const path = require('path')
const fs = require('fs')
const less = require('less')

module.exports = function (source) {
    const options = loaderUtils.getOptions(this)

    const output = source.replace(/.*:.*(px).*;/g, (_, $1) => {
        const reg = new RegExp($1, 'g')
        return _.replace(reg, '/@b')
    })

    this.callback(null, output)
}
