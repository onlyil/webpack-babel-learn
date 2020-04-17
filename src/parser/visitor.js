/*
 * @Author: lin.cao
 * @Date: 2020-04-16 13:14:12
 * @LastEditTime: 2020-04-16 13:15:07
 * @LastEditors: lin.cao
 * @Description: 访问者
 * @FilePath: /webpack-babel-learn/src/parser/visitor.js
 */
export default {
    VariableDeclaration(node, parent) {
        node.kind = 'var'
        console.log('const -> var')
    },
    Identifier(node, parent) {
        node.name = 'name'
        console.log('a -> name')
    },
}
