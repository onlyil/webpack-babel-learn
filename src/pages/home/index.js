import Vue from 'vue'
import App from './App.js'

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
const crateApp = () => {
    const app = new Vue({
        render: h => h(App),
    })

    return {
        app,
    }
}

export default crateApp
