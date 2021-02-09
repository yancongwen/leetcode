/*
 * @leetcode: https://leetcode-cn.com/problems/decode-string/
 * @Description: 字符串解码
 * @Author: ycwen1119@163.com
 * @Date: 2021-02-09 16:08:36
 */

 /**
 * @description 方法一：递归
 * @param {string} s
 * @return {string}
 */

var decodeString = function(s) {
    let result = ''
    let leftCount = 0
    let numberStr = ''
    let number = 0
    let childStr = ''
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
                result = result + str.repeat(number)
                childStr = ''
            }
        } else {
            if (!isNaN(+s[i])) {
                // 数字
                numberStr += s[i]
            } else if (s[i] === '[') {
                leftCount++
                number = +numberStr
                numberStr = ''
            } else {
                result += s[i]
            }
        }
    }
    return result
};


 /**
 * @description 方法一：栈
 * @param {string} s
 * @return {string}
 */

//  abcd1[abc2[ab]abc]
 var decodeString = function (s) {
    let result = ''
    let stack = []
    for (let i = 0; i < s.length; i++) {

    }
 }
