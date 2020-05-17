import cssStyle from './style/css/index.css'
import lessStyle from './style/less/index.less'
// import parser from './parser'

// import { a, b } from './test/tree-shaking'

// if (false) {
//     a()
// }

// b()

import Vue from 'vue'

const vm = new Vue({
    el: '#app',
    components: {
        MyText: () => import('./components/MyText'),
    },
    data() {
        return {
            text: 'aewsome!',
            show: false,
        }
    },
    methods: {
        showMyText() {
            this.show = true
        },
    },
    render() {
        return (
            <div>
                <h2 vOn:click={this.showMyText}>Welcome to Vue!</h2>
                { this.show ? <MyText text={this.text} /> : null }
            </div>
        )
    },
})
