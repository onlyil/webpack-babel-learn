import a from './a.js'

name('hello')

export default function name(params) {
    console.log(`name:${a}-${params}`)
}
