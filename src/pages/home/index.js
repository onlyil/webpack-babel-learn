import cssStyle from '@/style/css/index.css'
import lessStyle from '@/style/less/index.less'
import Vue from 'vue'

const vm = new Vue({
    el: '#app',
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
