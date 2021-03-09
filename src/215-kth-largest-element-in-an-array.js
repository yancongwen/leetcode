/*
 * @leetcode: https://leetcode-cn.com/problems/kth-largest-element-in-an-array/
 * @Descripttion:  数组中的第K个最大元素
 * @Author: Javon Yan
 * @Date: 2021-03-07 13:33:48
 * @LastEditTime: 2021-03-09 11:32:12
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
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    function swap(A, i, j) {
        [A[i], A[j]] = [A[j], A[i]]
    }
    function heapify(A, i, n) {
        while(true) {
            let max = i
            let left = 2 * i + 1
            let right = 2 * i + 2
            if (left < n && A[left] > A[max]) max = left
            if (right < n && A[right] > A[max]) max = right
            if (i === max) break
            swap(A, i, max)
            i = max
        }
    }

    const n = nums.length
    // 建堆（大顶堆）
    for (let i = Math.floor(n / 2); i >= 0; i--) {
        heapify(nums, i, n)
    }
    // 交换并堆化
    for (let i = 0; i < k; i++) {
        swap(nums, 0, n - i - 1)
        heapify(nums, 0, n - i - 1)
    }
    return nums[n - k]
}

/**
 * @description 方法三：堆排序（最优解）
 * 从数组中取出 k 个元素构造一个小顶堆，然后将其余元素与小顶堆对比，如果大于堆顶则替换堆顶，然后堆化，所有元素遍历完成后，堆中的堆顶即为第 k 个最大值
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    function swap(A, i, j) {
        [A[i], A[j]] = [A[j], A[i]]
    }
    function heapify(A, i, n) {
        while(true) {
            let min = i
            let left = 2 * i + 1
            let right = 2 * i + 2
            if (left < n && A[left] < A[min]) min = left
            if (right < n && A[right] < A[min]) min = right
            if (i === min) break
            swap(A, i, min)
            i = min
        }
    }

    const n = nums.length
    // 将前 k 个元素建立小顶堆
    for (let i = Math.floor(k / 2); i >= 0; i--) {
        heapify(nums, i, k)
    }
    // 从第 k 个元素开始，依次和堆顶比较，如果比小顶堆值大，则交换并对小顶堆重新堆化
    for (let i = k; i < n; i++) {
        if (nums[i] > nums[0]) {
            swap(nums, 0, i)
            heapify(nums, 0, k)
        }
    }
    console.log(nums)
    return nums[0]
}
