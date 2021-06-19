/*
 * @leetcode: https://leetcode-cn.com/problems/maximum-length-of-repeated-subarray
 * @Description: 最长重复子数组
 * 给两个整数数组 A 和 B ，返回两个数组中公共的、长度最长的子数组的长度
 * @Author: ycwen1119@163.com
 * @Date: 2021-04-07 09:17:57
 */

// 示例：

// 输入：
// A: [1,2,3,2,1]
// B: [3,2,1,4,7]
// 输出：3
// 解释：
// 长度最长的公共子数组是 [3, 2, 1] 。

/**
 * @description 方法一：暴力法
 * 枚举数组 A 中的起始位置 i 与数组 B 中的起始位置 j
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
var findLength = function(A, B) {
    let result = 0
    const lenA = A.length
    const lenB = B.length
    for (let i = 0; i < lenA; i++) {
        if (lenA - i < result) break // 如果A数组剩下的数量没有result长，则提前退出
        for (let j = 0; j < lenB; j++) {
            if (lenA - i < result) break // 如果B数组剩下的数量没有result长，则提前退出本层循环
            let ii = i
            let jj = j
            let temp = 0
            while(ii < lenA && jj < lenB && A[ii] === B[jj]) {
                temp++
                ii++
                jj++
            }
            result = Math.max(result, temp)
        }
    }
    return result
}

/**
 * @description 方法二：动态规划
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
 var findLength = function(A, B) {
    let result = 0
    const lenA = A.length
    const lenB = B.length
    const dp = new Array(lenA)
    for (let i = 0; i < lenA; i++) {
        dp[i] = new Array(lenB).fill(0)
    }
    // 动态规划
    for (let i = lenA - 1; i >= 0; i--) {
        for (let j = lenB - 1; j >= 0; j--) {
            if (A[i] === B[i]) {
                dp[i][j] = dp[i + 1][j + 1] + 1
            } else {
                dp[i][j] = 0
            }
            result = Math.max(ans, dp[i][j])
        }
    }
    return result
}


const A = [1,0,1,0,0,0,0,0,1,1]
const B = [1,1,0,1,1,0,0,0,0,0]
const result = findLength(A, B)
console.log(result)

// 方法一：动态规划
// 思路及算法

// 暴力解法的过程中，我们发现最坏情况下对于任意 i 与 j ，A[i] 与 B[j] 比较了 min(i + 1, j + 1)次。
// 这也是导致了该暴力解法时间复杂度过高的根本原因。

// 不妨设 A 数组为 [1, 2, 3]，B 两数组为为 [1, 2, 4] ，那么在暴力解法中 A[2] 与 B[2] 被比较了三次。
// 这三次比较分别是我们计算 A[0:] 与 B[0:] 最长公共前缀、 
// A[1:] 与 B[1:] 最长公共前缀以及 
// A[2:] 与 B[2:] 最长公共前缀时产生的。

// 我们希望优化这一过程，使得任意一对 A[i] 和 B[j] 都只被比较一次。这样我们自然而然想到利用这一次的比较结果。
// 如果 A[i] == B[j]，那么我们知道 A[i:] 与 B[j:] 的最长公共前缀为 A[i + 1:] 与 B[j + 1:] 的最长公共前缀的长度加一，否则我们知道 A[i:] 与 B[j:] 的最长公共前缀为零。

// 这样我们就可以提出动态规划的解法：令 dp[i][j] 表示 A[i:] 和 B[j:] 的最长公共前缀，那么答案即为所有 dp[i][j] 中的最大值。如果 A[i] == B[j]，那么 dp[i][j] = dp[i + 1][j + 1] + 1，否则 dp[i][j] = 0。

// 这里借用了 Python 表示数组的方法，A[i:] 表示数组 A 中索引 i 到数组末尾的范围对应的子数组。

// 考虑到这里 dp[i][j] 的值从 dp[i + 1][j + 1] 转移得到，所以我们需要倒过来，首先计算 dp[len(A) - 1][len(B) - 1]，最后计算 dp[0][0]。
