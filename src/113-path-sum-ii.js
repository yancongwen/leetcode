/*
 * @leetcode: https://leetcode-cn.com/problems/path-sum-ii/
 * @Description: 113. 路径总和 II
 * @Author: ycwen1119@163.com
 * @Date: 2021-03-31 09:04:46
 */

// 给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有从根节点到叶子节点路径总和等于给定目标和的路径。
// 叶子节点是指没有子节点的节点。

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @description 方法一：递归（深度优先）
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function(root, targetSum) {
    if (!root) return []
    if (root.left || root.right) {
        // 非叶子节点
        let temp = targetSum - root.val
        let leftResult = pathSum(root.left, temp)
        let rightResult = pathSum(root.right, temp)
        leftResult.forEach(list => {
            list.unshift(root.val)
        })
        rightResult.forEach(list => {
            list.unshift(root.val)
        })
        return [...leftResult, ...rightResult]
    } else {
        // 叶子节点
        if (targetSum === root.val) {
            return [[root.val]]
        }
        return []
    }
}


/**
 * @description 方法二：递归（深度优先）
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
    if (!root) return []
    var res = []
    var dfs = function(node, total, nums) {
        total += node.val
        nums.push(node.val)
        if (node.left || node.right) {
            // nums.slice() 其实就是 nums 的拷贝
            node.left && dfs(node.left, total, nums.slice())
            node.right && dfs(node.right, total, nums.slice())
        } else if (total === sum) {
            res.push(nums)
        }
    }
    dfs(root, 0, [])
    return res
}
