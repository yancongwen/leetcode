/*
 * @leetcode: https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst
 * @Description: 二叉搜索树中第K小的元素
 * 给定一个二叉搜索树的根节点 root ，和一个整数 k ，请你设计一个算法查找其中第 k 个最小元素（从 1 开始计数）。
 * @Author: ycwen1119@163.com
 * @Date: 2021-04-06 17:46:13
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 二叉搜索树（BST）：根节点的值大于其左子树中任意一个节点的值，小于其右节点中任意一节点的值，这一规则适用于二叉查找树中的每一个节点。
// 广度优先遍历 BFS
// 深度优先遍历 DFS

/**
 * @description 方法一：递归（深度优先）
 * 通过递归，将二叉搜索树拍平为升序数组，然后下标为 k-1 的元素即为第 k 小元素
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    var inorder = (root, arr) => {
        if (root == null) return arr
        inorder(root.left, arr)
        arr.push(root.val)
        inorder(root.right, arr)
        return arr
    }
    var list  = inorder(root, [])
    return list[k - 1]
}


/**
 * @description 方法二：迭代（深度优先）
 * 借助栈将递归装换为迭代，有点难理解
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
let kthSmallest = function(root, k) {
    let stack = []
    let node = root
    while(node || stack.length) {
        // 遍历左子树，将左子树全部压入栈
        while(node) {
            stack.push(node)
            node = node.left
        }
        // 取出最后一个节点
        node = stack.pop()
        if(--k === 0) {
            return node.val
        }
        node = node.right
    }
    return null
}
