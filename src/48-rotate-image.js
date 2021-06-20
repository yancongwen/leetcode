/*
 * @leetcode: https://leetcode-cn.com/problems/rotate-image/
 * @Description: 旋转矩阵
 * 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
 * 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。
 * @Author: ycwen1119@163.com
 * @Date: 2021-03-09 16:14:23
 */

/**
 * @description 方法一：用翻转代替旋转
 * 规律：对于矩阵中第 i 行的第 j 个元素，在旋转后，它出现在倒数第 i 列的第 j 个位置。
 * 即：matrix[i][j] => matrix[j][n - i - 1]
 * 参考：https://leetcode-cn.com/problems/rotate-image/solution/xuan-zhuan-tu-xiang-by-leetcode-solution-vu3m/
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    let n = matrix.length
    // 水平翻转：第一行和最后一行交换，以此类推
    for (let i = 0; i < Math.floor(n / 2); i++) {
        for (let j = 0; j < n; j++) {
            [matrix[i][j], matrix[n - i - 1][j]] = [matrix[n - i - 1][j], matrix[i][j]]
        }
    }
    // 主对角线翻转：沿主对角线对称交换位置
    for (let i = 0; i < Math.floor(n / 2); i++) {
        for (let j = 0; j < i; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
        }
    }
}


/**
 * @description 方法二：暴力法，使用量辅助矩阵
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    let n = matrix.length
    let result = []
    for (let i = 0; i < n; i++) {
        let row = []
        for (let j = 0; j < n; j++) {
            row[j] = matrix[n - j - 1][i]
        }
        result.push(row)
    }
    // matrix = JSON.parse(JSON.stringify(result))
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix[i][j] = result[i][j]
        }
    }
}
