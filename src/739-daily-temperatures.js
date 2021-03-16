/*
 * @leetcode: https://leetcode-cn.com/problems/daily-temperatures/
 * @Description: 每日温度
 * 请根据每日 气温 列表，重新生成一个列表。对应位置的输出为：要想观测到更高的气温，至少需要等待的天数。如果气温在这之后都不会升高，请在该位置用 0 来代替。
 * 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。
 * 提示：气温 列表长度的范围是 [1, 30000]。每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数。
 * @Author: ycwen1119@163.com
 * @Date: 2021-03-11 22:54:11
 */

/**
 * @description 方法一：暴力法，时间复杂度O(n²)
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
    let n = T.length
    let result = new Array(n).fill(0)
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (T[j] - T[i] > 0) {
                result[i] = j - i
                break
            }
        }
    }
    return result
}

/**
 * @description 方法二：借助缓存数组，时间复杂度降低为 O(mn)
 * 题目中已说明温度范围为[30, 100]，数据范围较小，因此可以将某个温度的最近位置缓存
 * 从后向前遍历，查找缓存数组中是否存在比它温度高的位置
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
    let result = []
    let n = T.length
    let next = new Array(101).fill(0)
    // 从后向前遍历
    for (let i = n - 1; i >= 0; i--) {
        let day = Infinity
        // 在缓存数组中找到最近的一个
        for (let t = T[i] + 1; t < 101; t++) {
            if (next[t] && next[t] - i < day) {
                day = next[t] - i
            }
        }
        day = day === Infinity ? 0 : day
        result.unshift(day)
        // 缓存当前温度的下标
        next[T[i]] = i
    }
    return result
}

/**
 * @description 方法三：单调栈，时间和空间复杂度均为 O(n)
 * 参考：https://leetcode-cn.com/problems/daily-temperatures/solution/shou-hui-ti-jie-fang-da-guan-cha-dan-diao-zhan-si-/
 * @param {number[]} T
 * @return {number[]}
 */
 var dailyTemperatures = function(T) {
    let n = T.length
    let result = new Array(n).fill(0)
    let stack = []
    for (let i = 0; i < n; i++) {
        // 如果栈中有数据且栈顶的值小于当前值
        while (stack.length && T[stack[stack.length - 1]] < T[i]) {
            let index = stack[stack.length - 1]
            result[index] = i - index
            stack.pop()
        }
        stack.push(i)
    }
    return result
}
