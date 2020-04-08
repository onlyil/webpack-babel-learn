/*
 * @Author: lin.cao
 * @Date: 2020-04-08 12:08:23
 * @LastEditTime: 2020-04-08 19:27:26
 * @LastEditors: lin.cao
 * @Description: 语法分析
 * @FilePath: /webpack-babel-learn/src/parser/parser.js
 */
function parser (tokens) {
    // 指针
    let current = 0

    function walk() {
        let token = tokens[current]

        if (token.type === 'identifier') {
            if (token.value === 'const') {
                const node = {
                    type: 'VariableDeclaration',
                    VariableDeclaration: {},
                    kind: 'const',
                }
                token = tokens[++current]

                while (token.type !== 'identifier') {
                    token = tokens[++current]
                }
                node.VariableDeclaration.id = walk()

                while (token.type !== 'number') {
                    token = tokens[++current]
                }
                node.VariableDeclaration.init = walk()

                return node
            } else {
                current++
                return {
                    type: 'Identifier',
                    name: token.value,
                }
            }
        }

        if (token.type === 'number') {
            current++
            return {
                type: 'NumericLiteral',
                value: token.value,
            }
        }

        if (token.type === 'whitespace') {
            current++
        }
    }

    const ast = {
        type: 'Program',
        body: [],
    };

    while (current < tokens.length) {
        const res = walk()
        res && ast.body.push(res)
    }
    return ast
}

module.exports = parser
