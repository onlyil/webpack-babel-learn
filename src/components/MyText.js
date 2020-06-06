import largeNumber, { minus } from '../../lib/large-number'

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
            <div>
                <p>{ this.text }</p>
                <p>{ largeNumber(1, 2) }</p>
                <p>{ minus(1, 2) }</p>
            </div>
        )
    }
}
