/*
 * @Author: lin.cao
 * @Date: 2020-04-16 14:00:35
 * @LastEditTime: 2020-04-16 20:31:31
 * @LastEditors: lin.cao
 * @Description: 
 * @FilePath: /webpack-babel-learn/src/plugins/plugin.js
 */
module.exports = function (babel) {
    return {
        visitor: {
            VariableDeclaration(path) {
                if (path.node.kind === 'const') {
                    path.node.kind = 'var'
                }
            },
        },
    }
}
