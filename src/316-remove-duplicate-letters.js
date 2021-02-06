/*
 * @leetcode: https://leetcode-cn.com/problems/remove-duplicate-letters/
 * @Descripttion: 去除重复字母
 * @Author: Javon Yan
 * @Date: 2021-02-06 18:54:04
 * @LastEditTime: 2021-02-06 20:33:43
 */

 /**
 * @param {string} s
 * @return {string}
 */
function removeDuplicateLetters(s) {
    var visitedMap = {} // 记录 result 中是否已存在某个字符
    var countMap = {} // 统计各个字符的数量
    var result = []
    for (let i = 0; i < s.length; i++) {
        if (countMap[s[i]]) {
            countMap[s[i]]++
        } else {
            countMap[s[i]] = 1
        }
    }
    // countMap
    for (let i = 0; i < s.length; i++) {
        const ch = s[i]
        // result 里没有这个字符
        if (!visitedMap[ch]) {
            // 最后一个字符大于当前字符
            while (result.length && result[result.length - 1] > ch) {
                // 后面还有这个字符，直接删除就行
                if (countMap[result[result.length - 1]]) {
                    visitedMap[result[result.length - 1]] = 0
                    result.pop()
                } else {
                    break
                }
            }
            result.push(ch)
            visitedMap[ch] = 1
        }
        countMap[ch]--
    }
    return result.join('')
}