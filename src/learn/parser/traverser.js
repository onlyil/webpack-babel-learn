/*
 * @Author: lin.cao
 * @Date: 2020-04-10 15:03:53
 * @LastEditTime: 2020-04-10 15:56:02
 * @LastEditors: lin.cao
 * @Description: 遍历器
 * @FilePath: /webpack-babel-learn/src/parser/traverser.js
 */
function traverser(ast, visitor) {
    function traverseNode(node, parent) {
        //执行 visitor 中对应 type 的处理函数
        const method = visitor[node.type]
        if (method) {
            method(node, parent)
        }

        // 对不同类型的 node 分别处理
        switch (node.type) {
            case 'Program':
                traverseArray(node.body, node)
                break

            case 'VariableDeclaration':
                traverseNode(node.VariableDeclaration.id, node)
                traverseNode(node.VariableDeclaration.init, node)
                break

            // 没有任何子结点，直接 break
            case 'Identifier':
            case 'NumericLiteral':
                break

            default:
                throw new TypeError(node.type);
        }
    }

    function traverseArray(arr, parent) {
        arr.forEach((node) => {
            traverseNode(node, parent)
        })
    }

    // 开始遍历
    traverseNode(ast, null)
}

export default traverser
