/*
 * @Author: lin.cao
 * @Date: 2020-04-10 16:01:27
 * @LastEditTime: 2020-04-10 18:52:04
 * @LastEditors: lin.cao
 * @Description: 代码生成器
 * @FilePath: /webpack-babel-learn/src/parser/generator.js
 */
function generator (node) {
    switch (node.type) {
        case 'Program':
            return node.body.map(generator).join('\n')

        case 'VariableDeclaration':
            return (
                `${node.kind} ` +
                generator(node.VariableDeclaration.id) +
                ' = ' +
                generator(node.VariableDeclaration.init)
            )

        case 'Identifier':
            return node.name

        case 'NumericLiteral':
            return node.value

        default:
            throw new TypeError(node.type)
    }
}

export default generator
