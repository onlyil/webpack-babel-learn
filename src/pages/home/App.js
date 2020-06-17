export default {
    name: 'App',
    components: {
        MyText: () => import(
            /* webpackChunkName: 'components/MyText' */
            /* webpackPrefetch: true */
            '@/components/MyText'
        ),
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
}
