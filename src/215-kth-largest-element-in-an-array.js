/*
 * @leetcode: https://leetcode-cn.com/problems/kth-largest-element-in-an-array/
 * @Descripttion:  数组中的第K个最大元素
 * @Author: Javon Yan
 * @Date: 2021-03-07 13:33:48
 * @LastEditTime: 2021-03-08 18:45:16
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

function heapSort(A) {
    buildHeap(A)
    for (let i = 0; i < A.length; i++) {

    }
}


// 建堆，从最后一个非叶子节点开始，依次向前堆化处理
function buildHeap(A) {
    // 前端填 0 方便处理
    A.unshift(0)
    for (let i = Math.floor(A.length / 2); i > 0; i--) {
        heapify(A, n, i)
    }
}

// 从上往下堆化
function heapify(A, n, i) {
    while (true) {
        let max = i
        let left = i * 2
        let right = i * 2 + 1
        if (left < n && A[left] > A[max]) max = left
        if (right < n && A[right] > A[max]) max = right
        if (max === i) break
        swap(A, i, max)
        i = max
    }
}

// 交换
function swap(A, i, j) {
    [A[i], A[j]] = [A[j], A[i]]
}

heapSort([1,2,3,4,0,1,10])