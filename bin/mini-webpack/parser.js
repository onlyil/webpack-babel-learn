const fs = require('fs')
const path = require('path')
const { parse, traverse, transformFromAst } = require('@babel/core')

const getAST = (path) => {
    const source = fs.readFileSync(path, 'utf-8')
    return parse(source, {
        sourceType: 'module',
    })
}

const getDenpendencies = (ast) => {
    const dependencies = []
    traverse(ast, {
        ImportDeclaration({ node }) {
            dependencies.push(node.source.value)
        },
    })
    return dependencies
}

const transform = (ast) => {
    const { code } = transformFromAst(ast, null, {
        presets: ['@babel/preset-env'],
    })
    return code
}

module.exports = {
    getAST,
    getDenpendencies,
    transform,
}
