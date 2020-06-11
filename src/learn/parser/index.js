/*
 * @Author: lin.cao
 * @Date: 2020-04-07 15:35:12
 * @LastEditTime: 2020-04-16 13:15:41
 * @LastEditors: lin.cao
 * @Description:
 * @FilePath: /webpack-babel-learn/src/parser/index.js
 */
import tokenizer from './tokenizer'
import parser from './parser'
import traverser from './traverser'
import generator from './generator'
import visitor from './visitor'

const tokens = tokenizer(`
const a = 1
`)

// console.log(tokens)
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

const ast = parser(tokens)

// console.log(ast)
// {
//     type: 'Program',
//     body: [
//         {
//             type: 'VariableDeclaration',
//             VariableDeclaration: {
//                 id:{
//                     type: "Identifier",
//                     name: 'a'
//                 },
//                 init: {
//                     type: 'NumericLiteral',
//                     value: '1'
//                 },
//             },
//             kind: 'const'
//         }
//     ]
// }
traverser(ast, visitor)

console.log(generator(ast))

export default {
    tokenizer,
    parser,
    traverser,
    generator,
}
