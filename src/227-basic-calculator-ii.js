/*
 * @leetcode: https://leetcode-cn.com/problems/basic-calculator-ii/
 * @Description: 227. 基本计算器 II
 * @Author: ycwen1119@163.com
 * @Date: 2021-03-31 13:13:06
 */

// 给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。
// 整数除法仅保留整数部分。
// s 由整数和算符 ('+', '-', '*', '/') 组成，中间由一些空格隔开
// s 表示一个 有效表达式
// 表达式中的所有整数都是非负整数，且在范围 [0, 231 - 1] 内
// 题目数据保证答案是一个 32-bit 整数

/**
 * 方法一：栈
 * 由于乘除优先于加减计算，因此不妨考虑先进行所有乘除运算，并将这些乘除运算后的整数值放回原表达式的相应位置，则随后整个表达式的值，就等于一系列整数加减后的值。
 * 基于此，我们可以用一个栈，保存这些（进行乘除运算后的）整数的值。对于加减号后的数字，将其直接压入栈中；对于乘除号后的数字，可以直接与栈顶元素计算，并替换栈顶元素为计算后的结果。
 * 具体来说，遍历字符串 ss，并用变量 preSymbol 记录每个数字之前的运算符，对于第一个数字，其之前的运算符视为加号。每次遍历到数字末尾时，根据 preSymbol 来决定计算方式：
 * 加号：将数字压入栈；
 * 减号：将数字的相反数压入栈；
 * 乘除号：计算数字与栈顶元素，并将栈顶元素替换为计算结果。
 * 代码实现中，若读到一个运算符，或者遍历到字符串末尾，即认为是遍历到了数字末尾。处理完该数字后，更新 preSymbol 为当前遍历的字符。
 * 遍历完字符串 ss 后，将栈中元素累加，即为该字符串表达式的值。
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
    var stack = []
    var charList = s.replace(/\s*/g, '').split('')
    var preSymbol = '+'
    var numberStr = ''
    var numberRegex = /[0-9]/
    for (let i = 0; i < charList.length; i++) {
        if (numberRegex.test(charList[i])) {
            numberStr += charList[i]
        }
        if (!numberRegex.test(charList[i]) || i === charList.length - 1) {
            // 不是数字，或者已经到了末尾
            console.log(numberStr)
            if (preSymbol === '+') {
                stack.push(+numberStr)
            } else if (preSymbol === '-') {
                stack.push(-numberStr)
            } else if (preSymbol === '*') {
                stack.push(Number(numberStr) * stack.pop())
            } else if (preSymbol === '/') {
                stack.push(Math.floor(Number(numberStr) / stack.pop()))
            }
            preSymbol = charList[i]
            numberStr = ''
        }
    }
    return stack.reduce((acc, cur) => acc + cur, 0)
}

console.log(calculate('3+2*2'))
