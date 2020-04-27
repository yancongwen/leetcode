/**
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。
你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
链接：https://leetcode-cn.com/problems/two-sum
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let result = null
    for (let i = 0; i < nums.length; i++) {
        let another = target - nums[i]
        let anotherIndex = nums.indexOf(another, i + 1)
        if (anotherIndex > 0) {
            result = [i, anotherIndex]
            return result
        }
    }
    return result
}

let result = twoSum([3, 4, 1, 4, 5], 8)
console.log(result)