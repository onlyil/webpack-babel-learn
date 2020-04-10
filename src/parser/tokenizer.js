/*
 * @Author: lin.cao
 * @Date: 2020-04-03 18:02:09
 * @LastEditTime: 2020-04-10 15:56:16
 * @LastEditors: lin.cao
 * @Description: 词法分析
 * @FilePath: /webpack-babel-learn/src/parser/tokenizer.js
 */
function tokenizer (code) {
    // 指针，用于记录在代码字符串中的位置
    let current = 0

    // 放置 token
    const tokens = []

    while (current < code.length) {
        // 当前字符
        let char = code[current]

        // 匹配标识符(变量、关键字等)
        const IDENTIFIER = /[a-zA-Z]/
        if (IDENTIFIER.test(char)) {
            let value = ''

            // 用一个循环遍历所有的字母
            while (IDENTIFIER.test(char)) {
                value += char
                char = code[++current]
            }

            // 添加一个类型为 `identifier` 的 token
            tokens.push({
                type: 'identifier',
                value,
            })
            continue
        }

        // 匹配空格（换行、缩进等）
        const WHITESPACE = /\s/
        if (WHITESPACE.test(char)) {
            let value = ''

            while (WHITESPACE.test(char)) {
                value += char
                char = code[++current]
            }

            tokens.push({
                type: 'whitespace',
                value,
            })
            continue
        }

        // 匹配“=”
        if (char === '=') {
            tokens.push({
                type: 'eq',
                value: '=',
            })
            current++
            continue
        }

        // 匹配数字
        const NUMBERS = /[0-9]/
        if (NUMBERS.test(char)) {
            let value = ''

            while (NUMBERS.test(char)) {
                value += char
                char = code[++current]
            }

            tokens.push({
                type: 'number',
                value,
            })
            continue
        }

        // 如果没有匹配上任何类型的 token，抛出一个错误
        throw new TypeError('I dont know what this character is: ' + char)
    }

    return tokens
}

export default tokenizer
