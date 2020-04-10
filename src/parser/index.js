/*
 * @Author: lin.cao
 * @Date: 2020-04-07 15:35:12
 * @LastEditTime: 2020-04-10 18:50:22
 * @LastEditors: lin.cao
 * @Description:
 * @FilePath: /webpack-babel-learn/src/parser/index.js
 */
import tokenizer from './tokenizer'
import parser from './parser'
import traverser from './traverser'
import generator from './generator'

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
traverser(ast, {
    VariableDeclaration(node, parent) {
        node.kind = 'var'
        console.log('const -> var')
    },
    Identifier(node, parent) {
        node.name = 'name'
        console.log('a -> name')
    },
})

// console.log(ast)

console.log(generator(ast))

export default {
    tokenizer,
    parser,
    traverser,
    generator,
}
