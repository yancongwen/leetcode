/*
 * @leetcode: https://leetcode-cn.com/problems/decode-string/
 * @Description: 字符串解码
 * @Author: ycwen1119@163.com
 * @Date: 2021-02-09 16:08:36
 */

 /**
 * @description 方法一：递归
 * 一层一层解析
 * @param {string} s
 * @return {string}
 */

var decodeString = function(s) {
    let result = ''
    let leftCount = 0 // 存储左括号的数量
    let numberStr = '' // 数字
    let childStr = '' // 子字符串
    for (let i = 0; i < s.length; i++) {
        if (leftCount) {
            if (s[i] === '[') {
                leftCount++
            } else if (s[i] === ']') {
                leftCount--
            }
            if (leftCount) {
                childStr += s[i]
            } else {
                let str = decodeString(childStr)
                result = result + str.repeat(+numberStr)
                childStr = ''
                numberStr = ''
            }
        } else {
            if (!isNaN(+s[i])) {
                numberStr += s[i]
            } else if (s[i] === '[') {
                leftCount++
            } else {
                result += s[i]
            }
        }
    }
    return result
};


 /**
 * @description 方法二：栈
 * 本题中可能出现括号嵌套的情况，比如 2[a2[bc]]，这种情况下我们可以先转化成 2[abcbc]，在转化成 abcbcabcbc。我们可以把字母、数字和括号看成是独立的 TOKEN，并用栈来维护这些 TOKEN。具体的做法是，遍历这个栈：
 * 如果当前的字符为数位，解析出一个数字（连续的多个数位）并进栈
 * 如果当前的字符为字母或者左括号，直接进栈
 * 如果当前的字符为右括号，开始出栈，一直到左括号出栈，出栈序列反转后拼接成一个字符串，此时取出栈顶的数字（此时栈顶一定是数字，想想为什么？），就是这个字符串应该出现的次数，我们根据这个次数和字符串构造出新的字符串并进栈
 * 重复如上操作，最终将栈中的元素按照从栈底到栈顶的顺序拼接起来，就得到了答案。
 * @param {string} s
 * @return {string}
 */

//  abcd1[abc2[ab]abc]
var decodeString = function (s) {
    let stack = []
    for (let i = 0; i < s.length; i++) {
        if (s[i] !== ']') {
            stack.push(s[i])
        } else {
            // 发现右括号，开始出栈
            unstack()
        }
    }
    return stack.join('')

    function unstack() {
        let i = stack.length - 1
        let subStr = ''
        let numberStr = ''
        let flag = false
        while (i >= 0) {
            let char = stack[i]
            if (char === '[' && !flag) {
                flag = true
                i--
                continue
            }
            if (!flag) {
                subStr = char + subStr
            } else {
                if (!isNaN(+char)) {
                    numberStr = char + numberStr
                } else {
                    subStr = subStr.repeat(+numberStr)
                    stack = [...stack.splice(0, i + 1), ...subStr]
                    return 
                }
            }
            i--
        }
        stack = [...subStr.repeat(+numberStr)]
    }
}

 /**
 * @description 方法三
 * 和方法二思想一致，只是用字符串模拟栈
 * @param {string} s
 * @return {string}
 */

var decodeString = function (s) {
    let stack = ''
    for (let i = 0; i < s.length; i++) {
        if (s[i] !== ']') {
            stack += s[i]
        } else {
            // 发现右括号，开始出栈
            unstack()
        }
    }
    return stack

    function unstack() {
        let i = stack.length - 1
        let subStr = ''
        let numberStr = ''
        let flag = false
        while (i >= 0) {
            let char = stack[i]
            if (char === '[' && !flag) {
                flag = true
                i--
                continue
            }
            if (!flag) {
                subStr = char + subStr
            } else {
                if (!isNaN(+char)) {
                    numberStr = char + numberStr
                } else {
                    stack = stack.substr(0, i + 1) + subStr.repeat(+numberStr)
                    return
                }
            }
            i--
        }
        stack = subStr.repeat(+numberStr)
    }
}

 /**
 * @description 方法四：栈
 * 参考：https://leetcode-cn.com/problems/decode-string/solution/decode-string-fu-zhu-zhan-fa-di-gui-fa-by-jyd/
 * @param {string} s
 * @return {string}
 */

var decodeString = function (s) {
    let stack = []
    let multi = ''
    let res = ''
    for (let c of s) {
        if (c === '[') {
            stack.push([+multi, res])
            multi = ''
            res = ''
        } else if (c === ']') {
            let [conut, str] = stack.pop()
            res = str + res.repeat(conut)
        } else if (c >= '0' && c <= '9' ) {
            multi += c
        } else {
            res += c
        }
    }
    return res
}
