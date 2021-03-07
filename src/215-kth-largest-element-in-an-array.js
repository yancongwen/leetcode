/*
 * @leetcode: https://leetcode-cn.com/problems/kth-largest-element-in-an-array/
 * @Descripttion:  数组中的第K个最大元素
 * @Author: Javon Yan
 * @Date: 2021-03-07 13:33:48
 * @LastEditTime: 2021-03-07 13:46:07
 */

/**
 * @description 方法一：数组排序，取第K个数
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    nums.sort((a, b) => b - a)
    return nums[k - 1]
}

/**
 * @description 方法二：堆排序
 * 构造前 k 个最大元素小顶堆，取堆顶
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    
}