const fs = require('fs')
const path = require('path')
const createRenderer = require('vue-server-renderer').createRenderer

// 第 1 步：创建一个 Vue 实例
const app = require('./entry-server')

// 第 2 步：创建一个 renderer
const renderer = createRenderer({
    template: fs.readFileSync(path.join(__dirname, './ssr.tmpl.html'), 'utf-8'),
})

// 第 3 步：将 Vue 实例渲染为 HTML
renderer.renderToString(app)
    .then(html => {
        console.log(html)
    })
    .catch(e => {
        console.error(e)
    })
