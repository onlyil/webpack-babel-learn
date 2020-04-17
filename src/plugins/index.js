/*
 * @Author: lin.cao
 * @Date: 2020-04-16 20:11:43
 * @LastEditTime: 2020-04-17 22:31:52
 * @LastEditors: lin.cao
 * @Description: 
 * @FilePath: /webpack-babel-learn/src/plugins/index.js
 */
const myPlugin = require('./plugin')
const {transform} = require('@babel/core')

const code = `const a = 1`

transform(code, {plugins: [myPlugin]}, (err, res) => {
    console.log(res.code)
})
