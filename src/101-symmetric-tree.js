/*
 * @leetcode: https://leetcode-cn.com/problems/symmetric-tree
 * @description: 给定一个二叉树，检查它是否是镜像对称的
 * @Author: ycwen1119@163.com
 * @Date: 2021-03-16 10:40:33
 */

/*
例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
    1
   / \
  2   2
 / \ / \
3  4 4  3
但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
    1
   / \
  2   2
   \   \
   3    3
进阶：你可以运用递归和迭代两种方法解决这个问题吗
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @description 方法一：递归
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    if (!root) return true
    if (root.left && root.right && root.left.val === root.right.val) {
        // 左右子树的根节点值是否相等
        // 创建两个临时二叉树，以便于利用递归解决问题
        let tempRoot1 = {
            val: 0,
            left: root.left.left,
            right: root.right.right
        }
        let tempRoot2 = {
            val: 0,
            left: root.left.right,
            right: root.right.left
        }
        return isSymmetric(tempRoot1) && isSymmetric(tempRoot2)
    } else if (root.left === null && root.right === null) {
        return true
    } else {
        return false
    }
}

/**
 * @description 方法二：递归
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    if(!root) return true
    var isEqual = function(left, right) {
        if(!left && !right) return true
        if(!left || !right) return false
        return left.val === right.val && isEqual(left.left, right.right) && isEqual(left.right, right.left)
    }
    return isEqual(root.left, root.right)
}

/**
 * @description 方法三：迭代
    利用栈来记录比较的过程，实际上，递归就使用了调用栈，所以这里我们可以使用栈来模拟递归的过程
    首先根的左右子树入栈
    将左右子树出栈，比较两个数是否互为镜像
    如果左右子树的根节点值相等，则将左子树的 left 、右子树的 right 、左子树的 right 、右子树的 left 依次入栈
    继续出栈（一次出栈两个进行比较）……
    依次循环出栈入栈，直到栈为空
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    if(!root) return true
    let stack = [[root.left, root.right]]
    while(stack.length) {
        let temp = stack.pop()
        let left = temp[0]
        let right = temp[1]
        if (left && right) {
            if(left.val !== right.val) return false
            stack.push([left.left, right.right])
            stack.push([left.right, right.left])
        } else if (left || right) {
            return false
        }
    }
    return true
}
