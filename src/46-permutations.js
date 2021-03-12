/*
 * @leetcode: https://leetcode-cn.com/problems/permutations/
 * @Description: 给定一个没有重复数字的序列，返回其所有可能的全排列
 * @Author: ycwen1119@163.com
 * @Date: 2021-03-04 14:54:11
 */

/**
 * @Description: 方法一：递归
 * 找到递归公式和结束条件，就很好理解
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let len = nums.length
    let result = []
    if (len <= 1) {
        return nums
    }
    for (let i = 0; i < len; i++) {
        let otherNums = [...nums.slice(0, i), ...nums.slice(i + 1)]
        let temp = permute(otherNums)
        temp.forEach(item => {
            result.push([nums[i], ...item])
        })
    }
    return result
}

/**
 * @Description: 方法二：回溯 + 深度优先遍历 + 递归
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let len = nums.length
    let res = []
    if (len === 0) {
        return res
    }
    let path = [] // 当前路径
    let used = {} // 存储是否已存在于 path
    dfs(nums, path, used, res)
    return res
}

var dfs = function(nums, path, used, res) {
    console.log(path)
    if (path.length === nums.length) {
        // 到底了
        res.push([...path])
        return
    }
    for (let i = 0; i < nums.length; i++) {
        if (!used[i]) {
            path.push(nums[i])
            used[i] = true
            // 进入下一层
            dfs(nums, path, used, res)
            // 回溯
            path.pop()
            used[i] = false
        }
    }
}

/**
 * @Description: 方法二的另一种形式
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let len = nums.length
    let res = []
    if (len === 0) {
        return res
    }
    let path = [] // 当前路径
    let used = {} // 存储是否已存在于 path
    let dfs = function() {
        // console.log(path)
        if (path.length === len) {
            res.push([...path])
        }
        for (let i = 0; i < len; i++) {
            if (!used[i]) {
                used[i] = true
                path.push(nums[i])
                // 进入下一层
                dfs()
                // 回溯
                used[i] = false
                path.pop()
            }
        }
    }
    dfs()
    return res
}

// console.log(permute([1,2,3]))
