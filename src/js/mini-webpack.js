
// webpack --devtool=none --config ./webpack.config.js
yargs.parse(process.argv.slice(2), (err, argv, output) => { // 解析参数
    // 合并配置
    const options = require("./utils/convert-argv")(argv);

    // 创建 compiler 实例
    const compiler = new Compiler(options.context)
    compiler.options = options

    // 注册配置文件中指定的插件
    for (const plugin of options.plugins) {
        plugin.apply(compiler);
    }
    // 根据所有配置注册内部插件
    compiler.options = new WebpackOptionsApply().process(options, compiler);

    // 开始编译
    compiler.run((err, stats) => {
        this.hooks.run.callAsync(this, err => { // run hook
            this.hooks.compile.call(params); // compile hook

            // ...

            this.hooks.make.callAsync(compilation, err => { // make hook
                this.hooks.afterCompile.callAsync(compilation, err => { // afterCompile hook
                    // ...
                })
            })
        })
    })
})
