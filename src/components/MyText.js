import Vue from 'vue'

export default {
    name: 'MyText',
    props: {
        text: {
            type: String,
            default: 'text',
        },
    },
    render() {
        return (
            <p>{ this.text }</p>
        )
    }
}
