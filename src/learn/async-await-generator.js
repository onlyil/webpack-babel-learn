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

// generator 实现：用 switch case 将代码阶段分割，定义context储存函数上下文，定义 next 方法
// 1. gen$(_context) 由 yield 分割生成器代码而来，主要是 switch case
// 2. context 用于储存函数执行上下文
// 3. invoke 方法定义 next ，用于执行 gen$() 来跳到下一步

// 生成器函数根据yield语句将代码分割为switch-case块，后续通过切换_context.prev和_context.next来分别执行各个case
function gen$(_context) {
    while (1) {
        switch (_context.prev = _context.next) {
        case0:
        _context.next = 2;
        return 'result1';

        case2:
        _context.next = 4;
        return 'result2';

        case4:
        _context.next = 6;
        return 'result3';

        case6:
        case "end":
        return _context.stop();
    }
}

// 低配版context
var context = {
    next: 0,
    prev: 0,
    done: false,
    stop: function stop() {
        this.done = true
    }
}

// 低配版invoke
let gen = function () {
    return {
        next: function () {
            value = context.done ? undefined : gen$(context)
            done = context.done
            return {
                value,
                done
            }
        }
    }
}

var g = gen()
g.next()  // {value: "result1", done: false}
g.next()  // {value: "result2", done: false}
g.next()  // {value: "result3", done: false}
g.next()  // {value: undefined, done: true}
