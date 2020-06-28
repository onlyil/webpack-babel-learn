const path = require('path')
const fs = require('fs')
const { getAST, getDenpendencies, transform } = require('./parser')

class Compiler {
    constructor(options) {
        const { entry, output } = options
        this.entry = entry
        this.output = output
        this.modules = []
    }

    run() {
        // 获取入口
        const entryModule = this.buildModule(this.entry, true)
        this.modules.push(entryModule)
        this.modules.forEach(module => {
            module.denpendencies.forEach(dep => {
                this.modules.push(this.buildModule(dep))
            })
        })
        this.emitFiles()
    }

    buildModule(filepath, isEntry) {
        let ast
        let filename
        if (isEntry) {
            ast = getAST(path.resolve(__dirname, filepath))
            filename = filepath
        } else {
            ast = getAST(path.resolve(__dirname, './test', filepath))
            filename = filepath
        }

        return {
            filename,
            denpendencies: getDenpendencies(ast),
            source: transform(ast),
        }
    }

    emitFiles() {
        const { filename } = this.output
        const outputPath = path.join(this.output.path, filename)
        let modules = '';
        this.modules.forEach(mod => {
            modules += `
                '${mod.filename}': function (module, exports, require) {
                    ${mod.source}
                },
            `
        })

        const bundle = `
            (function (modules) {
                const installedModules = []
                function __require__(moduleId) {
                    if (installedModules[moduleId]) {
                        return installedModules[moduleId].exports
                    }
                    const module = installedModules[moduleId] = {
                        i: moduleId,
                        exports: {},
                    }
                    modules[moduleId].call(module.exports, module, module.exports, __require__)
                    return module.exports
                }
                return __require__('${this.entry}')
            })({
                ${modules}
            })
        `

        fs.writeFileSync(outputPath, bundle, 'utf-8')
    }
}

module.exports = Compiler
