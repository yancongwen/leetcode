/*
 * @leetcode: https://leetcode-cn.com/problems/merge-two-sorted-lists/
 * @Description: 合并两个有序链表
 * @Author: ycwen1119@163.com
 * @Date: 2021-03-09 18:27:09
 */

// 输入：l1 = [1,2,4], l2 = [1,3,4]
// 输出：[1,1,2,3,4,4]

 /**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @description 方法一：迭代
 * 改变了传入的链表
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    const prevHead = new ListNode(0)
    let node = prevHead
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            node.next = l1
            l1 = l1.next
        } else {
            node.next = l2
            l2 = l2.next
        }
        node = node.next
    }
    node.next = l1 || l2
    return prevHead.next
}

/**
 * @description 方法二：迭代
 * 不改变被合并的链表
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    let result = new ListNode(0)
    let head = result
    while (l1 || l2) {
        if ((l1 && !l2) || (l1 && l2 && l1.val < l2.val)) {
            head.next = new ListNode(l1.val)
            l1 = l1.next
        } else {
            head.next = new ListNode(l2.val)
            l2 = l2.next
        }
        head = head.next
    }
    return result.next
}


/**
 * @description 方法三：递归
 * 改变了传入的链表
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    const result = new ListNode()
    if (l1 && l2) {
        if (l1.val <= l2.val) {
            result.next = l1
            l1 = l1.next
        } else {
            result.next = l2
            l2 = l2.next
        }
        result.next.next = mergeTwoLists(l1, l2)
    } else {
        l1 && (result.next = l1)
        l2 && (result.next = l2)
    }
    return result.next
}

/**
 * @description 方法四：递归（最优）
 * 改变了传入的链表
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    if (l1 === null) {
        return l2
    } else if (l2 === null) {
        return l1
    } else if (l1.val <= l2.val) {
        l1.next = mergeTwoLists(l1.next, l2)
        return l1
    } else {
        l2.next = mergeTwoLists(l1, l2.next)
        return l2
    }
}
