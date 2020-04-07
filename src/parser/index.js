/*
 * @Author: lin.cao
 * @Date: 2020-04-07 15:35:12
 * @LastEditTime: 2020-04-07 17:22:58
 * @LastEditors: lin.cao
 * @Description: 
 * @FilePath: /webpack-babel-learn/src/parser/index.js
 */
const tokenizer = require('./tokenizer')

const tokens = tokenizer(`
const a = 1
`)

console.log(tokens)
// [
//     { type: 'whitespace', value: '\n' },
//     { type: 'identifier', value: 'const' },
//     { type: 'whitespace', value: ' ' },
//     { type: 'identifier', value: 'a' },
//     { type: 'whitespace', value: ' ' },
//     { type: 'eq', value: '=' },
//     { type: 'whitespace', value: ' ' },
//     { type: 'number', value: '1' },
//     { type: 'whitespace', value: '\n' }
// ]
