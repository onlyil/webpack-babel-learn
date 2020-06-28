function* myGenerator() {
    try {
        console.log(yield Promise.resolve(1))
        console.log(yield 2)
        console.log(yield Promise.reject('error'))
        console.log(yield Promise.resolve(3))
    } catch (error) {
        console.log(error)
    }
}

// const gen = myGenerator()

// gen.next().value
//     .then((val) => {
//         console.log(val)
//     })

function run(gen) {
    return new Promise((resolve, reject) => { // async 函数最终返回 Promise
        const g = gen()

        function step(val) {
            // 错误处理
            try {
                var res = g.next(val)
            } catch (error) {
                return reject(error)
            }
            if (res.done) return resolve(res.value)
            // 兼容基本类型值，用 Promise 包装
            Promise.resolve(res.value).then(
                val => {
                    step(val)
                },
                err => {
                    g.throw(err) // throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。
                }
            )
        }

        step()
    })
}

const result = run(myGenerator)

console.log(result)
setTimeout(() => {
    console.log(result)
}, 1000);
